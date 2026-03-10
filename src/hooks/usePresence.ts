"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface UserInfo {
  userId: string;
  dogName: string;
}

interface PresenceState {
  userId: string;
  dogName: string;
}

export function usePresence(
  channelSlug: string,
  userInfo?: { userId: string; dogName: string }
) {
  const supabaseRef = useRef(createClient());
  const [onlineUsers, setOnlineUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    if (!channelSlug) return;

    const supabase = supabaseRef.current;

    const channel = supabase.channel(`presence:${channelSlug}`, {
      config: { presence: { key: userInfo?.userId ?? "anonymous" } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState<PresenceState>();
        const users: UserInfo[] = [];
        const seen = new Set<string>();

        for (const key of Object.keys(state)) {
          const presences = state[key];
          for (const p of presences) {
            if (!seen.has(p.userId)) {
              seen.add(p.userId);
              users.push({ userId: p.userId, dogName: p.dogName });
            }
          }
        }

        setOnlineUsers(users);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED" && userInfo) {
          try {
            await channel.track({
              userId: userInfo.userId,
              dogName: userInfo.dogName,
            });
          } catch (err) {
            console.error("Failed to track presence:", err);
          }
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelSlug, userInfo?.userId, userInfo?.dogName]);

  return {
    onlineCount: onlineUsers.length,
    onlineUsers,
  };
}
