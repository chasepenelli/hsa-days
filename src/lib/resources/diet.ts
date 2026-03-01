import type {
  FoodItem,
  MealPlanMap,
  MealFormOption,
  DietCaution,
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
      "Darwin's Natural Pet Products, Volhard Dog Nutrition, and similar fresh/gently-cooked brands offer whole-food ingredients with lower carbohydrate content than kibble. Look for meat as the first three ingredients and verify the AAFCO completeness statement. Still check labels — carb content varies widely by formulation.",
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
