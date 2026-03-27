import type { Supplement, SupplementCategory } from "./types";

export const SUPPLEMENT_CATEGORIES: SupplementCategory[] = [
  {
    key: "blood_support",
    label: "Blood Support",
    description:
      "Bleeding is one of the biggest concerns with HSA. These supplements help your dog's blood clot better and fight anemia — things that can make a real difference day to day.",
    accentColor: "var(--terracotta)",
  },
  {
    key: "anti_cancer",
    label: "Anti-Cancer / Anti-Tumor",
    description:
      "These are the supplements with actual research behind their ability to slow tumor growth or help the body fight cancer cells. Some have been studied specifically in HSA dogs.",
    accentColor: "var(--sage)",
  },
  {
    key: "immune_support",
    label: "Immune Support",
    description:
      "Cancer and chemo both take a toll on your dog's immune system. These supplements help build it back up so their body can keep fighting.",
    accentColor: "var(--gold)",
  },
  {
    key: "liver_organ",
    label: "Liver & Organ Support",
    description:
      "Chemo drugs, pain meds, and even other supplements all get processed through the liver. These help protect it — think of them as looking after the engine while it's working overtime.",
    accentColor: "var(--sage)",
  },
  {
    key: "quality_of_life",
    label: "Quality of Life",
    description:
      "Not everything is about fighting the cancer. These supplements help your dog feel more comfortable, have more energy, and just enjoy their days more.",
    accentColor: "var(--gold)",
  },
];

