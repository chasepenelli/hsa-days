"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CommunityTabs, type CommunityTab } from "./CommunityTabs";
import { StoriesGrid } from "./StoriesGrid";
import { ForumPostList } from "./ForumPostList";
import type { ForumPost } from "./ForumPostCard";

interface Story {
  id: string;
  dog_name: string;
  dog_breed: string | null;
  story_text: string;
  created_at: string;
}

interface CommunityHubProps {
  stories: Story[];
  forumPosts: ForumPost[];
}

/* ── Ambient floating orb ──────────────────── */
function Orb({
  top,
  left,
  size,
  color,
  duration,
  delay,
}: {
  top: string;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        top,
        left,
        width: size,
        height: size,
        background: color,
        filter: "blur(40px)",
        animationName: "gentleFloat",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        opacity: 0.55,
      }}
    />
  );
}

/* ── Tiny floating paw dot ─────────────────── */
function PawDot({
  style,
  delay,
}: {
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none hidden md:block"
      style={{
        ...style,
        animationName: "gentleFloat",
        animationDuration: `${6 + delay * 1.5}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        opacity: 0.18,
      }}
    >
      <Image
        src="/illustrations/icons/icon-paw-print.png"
        alt=""
        width={20}
        height={20}
        style={{ objectFit: "contain", filter: "grayscale(1)" }}
      />
    </div>
  );
}

/* ── Animated headline line ────────────────── */
function AnimatedLine({
  children,
  delay,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`block ${className}`}
      style={{
        animationName: "wordReveal",
        animationDuration: "0.9s",
        animationDelay: `${delay}s`,
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function CommunityHub({ stories, forumPosts }: CommunityHubProps) {
  const ref = useScrollReveal();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<CommunityTab>("forum");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* Ambient radial glow - centered breathing */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "18%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(91,123,94,0.07) 0%, transparent 70%)",
          animationName: "ambientGlow",
          animationDuration: "9s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: "1s",
        }}
      />
      {/* Ambient radial glow - bottom right accent */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "-6%",
          right: "-4%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,162,101,0.07) 0%, transparent 68%)",
        }}
      />

      {/* Background watermark illustration */}
      <div
        className="absolute pointer-events-none hidden md:block"
        aria-hidden="true"
        style={{
          top: "8%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "500px",
        }}
      >
        <Image
          src="/illustrations/icons/icon-community.png"
          alt=""
          fill
          sizes="500px"
          className="object-contain"
          style={{ opacity: 0.08, mixBlendMode: "multiply" }}
        />
      </div>

      {/* Paper grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <Orb top="12%" left="72%" size={280} color="rgba(196,162,101,0.16)" duration={14} delay={0} />
      <Orb top="55%" left="6%" size={220} color="rgba(91,123,94,0.12)" duration={18} delay={3} />

      {/* Floating paw dots */}
      {mounted && (
        <>
          <PawDot style={{ top: "16%", right: "10%" }} delay={0} />
          <PawDot style={{ top: "45%", left: "5%" }} delay={1.5} />
          <PawDot style={{ bottom: "30%", right: "7%" }} delay={2.8} />
        </>
      )}

      <div
        className="relative px-6"
        style={{
          paddingTop: "clamp(96px, 12vw, 140px)",
          paddingBottom: "clamp(16px, 3vw, 32px)",
        }}
      >
        <div className="max-w-[1100px] mx-auto">
          {/* ── Hero section ── */}
          <div className="text-center mb-8">
            {/* Community icon */}
            <div className="reveal flex justify-center mb-4">
              <Image
                src="/illustrations/icons/icon-community.png"
                alt=""
                width={80}
                height={80}
                style={{ objectFit: "contain", mixBlendMode: "multiply" }}
              />
            </div>

            {/* Eyebrow with flanking gold rules */}
            <div
              className="reveal inline-flex items-center gap-3 mb-6"
              style={{ color: "var(--gold)", transitionDelay: "0.12s" }}
            >
              <span
                style={{
                  display: "block",
                  width: "28px",
                  height: "1px",
                  background: "var(--gold)",
                  opacity: 0.5,
                }}
              />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                Community
              </span>
              <span
                style={{
                  display: "block",
                  width: "28px",
                  height: "1px",
                  background: "var(--gold)",
                  opacity: 0.5,
                }}
              />
            </div>

            {/* Main headline */}
            <h1
              className="font-serif font-semibold tracking-tight mb-6"
              style={{
                fontSize: "clamp(2.2rem, 4.8vw, 3.2rem)",
                lineHeight: 1.15,
                color: "var(--text)",
              }}
            >
              <AnimatedLine delay={0.3}>
                You&apos;re not the only one
              </AnimatedLine>
              <AnimatedLine
                delay={0.6}
                className="italic"
                style={{ color: "var(--sage)", marginTop: "0.1em" }}
              >
                who loves like this.
              </AnimatedLine>
            </h1>

            {/* Ornamental flower divider */}
            <div
              className="flex items-center justify-center gap-3 mb-6"
              style={{
                animationName: "fadeIn",
                animationDuration: "0.8s",
                animationDelay: "0.9s",
                animationFillMode: "both",
              }}
            >
              <div
                className="h-px"
                style={{
                  width: "48px",
                  background: "linear-gradient(to right, transparent, var(--gold))",
                  opacity: 0.6,
                }}
              />
              <Image
                src="/illustrations/icons/icon-flower-ornament.png"
                alt=""
                width={14}
                height={14}
                style={{ objectFit: "contain", opacity: 0.65 }}
              />
              <div
                className="h-px"
                style={{
                  width: "48px",
                  background: "linear-gradient(to left, transparent, var(--gold))",
                  opacity: 0.6,
                }}
              />
            </div>

            {/* Subtext */}
            <p
              className="reveal text-[1.05rem] leading-relaxed mx-auto mb-5"
              style={{
                color: "var(--text-muted)",
                maxWidth: "520px",
                transitionDelay: "0.55s",
              }}
            >
              Talk, share, and lean on families who understand.
            </p>

            {/* Trust signal */}
            {stories.length > 0 && (
              <p
                className="reveal font-serif italic text-[0.9rem] mb-4"
                style={{
                  color: "var(--text-muted)",
                  opacity: 0.65,
                  transitionDelay: "0.65s",
                }}
              >
                {stories.length} {stories.length === 1 ? "family has" : "families have"} shared from the heart
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Sticky tab bar ── */}
      <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Tab content ── */}
      <div
        className="relative px-6"
        style={{ paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <div className="max-w-[1100px] mx-auto pt-8">
          {/* Forum tab */}
          {activeTab === "forum" && (
            <div>
              {/* Start a Thread button */}
              <div className="flex justify-center mb-8">
                <Link
                  href="/community/forum/new"
                  className="inline-block px-7 py-3.5 bg-sage text-white rounded-xl font-semibold text-sm no-underline hover:bg-sage-dark transition-colors"
                >
                  Start a Thread
                </Link>
              </div>
              <ForumPostList posts={forumPosts} />
            </div>
          )}

          {/* Stories tab */}
          {activeTab === "stories" && (
            <div>
              {/* Share Your Story button */}
              <div className="flex justify-center mb-8">
                <Link
                  href="/community/share"
                  className="inline-block px-7 py-3.5 bg-sage text-white rounded-xl font-semibold text-sm no-underline hover:bg-sage-dark transition-colors"
                >
                  Share Your Story
                </Link>
              </div>
              <StoriesGrid stories={stories} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
