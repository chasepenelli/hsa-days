import type {
  FoodItem,
  MealPlanMap,
  MealFormOption,
  DietCaution,
  DietSupplement,
  ResearchSpotlight,
  DietSource,
} from "./types";

// ── Best Foods & Avoid Foods ──────────────────────────────────────────────────

export const DIET_FOOD_ITEMS: FoodItem[] = [
  // Best Foods
  {
    name: "Wild-Caught Fatty Fish",
    description:
      "Sardines, salmon, mackerel, and herring are the top cancer-fighting protein. They deliver EPA and DHA — the omega-3s with the strongest clinical support in veterinary oncology — plus naturally occurring astaxanthin. Sardines packed in water are the most practical: inexpensive, low in heavy metals, and most dogs love them.",
    category: "recommended",
    icon: "fish.png",
    tip: "Sardines in water — pop a can right on top of their food",
  },
  {
    name: "Cruciferous Vegetables",
    description:
      "Broccoli, broccoli sprouts, kale, cabbage, and Brussels sprouts contain sulforaphane — a compound shown to inhibit tumor growth, promote cancer cell death, and block the formation of new blood vessels that feed tumors. Broccoli sprouts have up to 100× more sulforaphane precursors than mature broccoli. Light steaming is key: enough heat to break down the cell walls, not so much that you destroy the active compounds.",
    category: "recommended",
    icon: "broccoli.png",
    tip: "Lightly steam, then chop finely — don't overcook",
  },
  {
    name: "Blueberries",
    description:
      "Low glycemic, high in anthocyanins and pterostilbene — compounds with documented anti-angiogenic properties that help block the blood vessel growth tumors depend on. Ellagic acid (in blackberries and raspberries) similarly promotes cancer cell apoptosis. One to two tablespoons per day for a medium dog is an easy, dog-approved addition.",
    category: "recommended",
    icon: "blueberries.png",
    tip: "Freeze them for a crunchy treat in warm weather",
  },
  {
    name: "Eggs (Cooked)",
    description:
      "Pasture-raised eggs are a complete protein with every essential amino acid, plus choline for liver support, naturally occurring vitamin D, and lecithin for fat metabolism. Cooked eggs are better than raw: raw egg whites contain avidin, which blocks biotin absorption over time. Scrambled or soft-boiled, they're easy to digest and almost universally accepted even when appetite is low.",
    category: "recommended",
    icon: "egg.png",
    tip: "Scrambled in a dry pan — no butter, no seasoning",
  },
  {
    name: "Leafy Greens & Parsley",
    description:
      "Parsley is particularly rich in apigenin, a flavonoid that inhibits VEGF signaling — the primary driver of tumor blood vessel formation. Spinach, kale, and Swiss chard provide chlorophyll, vitamins, and phytonutrients. Puree or finely chop for bioavailability — dogs can't digest whole leaf cell walls well.",
    category: "recommended",
    icon: "leafy-greens.png",
    tip: "Blend into food — they won't notice, you'll know it's there",
  },
  {
    name: "Organ Meats",
    description:
      "Liver, kidney, and heart are the most nutrient-dense foods available — packed with B vitamins, CoQ10, iron, and zinc. Keep organ meats to about 10% of the diet to avoid vitamin A excess. Chicken liver and beef heart are practical, widely available options. Most dogs find organ meats irresistible, which also makes them useful appetite boosters.",
    category: "recommended",
    icon: "organ-meats.png",
    tip: "Lightly sear — makes a high-value treat or meal topper",
  },

  // Foods to Avoid
  {
    name: "High-Glycemic Carbs",
    description:
      "White rice, potatoes, sweet potatoes, corn, peas, oats, wheat, and tapioca rapidly convert to glucose — the primary fuel for the Warburg pathway in cancer cells. Standard dry kibble contains 40–60% carbohydrates. Even 'grain-free' kibbles often substitute equally starchy legumes or potatoes. Eliminating high-glycemic foods is the single most actionable dietary change for a dog with HSA.",
    category: "avoid",
    icon: "grains.png",
    tip: "Read kibble labels — 'grain-free' doesn't mean low-carb",
  },
  {
    name: "Vegetable & Seed Oils",
    description:
      "Corn oil, soybean oil, sunflower oil, and canola oil are high in omega-6 linoleic acid, which is pro-inflammatory at elevated levels. Most commercial kibble already contains too much omega-6 fat, driving the 15:1–30:1 omega-6 to omega-3 ratio that promotes tumor-friendly inflammation. Substitute with small amounts of coconut oil or olive oil if needed.",
    category: "avoid",
    icon: "healthy-fats.png",
    tip: "Check ingredient labels — these oils hide in many commercial foods",
  },
  {
    name: "Processed Treats",
    description:
      "Commercial treats are typically loaded with high-glycemic starches, added sugars, artificial colors, and preservatives. Even 'natural' treats often have rice, potato, or tapioca flour as primary ingredients. Swap for real-food alternatives: a cube of cooked chicken, freeze-dried liver, a blueberry, or a sliver of sardine.",
    category: "avoid",
    icon: "processed-treats.png",
    tip: "Real food makes better treats — cooked meat, blueberries, bits of egg",
  },
  {
    name: "Raw Meat During Chemo",
    description:
      "Raw meat carries Salmonella, Listeria, Campylobacter, and E. coli — bacteria that a healthy immune system can typically handle but that can cause serious illness in a dog whose immunity is suppressed by chemotherapy. Board-certified veterinary oncologists almost universally advise against raw diets during active cancer treatment. Once chemotherapy is complete, the risk calculus may be different — discuss with your oncologist.",
    category: "avoid",
    icon: "raw-meat.png",
    stageEmphasis: "advanced",
    tip: "Cook all meats to safe internal temperature during chemo",
  },
];

// ── Meal Form Guide ───────────────────────────────────────────────────────────