export const SUPPLEMENTS: Supplement[] = [
  // ── Blood Support ──
  {
    slug: "yunnan-baiyao",
    name: "Yunnan Baiyao",
    category: "blood_support",
    tagline: "The #1 thing most HSA families start with for bleeding",
    description:
      "This is a traditional Chinese herbal medicine that vets widely use to help control internal bleeding from HSA tumors. It helps your dog's blood clot faster, which can be a lifesaver when a tumor bleeds. Many oncologists consider it essential — you'll see it recommended in almost every HSA community.",
    dosage: {
      under25: "1 capsule, twice daily",
      "25to50": "1 capsule, twice daily",
      "50to75": "2 capsules, twice daily",
      over75: "2 capsules, twice daily",
    },
    frequency: "5 days on, 5 days off — save the red emergency pill for active bleeds",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Ask about the 5-on/5-off cycling schedule — this gives the liver a break",
      "Ask when to use the little red pill inside each box — it's only for active bleeding emergencies",
      "Mention any blood-thinning medications your dog is on",
    ],
    warnings: [
      "The red pill inside each box is ONLY for active bleeding — don't give it as part of the daily routine",
      "Stop giving it 5–7 days before any planned surgery",
      "Long-term use without cycling can stress the liver — stick to the on/off schedule",
      "Your vet may want to check liver enzymes periodically",
    ],
    breedNotes: {
      "golden retriever":
        "Golden Retrievers have a higher predisposition to HSA. Yunnan Baiyao is often started immediately at diagnosis.",
      "german shepherd":
        "German Shepherds are also at higher risk for HSA. Early supplementation is commonly recommended.",
    },
    sources: [
      "University of Pennsylvania School of Veterinary Medicine",
    ],
    priority: 1,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "iron-supplement",
    name: "Iron Supplement",
    category: "blood_support",
    tagline: "Helps rebuild red blood cells when anemia hits",
    description:
      "HSA dogs often become anemic from chronic blood loss — they look tired, their gums get pale, and they just don't have energy. Iron can help their body rebuild red blood cells. But here's the catch: you need bloodwork first. Some HSA dogs actually have too much iron already (the tumor stores it), and adding more could make things worse.",
    dosage: {
      under25: "5–10 mg/kg daily (roughly 50–100 mg for a 20 lb dog)",
      "25to50": "5–10 mg/kg daily (roughly 115–230 mg for a 50 lb dog)",
      "50to75": "5–10 mg/kg daily (roughly 170–340 mg for a 75 lb dog)",
      over75: "5–10 mg/kg daily (roughly 230–450 mg for a 100 lb dog)",
    },
    frequency: "Daily with food — keep it 2+ hours away from artemisinin",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Ask for a CBC and ferritin test first to make sure your dog actually needs iron",
      "Ask how often to recheck iron levels — too much is just as bad as too little",
      "Vitamin C helps iron absorb better if your dog is also taking that",
      "Keep iron and IP-6 at least 2 hours apart — IP-6 blocks iron absorption",
    ],
    warnings: [
      "Only give iron if bloodwork confirms your dog is truly iron-deficient — don't guess on this one",
      "Many splenic HSA dogs already have high iron levels — adding more could actually make things worse",
      "Too much iron damages the liver, so your vet needs to be involved here",
    ],
    priority: 3,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "vitamin-k",
    name: "Vitamin K",
    category: "blood_support",
    tagline: "Helps your dog's blood clot the way it should",
    description:
      "Vitamin K is what your dog's body uses to make clotting factors — the proteins that stop bleeding. If your HSA dog is having clotting problems, a little extra K can help support those pathways. These are gentle, nutritional-level doses. If your dog has a serious clotting crisis, your vet will use much higher therapeutic doses.",
    dosage: {
      under25: "1–2.5 mg daily",
      "25to50": "2.5–5 mg daily",
      "50to75": "5–10 mg daily",
      over75: "10–15 mg daily",
    },
    frequency: "Daily with a meal that has some fat (helps it absorb)",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Make sure you're getting K1 (phytonadione) — K2 doesn't help much with clotting",
      "If your dog has a clotting emergency, the vet dose is much higher and given by injection",
      "Ask about a coagulation panel before starting",
      "Mention any blood-thinning medications your dog is on",
    ],
    warnings: [
      "Never give Vitamin K by IV injection — it can cause a severe allergic reaction. Only oral or under-the-skin injections are safe",
    ],
    priority: 4,
    evidenceLevel: "veterinary-use",
  },

  // ── Anti-Cancer / Anti-Tumor ──
  {
    slug: "turkey-tail-mushroom",
    name: "Turkey Tail Mushroom (PSP)",
    category: "anti_cancer",
    tagline: "The one with an actual HSA study behind it",
    description:
      "This is probably the most talked-about supplement in the HSA world. A 2012 study at Penn Vet found that dogs with HSA taking Turkey Tail had a median survival of 199 days — which was really promising. A bigger 2022 follow-up study had more mixed results though: it didn't help much when added to chemo, and female dogs on Turkey Tail alone actually did worse. So it's not a miracle cure, but many families still use it, especially if their dog isn't doing chemo.",
    dosage: {
      under25: "1–2 g daily",
      "25to50": "2–4 g daily",
      "50to75": "4–6 g daily",
      over75: "6–8 g daily",
    },
    frequency: "Daily — you can split it between meals",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Mention both studies to your vet — the hopeful 2012 one and the more cautious 2022 follow-up",
      "The 2022 study found it was worse for female dogs when used alone — worth discussing",
      "The dose that was studied is 100mg per kg of body weight per day",
      "Make sure you're buying a quality extract, not just ground-up mushroom powder",
      "If your dog is on chemo, ask whether Turkey Tail makes sense alongside it",
    ],
    sources: [
      "Brown DC, Reetz J. Single agent polysaccharopeptide delays metastases and improves survival in naturally occurring hemangiosarcoma. Evid Based Complement Alternat Med. 2012.",
      "Gedney A et al. Randomized clinical trial of I'm-Yunity (PSP) with/without doxorubicin for splenic HSA. Vet Comp Oncol. 2022. PMID: 35442554.",
    ],
    priority: 1,
    evidenceLevel: "studied-in-hsa",
  },
  {
    slug: "artemisinin",
    name: "Artemisinin",
    category: "anti_cancer",
    tagline: "Targets cancer cells that are loaded with iron",
    description:
      "Artemisinin comes from a plant called sweet wormwood. Here's how it works in simple terms: cancer cells hoard iron, and artemisinin reacts with that iron to damage those cells. Think of it as a Trojan horse that exploits cancer's own greediness. The catch? You can't take it with iron supplements or food, because then it reacts with the wrong iron.",
    dosage: {
      under25: "50 mg daily",
      "25to50": "100 mg daily",
      "50to75": "150 mg daily",
      over75: "200 mg daily",
    },
    frequency: "On an empty stomach, at least 2 hours away from iron or food",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Keep it at least 2 hours away from iron supplements — this is really important",
      "Some vets recommend cycling it (11 days on, 3 days off) — ask about this",
      "Your vet may want to check liver enzymes now and then",
    ],
    warnings: [
      "Do NOT give near iron supplements — wait at least 2 hours between them",
      "Must be given on an empty stomach or it won't work well",
      "Can be hard on the liver over time — get periodic bloodwork",
      "Absorption by mouth is actually pretty poor — some vets are exploring other forms",
    ],
    priority: 2,
    evidenceLevel: "emerging",
  },
  {
    slug: "cbd-oil",
    name: "CBD Oil",
    category: "anti_cancer",
    tagline: "Helps with pain, appetite, and anxiety — may fight tumors too",
    description:
      "A lot of HSA families use CBD to help their dogs feel more comfortable — it can ease pain, boost appetite, and calm anxiety. There's also early research suggesting it might have some anti-tumor properties. The key is using a product made specifically for dogs, with no THC. Start with a low dose and work your way up.",
    dosage: {
      under25: "5–10 mg, twice daily",
      "25to50": "10–20 mg, twice daily",
      "50to75": "20–30 mg, twice daily",
      over75: "30–50 mg, twice daily",
    },
    frequency: "Twice daily — start low and slowly increase over 1–2 weeks",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Make sure you're using a THC-free, dog-specific product",
      "Start at the lowest dose and give it a week or two before increasing",
      "If your dog is on chemo, CBD can change how those drugs are processed — timing matters",
    ],
    warnings: [
      "Never use products with THC — it's toxic to dogs",
      "Quality is all over the place — look for third-party testing on the label",
      "If your dog is on chemo, talk to your oncologist about timing — CBD can affect drug levels",
    ],
    priority: 4,
    evidenceLevel: "emerging",
  },
  {
    slug: "ip6",
    name: "IP-6 (Inositol Hexaphosphate)",
    category: "anti_cancer",
    tagline: "A natural compound that may help starve tumors",
    description:
      "IP-6 is found naturally in grains and beans, and research suggests it might help slow cancer cell growth and cut off the blood supply that tumors need to grow. It's often taken with inositol (a B-vitamin relative) for a stronger effect. It needs to be taken on an empty stomach to work properly.",
    dosage: {
      under25: "400 mg daily",
      "25to50": "800 mg daily",
      "50to75": "1200 mg daily",
      over75: "1600 mg daily",
    },
    frequency: "Daily on an empty stomach, about 30 minutes before food",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Best on an empty stomach — food interferes with absorption",
      "Ask about combining it with inositol for a stronger effect",
      "IP-6 grabs onto minerals (iron, zinc, calcium) and blocks them — so spacing matters",
    ],
    warnings: [
      "Keep it 2+ hours away from iron supplements — IP-6 binds to iron and cancels it out",
      "In dogs who aren't eating well, the mineral-binding effect is a real concern — talk to your vet about monitoring",
    ],
    priority: 5,
    evidenceLevel: "emerging",
  },

  // ── Immune Support ──
  {
    slug: "reishi-mushroom",
    name: "Reishi Mushroom",
    category: "immune_support",
    tagline: "One of the most studied immune-boosting mushrooms",
    description:
      "Reishi is kind of the gold standard of medicinal mushrooms. It helps wake up the immune system so your dog's body can better recognize and attack cancer cells. It also fights inflammation and has some liver-protective benefits as a bonus. A lot of families pair it with Turkey Tail for a one-two punch.",
    dosage: {
      under25: "250–500 mg daily",
      "25to50": "500–1000 mg daily",
      "50to75": "1000–1500 mg daily",
      over75: "1500–2000 mg daily",
    },
    frequency: "Daily — you can split it between meals",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Works great alongside Turkey Tail if you want a multi-mushroom approach",
      "Look for hot-water extracted products — that's how you get the good stuff out",
      "Let your vet know if you notice any digestive changes when starting",
    ],
    warnings: [
      "Reishi can slightly thin the blood — mention it to your oncologist, especially if bleeding is a concern",
    ],
    priority: 2,
    evidenceLevel: "emerging",
  },
  {
    slug: "astragalus",
    name: "Astragalus",
    category: "immune_support",
    tagline: "An ancient immune booster used by integrative vets",
    description:
      "Astragalus is a root that's been used in Chinese medicine for centuries to strengthen the immune system. It helps boost white blood cell activity — basically giving your dog's natural defenses a pep talk. Some research suggests it can also help reduce the side effects of chemo, which is a nice bonus.",
    dosage: {
      under25: "250 mg daily",
      "25to50": "500 mg daily",
      "50to75": "750 mg daily",
      over75: "1000 mg daily",
    },
    frequency: "Daily with food",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "You may need to stop it before surgery — ask your vet about timing",
      "Works well alongside mushroom supplements",
    ],
    warnings: [
      "If your dog is on immunosuppressive drugs (like cyclosporine), astragalus works against them — don't combine without asking your vet",
    ],
    priority: 4,
    evidenceLevel: "emerging",
  },
  {
    slug: "vitamin-c",
    name: "Vitamin C (Ester-C)",
    category: "immune_support",
    tagline: "Extra antioxidant support when your dog needs it most",
    description:
      "Dogs actually make their own Vitamin C, but cancer and the stress of treatment can use it up faster than they can produce it. A little extra can help support the immune system and fight cell damage. Use the Ester-C form — it's much gentler on the stomach than regular Vitamin C.",
    dosage: {
      under25: "250 mg daily",
      "25to50": "500 mg daily",
      "50to75": "500–1000 mg daily",
      over75: "1000 mg daily",
    },
    frequency: "Daily with food — split into 2 doses if it causes loose stools",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Go with Ester-C to be easier on the tummy",
      "If stools get loose, just back off the dose a bit",
      "Ask your oncologist about timing around chemo days — it might interfere",
    ],
    warnings: [
      "Vitamin C can reduce how well certain chemo drugs work (especially doxorubicin) — skip it on chemo days",
      "It increases iron absorption, so keep that in mind if iron levels are already a concern",
    ],
    priority: 5,
    evidenceLevel: "emerging",
  },

  // ── Liver & Organ Support ──
  {
    slug: "milk-thistle",
    name: "Milk Thistle (Silymarin)",
    category: "liver_organ",
    tagline: "The go-to liver protector — especially during chemo",
    description:
      "If your dog is on chemo or any medications that are hard on the liver, milk thistle is probably the most important support supplement you can give. It's been clinically proven to help liver cells regenerate and protect against drug damage. You might see it sold as Denamarin (which combines it with SAMe) — that's a great option too, and it works at lower doses because of better absorption.",
    dosage: {
      under25: "50–150 mg daily (or follow Denamarin label)",
      "25to50": "150–300 mg daily (or follow Denamarin label)",
      "50to75": "300–500 mg daily (or follow Denamarin label)",
      over75: "500–800 mg daily (or follow Denamarin label)",
    },
    frequency: "Daily, ideally on an empty stomach for best absorption",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Especially important if your dog is getting chemo",
      "Denamarin (milk thistle + SAMe combo) is a popular vet-recommended option",
      "Ask about checking liver enzymes every few months during treatment",
      "If using standalone milk thistle, you'll need a higher dose than Denamarin to get the same effect",
    ],
    warnings: [
      "Can affect how the liver processes chemo drugs — ask your oncologist about timing relative to chemo days",
    ],
    breedNotes: {
      "labrador":
        "Labs are prone to liver issues — liver support is especially important during cancer treatment.",
    },
    sources: [
      "Denamarin clinical studies — Nutramax Laboratories",
    ],
    priority: 1,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "same",
    name: "SAMe (S-Adenosylmethionine)",
    category: "liver_organ",
    tagline: "Helps the liver heal and detox — the other half of Denamarin",
    description:
      "SAMe is a molecule your dog's body naturally makes to help the liver regenerate and flush out toxins. When the liver is working overtime (hello, cancer treatment), supplementing with extra SAMe gives it a boost. It's the other ingredient in Denamarin, alongside milk thistle, and they work really well together.",
    dosage: {
      under25: "90 mg daily",
      "25to50": "225 mg daily",
      "50to75": "400 mg daily",
      over75: "400–800 mg daily",
    },
    frequency: "Daily on an empty stomach — at least 1 hour before food",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Most people give it as part of Denamarin (combined with milk thistle)",
      "It really does need to be given on an empty stomach — food cuts absorption in half",
      "If it comes as a coated tablet, don't crush or split it",
    ],
    priority: 2,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "dandelion-root",
    name: "Dandelion Root",
    category: "liver_organ",
    tagline: "A gentle, natural way to support the liver and kidneys",
    description:
      "Dandelion root is a mild, well-tolerated supplement that helps support both the liver and kidneys. It encourages bile production (which helps digestion) and has a gentle diuretic effect. Think of it as a low-key helper that takes some of the load off organs that are working hard during treatment.",
    dosage: {
      under25: "250 mg daily",
      "25to50": "500 mg daily",
      "50to75": "750 mg daily",
      over75: "1000 mg daily",
    },
    frequency: "Daily with food",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "It can make your dog pee a little more — make sure they have plenty of water",
      "Works nicely alongside milk thistle for broader liver support",
      "Generally very gentle with few side effects",
    ],
    warnings: [
      "Not a good choice if your dog has a bile duct blockage or gallbladder problems",
      "If your dog is already on a water pill (like furosemide), the combined effect could be too much — check with your vet",
    ],
    priority: 5,
    evidenceLevel: "emerging",
  },

  // ── Quality of Life ──
  {
    slug: "omega-3",
    name: "Omega-3 Fish Oil (EPA/DHA)",
    category: "quality_of_life",
    tagline: "Fights inflammation and helps your dog hold weight",
    description:
      "Fish oil is one of the most universally recommended supplements for dogs with cancer. It fights inflammation, helps prevent the muscle wasting that cancer can cause, and supports overall well-being. A study in dogs with lymphoma showed it improved survival. When shopping, look for the EPA+DHA amount on the label — that's what matters, not the total fish oil amount.",
    dosage: {
      under25: "1000 mg EPA+DHA daily",
      "25to50": "2000 mg EPA+DHA daily",
      "50to75": "3000 mg EPA+DHA daily",
      over75: "4000 mg EPA+DHA daily",
    },
    frequency: "Daily with food — split into 2 doses if it's a large amount",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Look for EPA+DHA on the label — not just 'fish oil 1000mg' (that includes stuff you don't need)",
      "More EPA than DHA is better for fighting inflammation",
      "May need to pause 5–7 days before surgery since it can thin the blood slightly",
    ],
    breedNotes: {
      "golden retriever":
        "Goldens especially benefit from high-quality fish oil for both cancer support and their skin/coat health.",
    },
    priority: 1,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "turmeric-curcumin",
    name: "Turmeric / Curcumin",
    category: "quality_of_life",
    tagline: "A powerful natural anti-inflammatory — but it needs help to absorb",
    description:
      "Turmeric's active ingredient, curcumin, is a seriously impressive anti-inflammatory with potential anti-cancer benefits. The only problem? Your dog's body barely absorbs it on its own. You need to give it with black pepper extract (piperine) or mix it with fat. A lot of people make 'golden paste' at home — turmeric, coconut oil, and black pepper. Simple and effective.",
    dosage: {
      under25: "150–250 mg daily",
      "25to50": "250–500 mg daily",
      "50to75": "500–750 mg daily",
      over75: "750–1000 mg daily",
    },
    frequency: "Daily with a fatty meal for better absorption",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Make sure you're pairing it with piperine (black pepper) or giving it with fat",
      "Golden paste (turmeric + coconut oil + black pepper) is an easy DIY option",
      "If your dog is on chemo, ask about timing — it can interact with some drugs",
    ],
    warnings: [
      "Without piperine or fat, your dog's body won't absorb much of it — always pair it",
      "Both curcumin and piperine can affect how chemo drugs are processed — this can push drug levels too high",
      "If your dog is on chemo, ask about piperine-free forms (like liposomal curcumin) instead",
    ],
    priority: 2,
    evidenceLevel: "emerging",
  },
  {
    slug: "probiotics",
    name: "Probiotics",
    category: "quality_of_life",
    tagline: "Keeps the gut healthy — and that's where most of the immune system lives",
    description:
      "Cancer treatment can really mess with your dog's digestion. Probiotics help keep the good bacteria in the gut balanced, which matters more than you'd think — about 70–80% of your dog's immune system actually lives in the gut. If your dog is dealing with nausea, soft stools, or just not eating well, probiotics can make a real difference.",
    dosage: {
      under25: "1–5 billion CFU daily",
      "25to50": "5–10 billion CFU daily",
      "50to75": "10–20 billion CFU daily",
      over75: "20–30 billion CFU daily",
    },
    frequency: "Daily — keep 2 hours away from antibiotics if your dog is on them",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Dog-specific probiotic strains are better than human ones",
      "Extra important during and after any round of antibiotics",
      "Refrigerated probiotics tend to have more live, active cultures",
    ],
    warnings: [
      "If your dog's white blood cell count is very low from chemo, check with your oncologist first — live bacteria can be risky during severe immune suppression",
    ],
    priority: 3,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "coq10",
    name: "CoQ10 (Coenzyme Q10)",
    category: "quality_of_life",
    tagline: "Supports the heart — especially important for cardiac HSA",
    description:
      "CoQ10 helps your dog's cells produce energy and protects them from damage. It's especially relevant for HSA because the disease commonly affects the heart. If your dog has cardiac HSA, or if they're on doxorubicin (which can be hard on the heart), CoQ10 is a smart addition. Look for the ubiquinol form — it absorbs much better.",
    dosage: {
      under25: "30 mg daily",
      "25to50": "60 mg daily",
      "50to75": "100 mg daily",
      over75: "100–200 mg daily",
    },
    frequency: "Daily with a fatty meal for better absorption",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Especially worth considering if your dog has cardiac (heart-based) HSA",
      "The ubiquinol form absorbs way better than ubiquinone — read the label",
      "May help protect the heart from doxorubicin side effects",
    ],
    breedNotes: {
      "golden retriever":
        "With the high incidence of cardiac HSA in Golden Retrievers, CoQ10 heart support is particularly relevant.",
      "german shepherd":
        "German Shepherds are also prone to cardiac HSA — CoQ10 may provide additional heart protection.",
    },
    priority: 3,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "melatonin",
    name: "Melatonin",
    category: "quality_of_life",
    tagline: "Helps with sleep and anxiety — and may actually fight tumors too",
    description:
      "Most people know melatonin as a sleep aid, but it actually has some impressive anti-cancer properties as well — it can slow the growth of blood vessels that feed tumors and supports the immune system. On a practical level, it helps anxious dogs relax and sleep better through the stress of treatment. A lot of integrative oncology protocols include it specifically for HSA dogs.",
    dosage: {
      under25: "1–3 mg at bedtime",
      "25to50": "3–6 mg at bedtime",
      "50to75": "6–9 mg at bedtime",
      over75: "9–12 mg at bedtime",
    },
    frequency: "Once at bedtime — works with your dog's natural sleep cycle",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Very well-tolerated — the main side effect is sleepiness, which is kind of the point",
      "Some vets think it works even better alongside certain chemo protocols",
      "Use plain melatonin only — no added herbs or sweeteners",
    ],
    warnings: [
      "Always check the label — some human melatonin brands contain xylitol, which is deadly to dogs",
      "Mild drowsiness is normal and usually a good thing for anxious pups",
    ],
    priority: 4,
    evidenceLevel: "veterinary-use",
  },
];

// Priority-1 supplement from each category for the "Start Here" section
export const STARTER_SUPPLEMENTS = SUPPLEMENT_CATEGORIES.map((cat) => {
  const match = SUPPLEMENTS.filter((s) => s.category === cat.key).sort(
    (a, b) => a.priority - b.priority
  )[0];
  return match;
}).filter(Boolean);
