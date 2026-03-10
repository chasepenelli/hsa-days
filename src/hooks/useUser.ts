"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface SubscriberProfile {
  id: string;
  dog_name: string;
  is_admin: boolean;
}

export function useUser() {
  const supabaseRef = useRef(createClient());
  const [user, setUser] = useState<User | null>(null);
  const [subscriber, setSubscriber] = useState<SubscriberProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = supabaseRef.current;
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !authUser) {
          if (authError) console.error("Failed to get user:", authError);
          if (!cancelled) {
            setUser(null);
            setSubscriber(null);
          }
          return;
        }

        if (!cancelled) setUser(authUser);

        const { data, error } = await supabase
          .from("subscribers")
          .select("id, dog_name, is_admin")
          .eq("user_id", authUser.id)
          .single();

        if (error) {
          console.error("Failed to fetch subscriber profile:", error);
          if (!cancelled) setSubscriber(null);
          return;
        }

        if (!cancelled) setSubscriber(data as SubscriberProfile);
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    user,
    subscriber,
    isLoading,
    isAuthenticated: !!user,
  };
}
