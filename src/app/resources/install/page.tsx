import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use HSA Days as an App",
  description:
    "Add HSA Days to your home screen for quick access, offline journaling, and a full-screen experience.",
};

function IPhoneIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="shrink-0"
    >
      <rect
        x="12"
        y="4"
        width="24"
        height="40"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="12"
        y1="12"
        x2="36"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="12"
        y1="36"
        x2="36"
        y2="36"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="24" cy="40" r="1.5" fill="currentColor" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="shrink-0"
    >
      <rect
        x="10"
        y="6"
        width="28"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="10"
        y1="12"
        x2="38"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="10"
        y1="36"
        x2="38"
        y2="36"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="20" y="38" width="8" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="shrink-0"
    >
      <rect
        x="4"
        y="6"
        width="40"
        height="28"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="4"
        y1="30"
        x2="44"
        y2="30"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="24"
        y1="34"
        x2="24"
        y2="38"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="16"
        y1="38"
        x2="32"
        y2="38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="inline-block align-text-bottom mx-0.5"
    >
      <path
        d="M10 2v10M10 2l3 3M10 2l-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 10v6a2 2 0 002 2h8a2 2 0 002-2v-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Step({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 rounded-full bg-sage text-white text-sm font-semibold flex items-center justify-center shrink-0 mt-0.5">
        {number}
      </div>
      <div className="text-[0.95rem] text-text leading-relaxed">{children}</div>
    </div>
  );
}

function PlatformSection({
  icon,
  title,
  children,
  borderColor,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  borderColor: string;
}) {
  return (
    <div
      className={`bg-white border border-border border-l-[3px] ${borderColor} rounded-2xl p-7 md:p-9`}
    >
      <div className="flex items-center gap-3 mb-6 text-text">
        {icon}
        <h2 className="font-serif text-[1.3rem] font-semibold">{title}</h2>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}

export default function InstallGuidePage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Resources
        </div>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-semibold text-text mb-4">
          Use HSA Days as an App
        </h1>
        <p className="text-[1.05rem] text-text-muted leading-relaxed mb-6">
          HSA Days works like a native app right from your browser — no app
          store needed. Add it to your home screen for quick access, offline
          journaling, and a full-screen experience.
        </p>

        {/* What you get */}
        <div className="bg-cream rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="font-serif text-[1.1rem] font-semibold text-text mb-4">
            What you get
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-sage text-lg mt-0.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 10l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-[0.9rem] font-medium text-text">
                  Home screen icon
                </p>
                <p className="text-[0.8rem] text-text-muted">
                  One tap to open, just like any app
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sage text-lg mt-0.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 10l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-[0.9rem] font-medium text-text">
                  Full-screen view
                </p>
                <p className="text-[0.8rem] text-text-muted">
                  No browser bars or distractions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-sage text-lg mt-0.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 10l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-[0.9rem] font-medium text-text">
                  Offline access
                </p>
                <p className="text-[0.8rem] text-text-muted">
                  Journal entries sync when you&apos;re back online
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform instructions */}
        <div className="flex flex-col gap-6 mb-12">
          {/* iPhone / iPad */}
          <PlatformSection
            icon={<IPhoneIcon />}
            title="iPhone & iPad"
            borderColor="border-l-sage"
          >
            <Step number={1}>
              Open{" "}
              <strong className="font-semibold">
                hsadays.com
              </strong>{" "}
              in <strong className="font-semibold">Safari</strong>. (This only
              works in Safari on iOS — not Chrome or other browsers.)
            </Step>
            <Step number={2}>
              Tap the{" "}
              <strong className="font-semibold">
                Share button
                <ShareIcon />
              </strong>{" "}
              at the bottom of the screen (the square with an arrow pointing
              up).
            </Step>
            <Step number={3}>
              Scroll down and tap{" "}
              <strong className="font-semibold">
                &ldquo;Add to Home Screen&rdquo;
              </strong>
              .
            </Step>
            <Step number={4}>
              Tap{" "}
              <strong className="font-semibold">&ldquo;Add&rdquo;</strong> in
              the top right. That&apos;s it — you&apos;ll see HSA Days on your
              home screen.
            </Step>
          </PlatformSection>

          {/* Android */}
          <PlatformSection
            icon={<AndroidIcon />}
            title="Android"
            borderColor="border-l-gold"
          >
            <Step number={1}>
              Open{" "}
              <strong className="font-semibold">
                hsadays.com
              </strong>{" "}
              in <strong className="font-semibold">Chrome</strong>.
            </Step>
            <Step number={2}>
              You may see a banner at the bottom saying{" "}
              <strong className="font-semibold">
                &ldquo;Add HSA Days to Home screen&rdquo;
              </strong>
              . If so, tap it and you&apos;re done.
            </Step>
            <Step number={3}>
              If no banner appears, tap the{" "}
              <strong className="font-semibold">three-dot menu</strong> (&#8942;)
              in the top right corner.
            </Step>
            <Step number={4}>
              Tap{" "}
              <strong className="font-semibold">
                &ldquo;Install app&rdquo;
              </strong>{" "}
              or{" "}
              <strong className="font-semibold">
                &ldquo;Add to Home screen&rdquo;
              </strong>
              , then confirm.
            </Step>
          </PlatformSection>

          {/* Desktop */}
          <PlatformSection
            icon={<DesktopIcon />}
            title="Desktop (Chrome or Edge)"
            borderColor="border-l-terracotta"
          >
            <Step number={1}>
              Open{" "}
              <strong className="font-semibold">
                hsadays.com
              </strong>{" "}
              in <strong className="font-semibold">Chrome</strong> or{" "}
              <strong className="font-semibold">Edge</strong>.
            </Step>
            <Step number={2}>
              Look for the{" "}
              <strong className="font-semibold">install icon</strong> in the
              address bar — it looks like a monitor with a down arrow, or a{" "}
              <strong className="font-semibold">+</strong> icon.
            </Step>
            <Step number={3}>
              Click it and confirm{" "}
              <strong className="font-semibold">
                &ldquo;Install&rdquo;
              </strong>
              . HSA Days will open in its own window and appear in your dock,
              taskbar, or app launcher.
            </Step>
          </PlatformSection>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-serif text-[1.3rem] font-semibold text-text mb-6">
            Common questions
          </h2>
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-[0.95rem] font-semibold text-text mb-1">
                Is this free?
              </h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed">
                Yes, completely. HSA Days is a free web app — there&apos;s
                nothing to purchase or subscribe to.
              </p>
            </div>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-text mb-1">
                Does it take up a lot of storage?
              </h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed">
                Very little. Unlike apps from the App Store or Play Store, web
                apps use minimal storage — typically less than a few megabytes.
              </p>
            </div>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-text mb-1">
                Do I need to create an account?
              </h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed">
                You can browse content without an account. To save journal
                entries and track your progress across devices, sign up with your
                email — it takes about 10 seconds.
              </p>
            </div>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-text mb-1">
                What about updates?
              </h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed">
                Web apps update automatically. Every time you open HSA Days,
                you&apos;re using the latest version — no manual updates needed.
              </p>
            </div>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-text mb-1">
                How do I remove it?
              </h3>
              <p className="text-[0.9rem] text-text-muted leading-relaxed">
                Same as any app — on iPhone or Android, long-press the icon and
                delete it. On desktop, right-click the icon or uninstall from
                your browser&apos;s app settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