export const MEAL_FORM_GUIDE: MealFormOption[] = [
  {
    label: "Standard Dry Kibble",
    icon: "processed-treats.png",
    verdict: "avoid",
    verdictLabel: "Not recommended",
    note:
      "Typically 40–60% carbohydrates after moisture removal, with an inflammatory omega-6 dominant fat profile. High-heat extrusion processing generates advanced glycation end-products (AGEs). If kibble must remain the base diet, supplement aggressively with sardines, eggs, and fish oil — and switch to a lower-carb formula.",
  },
  {
    label: "Fresh Commercial",
    icon: "warm-bowl.png",
    verdict: "good",
    verdictLabel: "Good option",
    note:
      "Gently-cooked brands like Farmer's Dog, Ollie, and JustFoodForDogs use whole-food ingredients with lower carbohydrate content than kibble and are safer for immunocompromised dogs. Avoid raw and high-pressure-processed brands — a September 2024 FDA advisory on Darwin's Natural Pet Products for Salmonella and Listeria makes it unsuitable for dogs on chemotherapy. Look for meat as the first three ingredients and verify the AAFCO completeness statement.",
  },
  {
    label: "Home-Cooked",
    icon: "bone-broth.png",
    verdict: "recommended",
    verdictLabel: "Best — if formulated",
    note:
      "Highest control over ingredients, carbohydrate content, and fat profile. The critical caveat: studies show ~95% of homemade dog diets are nutritionally incomplete. Work with a board-certified veterinary nutritionist (DACVN) or use BalanceIt.com to formulate a complete recipe before making this your dog's primary diet.",
  },
];

// ── Meal Plan Map ─────────────────────────────────────────────────────────────

