import type { Metadata } from "next";
import { NewForumPostForm } from "@/components/community/NewForumPostForm";

export const metadata: Metadata = {
  title: "Start a Thread",
  description: "Start a new conversation in the HSA Days community forum.",
};

export default function NewForumPostPage() {
  return (
    <div
      className="min-h-[100dvh]"
      style={{ background: "var(--cream)" }}
    >
      <div
        className="max-w-[640px] mx-auto px-6"
        style={{
          paddingTop: "clamp(96px, 12vw, 140px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <NewForumPostForm />
      </div>
    </div>
  );
}
