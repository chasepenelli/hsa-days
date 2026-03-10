"use client";

import { ChannelCard } from "./ChannelCard";

export interface Channel {
  slug: string;
  name: string;
  description: string;
  iconPath: string;
  color: "sage" | "gold" | "terracotta";
  lastMessage?: string;
}

interface ChannelGridProps {
  channels: Channel[];
  onlineCounts: Record<string, number>;
}

export function ChannelGrid({ channels, onlineCounts }: ChannelGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[700px] mx-auto">
      {channels.map((channel) => (
        <ChannelCard
          key={channel.slug}
          slug={channel.slug}
          name={channel.name}
          description={channel.description}
          iconPath={channel.iconPath}
          color={channel.color}
          onlineCount={onlineCounts[channel.slug] ?? 0}
          lastMessage={channel.lastMessage}
        />
      ))}
    </div>
  );
}