export const MEAL_PLAN_MAP: MealPlanMap = {
  "low-carb": {
    under25: {
      title: "Low-Carb Plan for a Small Dog (Under 25 lbs)",
      dailyProtein:
        "2–3 oz cooked lean meat or fish (e.g., sardines, turkey, chicken), split across 2 meals",
      dailyVeg:
        "2 tbsp steamed, finely chopped cruciferous or leafy greens",
      dailyFat:
        "1/4 tsp fish oil + 1/4 tsp coconut oil",
      weeklyRotation: [
        "Monday — Sardines in water, steamed broccoli, fish oil",
        "Tuesday — Ground turkey, chopped kale, coconut oil",
        "Wednesday — Scrambled egg + chicken, parsley, fish oil",
        "Thursday — Canned salmon (no salt), spinach, fish oil",
        "Friday — Chicken thigh (cooked), steamed cabbage, coconut oil",
        "Saturday — Beef heart (small amount), leafy greens, fish oil",
        "Sunday — Mackerel, broccoli sprouts, fish oil",
      ],
      macros: { protein: 65, fat: 25, carbs: 10 },
      supplementPairings: ["Fish Oil EPA+DHA", "Turkey Tail (I'm-Yunity)"],
      calorieNote:
        "Typical small dog needs 250–400 kcal/day. Adjust protein portions up if losing weight.",
    },
    "25to50": {
      title: "Low-Carb Plan for a Medium Dog (25–50 lbs)",
      dailyProtein:
        "4–5 oz cooked lean meat or fish, split across 2 meals",
      dailyVeg: "3–4 tbsp steamed cruciferous or leafy greens",
      dailyFat: "1/2 tsp fish oil + 1/4 tsp coconut oil",
      weeklyRotation: [
        "Monday — Sardines in water + ground turkey, steamed broccoli, fish oil",
        "Tuesday — Salmon (canned/cooked), kale puree, fish oil",
        "Wednesday — 2 scrambled eggs + chicken breast, parsley, coconut oil",
        "Thursday — Mackerel, steamed spinach + cabbage, fish oil",
        "Friday — Turkey + beef heart (small portion), leafy greens, fish oil",
        "Saturday — Chicken thigh, broccoli sprouts, fish oil",
        "Sunday — Sardines + egg, steamed Brussels sprouts, coconut oil",
      ],
      macros: { protein: 65, fat: 25, carbs: 10 },
      supplementPairings: [
        "Fish Oil EPA+DHA (1,500–2,000mg daily)",
        "Turkey Tail (I'm-Yunity)",
        "Modified Citrus Pectin",
      ],
      calorieNote:
        "Typical medium dog needs 600–900 kcal/day. Watch body condition — add an extra oz of protein if ribs are visible.",
    },
    "50to75": {
      title: "Low-Carb Plan for a Large Dog (50–75 lbs)",
      dailyProtein:
        "5–7 oz cooked meat or fish, split into 2–3 meals",
      dailyVeg: "1/4 cup steamed cruciferous or leafy greens",
      dailyFat: "1 tsp fish oil + 1/2 tsp coconut oil",
      weeklyRotation: [
        "Monday — Sardines + turkey (5–6 oz total), steamed broccoli, fish oil",
        "Tuesday — Salmon (fresh or canned), kale + spinach, fish oil",
        "Wednesday — 2–3 scrambled eggs + chicken, parsley, coconut oil",
        "Thursday — Ground turkey + chicken liver, steamed cabbage, fish oil",
        "Friday — Mackerel + beef heart, broccoli sprouts, fish oil",
        "Saturday — Venison or rabbit (if accessible), leafy greens, fish oil",
        "Sunday — Sardines + egg + organ meat treat, steamed Brussels sprouts, coconut oil",
      ],
      macros: { protein: 65, fat: 25, carbs: 10 },
      supplementPairings: [
        "Fish Oil EPA+DHA (3,000–4,000mg daily)",
        "Turkey Tail (I'm-Yunity) 100mg/kg",
        "Modified Citrus Pectin",
        "Yunnan Baiyao (discuss with vet)",
      ],
      calorieNote:
        "Typical 50–75 lb dog needs 1,000–1,300 kcal/day. Large breeds lose muscle quickly — prioritize protein density.",
    },
    over75: {
      title: "Low-Carb Plan for an Extra-Large Dog (75+ lbs)",
      dailyProtein:
        "8–10 oz cooked meat or fish, split into 2–3 meals",
      dailyVeg: "1/3 cup steamed cruciferous or leafy greens",
      dailyFat: "1.5 tsp fish oil + 1/2 tsp coconut oil",
      weeklyRotation: [
        "Monday — Sardines + ground turkey (8 oz total), steamed broccoli + spinach, fish oil",
        "Tuesday — Fresh salmon fillet (cooked), kale puree, fish oil",
        "Wednesday — 3–4 scrambled eggs + chicken breast, parsley, coconut oil",
        "Thursday — Turkey + chicken liver + beef heart, steamed cabbage, fish oil",
        "Friday — Mackerel + sardines, broccoli sprouts, fish oil",
        "Saturday — Venison or duck + egg, leafy greens mix, fish oil",
        "Sunday — Whole sardines + organ meat, steamed Brussels sprouts, coconut oil",
      ],
      macros: { protein: 65, fat: 25, carbs: 10 },
      supplementPairings: [
        "Fish Oil EPA+DHA (4,500–6,000mg daily)",
        "Turkey Tail (I'm-Yunity) 100mg/kg",
        "Modified Citrus Pectin",
        "Yunnan Baiyao (discuss with vet)",
      ],
      calorieNote:
        "Large dogs need 1,400–1,800+ kcal/day. Extra-large breeds with HSA are particularly prone to muscle wasting — err on the side of more protein.",
    },
  },
  keto: {
    under25: {
      title: "Ketogenic Plan for a Small Dog (Under 25 lbs)",
      dailyProtein:
        "2 oz fatty meat or fish (sardines, salmon, dark meat chicken), split across 2 meals",
      dailyVeg: "1 tbsp steamed non-starchy vegetables",
      dailyFat:
        "1/2 tsp fish oil + 1/2 tsp coconut oil + small amount of animal fat",
      weeklyRotation: [
        "Monday — Sardines in oil + salmon (small), fish oil",
        "Tuesday — Dark meat chicken + chicken skin, steamed broccoli (1 tbsp), coconut oil",
        "Wednesday — Egg yolks scrambled + sardines, coconut oil, fish oil",
        "Thursday — Fatty salmon, tiny portion steamed kale, fish oil",
        "Friday — Duck (if accessible) or chicken thighs + liver, coconut oil",
        "Saturday — Mackerel (in oil), pinch of parsley, fish oil",
        "Sunday — Beef heart + eggs, broccoli sprout (1 tsp), fish oil",
      ],
      macros: { protein: 30, fat: 65, carbs: 5 },
      supplementPairings: [
        "Fish Oil EPA+DHA",
        "Turkey Tail (I'm-Yunity)",
        "Electrolytes (consult vet — keto shifts fluid balance)",
      ],
      calorieNote:
        "Strict keto requires DACVN formulation to prevent deficiencies. Start with a veterinary nutritionist consultation before implementing.",
    },
    "25to50": {
      title: "Ketogenic Plan for a Medium Dog (25–50 lbs)",
      dailyProtein:
        "3 oz fatty meat or fish, split across 2 meals",
      dailyVeg: "2 tbsp steamed non-starchy vegetables",
      dailyFat:
        "1 tsp fish oil + 1 tsp coconut oil + animal fat from proteins",
      weeklyRotation: [
        "Monday — Sardines in oil + salmon, steamed broccoli (2 tbsp), fish oil",
        "Tuesday — Dark meat chicken + chicken skin, steamed kale, coconut oil",
        "Wednesday — 2 egg yolks + sardines, coconut oil, fish oil",
        "Thursday — Fatty salmon + chicken liver, steamed spinach, fish oil",
        "Friday — Duck or chicken thighs + heart, coconut oil, fish oil",
        "Saturday — Mackerel in oil + beef fat (small amount), parsley, fish oil",
        "Sunday — Beef heart + 2 eggs, broccoli sprouts, fish oil",
      ],
      macros: { protein: 30, fat: 65, carbs: 5 },
      supplementPairings: [
        "Fish Oil EPA+DHA",
        "Turkey Tail (I'm-Yunity)",
        "Electrolytes (consult vet)",
        "B-vitamin complex (keto depletes B vitamins)",
      ],
      calorieNote:
        "Ketogenic diets require careful DACVN formulation. Do not implement as sole diet without professional nutritional analysis.",
    },
    "50to75": {
      title: "Ketogenic Plan for a Large Dog (50–75 lbs)",
      dailyProtein:
        "4–5 oz fatty meat or fish, split across 2–3 meals",
      dailyVeg: "3 tbsp steamed non-starchy vegetables",
      dailyFat:
        "1.5 tsp fish oil + 1 tsp coconut oil + animal fat",
      weeklyRotation: [
        "Monday — Sardines in oil + fatty salmon fillet, broccoli florets, fish oil",
        "Tuesday — Dark meat chicken + skin + chicken liver, kale, coconut oil",
        "Wednesday — 3 egg yolks + sardines + coconut oil, fish oil",
        "Thursday — Fatty salmon + beef heart, spinach, fish oil",
        "Friday — Duck legs or thighs (with fat), steamed cabbage, fish oil",
        "Saturday — Mackerel in oil + chicken skin treat, parsley, coconut oil",
        "Sunday — Beef heart + 2 eggs + organ meat, broccoli sprouts, fish oil",
      ],
      macros: { protein: 30, fat: 65, carbs: 5 },
      supplementPairings: [
        "Fish Oil EPA+DHA (3,000–4,000mg)",
        "Turkey Tail (I'm-Yunity) 100mg/kg",
        "Electrolytes + B-complex",
        "Calcium/phosphorus supplement (required with keto)",
      ],
      calorieNote:
        "Work with a DACVN for strict keto formulation. Monitor weight weekly — keto dogs can lose weight rapidly if calories are insufficient.",
    },
    over75: {
      title: "Ketogenic Plan for an Extra-Large Dog (75+ lbs)",
      dailyProtein:
        "5–7 oz fatty meat or fish, split across 2–3 meals",
      dailyVeg: "1/4 cup steamed non-starchy vegetables",
      dailyFat:
        "2 tsp fish oil + 1.5 tsp coconut oil + animal fat",
      weeklyRotation: [
        "Monday — Sardines in oil + large salmon portion, broccoli, fish oil",
        "Tuesday — Dark meat chicken + whole thighs with skin + liver, kale, coconut oil",
        "Wednesday — 4 egg yolks + sardines + coconut oil, spinach, fish oil",
        "Thursday — Fatty salmon fillet + beef heart, cabbage, fish oil",
        "Friday — Duck or goose (with fat) + organ meats, steamed greens, fish oil",
        "Saturday — Mackerel in oil + chicken hearts + fat drippings, parsley, coconut oil",
        "Sunday — Whole sardines + beef heart + 2 eggs, broccoli sprouts, fish oil",
      ],
      macros: { protein: 30, fat: 65, carbs: 5 },
      supplementPairings: [
        "Fish Oil EPA+DHA (5,000–7,000mg daily)",
        "Turkey Tail (I'm-Yunity) 100mg/kg",
        "Electrolytes + B-complex",
        "DACVN-formulated mineral supplement",
      ],
      calorieNote:
        "Extra-large dogs on keto need precise calorie tracking. DACVN formulation is non-negotiable at this size — deficiencies are more impactful.",
    },
  },
  "balanced-fresh": {
    under25: {
      title: "Balanced Fresh Plan for a Small Dog (Under 25 lbs)",
      dailyProtein:
        "2.5 oz cooked protein variety (chicken, fish, turkey, eggs), split across 2 meals",
      dailyVeg:
        "2–3 tbsp varied steamed vegetables (broccoli, greens, pumpkin)",
      dailyFat: "1/4 tsp fish oil + occasional coconut oil",
      weeklyRotation: [
        "Monday — Chicken breast, steamed broccoli, pumpkin (1 tsp), fish oil",
        "Tuesday — Sardines in water, kale, blueberries (1 tsp)",
        "Wednesday — Scrambled eggs, steamed spinach, fish oil",
        "Thursday — Turkey, steamed zucchini + parsley, fish oil",
        "Friday — Salmon (canned), broccoli sprouts, blueberries",
        "Saturday — Chicken liver (small amount) + turkey, pumpkin, fish oil",
        "Sunday — Mackerel, steamed cabbage, coconut oil",
      ],
      macros: { protein: 55, fat: 30, carbs: 15 },
      supplementPairings: [
        "Fish Oil EPA+DHA",
        "Turkey Tail (I'm-Yunity)",
      ],
      calorieNote:
        "Balanced fresh allows a slightly wider food variety while keeping carbs below 15%. Best for dogs transitioning from kibble who need a gentler shift.",
    },
    "25to50": {
      title: "Balanced Fresh Plan for a Medium Dog (25–50 lbs)",
      dailyProtein:
        "4 oz varied protein (rotate between chicken, fish, turkey, eggs, organ meats)",
      dailyVeg: "1/4 cup steamed vegetables (varied)",
      dailyFat: "1/2 tsp fish oil daily",
      weeklyRotation: [
        "Monday — Chicken breast + bone broth topper, steamed broccoli, fish oil",
        "Tuesday — Sardines + ground turkey, kale + parsley, fish oil",
        "Wednesday — 2 scrambled eggs + chicken, steamed zucchini, fish oil",
        "Thursday — Salmon, broccoli + spinach blend, blueberries (1 tbsp)",
        "Friday — Turkey + chicken liver (small portion), pumpkin, fish oil",
        "Saturday — Mackerel, cabbage + parsley, blueberries",
        "Sunday — Beef heart + egg, mixed steamed greens, fish oil",
      ],
      macros: { protein: 55, fat: 30, carbs: 15 },
      supplementPairings: [
        "Fish Oil EPA+DHA (1,500mg daily)",
        "Turkey Tail (I'm-Yunity)",
        "Blueberries as food-based antioxidant",
      ],
      calorieNote:
        "Balanced fresh works well as a practical starting point. Rotate proteins weekly to broaden the nutrient profile and prevent food aversions.",
    },
    "50to75": {
      title: "Balanced Fresh Plan for a Large Dog (50–75 lbs)",
      dailyProtein:
        "6 oz varied protein split across 2 meals",
      dailyVeg: "1/3 cup steamed vegetables (varied weekly)",
      dailyFat: "1 tsp fish oil + occasional bone broth",
      weeklyRotation: [
        "Monday — Chicken breast (5–6 oz) + sardines, steamed broccoli, fish oil",
        "Tuesday — Ground turkey + chicken liver (1 oz), kale + parsley, fish oil",
        "Wednesday — 3 scrambled eggs + turkey, steamed spinach + pumpkin, fish oil",
        "Thursday — Salmon fillet + bone broth drizzle, broccoli + zucchini, fish oil",
        "Friday — Mackerel + chicken breast, cabbage + leafy greens, fish oil",
        "Saturday — Beef heart + egg, broccoli sprouts, blueberries (1.5 tbsp)",
        "Sunday — Sardines + turkey, mixed steamed greens + parsley, fish oil",
      ],
      macros: { protein: 55, fat: 30, carbs: 15 },
      supplementPairings: [
        "Fish Oil EPA+DHA (3,000mg daily)",
        "Turkey Tail (I'm-Yunity) 100mg/kg",
        "Modified Citrus Pectin",
        "Yunnan Baiyao (discuss with vet)",
      ],
      calorieNote:
        "Large dogs do well on balanced fresh as a sustainable long-term approach. Add bone broth as a free topper — it encourages hydration and appeals even when appetite dips.",
    },
    over75: {
      title: "Balanced Fresh Plan for an Extra-Large Dog (75+ lbs)",
      dailyProtein:
        "8–9 oz varied protein across 2–3 meals",
      dailyVeg: "1/2 cup steamed vegetables (varied)",
      dailyFat: "1.5 tsp fish oil + bone broth daily",
      weeklyRotation: [
        "Monday — Chicken breast + sardines (8 oz total), steamed broccoli + spinach, fish oil",
        "Tuesday — Ground turkey + chicken liver (2 oz), kale + parsley, fish oil",
        "Wednesday — 4 scrambled eggs + turkey breast, steamed zucchini + pumpkin, fish oil",
        "Thursday — Salmon fillet + bone broth (1/4 cup), broccoli + cabbage, fish oil",
        "Friday — Mackerel + chicken thighs, cabbage + leafy greens blend, fish oil",
        "Saturday — Beef heart + 2 eggs + organ meat (total 8–9 oz), broccoli sprouts, blueberries",
        "Sunday — Sardines + turkey + bone broth drizzle, mixed steamed greens + parsley, fish oil",
      ],
      macros: { protein: 55, fat: 30, carbs: 15 },
      supplementPairings: [
        "Fish Oil EPA+DHA (4,500–6,000mg daily)",
        "Turkey Tail (I'm-Yunity) 100mg/kg",
        "Modified Citrus Pectin",
        "Yunnan Baiyao (discuss with vet)",
        "Blueberries as daily food-source antioxidant",
      ],
      calorieNote:
        "Extra-large dogs on balanced fresh need generous portions — prioritize calorie density over restriction. A dog that's eating well and maintaining weight is winning.",
    },
  },
};

