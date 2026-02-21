import type { DietPrinciple, FoodItem } from "./types";

export const DIET_PRINCIPLES: DietPrinciple[] = [
  {
    title: "High Protein, Low Carb",
    description:
      "Cancer cells primarily feed on glucose. A diet high in quality protein and healthy fats, with minimal carbohydrates, can help starve cancer cells while nourishing your dog.",
    details: [
      "Aim for 40-50% high-quality animal protein",
      "Keep carbohydrates to 10-20% of the diet",
      "Most commercial kibble is 40-50% carbs — far too high",
      "Protein sources: lean meats, organ meats, fish, eggs",
    ],
    icon: "protein.png",
  },
  {
    title: "Healthy Fats Are Essential",
    description:
      "Cancer cells struggle to use fat as an energy source, but your dog can. Moderate healthy fats provide concentrated calories and support the immune system.",
    details: [
      "Omega-3 fatty acids (fish oil) are especially beneficial",
      "Include sources like salmon, sardines, and fish oil",
      "Coconut oil provides MCTs that may have anti-cancer properties",
      "Aim for 25-35% of calories from quality fats",
    ],
    icon: "healthy-fats.png",
  },
  {
    title: "Whole Foods Over Processed",
    description:
      "Fresh, whole foods provide more bioavailable nutrients than heavily processed kibble. Even adding fresh food toppers to existing diet can make a difference.",
    details: [
      "Lightly cooked food preserves nutrients better than heavily processed kibble",
      "Raw diets are popular but avoid raw meat during chemo (infection risk)",
      "Even 25% fresh food mixed into kibble can improve nutrition",
      "Rotate protein sources for a broader nutrient profile",
    ],
    icon: "whole-foods.png",
  },
  {
    title: "Small, Frequent Meals",
    description:
      "Cancer dogs often have reduced appetites. Smaller, more frequent meals can be easier to digest and help maintain caloric intake throughout the day.",
    details: [
      "3-4 smaller meals may be better tolerated than 2 large ones",
      "Warming food slightly can increase aroma and appeal",
      "Bone broth can be added as a nutrient-rich topper",
      "If appetite drops suddenly, contact your vet",
    ],
    icon: "small-meals.png",
  },
];

export const FOOD_CATEGORIES = [
  { key: "recommended", label: "Recommended Foods", accentColor: "var(--sage)" },
  { key: "avoid", label: "Foods to Avoid", accentColor: "var(--terracotta)" },
  { key: "appetite", label: "Appetite Boosters", accentColor: "var(--gold)" },
] as const;

