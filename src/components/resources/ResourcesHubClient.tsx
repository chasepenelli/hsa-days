"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AmbientOrb } from "./AmbientOrb";

interface SupplementPreview {
  name: string;
  category: string;
  categoryColor: string;
  dose: string | null;
}

interface Profile {
  dogName: string | null;
  breed: string | null;
  weightLbs: number | null;
  cancerStage: string | null;
  weightBracketLabel: string | null;
}

interface HubProps {
  profile: Profile;
  supplementCount: number;
  categoryCount: number;
  topSupplements: SupplementPreview[];
  foodCounts: { recommended: number; avoid: number; appetite: number };
  principleCount: number;
  referenceCount: number;
  roomSections: { title: string; checklistCount: number }[];
  totalChecklist: number;
  totalProducts: number;
  quickWinTip: string;
}

function StatBadge({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.9375rem] font-medium"
      style={{
        background: "var(--cream)",
        color: "var(--text-muted)",
        border: "1px solid var(--border)",
      }}
    >
      {text}
    </span>
  );
}


export default function ResourcesHubClient({
  profile,
  supplementCount,
  categoryCount,
  topSupplements,
  foodCounts,
  principleCount,
  referenceCount,
  roomSections,
  totalChecklist,
  totalProducts,
  quickWinTip,
}: HubProps) {
  const sectionRef = useScrollReveal();

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-[100dvh] pb-16"
      style={{ background: "var(--warm-white)", position: "relative", overflow: "hidden" }}
    >
      <AmbientOrb top="5%" right="2%" size={300} color="rgba(196,162,101,0.12)" duration={14} />
      <AmbientOrb top="60%" left="0%" size={240} color="rgba(91,123,94,0.09)" duration={18} delay={5} />
      <AmbientOrb top="35%" right="8%" size={180} color="rgba(212,133,106,0.07)" duration={11} delay={9} />
      {/* Hero */}
      <div
        className="pt-24 pb-10 px-6"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-[1100px] mx-auto reveal">
          <div
            className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-3"
            style={{ color: "var(--gold-text)" }}
          >
            Resources
          </div>
          <h1
            className="font-serif font-semibold mb-4"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {profile.dogName
              ? `Everything for ${profile.dogName}\u2019s care.`
              : "Your care command center."}
          </h1>
          <p
            className="leading-relaxed max-w-[560px] mb-4"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.2rem)", color: "var(--text-muted)" }}
          >
            Supplements, nutrition, house-proofing, disease education,
            emergency preparedness, and financial help — researched and
            organized so you can focus on your dog.
          </p>
          <Link
            href="/resources/install"
            className="inline-flex items-center gap-2 text-[0.9375rem] no-underline hover:text-sage transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <rect
                x="3"
                y="1"
                width="10"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <line
                x1="6"
                y1="12"
                x2="10"
                y2="12"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            Add to your phone for quick access at the vet, even without wifi
          </Link>
        </div>
      </div>

      {/* Personalization Banner */}
      <div className="px-6">
        <div style={{ maxWidth: 1100 }} className="mx-auto">
          {profile.dogName &&
            (profile.weightLbs || profile.breed || profile.cancerStage) && (
              <div
                className="reveal mt-8 rounded-xl px-5 py-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(91,123,94,0.06) 0%, rgba(196,162,101,0.04) 100%)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] mb-2"
                  style={{ color: "var(--sage)" }}
                >
                  Tailored for {profile.dogName}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.weightLbs && (
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.75rem] font-medium"
                      style={{
                        background: "rgba(91,123,94,0.08)",
                        color: "var(--sage-dark)",
                      }}
                    >
                      {profile.weightLbs} lbs
                    </span>
                  )}
                  {profile.breed && (
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.75rem] font-medium"
                      style={{
                        background: "rgba(196,162,101,0.08)",
                        color: "var(--gold-text)",
                      }}
                    >
                      {profile.breed}
                    </span>
                  )}
                  {profile.cancerStage && (
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.75rem] font-medium"
                      style={{
                        background: "rgba(212,133,106,0.08)",
                        color: "var(--terracotta)",
                      }}
                    >
                      Stage {profile.cancerStage}
                    </span>
                  )}
                </div>
                {profile.weightBracketLabel ? (
                  <p
                    className="text-[0.82rem]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Dosages shown for {profile.weightBracketLabel}. Breed-specific
                    notes highlighted where relevant.
                  </p>
                ) : (
                  <p
                    className="text-[0.82rem]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Add {profile.dogName}&apos;s weight in your profile for
                    personalized dosages.
                  </p>
                )}
              </div>
            )}
        </div>
      </div>

      {/* ═══ Supplement Guide ═══ */}
      <div style={{ background: "rgba(91,123,94,0.04)" }}>
        <div className="px-6 py-16 sm:py-20">
          <div style={{ maxWidth: 960 }} className="mx-auto">
            <section className="reveal">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 mb-8">
                <div className="flex-1">
                  <div
                    className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: "var(--sage)" }}
                  >
                    Guide
                  </div>
                  <h2
                    className="font-serif font-semibold mb-4"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                      color: "var(--text)",
                      lineHeight: 1.25,
                    }}
                  >
                    Supplement Guide
                  </h2>
                  <p
                    className="text-[1rem] leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    The right supplements can support your dog through treatment.
                    We&apos;ve researched {supplementCount} options across{" "}
                    {categoryCount} categories — with weight-based dosing,
                    sourcing notes, and the studies behind each one.
                  </p>
                </div>
                <Image
                  src="/illustrations/icons/icon-supplement.png"
                  alt=""
                  width={140}
                  height={140}
                  className="flex-shrink-0 self-center sm:self-start hidden sm:block"
                  style={{
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    opacity: 0.85,
                  }}
                />
              </div>

              <div className="reveal-stagger space-y-2.5">
                {topSupplements.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between rounded-lg px-4 py-2.5"
                    style={{
                      background: "rgba(91,123,94,0.04)",
                      border: "1px solid rgba(91,123,94,0.08)",
                    }}
                  >
                    <div>
                      <span
                        className="text-[0.9rem] font-medium"
                        style={{ color: "var(--text)" }}
                      >
                        {s.name}
                      </span>
                      {s.dose && (
                        <span
                          className="text-[0.8rem] ml-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {s.dose}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[0.7rem] font-semibold uppercase tracking-wide rounded-full px-2.5 py-0.5"
                      style={{
                        color: s.categoryColor,
                        background: `${s.categoryColor}12`,
                      }}
                    >
                      {s.category}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/resources/supplements"
                className="group inline-flex items-center gap-2 mt-8 text-[1.0625rem] font-semibold no-underline transition-opacity hover:opacity-75"
                style={{ color: "var(--sage)" }}
              >
                Explore the full guide
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </section>
          </div>
        </div>
      </div>

      {/* ═══ What to Feed ═══ */}
      <div style={{ background: "var(--warm-white)" }}>
        <div className="px-6 py-16 sm:py-20">
          <div style={{ maxWidth: 960 }} className="mx-auto">
            <section className="reveal">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 mb-8">
                <div className="flex-1">
                  <div
                    className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: "var(--gold-text)" }}
                  >
                    Nutrition
                  </div>
                  <h2
                    className="font-serif font-semibold mb-4"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                      color: "var(--text)",
                      lineHeight: 1.25,
                    }}
                  >
                    What to Feed
                  </h2>
                  <p
                    className="text-[1rem] leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    What your dog eats during treatment matters more than you
                    might think. A cancer-fighting diet can help starve tumors
                    while keeping your dog strong — backed by{" "}
                    {referenceCount} published studies.
                  </p>
                </div>
                <Image
                  src="/illustrations/icons/icon-food-bowl.png"
                  alt=""
                  width={140}
                  height={140}
                  className="flex-shrink-0 self-center sm:self-start hidden sm:block"
                  style={{
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    opacity: 0.85,
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <div
                    className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] mb-3"
                    style={{ color: "var(--sage)" }}
                  >
                    Top Recommended
                  </div>
                  {["Fatty Fish", "Eggs", "Bone Broth"].map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-[0.9rem] mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="var(--sage)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
                <div>
                  <div
                    className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] mb-3"
                    style={{ color: "var(--gold-text)" }}
                  >
                    Appetite Boosters
                  </div>
                  {["Warm the food", "Bone broth toppers", "Hand-feeding"].map(
                    (f) => (
                      <div
                        key={f}
                        className="text-[0.9rem] mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {f}
                      </div>
                    )
                  )}
                </div>
                <div>
                  <div
                    className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] mb-3"
                    style={{ color: "var(--gold-text)" }}
                  >
                    Key Principle
                  </div>
                  <p
                    className="text-[0.9rem] leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Cancer cells feed on glucose. A high-protein, low-carb diet
                    can help starve them while nourishing your dog.
                  </p>
                </div>
              </div>

              <Link
                href="/resources/food"
                className="group inline-flex items-center gap-2 mt-8 text-[1.0625rem] font-semibold no-underline transition-opacity hover:opacity-75"
                style={{ color: "var(--gold-text)" }}
              >
                See the full nutrition guide
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </section>
          </div>
        </div>
      </div>

      {/* ═══ House-Proofing ═══ */}
      <div style={{ background: "rgba(196,162,101,0.04)" }}>
        <div className="px-6 py-16 sm:py-20">
          <div style={{ maxWidth: 960 }} className="mx-auto">
            <section className="reveal">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 mb-8">
                <div className="flex-1">
                  <div
                    className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: "var(--terracotta)" }}
                  >
                    Safety
                  </div>
                  <h2
                    className="font-serif font-semibold mb-4"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                      color: "var(--text)",
                      lineHeight: 1.25,
                    }}
                  >
                    House-Proofing
                  </h2>
                  <p
                    className="text-[1rem] leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Small changes at home can prevent big problems. Room by room,
                    here&apos;s how to make your space safer and more comfortable
                    — {totalChecklist} items across {roomSections.length} rooms,
                    with {totalProducts} product picks.
                  </p>
                </div>
                <Image
                  src="/illustrations/icons/icon-house.png"
                  alt=""
                  width={140}
                  height={140}
                  className="flex-shrink-0 self-center sm:self-start hidden sm:block"
                  style={{
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    opacity: 0.85,
                  }}
                />
              </div>

              <div className="reveal-stagger space-y-2.5 mb-6">
                {roomSections.slice(0, 3).map((room) => (
                  <div
                    key={room.title}
                    className="flex items-center justify-between rounded-lg px-4 py-2.5"
                    style={{
                      background: "rgba(196,162,101,0.04)",
                      border: "1px solid rgba(196,162,101,0.1)",
                    }}
                  >
                    <span
                      className="text-[0.9rem] font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      {room.title}
                    </span>
                    <span
                      className="text-[0.8rem]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {room.checklistCount} items
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="rounded-lg px-5 py-4"
                style={{
                  background: "rgba(212,133,106,0.04)",
                  border: "1px solid rgba(212,133,106,0.12)",
                }}
              >
                <div
                  className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] mb-1.5"
                  style={{ color: "var(--terracotta)" }}
                >
                  Quick win
                </div>
                <p
                  className="text-[0.9rem] leading-relaxed"
                  style={{ color: "var(--text)" }}
                >
                  {quickWinTip}
                </p>
              </div>

              <Link
                href="/resources/home"
                className="group inline-flex items-center gap-2 mt-8 text-[1.0625rem] font-semibold no-underline transition-opacity hover:opacity-75"
                style={{ color: "var(--terracotta)" }}
              >
                See the full checklist
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </section>
          </div>
        </div>
      </div>

      {/* ═══ Understanding HSA ═══ */}
      <div style={{ background: "var(--warm-white)" }}>
        <div className="px-6 py-16 sm:py-20">
          <div style={{ maxWidth: 960 }} className="mx-auto">
            <section className="reveal">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 mb-6">
                <div className="flex-1">
                  <div
                    className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: "var(--sage)" }}
                  >
                    Learn
                  </div>
                  <h2
                    className="font-serif font-semibold mb-4"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                      color: "var(--text)",
                      lineHeight: 1.25,
                    }}
                  >
                    Understanding HSA
                  </h2>
                  <p
                    className="text-[1rem] leading-relaxed mb-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    The hardest part is not knowing. This guide covers what
                    hemangiosarcoma is, how it&apos;s diagnosed, every treatment
                    path with realistic costs, breed-specific risks, current
                    research, and the questions to ask your oncologist.
                  </p>
                  <div className="reveal-stagger flex flex-wrap gap-2">
                    <StatBadge text="Disease overview" />
                    <StatBadge text="Treatment options" />
                    <StatBadge text="Breed risks" />
                    <StatBadge text="Clinical trials" />
                  </div>
                </div>
                <Image
                  src="/illustrations/icons/icon-lightbulb.png"
                  alt=""
                  width={130}
                  height={130}
                  className="flex-shrink-0 self-center sm:self-start hidden sm:block"
                  style={{
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    opacity: 0.85,
                  }}
                />
              </div>

              <Link
                href="/resources/understanding-hsa"
                className="group inline-flex items-center gap-2 mt-4 text-[1.0625rem] font-semibold no-underline transition-opacity hover:opacity-75"
                style={{ color: "var(--sage)" }}
              >
                Read the full guide
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </section>
          </div>
        </div>
      </div>

      {/* ═══ Emergency Preparedness ═══ */}
      <div style={{ background: "rgba(212,133,106,0.04)" }}>
        <div className="px-6 py-16 sm:py-20">
          <div style={{ maxWidth: 960 }} className="mx-auto">
            <section className="reveal">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 mb-6">
                <div className="flex-1">
                  <div
                    className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: "var(--terracotta)" }}
                  >
                    Be Ready
                  </div>
                  <h2
                    className="font-serif font-semibold mb-4"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                      color: "var(--text)",
                      lineHeight: 1.25,
                    }}
                  >
                    Emergency Preparedness
                  </h2>
                  <p
                    className="text-[1rem] leading-relaxed mb-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Knowing what to look for — and having a plan before you need
                    one — gives you the power to act fast when your dog needs you
                    most. This covers gum colors, emergency scenarios, kit
                    essentials, and the conversations to have with your vet now.
                  </p>
                  <div className="reveal-stagger flex flex-wrap gap-2">
                    <StatBadge text="Gum color guide" />
                    <StatBadge text="Emergency scenarios" />
                    <StatBadge text="Emergency kit" />
                  </div>
                </div>
                <Image
                  src="/illustrations/icons/icon-heart.png"
                  alt=""
                  width={130}
                  height={130}
                  className="flex-shrink-0 self-center sm:self-start hidden sm:block"
                  style={{
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    opacity: 0.85,
                  }}
                />
              </div>

              <Link
                href="/resources/emergency"
                className="group inline-flex items-center gap-2 mt-4 text-[1.0625rem] font-semibold no-underline transition-opacity hover:opacity-75"
                style={{ color: "var(--terracotta)" }}
              >
                Learn what to watch for
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </section>
          </div>
        </div>
      </div>

      {/* ═══ Financial Help ═══ */}
      <div style={{ background: "rgba(245,240,234,0.6)" }}>
        <div className="px-6 py-16 sm:py-20">
          <div style={{ maxWidth: 960 }} className="mx-auto">
            <section className="reveal">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10 mb-6">
                <div className="flex-1">
                  <div
                    className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: "var(--gold-text)" }}
                  >
                    Support
                  </div>
                  <h2
                    className="font-serif font-semibold mb-4"
                    style={{
                      fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                      color: "var(--text)",
                      lineHeight: 1.25,
                    }}
                  >
                    Financial Help
                  </h2>
                  <p
                    className="text-[1rem] leading-relaxed mb-5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Treatment shouldn&apos;t depend on your bank account. We&apos;ve
                    compiled every grant, financing option, and assistance
                    program we could find — with application tips to improve your
                    chances.
                  </p>
                  <div className="reveal-stagger flex flex-wrap gap-2">
                    <StatBadge text="7 grant programs" />
                    <StatBadge text="2 financing options" />
                    <StatBadge text="Application tips" />
                  </div>
                </div>
                <Image
                  src="/illustrations/icons/icon-star.png"
                  alt=""
                  width={130}
                  height={130}
                  className="flex-shrink-0 self-center sm:self-start hidden sm:block"
                  style={{
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    opacity: 0.85,
                  }}
                />
              </div>

              <Link
                href="/resources/financial-help"
                className="group inline-flex items-center gap-2 mt-4 text-[1.0625rem] font-semibold no-underline transition-opacity hover:opacity-75"
                style={{ color: "var(--gold-text)" }}
              >
                Find help
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </section>
          </div>
        </div>
      </div>

      {/* Closing beat */}
      <div className="px-6">
        <div style={{ maxWidth: 1100 }} className="mx-auto">
          <div className="reveal text-center mt-16 mb-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className="h-[1px] w-[48px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--gold-light))",
                }}
              />
              <Image
                src="/illustrations/icons/icon-flower-ornament.png"
                alt=""
                width={14}
                height={14}
                style={{ opacity: 0.5 }}
              />
              <div
                className="h-[1px] w-[48px]"
                style={{
                  background:
                    "linear-gradient(to left, transparent, var(--gold-light))",
                }}
              />
            </div>
            <p
              className="font-serif font-semibold"
              style={{
                fontSize: "clamp(1.15rem, 2.2vw, 1.4rem)",
                lineHeight: 1.4,
                color: "var(--text)",
              }}
            >
              You shouldn&apos;t have to be a researcher{" "}
              <em className="italic" style={{ color: "var(--sage)" }}>
                and a caregiver.
              </em>
            </p>
            <p
              className="mt-3 text-[0.88rem]"
              style={{ color: "var(--text-muted)" }}
            >
              We did the digging. You focus on your dog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