// ── Critical Cautions ─────────────────────────────────────────────────────────

export const CAUTIONS: DietCaution[] = [
  {
    severity: "never",
    title: "Grapes & Raisins",
    note: "Cause acute kidney failure in dogs — the toxic compound is not yet identified, and even small amounts can be fatal. Never appropriate, regardless of cancer status.",
  },
  {
    severity: "never",
    title: "Onions & Large Amounts of Garlic",
    note: "Organosulfur compounds cause oxidative damage to red blood cells (Heinz body anemia). HSA dogs are already at risk for anemia from bleeding — this adds unacceptable risk.",
  },
  {
    severity: "never",
    title: "Xylitol",
    note: "Found in sugar-free peanut butter, gum, and many processed foods. Causes severe hypoglycemia and liver failure. Always read labels on any human food you share.",
  },
  {
    severity: "never",
    title: "Avocado",
    note: "Contains persin, which causes cardiac and gastrointestinal toxicity in dogs. The pit is also a choking and intestinal obstruction hazard.",
  },
  {
    severity: "never",
    title: "Macadamia Nuts",
    note: "Neurotoxic to dogs — cause weakness, hyperthermia, vomiting, and tremors within 12 hours of ingestion.",
  },
  {
    severity: "care",
    title: "High-Dose Fish Oil Near Surgery or Active Bleeds",
    note: "Omega-3 fatty acids have mild anticoagulant properties. Around surgery, active internal bleeding, or tumor rupture events, very high doses may slightly impair clotting. Discuss timing and dose with your vet.",
  },
  {
    severity: "care",
    title: "Curcumin + Piperine During Chemotherapy",
    note: "Piperine (black pepper extract added to improve curcumin absorption) inhibits drug metabolism enzymes. This can raise blood levels of chemotherapy drugs to potentially toxic levels. Use plain curcumin or liposomal curcumin during active chemo — discuss with your oncologist.",
  },
  {
    severity: "care",
    title: "High-Dose Antioxidants During Chemo or Radiation",
    note: "Doxorubicin and radiation work partly by generating reactive oxygen species (ROS) that damage cancer cells. High-dose supplemental antioxidants (Vitamin C, Vitamin E capsules, NAC, beta-carotene) may neutralize this effect. Whole-food antioxidants (berries, vegetables) are fine — megadose supplements are not. Pause high-dose antioxidant supplements around chemo sessions.",
  },
  {
    severity: "care",
    title: "Small Amounts of Garlic",
    note: "Very small amounts (less than one small clove per 20 lbs, a few times per week) are sometimes used by integrative practitioners for allicin and quercetin benefits. Given the hemorrhagic risk profile of HSA, many practitioners omit garlic entirely. If you use it, keep amounts minimal and stop at any sign of anemia.",
  },
];