export const FOOD_ITEMS: FoodItem[] = [
  // ── Recommended ──
  {
    name: "Lean Meats",
    description:
      "Chicken breast, turkey, lean beef, and bison are excellent protein sources. Lightly cook without seasoning. These provide essential amino acids for muscle maintenance and immune function.",
    category: "recommended",
    icon: "chicken.png",
    tip: "Cook without seasoning — simple is best",
  },
  {
    name: "Organ Meats",
    description:
      "Liver, kidney, and heart are nutrient-dense superfoods. They contain high levels of B vitamins, iron, and CoQ10. Feed in small amounts (about 5-10% of diet) to avoid vitamin A excess.",
    category: "recommended",
    icon: "organ-meats.png",
    tip: "Keep to 5-10% of the total diet",
  },
  {
    name: "Fatty Fish",
    description:
      "Salmon, sardines, mackerel, and anchovies are rich in omega-3 fatty acids (EPA/DHA). These anti-inflammatory fats may help slow tumor growth and improve quality of life.",
    category: "recommended",
    icon: "fish.png",
    tip: "Sardines are the easiest — just pop open a can",
    breedNotes: {
      "golden retriever":
        "Goldens love fish and especially benefit from the omega-3s for both cancer support and coat health.",
    },
  },
  {
    name: "Eggs",
    description:
      "A complete protein source with healthy fats, vitamins, and minerals. Cooked eggs are easier to digest. They also provide choline for liver support.",
    category: "recommended",
    icon: "egg.png",
    tip: "Scramble or soft-boil for easy digestion",
  },
  {
    name: "Blueberries",
    description:
      "Low in sugar and packed with antioxidants, blueberries are one of the best fruit options. Their anthocyanins have been studied for anti-cancer properties.",
    category: "recommended",
    icon: "blueberries.png",
    tip: "Freeze them for a crunchy summer treat",
  },
  {
    name: "Leafy Greens",
    description:
      "Kale, spinach, and broccoli sprouts contain cancer-fighting compounds. Lightly steam or puree for better digestibility — dogs can't break down raw plant cell walls well.",
    category: "recommended",
    icon: "leafy-greens.png",
    tip: "Steam and blend into food for best absorption",
  },
  {
    name: "Cruciferous Vegetables",
    description:
      "Broccoli, cauliflower, Brussels sprouts, and cabbage contain sulforaphane and other compounds studied for anti-cancer effects. Steam lightly and chop finely.",
    category: "recommended",
    icon: "broccoli.png",
    tip: "Chop finely after steaming for easy eating",
  },
  {
    name: "Bone Broth",
    description:
      "Rich in glycine, collagen, and minerals. Bone broth supports gut health, provides hydration, and is often well-tolerated even when appetite is low. Make or buy unseasoned versions.",
    category: "recommended",
    icon: "bone-broth.png",
    tip: "Make a big batch and freeze in ice cube trays",
  },
  {
    name: "Pumpkin",
    description:
      "Plain canned pumpkin (not pie filling) is excellent for digestive health. It provides soluble fiber that helps with both diarrhea and constipation — common during treatment.",
    category: "recommended",
    icon: "pumpkin.png",
    tip: "A tablespoon mixed into food does wonders",
  },

  // ── Foods to Avoid ──
  {
    name: "High-Sugar Fruits",
    description:
      "Grapes and raisins are toxic. Avoid high-sugar fruits like bananas and mangoes in large quantities. Sugar feeds cancer cells — minimize simple sugars in the diet.",
    category: "avoid",
    icon: "sugar.png",
  },
  {
    name: "Grains & Wheat",
    description:
      "Wheat, corn, and rice are high in carbohydrates that convert to glucose. Most commercial kibble is grain-heavy. If you must use kibble, choose grain-free, low-carb options.",
    category: "avoid",
    icon: "grains.png",
  },
  {
    name: "Corn & Soy",
    description:
      "Common cheap fillers in commercial dog food. They provide little nutritional value, are high in carbohydrates, and soy contains phytoestrogens that may affect hormonal cancers.",
    category: "avoid",
    icon: "corn.png",
  },
  {
    name: "Processed Treats",
    description:
      "Most commercial treats are loaded with sugar, artificial colors, and preservatives. Swap for small pieces of cooked meat, freeze-dried liver, or blueberries.",
    category: "avoid",
    icon: "processed-treats.png",
  },
  {
    name: "Raw Meat During Chemo",
    description:
      "While raw diets have advocates, raw meat carries bacteria that can be dangerous for immunocompromised dogs undergoing chemotherapy. Lightly cook all meats during treatment.",
    category: "avoid",
    icon: "raw-meat.png",
    stageEmphasis: "advanced",
  },

  // ── Appetite Boosters ──
  {
    name: "Warm the Food",
    description:
      "Gently warming food releases aromas that stimulate appetite. Microwave for 10-15 seconds or add warm bone broth. Always test temperature before serving.",
    category: "appetite",
    icon: "warm-bowl.png",
  },
  {
    name: "Bone Broth Toppers",
    description:
      "Pour warm, unseasoned bone broth over food as an irresistible topper. It adds flavor, nutrients, and hydration. Many dogs who refuse food will still lap up bone broth.",
    category: "appetite",
    icon: "bone-broth.png",
  },
  {
    name: "Hand-Feeding",
    description:
      "Sometimes dogs who won't eat from a bowl will eat from your hand. It provides comfort and reassurance. Don't be embarrassed — this is love in action.",
    category: "appetite",
    icon: "hand-feeding.png",
  },
  {
    name: "High-Value Proteins",
    description:
      "When appetite drops, reach for the good stuff: rotisserie chicken (unseasoned), scrambled eggs, cottage cheese, or baby food meat (check ingredients for onion/garlic).",
    category: "appetite",
    icon: "chicken.png",
  },
  {
    name: "Small Frequent Meals",
    description:
      "Instead of 2 big meals, offer 4-6 small portions throughout the day. A quarter cup of food every few hours may be more manageable than a full bowl twice a day.",
    category: "appetite",
    icon: "small-meals.png",
  },
  {
    name: "Rotate Proteins",
    description:
      "Cancer treatment can cause food aversions. If your dog suddenly refuses chicken, try turkey, beef, or fish. Rotating proteins prevents flavor fatigue and broadens nutrient intake.",
    category: "appetite",
    icon: "fish.png",
  },
];
