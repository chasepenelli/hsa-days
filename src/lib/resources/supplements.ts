import type { Supplement, SupplementCategory } from "./types";

export const SUPPLEMENT_CATEGORIES: SupplementCategory[] = [
  {
    key: "blood_support",
    label: "Blood Support",
    description:
      "Critical for HSA — these supplements help manage bleeding risk, support clotting, and address anemia.",
    accentColor: "var(--terracotta)",
  },
  {
    key: "anti_cancer",
    label: "Anti-Cancer / Anti-Tumor",
    description:
      "Supplements with published research on anti-tumor properties, immune-mediated cancer cell death, or slowing tumor growth.",
    accentColor: "var(--sage)",
  },
  {
    key: "immune_support",
    label: "Immune Support",
    description:
      "Help strengthen your dog's immune system to better fight cancer and recover from treatment.",
    accentColor: "var(--gold)",
  },
  {
    key: "liver_organ",
    label: "Liver & Organ Support",
    description:
      "Protect vital organs during treatment. Especially important if your dog is receiving chemotherapy.",
    accentColor: "var(--sage)",
  },
  {
    key: "quality_of_life",
    label: "Quality of Life",
    description:
      "Anti-inflammatory, energy, and comfort supplements that help your dog feel their best each day.",
    accentColor: "var(--gold)",
  },
];