// ── Diet Supplements (Evidence-Graded) ────────────────────────────────────────

export const DIET_SUPPLEMENTS: DietSupplement[] = [
  {
    slug: "turkey-tail",
    name: "Turkey Tail (I'm-Yunity)",
    tagline: "The only supplement with a published RCT specifically in dogs with splenic HSA",
    priority: "first",
    evidenceTier: "strong",
    evidenceNote: "The only supplement with a published randomized clinical trial specifically in dogs with splenic HSA.",
    whatItDoes: "Contains PSP (polysaccharopeptide) and PSK, two immunomodulatory compounds that bind to immune cell receptors, restoring immune surveillance and activating macrophages against tumor cells. In a 2012 University of Pennsylvania randomized pilot trial, dogs receiving 100 mg/kg/day showed a median survival of 199 days — more than double the 86-day median for dogs receiving no further treatment post-splenectomy.",
    whyHSA: "Directly studied in dogs with splenic hemangiosarcoma. The immune surveillance mechanisms are especially relevant for a cancer that spreads hematogenously (through the bloodstream).",
    dosing: {
      under25: "25 mg/kg daily (e.g. ~500mg for a 20 lb dog)",
      "25to50": "50–100 mg/kg daily (use I'm-Yunity brand)",
      "50to75": "100 mg/kg daily — the clinical trial dose",
      over75: "100 mg/kg daily — the clinical trial dose (e.g. ~9g for an 90 lb dog)",
    },
    keyStudy: "Brown DC, Reetz J. Single agent polysaccharopeptide delays metastases and improves survival in naturally occurring hemangiosarcoma. Evidence-Based Complementary and Alternative Medicine, 2012.",
    sourcingNote: "Use I'm-Yunity brand specifically if possible — it was the product studied. If using another brand, look for fruiting body extract (not mycelium on grain) with a Certificate of Analysis for PSP content.",
    cautions: "A 2022 follow-up study found PSP did not significantly improve outcomes when added to doxorubicin. It may be most useful for dogs not on chemotherapy or between chemo cycles — discuss timing with your oncologist.",
  },
  {
    slug: "fish-oil",
    name: "Fish Oil (EPA/DHA)",
    tagline: "The intervention where conventional and integrative oncology most agree",
    priority: "first",
    evidenceTier: "moderate",
    evidenceNote: "Broad veterinary oncology evidence base; the only supplement where integrative and conventional oncology communities largely agree.",
    whatItDoes: "EPA and DHA reduce production of prostaglandin E2 (PGE2), the primary inflammatory driver of tumor growth. They directly inhibit endothelial cell migration and angiogenesis, reduce cancer cell proliferation, promote apoptosis, and may reduce cancer-associated muscle wasting (cachexia). Multiple veterinary oncology studies support inclusion in cancer diets.",
    whyHSA: "HSA is a tumor of endothelial cells — EPA/DHA directly inhibits endothelial cell migration and new vessel formation, attacking the cancer's core biology. It's the dietary intervention most directly matched to HSA's vascular nature.",
    dosing: {
      under25: "~750–1,500 mg EPA+DHA daily (roughly 300 mg per 10 lbs body weight)",
      "25to50": "~1,500–3,000 mg EPA+DHA daily",
      "50to75": "~3,000–4,500 mg EPA+DHA daily",
      over75: "~4,500–6,000 mg EPA+DHA daily",
    },
    keyStudy: "Reference dose: 450 mg EPA+DHA per 100 kcal daily energy requirement. Colorado State University Flint Animal Cancer Center.",
    sourcingNote: "Marine fish oil from sardine, anchovy, or salmon — NOT plant-derived flax or hemp (dogs convert ALA to EPA/DHA poorly). Refrigerate to prevent rancidity. Krill oil has higher bioavailability per gram but costs more.",
    cautions: "High doses have mild anticoagulant properties. Around surgery, active bleeding, or suspected tumor rupture, reduce dose and discuss with your vet. Introduce gradually rather than starting at full therapeutic dose.",
  },
  {
    slug: "yunnan-baiyao",
    name: "Yunnan Baiyao",
    tagline: "Traditional hemostatic herb with documented in vitro HSA cell-killing activity",
    priority: "second",
    evidenceTier: "moderate",
    evidenceNote: "Strong clinical track record for hemostasis in HSA dogs; in vitro evidence of direct HSA cell-killing activity.",
    whatItDoes: "A traditional Chinese herbal blend used for over 114 years, primarily for hemostasis — it activates platelets and enhances clot formation. A 2014 NC State study found Yunnan Baiyao causes dose- and time-dependent apoptosis in canine hemangiosarcoma cell lines through caspase-mediated pathways, suggesting it may directly kill HSA cells in addition to managing bleeding.",
    whyHSA: "HSA tumors are prone to internal rupture and hemorrhage — Yunnan Baiyao is uniquely relevant to this specific life-threatening complication. No other commonly used supplement directly addresses the bleeding risk of HSA.",
    dosing: {
      under25: "1 capsule (0.25g) once daily",
      "25to50": "1 capsule twice daily (10–30 lbs) or 2 capsules twice daily (30–50 lbs)",
      "50to75": "2 capsules twice daily to three times daily",
      over75: "2 capsules three times daily",
    },
    keyStudy: "Wirth KA et al. In vitro effects of Yunnan Baiyao on canine hemangiosarcoma cell lines. Veterinary and Comparative Oncology, 2014.",
    sourcingNote: "Source from a reputable Chinese medicine supplier. Cycling is commonly recommended (5 days on, 5 days off) to prevent tolerance — 2024 practitioner sources favor equal on/off intervals. The box includes a red 'emergency pill' — many practitioners advise giving it at the first sign of an acute bleed.",
    cautions: "The formula contains undisclosed proprietary ingredients classified by the Chinese government. Use under veterinary guidance. Monitor liver enzymes over time with extended use.",
  },
  {
    slug: "modified-citrus-pectin",
    name: "Modified Citrus Pectin (MCP)",
    tagline: "Anti-metastatic Galectin-3 inhibitor with strong mechanistic rationale for HSA",
    priority: "second",
    evidenceTier: "emerging",
    evidenceNote: "Strong mechanistic rationale for metastatic HSA specifically; limited canine clinical trial data but compelling in vitro and mouse model evidence.",
    whatItDoes: "MCP binds to and inhibits Galectin-3 — a protein cancer cells use to adhere to distant tissues, evade apoptosis, and promote angiogenesis. Multiple in vitro and mouse model studies show MCP reduces tumor cell adhesion, invasion, and metastatic spread. 2023 research found MCP may modulate gene expression in apoptosis and tumor suppression pathways.",
    whyHSA: "HSA spreads through the bloodstream (hematogenously) — exactly the metastatic route that Galectin-3 facilitates. The anti-metastatic mechanism of MCP is more directly relevant to vascular cancers like HSA than to many other tumor types.",
    dosing: {
      under25: "0.5–1g daily mixed into food",
      "25to50": "1–2g daily",
      "50to75": "2–3g daily",
      over75: "3–5g daily",
    },
    keyStudy: "Glinsky VV, Raz A. Modified citrus pectin anti-metastatic properties: one bullet, multiple targets. Carcinogenesis, 2009.",
    sourcingNote: "PectaSol-C is the most clinically studied brand. Look for low-molecular-weight MCP specifically — regular pectin is not absorbed. Available as a powder easily added to food.",
    cautions: undefined,
  },
  {
    slug: "curcumin",
    name: "Curcumin",
    tagline: "Powerful anti-angiogenic compound limited by bioavailability — form matters enormously",
    priority: "context",
    evidenceTier: "moderate",
    evidenceNote: "Extensive pre-clinical evidence for anti-angiogenic and anti-tumor activity, but clinically limited by severe bioavailability challenges.",
    whatItDoes: "Curcumin inhibits NF-κB (a master regulator of inflammation and tumor survival), directly inhibits VEGF/VEGFR2 signaling (the primary driver of tumor blood vessel formation), and induces apoptosis in multiple cancer cell lines. A pilot trial of liposomal IV curcumin in 10 cancer-bearing dogs found 4 of 6 completing treatment had stable disease.",
    whyHSA: "Curcumin directly inhibits endothelial cell viability, migration, and tube formation — all processes central to HSA survival. Its anti-VEGF mechanism attacks the same angiogenic pathway that defines this cancer's behavior.",
    dosing: {
      under25: "200–300mg standardized extract daily",
      "25to50": "300–500mg daily",
      "50to75": "500–750mg daily",
      over75: "750–1,000mg daily",
    },
    keyStudy: "Cekanova M et al. In vitro activity of liposome-encapsulated curcumin for naturally occurring canine cancers. Journal of Veterinary Internal Medicine, 2014.",
    sourcingNote: "Plain turmeric powder is NOT adequate — systemic absorption is negligible. Use a standardized, bioenhanced form: liposomal curcumin, BCM-95/Biocurcumax, or nano-curcumin. Avoid curcumin + piperine formulations during active chemotherapy.",
    cautions: "Piperine (black pepper extract) dramatically increases curcumin absorption but also inhibits drug metabolism enzymes — this can raise chemotherapy drug levels to potentially toxic concentrations. If your dog is on doxorubicin, use piperine-free formulations and discuss with your oncologist.",
  },
  {
    slug: "anti-angiogenic-trio",
    name: "Anti-Angiogenic Trio: Resveratrol, Quercetin & EGCG",
    tagline: "Three plant compounds that block tumor blood vessel formation from overlapping angles",
    priority: "context",
    evidenceTier: "emerging",
    evidenceNote: "Mechanistically compelling anti-angiogenic activity across overlapping pathways; primarily in vitro evidence with limited canine clinical data.",
    whatItDoes: "These three plant compounds inhibit HIF-1α (which drives tumor blood vessel formation in low-oxygen environments), suppress VEGF signaling, inhibit matrix metalloproteinases that tumors use to invade tissue, and promote cancer cell apoptosis. They are often included together in integrative protocols because their mechanisms are synergistic.",
    whyHSA: "Anti-angiogenic compounds are directly targeted against HSA's core survival mechanism — the cancer's ability to continuously build new blood vessels. These three compounds attack this pathway from multiple angles simultaneously.",
    dosing: {
      under25: "Obtain from food sources primarily: blueberries, parsley, broccoli, green tea",
      "25to50": "Food sources first; supplemental quercetin 25–50mg daily if desired",
      "50to75": "Food sources first; supplemental quercetin 50–100mg daily if desired",
      over75: "Food sources first; supplemental quercetin 100mg daily if desired",
    },
    keyStudy: "Lamy S et al. Natural health products that inhibit angiogenesis: a potential source for investigational new agents. Evidence-Based Complementary and Alternative Medicine, 2007.",
    sourcingNote: "Obtain resveratrol from blueberries (not grapes — toxic to dogs). Quercetin is richest in parsley and blueberries. For EGCG, use decaffeinated green tea extract rather than brewed tea — caffeine sensitivity is a concern in dogs.",
    cautions: "Grapes are toxic to dogs — never feed grapes for resveratrol. Use supplemental trans-resveratrol if supplementing beyond food sources.",
  },
];

