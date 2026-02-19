export function CommunityStories() {
  const stories = [
    {
      avatar: "\uD83D\uDC36",
      quote:
        "Having a place to write about what I was feeling each day \u2014 and knowing it was just for me \u2014 gave me something to hold onto when everything felt out of control.",
      name: "Sarah M.",
      detail: "Beau, Golden Retriever",
    },
    {
      avatar: "\uD83D\uDC3E",
      quote:
        "The supplement guide alone saved me hours of research. But it was the daily reflections that really helped. Feeling like someone understood what I was going through made all the difference.",
      name: "Mike T.",
      detail: "Luna, German Shepherd",
    },
    {
      avatar: "\uD83E\uDDE1",
      quote:
        "I didn\u2019t want to \u2018make the most\u2019 of every day. I just wanted to stop crying long enough to enjoy the small stuff. HSA Days helped me get there, one day at a time.",
      name: "Jen K.",
      detail: "Rosie, Lab Mix",
    },
  ];

  return (
    <section id="community-section" className="py-[100px] px-6 bg-cream md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Community
        </div>
        <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
          Stories from the HSA family.
        </div>
        <p className="text-[1.05rem] text-text-muted max-w-[600px] leading-relaxed">
          Every dog is different. Every journey is different. But the love
          &mdash; that&apos;s the same.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[50px] md:grid md:overflow-visible overflow-x-auto snap-x snap-mandatory flex md:flex-none -mx-5 px-5 md:mx-0 md:px-0 pb-2 md:pb-0">
          {stories.map((story, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl px-7 py-8 border border-border transition-transform hover:-translate-y-[2px] md:min-w-0 min-w-[280px] snap-start shrink-0"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-light to-gold-light mb-4 flex items-center justify-center text-[1.3rem]">
                {story.avatar}
              </div>
              <blockquote className="text-[0.95rem] text-text-muted leading-relaxed italic mb-4">
                &ldquo;{story.quote}&rdquo;
              </blockquote>
              <div className="font-semibold text-[0.9rem] text-text">
                {story.name}
              </div>
              <div className="text-[0.8rem] text-text-muted">
                {story.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
