"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface Subscriber {
  dog_name: string;
}

interface MessageRow {
  id: string;
  channel_id: string;
  subscriber_id: string;
  content: string;
  created_at: string;
  subscribers: Subscriber | null;
}

export interface Message extends MessageRow {
  _pending?: boolean;
}

const INITIAL_LIMIT = 50;
const OLDER_BATCH_SIZE = 30;

export function useRealtimeMessages(channelId: string) {
  const supabaseRef = useRef(createClient());
  const channelRef = useRef<RealtimeChannel | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Fetch initial messages
  useEffect(() => {
    if (!channelId) return;

    const supabase = supabaseRef.current;
    let cancelled = false;

    async function fetchInitial() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("community_messages")
          .select("*, subscribers(dog_name)")
          .eq("channel_id", channelId)
          .order("created_at", { ascending: true })
          .limit(INITIAL_LIMIT);

        if (error) {
          console.error("Failed to fetch messages:", error);
          return;
        }
        if (!cancelled) {
          setMessages((data as Message[]) ?? []);
          setHasMore((data?.length ?? 0) >= INITIAL_LIMIT);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchInitial();
    return () => {
      cancelled = true;
    };
  }, [channelId]);

  // Subscribe to realtime inserts
  useEffect(() => {
    if (!channelId) return;

    const supabase = supabaseRef.current;

    const channel = supabase
      .channel(`messages:${channelId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "community_messages",
          filter: `channel_id=eq.${channelId}`,
        },
        async (payload) => {
          const newRow = payload.new as MessageRow;

          // Fetch subscriber info for the new message
          try {
            const { data } = await supabase
              .from("subscribers")
              .select("dog_name")
              .eq("id", newRow.subscriber_id)
              .single();

            const messageWithSubscriber: Message = {
              ...newRow,
              subscribers: data ?? null,
            };

            setMessages((prev) => {
              // Replace pending message if it exists (same content + subscriber)
              const pendingIdx = prev.findIndex(
                (m) =>
                  m._pending &&
                  m.subscriber_id === newRow.subscriber_id &&
                  m.content === newRow.content
              );

              if (pendingIdx !== -1) {
                const updated = [...prev];
                updated[pendingIdx] = messageWithSubscriber;
                return updated;
              }

              // Avoid duplicates
              if (prev.some((m) => m.id === newRow.id)) return prev;

              return [...prev, messageWithSubscriber];
            });
          } catch (err) {
            console.error("Failed to fetch subscriber for new message:", err);
          }
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
    };
  }, [channelId]);

  // Load older messages (infinite scroll up)
  const loadOlderMessages = useCallback(async () => {
    if (!channelId || !hasMore) return;

    const supabase = supabaseRef.current;
    const oldestMessage = messages.find((m) => !m._pending);
    if (!oldestMessage) return;

    try {
      const { data, error } = await supabase
        .from("community_messages")
        .select("*, subscribers(dog_name)")
        .eq("channel_id", channelId)
        .lt("created_at", oldestMessage.created_at)
        .order("created_at", { ascending: false })
        .limit(OLDER_BATCH_SIZE);

      if (error) {
        console.error("Failed to load older messages:", error);
        return;
      }

      const older = ((data as Message[]) ?? []).reverse();
      setHasMore(older.length >= OLDER_BATCH_SIZE);
      setMessages((prev) => [...older, ...prev]);
    } catch (err) {
      console.error("Failed to load older messages:", err);
    }
  }, [channelId, hasMore, messages]);

  // Optimistic send
  const sendMessage = useCallback(
    async (content: string, subscriberId: string) => {
      if (!channelId || !content.trim()) return;

      const supabase = supabaseRef.current;
      const tempId = `pending-${Date.now()}-${Math.random()}`;

      const pendingMessage: Message = {
        id: tempId,
        channel_id: channelId,
        subscriber_id: subscriberId,
        content: content.trim(),
        created_at: new Date().toISOString(),
        subscribers: null,
        _pending: true,
      };

      setMessages((prev) => [...prev, pendingMessage]);

      try {
        const { error } = await supabase.from("community_messages").insert({
          channel_id: channelId,
          subscriber_id: subscriberId,
          content: content.trim(),
        });

        if (error) {
          console.error("Failed to send message:", error);
          // Remove the pending message on failure
          setMessages((prev) => prev.filter((m) => m.id !== tempId));
        }
        // On success, the realtime subscription will replace the pending message
      } catch (err) {
        console.error("Failed to send message:", err);
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
      }
    },
    [channelId]
  );

  return { messages, isLoading, loadOlderMessages, hasMore, sendMessage };
}