// ── Protocol Gap ──────────────────────────────────────────────────────────────

export const PROTOCOL_GAP = {
  headline: "The Two Most Overlooked Interventions",
  subhead: "Across publicly shared HSA protocols, these two are consistently absent — despite having some of the strongest mechanistic rationale.",
  items: [
    {
      name: "Fish Oil at Therapeutic Dose",
      icon: "fish.png",
      why: "Turkey tail and Yunnan Baiyao get most of the attention in HSA communities — both deservedly — but EPA/DHA has a broader evidence base across veterinary oncology and is the supplement where conventional and integrative oncology most agree. Its mechanisms attack HSA specifically: it inhibits endothelial cell migration, reduces PGE2-driven inflammation, and has anti-angiogenic effects through multiple pathways. The reason it gets overlooked is that it lacks the disease-specific drama of the turkey tail study. It just quietly does a lot of things well.",
      action: "If your current protocol doesn't include fish oil at therapeutic dose (roughly 300mg EPA+DHA per 10 lbs body weight daily), adding it is likely the highest-value next step.",
    },
    {
      name: "Modified Citrus Pectin",
      icon: "pumpkin.png",
      why: "MCP is less well known than the other supplements, but its mechanism — blocking Galectin-3, the protein cancer cells use to metastasize through the bloodstream — is particularly relevant for HSA. This cancer spreads hematogenously (through the blood), which is exactly the route MCP may impede. For dogs with confirmed metastatic disease, the mechanistic argument for MCP is as strong as anything in the emerging evidence tier.",
      action: "MCP is available as a powder (look for PectaSol-C brand) that mixes easily into food. It's generally well-tolerated and has no significant interactions with standard HSA protocols.",
    },
  ],
};