export const SUPPLEMENTS: Supplement[] = [
  // ── Blood Support ──
  {
    slug: "yunnan-baiyao",
    name: "Yunnan Baiyao",
    category: "blood_support",
    tagline: "Emergency bleeding control for HSA dogs",
    description:
      "A traditional Chinese herbal medicine widely used by veterinary oncologists to help control internal bleeding from hemangiosarcoma tumors. It promotes platelet aggregation and has been shown to help slow bleeding episodes. Many vets consider it essential for HSA management.",
    dosage: {
      under25: "1 capsule, twice daily",
      "25to50": "1 capsule, twice daily",
      "50to75": "2 capsules, twice daily",
      over75: "2 capsules, twice daily",
    },
    frequency: "Cycle: 5 days on, 5 days off (skip the red emergency pill unless active bleed)",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Discuss the 5-on/5-off cycling protocol — this protects the liver during long-term use",
      "Ask about the red emergency pill — when and how to use it",
      "May interact with other blood-thinning medications",
    ],
    warnings: [
      "Do NOT give the red emergency pill unless there is an active bleeding episode",
      "Discontinue 5–7 days before any planned surgery",
      "Can elevate liver enzymes with continuous use — do not use in dogs with known liver disease",
      "Periodic liver panel (ALT/AST) recommended during extended use",
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
    tagline: "Supports red blood cell production for anemia",
    description:
      "HSA dogs frequently develop anemia from chronic blood loss. Iron supplementation can help support red blood cell production. Always confirm with bloodwork — excess iron can be harmful, and many HSA dogs actually have elevated iron at the tumor level.",
    dosage: {
      under25: "5–10 mg/kg daily (e.g., ~50–100 mg for a 20 lb dog)",
      "25to50": "5–10 mg/kg daily (e.g., ~115–230 mg for a 50 lb dog)",
      "50to75": "5–10 mg/kg daily (e.g., ~170–340 mg for a 75 lb dog)",
      over75: "5–10 mg/kg daily (e.g., ~230–450 mg for a 100 lb dog)",
    },
    frequency: "Daily with food for better absorption. Separate from artemisinin by 2+ hours",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Get baseline bloodwork (CBC and serum ferritin) to confirm true iron-deficiency anemia before starting",
      "Monitor iron levels — over-supplementation can cause toxicity (toxic above ~20 mg/kg elemental iron)",
      "Vitamin C can improve iron absorption",
      "Separate from IP-6 by 2+ hours — IP-6 chelates iron and blocks absorption",
    ],
    warnings: [
      "Only supplement if bloodwork confirms true iron-deficiency anemia — not anemia of chronic disease",
      "Splenic HSA dogs often have elevated serum ferritin (hyperferritinemia) — iron supplementation in already iron-overloaded dogs could worsen outcomes",
      "Too much iron can damage the liver — toxic doses begin at ~20 mg/kg elemental iron",
    ],
    priority: 3,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "vitamin-k",
    name: "Vitamin K",
    category: "blood_support",
    tagline: "Supports blood clotting pathways",
    description:
      "Vitamin K is essential for the production of clotting factors. In HSA dogs experiencing clotting issues, supplementation may help support the body's coagulation pathways. Note: these are nutritional-support doses — therapeutic doses for acute clotting disorders are much higher and require veterinary supervision.",
    dosage: {
      under25: "1–2.5 mg daily (nutritional support)",
      "25to50": "2.5–5 mg daily (nutritional support)",
      "50to75": "5–10 mg daily (nutritional support)",
      over75: "10–15 mg daily (nutritional support)",
    },
    frequency: "Daily with a fatty meal for absorption",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Vitamin K1 (phytonadione) is the therapeutic form for clotting support — K2 (menaquinone) has minimal effect on acute clotting disorders",
      "For acute coagulation crises, therapeutic K1 dosing (1–2.5 mg/kg orally or subcutaneously) requires vet supervision",
      "Check coagulation panel before starting",
      "May interact with blood-thinning medications",
    ],
    warnings: [
      "IV administration of Vitamin K1 can cause anaphylaxis — only oral or subcutaneous routes should be used",
    ],
    priority: 4,
    evidenceLevel: "veterinary-use",
  },

  // ── Anti-Cancer / Anti-Tumor ──
  {
    slug: "turkey-tail-mushroom",
    name: "Turkey Tail Mushroom (PSP)",
    category: "anti_cancer",
    tagline: "Penn Vet study showed 199-day median survival",
    description:
      "Trametes versicolor (Turkey Tail) mushroom contains polysaccharopeptide (PSP), which showed promising results in a 2012 Penn Vet pilot study. Dogs with HSA taking PSP at 100mg/kg/day had a median survival time of 199 days (n=5 per group). Important context: a larger 2022 follow-up study (Gedney et al.) found that PSP did not improve survival when added to doxorubicin, and female dogs on PSP alone had significantly worse outcomes. PSP may be most useful for dogs not receiving chemotherapy.",
    dosage: {
      under25: "1-2 g daily (100mg/kg)",
      "25to50": "2-4 g daily (100mg/kg)",
      "50to75": "4-6 g daily (100mg/kg)",
      over75: "6-8 g daily (100mg/kg)",
    },
    frequency: "Daily, can be split between meals",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Reference both the 2012 pilot study (promising) and the 2022 follow-up (more nuanced results)",
      "The 2022 study found PSP alone was significantly worse for female dogs — discuss implications",
      "Dose at 100mg/kg/day for the studied benefit",
      "Ensure you use a high-quality extract standardized for PSP content",
      "May be most beneficial for dogs not on chemotherapy — discuss timing with oncologist",
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
    tagline: "Iron-dependent anti-tumor properties",
    description:
      "Derived from sweet wormwood (Artemisia annua), artemisinin has been studied for its anti-cancer properties. It reacts with iron in cancer cells (which accumulate more iron than normal cells) to generate free radicals that damage the tumor. It should not be taken at the same time as iron supplements.",
    dosage: {
      under25: "50 mg daily",
      "25to50": "100 mg daily",
      "50to75": "150 mg daily",
      over75: "200 mg daily",
    },
    frequency: "Give on an empty stomach, 2+ hours away from iron or food",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Must be given separately from iron supplements (2+ hours apart)",
      "Discuss cycling protocols — some vets recommend 11 days on / 3 days off",
      "Liver enzymes should be monitored periodically",
    ],
    warnings: [
      "Do NOT give with iron supplements — separate by at least 2 hours",
      "Give on empty stomach for effectiveness",
      "Monitor liver enzymes during use",
      "Oral bioavailability is poor — a 2014 study found plasma levels remained below therapeutic threshold regardless of dose. Parenteral forms may be more effective",
    ],
    priority: 2,
    evidenceLevel: "emerging",
  },
  {
    slug: "cbd-oil",
    name: "CBD Oil",
    category: "anti_cancer",
    tagline: "Anti-inflammatory with emerging anti-tumor research",
    description:
      "Cannabidiol (CBD) has shown anti-inflammatory and potential anti-tumor properties in preliminary studies. It may help with pain management, appetite stimulation, and reducing anxiety. Use veterinary-grade products specifically formulated for dogs.",
    dosage: {
      under25: "5-10 mg, twice daily",
      "25to50": "10-20 mg, twice daily",
      "50to75": "20-30 mg, twice daily",
      over75: "30-50 mg, twice daily",
    },
    frequency: "Twice daily, start low and gradually increase",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Use only THC-free, veterinary-formulated CBD products",
      "Start at lowest dose and increase gradually over 1-2 weeks",
      "CBD inhibits CYP2C and CYP3A enzymes — can increase blood levels of chemo drugs including doxorubicin, vincristine, and cyclophosphamide",
    ],
    warnings: [
      "Avoid products with THC — it is toxic to dogs",
      "Quality varies widely — choose third-party tested products",
      "Discuss timing with oncologist if your dog is on chemotherapy — CBD can alter how chemo drugs are metabolized",
    ],
    priority: 4,
    evidenceLevel: "emerging",
  },
  {
    slug: "ip6",
    name: "IP-6 (Inositol Hexaphosphate)",
    category: "anti_cancer",
    tagline: "Natural compound that may inhibit tumor growth",
    description:
      "IP-6 is a naturally occurring compound found in grains and legumes. Research suggests it may help inhibit cancer cell growth, enhance immune function, and reduce tumor angiogenesis (blood supply to tumors). Often combined with inositol for enhanced effect.",
    dosage: {
      under25: "400 mg daily",
      "25to50": "800 mg daily",
      "50to75": "1200 mg daily",
      over75: "1600 mg daily",
    },
    frequency: "Daily on an empty stomach, 30 min before food",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Best given on empty stomach for absorption",
      "Often combined with inositol for synergistic effect",
      "IP-6 is a potent mineral chelator — it binds zinc, calcium, magnesium, and iron, reducing absorption from food",
    ],
    warnings: [
      "Separate from iron supplements by 2+ hours — IP-6 chelates iron",
      "In nutritionally compromised cancer patients, mineral depletion is a real concern — monitor with bloodwork",
    ],
    priority: 5,
    evidenceLevel: "emerging",
  },

  // ── Immune Support ──
  {
    slug: "reishi-mushroom",
    name: "Reishi Mushroom",
    category: "immune_support",
    tagline: "Immune modulation and anti-inflammatory",
    description:
      "Ganoderma lucidum (Reishi) is one of the most studied medicinal mushrooms. It contains beta-glucans and triterpenes that modulate the immune system, potentially helping the body recognize and fight cancer cells. It also has anti-inflammatory and liver-protective properties.",
    dosage: {
      under25: "250-500 mg daily",
      "25to50": "500-1000 mg daily",
      "50to75": "1000-1500 mg daily",
      over75: "1500-2000 mg daily",
    },
    frequency: "Daily, can be split between meals",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Can be combined with Turkey Tail for a multi-mushroom approach",
      "Choose hot-water extracted products for bioavailability",
      "Monitor for any digestive changes when starting",
    ],
    warnings: [
      "Reishi can mildly inhibit platelet aggregation — discuss with oncologist for HSA dogs at active bleeding risk",
    ],
    priority: 2,
    evidenceLevel: "emerging",
  },
  {
    slug: "astragalus",
    name: "Astragalus",
    category: "immune_support",
    tagline: "Traditional immune booster used in integrative oncology",
    description:
      "Astragalus membranaceus is a root used in traditional Chinese medicine for immune support. It has been studied for its ability to enhance white blood cell activity and support immune function during cancer treatment. Some research suggests it may help reduce side effects of chemotherapy.",
    dosage: {
      under25: "250 mg daily",
      "25to50": "500 mg daily",
      "50to75": "750 mg daily",
      over75: "1000 mg daily",
    },
    frequency: "Daily with food",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "May need to discontinue before surgery",
      "Can be used alongside mushroom supplements",
    ],
    warnings: [
      "Contraindicated with immunosuppressive drugs (cyclosporine, azathioprine) — astragalus directly counteracts their effect through immune stimulation",
    ],
    priority: 4,
    evidenceLevel: "emerging",
  },
  {
    slug: "vitamin-c",
    name: "Vitamin C (Ester-C)",
    category: "immune_support",
    tagline: "Antioxidant support — use Ester-C form for dogs",
    description:
      "While dogs produce their own Vitamin C, cancer and stress can increase demand. Supplemental Vitamin C acts as an antioxidant and may support immune function. Use Ester-C (calcium ascorbate) as it is gentler on the stomach than ascorbic acid.",
    dosage: {
      under25: "250 mg daily",
      "25to50": "500 mg daily",
      "50to75": "500-1000 mg daily",
      over75: "1000 mg daily",
    },
    frequency: "Daily with food, split into 2 doses if GI upset occurs",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Use Ester-C form to avoid stomach upset",
      "High doses may cause loose stools — reduce if this occurs",
      "Discuss timing relative to chemotherapy sessions",
    ],
    warnings: [
      "Oral Vitamin C acts as an antioxidant and may reduce the effectiveness of chemo drugs that work via oxidative damage (e.g., doxorubicin) — pause on chemo days",
      "Vitamin C increases iron absorption — relevant if your dog is on iron supplements or has elevated ferritin",
    ],
    priority: 5,
    evidenceLevel: "emerging",
  },

  // ── Liver & Organ Support ──
  {
    slug: "milk-thistle",
    name: "Milk Thistle (Silymarin)",
    category: "liver_organ",
    tagline: "Clinically proven liver protection during chemo",
    description:
      "Silymarin, the active compound in milk thistle, is one of the most well-researched liver protectants. The Denamarin studies confirmed its ability to support liver cell regeneration and protect against drug-induced liver damage. Essential if your dog is on chemotherapy or other liver-metabolized medications. Note: enhanced bioavailability formulations (like Denamarin) are effective at lower doses than standard silymarin extract.",
    dosage: {
      under25: "50-150 mg daily (standard extract) or per Denamarin label",
      "25to50": "150-300 mg daily (standard extract) or per Denamarin label",
      "50to75": "300-500 mg daily (standard extract) or per Denamarin label",
      over75: "500-800 mg daily (standard extract) or per Denamarin label",
    },
    frequency: "Daily, ideally on an empty stomach for best absorption",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Particularly important during chemotherapy protocols",
      "Can be given as Denamarin (combined with SAMe) or standalone",
      "Monitor liver enzymes quarterly during treatment",
      "Standard silymarin extract requires higher doses than bioenhanced formulations (Denamarin/Marin) for equivalent effect",
    ],
    warnings: [
      "Silymarin inhibits CYP2C9 and CYP3A4 enzymes — may alter metabolism of chemotherapy drugs including doxorubicin. Discuss timing with your oncologist",
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
    tagline: "Liver cell regeneration and detoxification",
    description:
      "SAMe is a naturally occurring molecule that supports liver cell regeneration, acts as an antioxidant within the liver, and aids in detoxification pathways. It is the other active ingredient in Denamarin and works synergistically with milk thistle.",
    dosage: {
      under25: "90 mg daily",
      "25to50": "225 mg daily",
      "50to75": "400 mg daily",
      over75: "400-800 mg daily",
    },
    frequency: "Daily on an empty stomach (1 hour before food)",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Often given as part of Denamarin (combined with milk thistle)",
      "Must be given on empty stomach — food reduces absorption by 50%+",
      "Enteric-coated tablets should not be crushed or split",
    ],
    priority: 2,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "dandelion-root",
    name: "Dandelion Root",
    category: "liver_organ",
    tagline: "Gentle liver and kidney support",
    description:
      "Dandelion root has been used traditionally as a gentle liver and kidney tonic. It may help support bile production, aid digestion, and provide mild diuretic effects. It can be a good complementary supplement for dogs whose organs are under stress from treatment.",
    dosage: {
      under25: "250 mg daily",
      "25to50": "500 mg daily",
      "50to75": "750 mg daily",
      over75: "1000 mg daily",
    },
    frequency: "Daily with food",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Has mild diuretic properties — ensure adequate water intake",
      "Can complement milk thistle for broader liver support",
      "Generally well-tolerated with minimal side effects",
    ],
    warnings: [
      "Contraindicated in dogs with bile duct obstruction or acute gallbladder disease",
      "Use cautiously alongside diuretic medications (e.g., furosemide) — additive diuresis risk",
    ],
    priority: 5,
    evidenceLevel: "emerging",
  },

  // ── Quality of Life ──
  {
    slug: "omega-3",
    name: "Omega-3 Fish Oil (EPA/DHA)",
    category: "quality_of_life",
    tagline: "Anti-inflammatory essential fatty acids",
    description:
      "Omega-3 fatty acids (EPA and DHA) from fish oil have strong anti-inflammatory properties and are one of the most recommended supplements for cancer dogs. A study in dogs with lymphoma showed improved survival with fish oil supplementation. They may help reduce cancer-related cachexia (wasting) and improve overall quality of life.",
    dosage: {
      under25: "1000 mg EPA+DHA daily",
      "25to50": "2000 mg EPA+DHA daily",
      "50to75": "3000 mg EPA+DHA daily",
      over75: "4000 mg EPA+DHA daily",
    },
    frequency: "Daily with food (split into 2 doses for large amounts)",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Look for products listing EPA+DHA content (not just total fish oil)",
      "Higher EPA ratio is preferred for anti-inflammatory benefit",
      "May need to stop 5-7 days before surgery (mild blood-thinning effect)",
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
    tagline: "Powerful anti-inflammatory — give with piperine for absorption",
    description:
      "Curcumin, the active compound in turmeric, has well-documented anti-inflammatory and antioxidant properties. Studies suggest it may help inhibit cancer cell growth and reduce inflammation. It has very poor bioavailability alone — always give with piperine (black pepper extract) or a fat source to improve absorption.",
    dosage: {
      under25: "150-250 mg daily",
      "25to50": "250-500 mg daily",
      "50to75": "500-750 mg daily",
      over75: "750-1000 mg daily",
    },
    frequency: "Daily with food (fatty meal improves absorption)",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Must include piperine or be a bioavailable formulation",
      "Golden paste (turmeric + coconut oil + black pepper) is a popular DIY option",
      "May interfere with certain chemotherapy drugs — discuss timing",
    ],
    warnings: [
      "Poor absorption without piperine/fat — always pair for effectiveness",
      "Curcumin and piperine both inhibit CYP450 enzymes (CYP1A2, CYP2C9, CYP3A4) — this can increase doxorubicin exposure to potentially toxic levels",
      "Use piperine-free formulations (liposomal, BCM-95) during active chemotherapy",
    ],
    priority: 2,
    evidenceLevel: "emerging",
  },
  {
    slug: "probiotics",
    name: "Probiotics",
    category: "quality_of_life",
    tagline: "Gut health during treatment and beyond",
    description:
      "Cancer treatment can disrupt the gut microbiome. Probiotics help maintain healthy digestion and support immune function — approximately 70–80% of the body's immune cells are located in the gut-associated lymphoid tissue (GALT). They may help reduce GI side effects from chemotherapy.",
    dosage: {
      under25: "1-5 billion CFU daily",
      "25to50": "5-10 billion CFU daily",
      "50to75": "10-20 billion CFU daily",
      over75: "20-30 billion CFU daily",
    },
    frequency: "Daily, ideally 2 hours away from antibiotics if on them",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Use dog-specific probiotic strains when possible",
      "Especially important during and after antibiotic courses",
      "Refrigerated probiotics generally have better viability",
    ],
    warnings: [
      "Some oncologists caution against live-culture probiotics during severe neutropenia (very low white blood cell count from intensive chemo) due to theoretical bacterial translocation risk",
    ],
    priority: 3,
    evidenceLevel: "veterinary-use",
  },
  {
    slug: "coq10",
    name: "CoQ10 (Coenzyme Q10)",
    category: "quality_of_life",
    tagline: "Cellular energy and heart support",
    description:
      "CoQ10 is essential for cellular energy production and acts as an antioxidant. It is particularly important for heart health, which is relevant for HSA dogs since hemangiosarcoma commonly affects the heart (right atrium). It may also help reduce cardiotoxicity from certain chemotherapy drugs.",
    dosage: {
      under25: "30 mg daily",
      "25to50": "60 mg daily",
      "50to75": "100 mg daily",
      over75: "100-200 mg daily",
    },
    frequency: "Daily with a fatty meal for absorption",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Especially relevant for cardiac HSA cases",
      "Ubiquinol form is better absorbed than ubiquinone",
      "May help protect the heart during doxorubicin chemotherapy",
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
    tagline: "Anti-tumor hormone with sleep and anxiety support",
    description:
      "Melatonin is a naturally occurring hormone with documented anti-tumor properties including anti-angiogenic effects, free radical scavenging, and immune modulation. It may help improve sleep quality, reduce anxiety, and support dogs through the stress of cancer treatment. Multiple integrative oncology protocols include it specifically for HSA.",
    dosage: {
      under25: "1–3 mg at bedtime",
      "25to50": "3–6 mg at bedtime",
      "50to75": "6–9 mg at bedtime",
      over75: "9–12 mg at bedtime",
    },
    frequency: "Once daily at bedtime (follows natural circadian rhythm)",
    stageEmphasis: "all",
    vetDiscussionPoints: [
      "Well-tolerated with very few side effects — mild drowsiness is expected and beneficial",
      "May have synergistic effects with some chemotherapy protocols",
      "Use plain melatonin — avoid products with xylitol (toxic to dogs) or added herbs",
    ],
    warnings: [
      "Always check the label — some human melatonin products contain xylitol, which is toxic to dogs",
      "May cause mild drowsiness, which is typically a benefit for anxious cancer patients",
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
