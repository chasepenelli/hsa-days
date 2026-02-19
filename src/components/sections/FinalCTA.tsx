import { SignupForm } from "@/components/forms/SignupForm";

export function FinalCTA() {
  return (
    <section
      id="signup"
      className="py-[100px] px-6 bg-gradient-to-br from-sage-dark to-sage text-white md:py-[100px] py-12 pb-[calc(48px+env(safe-area-inset-bottom))] md:pb-[100px]"
    >
      <div className="max-w-[1100px] mx-auto text-center">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold-light mb-3">
          Get Started
        </div>
        <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight text-white">
          Day 1 is ready when you are.
        </div>
        <p className="text-[1.05rem] text-white/80 max-w-[600px] mx-auto leading-relaxed mb-10">
          It&apos;s free. It&apos;s private. And it&apos;s built by someone
          who&apos;s been exactly where you are right now. Your dog needs you
          present &mdash; this helps you get there.
        </p>

        <SignupForm variant="dark" />

        <p className="text-[0.85rem] text-white/60 mt-5">
          No spam. No passwords. Just 30 days of real support.
        </p>
      </div>
    </section>
  );
}