// ── Glycine / Collagen Debate ─────────────────────────────────────────────────

export const GLYCINE_SECTION = {
  headline: "Should You Worry About Bone Broth?",
  subhead: "The Collagen & Glycine Question",
  concern: {
    label: "The Concern",
    text: "Research from human oncology (primarily 2011–2014) showed that some fast-proliferating cancers upregulate the serine synthesis pathway (SSP), using serine and glycine as raw material for rapid cell division. Collagen-rich foods like bone broth and gelatin are high in glycine — collagen is approximately 33% glycine by composition. Mouse model studies showed dietary serine and glycine restriction slowed growth in SSP-amplified cancers. Some have concluded that bone broth might be feeding the tumor.",
  },
  counterargument: {
    label: "The HSA-Specific Counterargument",
    text: "Glycine has also been documented as an anti-angiogenic compound. A FASEB Journal study found glycine supplementation inhibited tumor angiogenesis in mice by 55% — and VEGF-driven tube formation was completely neutralized — acting directly on endothelial cell proliferation. For HSA — a tumor that is endothelial cells, dependent on continuous new vessel formation to survive and spread — this anti-angiogenic mechanism is mechanistically compelling. The same amino acid that might theoretically fuel SSP-dependent biosynthesis could simultaneously be starving the vascular network HSA requires.",
  },
  addedComplexity: "A third layer: many SSP-dependent cancers can synthesize serine from glucose de novo. If glucose is already being restricted through a low-carbohydrate diet, you're attacking serine synthesis upstream. In that context, additional dietary glycine restriction may add little, since the tumor is already losing access to the glucose substrate SSP ultimately requires.",
  verdict: {
    label: "The Practical Verdict",
    text: "The serine/glycine tension is real but unresolved for canine HSA specifically — no studies have mapped SSP activity in this tumor type. The anti-angiogenic signal on glycine provides a meaningful counterargument to aggressive restriction. A reasonable approach: neither eliminate collagen-rich foods entirely nor make them the dominant feature of the diet. Bone broth as a palatability aid and hydration supplement is reasonable. The more impactful dietary lever is carbohydrate reduction, which attacks the glucose supply chain SSP ultimately depends on.",
  },
};

