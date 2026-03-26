"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionDivider from "./SectionDivider";

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
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.72rem] font-medium"
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

function PanelHeader({
  eyebrow,
  eyebrowColor,
  title,
  icon,
  stats,
}: {
  eyebrow: string;
  eyebrowColor: string;
  title: string;
  icon: string;
  stats: string[];
}) {
  return (
    <div className="flex items-start gap-5 mb-5">
      <div className="relative flex-shrink-0 hidden sm:block">
        <Image
          src={icon}
          alt=""
          width={80}
          height={80}
          style={{ objectFit: "contain", mixBlendMode: "multiply" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] mb-1.5"
          style={{ color: eyebrowColor }}
        >
          {eyebrow}
        </div>
        <h2
          className="font-serif text-[1.25rem] font-semibold mb-3"
          style={{ color: "var(--text)", lineHeight: 1.3 }}
        >
          {title}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {stats.map((s) => (
            <StatBadge key={s} text={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelCTA({
  text,
  href,
  color,
}: {
  text: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 mt-5 text-[0.88rem] font-semibold no-underline transition-opacity hover:opacity-75"
      style={{ color }}
    >
      {text}
      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
        &rarr;
      </span>
    </Link>
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
      className="min-h-screen pb-16"
      style={{ background: "var(--warm-white)" }}
    >
      {/* Hero */}
      <div
        className="pt-24 pb-10 px-6"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-[1100px] mx-auto reveal">
          <div
            className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-3"
            style={{ color: "var(--gold-text)" }}
          >
            Resources
          </div>
          <h1
            className="font-serif font-semibold mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {profile.dogName
              ? `Everything for ${profile.dogName}\u2019s care.`
              : "Your care command center."}
          </h1>
          <p
            className="text-[1.02rem] leading-relaxed max-w-[560px] mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Supplements, nutrition, house-proofing, disease education,
            emergency preparedness, and financial help — researched and
            organized so you can focus on your dog.
          </p>
          <Link
            href="/resources/install"
            className="inline-flex items-center gap-2 text-[0.82rem] no-underline hover:text-sage transition-colors"
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

      <div className="px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Personalization Banner */}
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

          {/* ═══ Supplement Guide Panel ═══ */}
          <section className="reveal mt-10">
            <Link
              href="/resources/supplements"
              className="group block rounded-2xl p-6 no-underline transition-all duration-300"
              style={{
                background: "white",
                borderLeft: "3px solid var(--sage)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(91,123,94,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              <PanelHeader
                eyebrow="Guide"
                eyebrowColor="var(--sage)"
                title="Supplement Guide"
                icon="/illustrations/icons/icon-supplement.png"
                stats={[
                  `${supplementCount} supplements`,
                  `${categoryCount} categories`,
                  "Weight-based dosing",
                ]}
              />
              <div className="space-y-2 mb-1">
                {topSupplements.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{ background: "var(--cream)" }}
                  >
                    <div>
                      <span
                        className="text-[0.82rem] font-medium"
                        style={{ color: "var(--text)" }}
                      >
                        {s.name}
                      </span>
                      {s.dose && (
                        <span
                          className="text-[0.72rem] ml-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {s.dose}
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[0.62rem] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5"
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
              <PanelCTA
                text={`Browse all ${supplementCount} supplements`}
                href="/resources/supplements"
                color="var(--sage)"
              />
            </Link>
          </section>

          <SectionDivider />

          {/* ═══ What to Feed Panel ═══ */}
          <section className="reveal">
            <Link
              href="/resources/food"
              className="group block rounded-2xl p-6 no-underline transition-all duration-300"
              style={{
                background: "white",
                borderLeft: "3px solid var(--gold)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(196,162,101,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              <PanelHeader
                eyebrow="Guide"
                eyebrowColor="var(--gold-text)"
                title="What to Feed"
                icon="/illustrations/icons/icon-food-bowl.png"
                stats={[
                  `${foodCounts.recommended} recommended`,
                  `${foodCounts.avoid} to avoid`,
                  `${foodCounts.appetite} appetite tips`,
                ]}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-1">
                <div>
                  <div
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--sage)" }}
                  >
                    Top Recommended
                  </div>
                  {["Fatty Fish", "Eggs", "Bone Broth"].map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-[0.8rem] mb-1.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <svg
                        width="12"
                        height="12"
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
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--gold-text)" }}
                  >
                    Appetite Boosters
                  </div>
                  {["Warm the food", "Bone broth toppers", "Hand-feeding"].map(
                    (f) => (
                      <div
                        key={f}
                        className="text-[0.8rem] mb-1.5"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {f}
                      </div>
                    )
                  )}
                </div>
                <div>
                  <div
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--gold-text)" }}
                  >
                    Key Principle
                  </div>
                  <p
                    className="text-[0.8rem] leading-relaxed mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Cancer cells feed on glucose. A high-protein, low-carb diet
                    can help starve them while nourishing your dog.
                  </p>
                  <span
                    className="text-[0.7rem] font-medium"
                    style={{ color: "var(--sage)" }}
                  >
                    Backed by {referenceCount} published studies
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4">
                <PanelCTA
                  text="Explore nutrition guide"
                  href="/resources/food"
                  color="var(--gold-text)"
                />
                <span
                  className="text-[0.78rem]"
                  style={{ color: "var(--text-muted)", opacity: 0.6 }}
                >
                  Includes meal plan generator &amp; cancer diet science
                </span>
              </div>
            </Link>
          </section>

          <SectionDivider />

          {/* ═══ House-Proofing Panel ═══ */}
          <section className="reveal">
            <Link
              href="/resources/home"
              className="group block rounded-2xl p-6 no-underline transition-all duration-300"
              style={{
                background: "white",
                borderLeft: "3px solid var(--terracotta)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(212,133,106,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              <PanelHeader
                eyebrow="Checklist"
                eyebrowColor="var(--terracotta)"
                title="House-Proofing"
                icon="/illustrations/icons/icon-shield.png"
                stats={[
                  `${roomSections.length} rooms`,
                  `${totalChecklist} checklist items`,
                  `${totalProducts} product picks`,
                ]}
              />
              <div className="space-y-2 mb-3">
                {roomSections.slice(0, 3).map((room) => (
                  <div
                    key={room.title}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{ background: "var(--cream)" }}
                  >
                    <span
                      className="text-[0.82rem] font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      {room.title}
                    </span>
                    <span
                      className="text-[0.7rem]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {room.checklistCount} items
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="rounded-lg px-4 py-3"
                style={{
                  background: "rgba(212,133,106,0.04)",
                  border: "1px solid rgba(212,133,106,0.12)",
                }}
              >
                <div
                  className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] mb-1"
                  style={{ color: "var(--terracotta)" }}
                >
                  Quick win
                </div>
                <p
                  className="text-[0.82rem] leading-relaxed"
                  style={{ color: "var(--text)" }}
                >
                  {quickWinTip}
                </p>
              </div>
              <PanelCTA
                text="See full room-by-room checklist"
                href="/resources/home"
                color="var(--terracotta)"
              />
            </Link>
          </section>

          <SectionDivider />

          {/* ═══ Understanding HSA Panel ═══ */}
          <section className="reveal">
            <Link
              href="/resources/understanding-hsa"
              className="group block rounded-2xl p-6 no-underline transition-all duration-300"
              style={{
                background: "white",
                borderLeft: "3px solid var(--sage-dark, #4A6B4D)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(91,123,94,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              <div className="flex-1 min-w-0">
                <div
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] mb-1.5"
                  style={{ color: "var(--sage)" }}
                >
                  Learn
                </div>
                <h2
                  className="font-serif text-[1.25rem] font-semibold mb-3"
                  style={{ color: "var(--text)", lineHeight: 1.3 }}
                >
                  Understanding HSA
                </h2>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <StatBadge text="Disease overview" />
                  <StatBadge text="Treatment options" />
                  <StatBadge text="Breed risks" />
                  <StatBadge text="Clinical trials" />
                </div>
              </div>
              <p
                className="text-[0.88rem] leading-relaxed mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                What hemangiosarcoma is, how it&apos;s diagnosed, treatment paths with
                costs, breed-specific risks, current research breakthroughs, and
                the questions to ask your oncologist.
              </p>
              <PanelCTA
                text="Read the full guide"
                href="/resources/understanding-hsa"
                color="var(--sage)"
              />
            </Link>
          </section>

          <SectionDivider />

          {/* ═══ Emergency Preparedness Panel ═══ */}
          <section className="reveal">
            <Link
              href="/resources/emergency"
              className="group block rounded-2xl p-6 no-underline transition-all duration-300"
              style={{
                background: "white",
                borderLeft: "3px solid var(--terracotta)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(212,133,106,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              <div className="flex-1 min-w-0">
                <div
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] mb-1.5"
                  style={{ color: "var(--terracotta)" }}
                >
                  Safety
                </div>
                <h2
                  className="font-serif text-[1.25rem] font-semibold mb-3"
                  style={{ color: "var(--text)", lineHeight: 1.3 }}
                >
                  Emergency Preparedness
                </h2>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <StatBadge text="Gum color guide" />
                  <StatBadge text="Emergency scenarios" />
                  <StatBadge text="Emergency kit" />
                </div>
              </div>
              <p
                className="text-[0.88rem] leading-relaxed mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Know the signs of an HSA emergency, build your emergency kit,
                and have the critical conversations with your vet before you need
                the answers.
              </p>
              <PanelCTA
                text="Be prepared"
                href="/resources/emergency"
                color="var(--terracotta)"
              />
            </Link>
          </section>

          <SectionDivider />

          {/* ═══ Financial Help Panel ═══ */}
          <section className="reveal">
            <Link
              href="/resources/financial-help"
              className="group block rounded-2xl p-6 no-underline transition-all duration-300"
              style={{
                background: "white",
                borderLeft: "3px solid var(--gold)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(196,162,101,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              <div className="flex-1 min-w-0">
                <div
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] mb-1.5"
                  style={{ color: "var(--gold-text)" }}
                >
                  Support
                </div>
                <h2
                  className="font-serif text-[1.25rem] font-semibold mb-3"
                  style={{ color: "var(--text)", lineHeight: 1.3 }}
                >
                  Financial Help
                </h2>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <StatBadge text="7 grant programs" />
                  <StatBadge text="2 financing options" />
                  <StatBadge text="Application tips" />
                </div>
              </div>
              <p
                className="text-[0.88rem] leading-relaxed mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Grants, financing, and assistance programs to help cover HSA
                treatment costs. Nobody should have to give up on their dog
                because they can&apos;t afford care.
              </p>
              <PanelCTA
                text="Find help"
                href="/resources/financial-help"
                color="var(--gold-text)"
              />
            </Link>
          </section>

          {/* Closing beat */}
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
