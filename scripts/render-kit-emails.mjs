/**
 * Renders all 30 daily drip emails as HTML files for pasting into Kit.
 * Usage: node --experimental-strip-types scripts/render-kit-emails.mjs
 */

import { render } from "@react-email/render";
import React from "react";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "docs", "kit-emails");
mkdirSync(outDir, { recursive: true });

// Dynamic import of the template (compiled via next's tsconfig)
const { DailyDripEmail } = await import("../src/emails/templates/daily-drip.tsx");

const days = [
  { day: 1, title: "The Word", quote: "The wound is the place where the Light enters you.", quoteAuthor: "Rumi", excerpt: "If you're reading this, you probably just heard a word you wish you never had to learn. Today isn't about having a plan. Today is about giving yourself permission to feel whatever you feel." },
  { day: 2, title: "The Morning After", quote: "Knowledge is love and light and vision.", quoteAuthor: "Helen Keller", excerpt: "Now that the initial shock is settling, you might want to understand what you're actually dealing with. Not to spiral — but to feel a little less powerless. Today we're building a foundation." },
  { day: 3, title: "The Rabbit Hole", quote: "In the middle of difficulty lies opportunity.", quoteAuthor: "Albert Einstein", excerpt: "Today is about understanding what's on the table — not making a final decision. Just knowing your options so you can think clearly. Your decision framework is waiting." },
  { day: 4, title: "The Good Day Kit", quote: "Vulnerability is not weakness; it's our greatest measure of courage.", quoteAuthor: "Brené Brown", excerpt: "At some point, you have to tell people. And that's its own kind of hard — because saying it out loud makes it real in a different way. Today is about sharing the news on your terms." },
  { day: 5, title: "What I Would Miss", quote: "Life is what happens when you're busy making other plans.", quoteAuthor: "John Lennon", excerpt: "The days after a diagnosis can feel shapeless. The old routine feels wrong, but you don't have a new one yet. Today we're building small anchors — simple structure that keeps both of you grounded." },
  { day: 6, title: "The Guilt", quote: "Take care of your body. It's the only place you have to live.", quoteAuthor: "Jim Rohn", excerpt: "You've probably already started Googling supplements. Turkey tail, Yunnan Baiyao, CBD... the internet is full of promises. Today we sort through what actually has evidence behind it." },
  { day: 7, title: "Small, Good Things", quote: "Almost everything will work again if you unplug it for a few minutes — including you.", quoteAuthor: "Anne Lamott", excerpt: "You've been at this for a week. Seven days of a reality you didn't choose. Today isn't about your dog's treatment plan — it's about checking in with the person behind it all. You." },
  { day: 8, title: "What the Days Look Like Now", quote: "Let food be thy medicine and medicine be thy food.", quoteAuthor: "Hippocrates", excerpt: "What your dog eats matters — maybe more now than ever. But the advice online is overwhelming. Today we simplify. The most important thing? That your dog is eating." },
  { day: 9, title: "The Photo Walk", quote: "You can't stop the waves, but you can learn to surf.", quoteAuthor: "Jon Kabat-Zinn", excerpt: "Some days your dog seems completely normal. Others, something feels off. This emotional whiplash is one of the hardest parts. Today is about finding beauty in the moments, not measuring the days." },
  { day: 10, title: "Choosing the Room", quote: "Home is not a place — it's a feeling.", quoteAuthor: "Cecelia Ahern", excerpt: "Your home might need some small adjustments now — not dramatic ones, just changes that make your dog's daily life easier and safer. Today we do a walk-through at their level." },
  { day: 11, title: "Telling People", quote: "Guilt is perhaps the most painful companion of death.", quoteAuthor: "Coco Chanel", excerpt: "Let's talk about the thing nobody warns you about: the guilt. Should I have caught this sooner? Am I doing enough? Today is about confronting those lies — because that's what they are." },
  { day: 12, title: "The First Follow-Up", quote: "We are not meant to do this alone.", quoteAuthor: "Glennon Doyle", excerpt: "You need people right now. Not just any people — the ones who get it. Today is about finding your people, wherever they might be. You don't have to do this alone." },
  { day: 13, title: "The Routine", quote: "Forever is composed of nows.", quoteAuthor: "Emily Dickinson", excerpt: "Your dog isn't thinking about their diagnosis. They're thinking about cheese and the mailman. They are fully, completely here. Today, try to join them — even just for five minutes." },
  { day: 14, title: "Two Weeks", quote: "Courage doesn't always roar. Sometimes it's the quiet voice at the end of the day saying 'I will try again tomorrow.'", quoteAuthor: "Mary Anne Radmacher", excerpt: "Two weeks. Fourteen days of holding something impossibly heavy while still doing laundry, going to work, and keeping it together. If you've made it here, you're stronger than you think." },
  { day: 15, title: "The Unsolicited Advice", quote: "It is not the length of life, but the depth.", quoteAuthor: "Ralph Waldo Emerson", excerpt: "A bucket list doesn't have to be dramatic or Instagram-worthy. It can be as simple as a new treat or letting them on the couch for the first time. Today — write their joy list." },
  { day: 16, title: "The Video", quote: "You do the best you can with what you have, and that is always enough.", quoteAuthor: "Unknown", excerpt: "Nobody wants to talk about this part. But money is a factor, and pretending it isn't doesn't help. Today we face the financial reality head on — because how much you spend does NOT equal how much you love." },
  { day: 17, title: "The Other Dogs", quote: "Animals are such agreeable friends — they ask no questions, they pass no criticisms.", quoteAuthor: "George Eliot", excerpt: "If you have other pets in the house, they've noticed. Animals are incredibly attuned to changes in routine and emotional atmosphere. Today — don't forget about them in the chaos." },
  { day: 18, title: "The Good Report", quote: "Anger is just sadness that's been holding its breath.", quoteAuthor: "Unknown", excerpt: "At some point, the sadness has a partner: anger. You might be furious at the universe, the vet, other people with healthy dogs. Today — permission to feel it all. Anger is the backside of love." },
  { day: 19, title: "The Thing You Can't Say Out Loud", quote: "Enjoy the little things, for one day you may look back and realize they were the big things.", quoteAuthor: "Robert Brault", excerpt: "The way your dog sighs when they settle into their bed. The ear twitch when you say their name. These aren't small things — they're everything. Today, start noticing them." },
  { day: 20, title: "Twenty Days of Defiance", quote: "Perhaps strength doesn't reside in having never been broken, but in the courage to grow strong in the broken places.", quoteAuthor: "Unknown", excerpt: "Twenty days. You're more than halfway through, and you're still here. Look back at Day 1 — terrified, lost. Look at where you are now. You might not feel like you've grown, but you have." },
  { day: 21, title: "The Community", quote: "Death ends a life, not a relationship.", quoteAuthor: "Mitch Albom", excerpt: "At some point, you need to think about the thing you've been avoiding. This might be the hardest day. But planning isn't giving up — it's one of the last, most loving things you can do." },
  { day: 22, title: "The Paw Print", quote: "Children are not things to be molded, but people to be unfolded.", quoteAuthor: "Jess Lair", excerpt: "If you have children, they're watching. They sense the sadness, the hushed conversations. Today is about helping little hearts through this — honestly and gently." },
  { day: 23, title: "The Slow Walk", quote: "To live in hearts we leave behind is not to die.", quoteAuthor: "Thomas Campbell", excerpt: "You have a camera in your pocket. Don't wait. Capture the everyday — the sleeping, the eating, the weird positions. These aren't sad photos. They're love letters to a life you shared." },
  { day: 24, title: "The Letter", quote: "The best doctor gives the least medicine.", quoteAuthor: "Benjamin Franklin", excerpt: "Your vet is your partner in this. And like any partnership, it works best with trust and communication. Today — make sure that relationship is working for you and your dog." },
  { day: 25, title: "The Bad Day", quote: "Caring for myself is not self-indulgence, it is self-preservation.", quoteAuthor: "Audre Lorde", excerpt: "You've been pouring everything into your dog for almost a month. But you can't keep pouring from an empty vessel. Self-care in crisis isn't selfish — it's survival." },
  { day: 26, title: "The Thing They Gave You", quote: "What we have once enjoyed deeply we can never lose. All that we love deeply becomes a part of us.", quoteAuthor: "Helen Keller", excerpt: "Your dog is teaching you something right now — in the way they still wag their tail, still get excited about dinner. They're showing you how to live without anticipation. That's their legacy." },
  { day: 27, title: "The Favorite Day", quote: "The best thing about the future is that it comes one day at a time.", quoteAuthor: "Abraham Lincoln", excerpt: "Today we talk about the things nobody wants to plan for. Not because it's time — but because having a plan removes one burden from the hardest day when it comes. This is love in logistics." },
  { day: 28, title: "The Conversation With Yourself", quote: "Grief, I've learned, is really just love. It's all the love you want to give but cannot.", quoteAuthor: "Jamie Anderson", excerpt: "Gratitude in grief isn't looking on the bright side. It's holding two truths at once: this is devastating, AND you got to love this deeply. Both things are true. Both matter." },
  { day: 29, title: "The Notebook So Far", quote: "No one is useless in this world who lightens the burdens of another.", quoteAuthor: "Charles Dickens", excerpt: "Tomorrow is Day 30. But today — look around. Thousands of families are going through exactly what you are, right now. You're part of a community. Reach out. You're not alone." },
  { day: 30, title: "What Comes Next", quote: "How lucky I am to have something that makes saying goodbye so hard.", quoteAuthor: "A.A. Milne (Winnie the Pooh)", excerpt: "You made it. Thirty days. Whether your dog is still here or has crossed the rainbow bridge, you showed up. Every single day. This isn't an ending — it's a transition. And you were always enough." },
];

console.log("Rendering 30 daily drip emails...\n");

for (const d of days) {
  const element = React.createElement(DailyDripEmail, {
    day: d.day,
    title: d.title,
    quote: d.quote,
    quoteAuthor: d.quoteAuthor,
    bodyParagraphs: [d.excerpt],
  });

  const html = await render(element);
  const filename = `day-${String(d.day).padStart(2, "0")}.html`;
  writeFileSync(join(outDir, filename), html);
  console.log(`  ✓ ${filename} — Subject: "Day ${d.day}: ${d.title}"`);
}

console.log(`\nDone! All 30 emails saved to docs/kit-emails/`);
console.log(`Open each .html file in a browser to preview, then paste the HTML into Kit's sequence editor.`);