// ── Oncologist Consensus ──────────────────────────────────────────────────────

export const ONCOLOGIST_CONSENSUS = {
  headline: "What Veterinary Oncologists Actually Say",
  subhead: "The evidence-based community's position is measured — not dismissive.",
  intro: "There's a perception that conventional veterinary oncologists dismiss nutrition entirely. That's not accurate. Their position is measured: they acknowledge the mechanistic plausibility of dietary interventions while honestly noting the absence of large randomized controlled trial data in dogs. Here's where they stand.",
  agreements: [
    "Fish oil (EPA/DHA) is widely supported as reasonable and potentially beneficial — the Colorado State University Flint Animal Cancer Center explicitly recommends it",
    "High-protein diets are appropriate for dogs with cancer; maintaining caloric intake and muscle mass is critical",
    "I'm-Yunity at 100 mg/kg is considered reasonable by many oncologists given the published pilot trial data",
    "Yunnan Baiyao is widely used in integrative-leaning oncology practices specifically for HSA's bleeding management",
    "Eliminating high-glycemic carbohydrates is broadly supported as reasonable, even without RCT proof",
  ],
  skepticisms: [
    "Extreme ketogenic diets without nutritional guidance from a DACVN — deficiency risk is real",
    "High-dose antioxidant supplementation during chemotherapy — may blunt doxorubicin's mechanism",
    "Raw diets for immunocompromised dogs undergoing chemotherapy — infection risk is legitimate",
    "Any supplement claiming to cure or eliminate HSA tumors",
  ],
  csuQuote: "\"It seems reasonable to include omega-3 fatty acids (EPA, DHA) in foods for pets with cancer.\" — Colorado State University Flint Animal Cancer Center",
  closingThought: "The most effective protocol is the one you can actually implement consistently, with your vet's full knowledge and support. Supplements that your oncologist doesn't know about can't be managed if an interaction or problem arises.",
};

// ── Active Research Spotlights ────────────────────────────────────────────────

export const ACTIVE_RESEARCH: ResearchSpotlight[] = [
  {
    institution: "University of Pennsylvania / Morris Animal Foundation",
    title: "Hemangiosarcoma Initiative",
    summary: "A multimillion-dollar, multiyear initiative with five new research proposals selected in 2025 focused specifically on HSA diagnosis and treatment. Basic science into HSA biology — including metabolic pathway mapping — will have direct dietary implications as it matures.",
    relevance: "Any future dietary intervention trials for HSA will build on this biological foundation.",
    status: "Active 2024–2026",
  },
  {
    institution: "Cornell University",
    title: "Molecular Landscape of Canine HSA",
    summary: "A project characterizing HSA at the single-cell and spatial omics level, mapping gene expression patterns including metabolic pathways. This is the kind of work that will eventually tell us whether HSA specifically upregulates the serine synthesis pathway — resolving the glycine/collagen debate with actual HSA data.",
    relevance: "Will directly inform future targeted dietary interventions and clarify which metabolic pathways are most active in HSA.",
    status: "Active",
  },
  {
    institution: "Multiple institutions",
    title: "Propranolol + Doxorubicin Trial",
    summary: "Propranolol (a beta-blocker) showed HSA cell-killing activity in vitro and was trialed alongside doxorubicin. Results published May 2025 showed no overall survival benefit (134 days vs. 152 days for doxorubicin alone). A notable secondary finding: dogs under 6 years of age had dramatically better outcomes — 5 of 5 survived beyond 365 days — suggesting age may be a key variable in future protocol design.",
    relevance: "The trial's age-stratified findings may reshape how future anti-angiogenic protocols, including dietary ones, are studied in younger versus older dogs.",
    status: "Published May 2025",
  },
];

// ── Key Sources ────────────────────────────────────────────────────────────────

export const DIET_SOURCES: DietSource[] = [
  { title: "Single Agent PSP Delays Metastases in HSA (Penn, 2012)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3440946/", type: "clinical", year: 2012 },
  { title: "I'm-Yunity ± Doxorubicin for Splenic HSA (2022)", url: "https://pubmed.ncbi.nlm.nih.gov/35442554/", type: "clinical", year: 2022 },
  { title: "EPA/DHA Supplementation in Companion Animal Cancer: Systematic Review", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8193331/", type: "review", year: 2021 },
  { title: "Yunnan Baiyao on Canine HSA Cell Lines (NC State, 2014)", url: "https://pubmed.ncbi.nlm.nih.gov/24976212/", type: "clinical", year: 2014 },
  { title: "Liposomal Curcumin for Canine Cancers", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6234083/", type: "clinical", year: 2014 },
  { title: "Nutrition & Oncology in Dogs and Cats: Comprehensive Review (2024)", url: "https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2024.1490290/full", type: "review", year: 2024 },
  { title: "CSU Flint Animal Cancer Center — Dietary Considerations", url: "https://www.csuanimalcancercenter.org/2020/11/18/dietary-considerations-for-pets-with-cancer/", type: "organization", year: 2020 },
  { title: "Natural Health Products Inhibiting Angiogenesis (Parts 1 & 2)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1891166/", type: "review", year: 2007 },
];
