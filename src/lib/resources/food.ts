import type { DietPrinciple, FoodItem } from "./types";

export const DIET_PRINCIPLES: DietPrinciple[] = [
  {
    title: "High Protein, Low Carb",
    description:
      "Cancer cells rely heavily on glucose for energy (the Warburg effect). A diet high in quality protein and healthy fats, with reduced carbohydrates, may help limit the fuel available to tumors while nourishing your dog. This approach is theoretically promising but has not yet been proven to improve survival in controlled canine trials.",
    details: [
      "Aim for 40-50% high-quality animal protein",
      "Reduce carbohydrates where practical — most kibble is 40-50% carbs",
      "A 2024 Frontiers in Veterinary Science review recommends ~25% complex carbohydrates based on glycemic index",
      "Protein sources: lean meats, organ meats, fish, eggs",
      "Important: high-protein, high-fat diets are not appropriate for dogs with kidney disease, liver disease, pancreatitis, or GI conditions — discuss with your vet",
    ],
    icon: "protein.png",
    deepDive: [
      "The science behind this principle dates back to research by Otto Warburg, who observed in the 1920s that cancer cells metabolize glucose at a dramatically higher rate than normal cells — a phenomenon now called the Warburg effect (his 1931 Nobel Prize was awarded for related work on respiratory enzymes). While normal cells can efficiently use fats and proteins for energy, many cancer cells are heavily dependent on glucose. The theory is that reducing dietary carbohydrates limits available glucose for tumors. Important caveat: the Warburg effect has not been confirmed in all canine tumor types, and no controlled clinical trial has yet demonstrated that a low-carbohydrate diet improves survival in dogs with cancer. The approach is mechanistically plausible and widely used in integrative oncology, but should be understood as promising rather than proven.",
      "Veterinary oncologist Dr. Gregory Ogilvie at Colorado State University demonstrated this directly in dogs with lymphoma. His research showed that dogs with cancer have measurably altered carbohydrate metabolism — their bodies process glucose differently, and elevated blood lactate levels (a byproduct of cancer's glucose consumption) are common. These metabolic changes persisted even after chemotherapy-induced remission, suggesting the dietary approach should be maintained throughout treatment and beyond.",
      "High-quality animal protein is critical because dogs with cancer often lose muscle mass (cancer cachexia). Protein provides the amino acids needed to maintain muscle, support immune function, and help the body repair tissues damaged by treatment. Unlike carbohydrates, protein does not preferentially fuel cancer growth. Focus on easily digestible animal proteins like chicken, turkey, fish, and eggs rather than plant-based proteins, which are less bioavailable for dogs.",
    ],
    references: [
      {
        authors: "Ogilvie GK, Vail DM, Wheeler SL, et al.",
        title:
          "Effects of chemotherapy and remission on carbohydrate metabolism in dogs with lymphoma",
        journal: "Cancer",
        year: 1992,
        pmid: "1727668",
        summary:
          "Demonstrated that dogs with lymphoma have significantly altered carbohydrate metabolism, with elevated blood lactate and insulin levels that persist even after remission.",
      },
      {
        authors: "Seyfried TN, Shelton LM",
        title: "Cancer as a metabolic disease",
        journal: "Nutrition & Metabolism",
        year: 2010,
        pmid: "20181022",
        summary:
          "Comprehensive review presenting evidence that cancer is primarily a disease of energy metabolism, supporting dietary interventions that target the metabolic vulnerabilities of cancer cells.",
      },
    ],
  },
  {
    title: "Healthy Fats Are Essential",
    description:
      "Cancer cells struggle to use fat as an energy source, but your dog can. Moderate healthy fats provide concentrated calories and support the immune system.",
    details: [
      "Omega-3 fatty acids (fish oil) are especially beneficial",
      "Include sources like salmon, sardines, and fish oil",
      "Coconut oil provides MCTs as a quick energy source (no anti-cancer evidence, but useful for calories)",
      "Aim for 25-35% of calories from quality fats",
    ],
    icon: "healthy-fats.png",
    deepDive: [
      "Fats are the unsung hero of a cancer-fighting diet. While cancer cells thrive on glucose, they are remarkably inefficient at using fat for energy. Your dog's healthy cells, however, can use fat just fine — making dietary fat a way to provide calories that nourish your dog while offering less fuel to the tumor. This is why a cancer diet shifts calories away from carbohydrates and toward healthy fats.",
      "The most important fats are omega-3 fatty acids, specifically EPA and DHA found in fish oil. A landmark study by Dr. Ogilvie showed that dogs with lymphoma who received fish oil supplementation alongside chemotherapy had significantly longer disease-free intervals and overall survival times compared to dogs receiving the same chemotherapy without fish oil. The omega-3s appear to work by reducing inflammation, modulating immune function, and potentially inhibiting tumor growth and metastasis.",
      "Beyond fish oil, a mix of healthy fats provides the best results. Coconut oil offers medium-chain triglycerides (MCTs) that are quickly absorbed and used for energy — useful for caloric density, though there is no evidence of anti-cancer properties in dogs. Use in moderation, as high saturated fat intake can contribute to pancreatitis. Olive oil provides monounsaturated fats with anti-inflammatory properties. The goal is 25-35% of total calories from fat — significantly higher than most commercial dog foods provide. If your dog is underweight from cancer cachexia, increasing fat content is one of the fastest ways to boost caloric density without adding carbohydrates. Note: an optimal dose of fish oil has not been established — CSU states this directly — so introduce gradually and watch for GI effects.",
    ],
    references: [
      {
        authors: "Ogilvie GK, Fettman MJ, Mallinckrodt CH, et al.",
        title:
          "Effect of fish oil, arginine, and doxorubicin chemotherapy on remission and survival time for dogs with lymphoma: a double-blind, randomized placebo-controlled study",
        journal: "Cancer",
        year: 2000,
        pmid: "10760770",
        summary:
          "Dogs with lymphoma receiving fish oil and arginine alongside doxorubicin had significantly longer disease-free intervals and survival times compared to controls.",
      },
      {
        authors: "Calder PC",
        title:
          "Omega-3 fatty acids and inflammatory processes: from molecules to man",
        journal: "Biochemical Society Transactions",
        year: 2017,
        pmid: "28900017",
        summary:
          "Comprehensive review demonstrating that omega-3 fatty acids reduce production of inflammatory mediators, modulate immune cell function, and may help resolve chronic inflammation associated with cancer.",
      },
    ],
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
    deepDive: [
      "The gap between fresh food and commercial kibble is wider than most pet owners realize. Kibble is manufactured at extremely high temperatures (up to 400\u00b0F) that destroy heat-sensitive vitamins, denature proteins, and create potentially harmful compounds like advanced glycation end-products (AGEs) and heterocyclic amines — the same carcinogenic compounds produced when meat is charred. Synthetic vitamins are added back, but they are often less bioavailable than their whole-food counterparts.",
      "Large-scale human studies have found significant associations between ultra-processed food consumption and increased cancer risk. While equivalent studies in dogs are limited, research comparing dogs fed raw or lightly cooked diets versus kibble has shown measurable differences in metabolic markers, microbiome composition, and clinical health indicators. Dogs fed fresh diets tend to have improved blood lipid profiles and different metabolomic signatures compared to kibble-fed dogs.",
      "You don't need to go fully homemade overnight. Even adding 25% fresh food as a topper to your dog's existing diet can improve nutrient intake. Start with simple additions: a scrambled egg, some steamed vegetables, a spoonful of canned pumpkin, or a sardine. If you do transition to a fully home-prepared diet, work with a veterinary nutritionist to ensure completeness — cancer dogs have specific needs for calories, protein, and micronutrients that a balanced formulation should address.",
    ],
    references: [
      {
        authors: "Fiolet T, Srour B, Sellem L, et al.",
        title:
          "Consumption of ultra-processed foods and cancer risk: results from NutriNet-Sant\u00e9 prospective cohort",
        journal: "BMJ",
        year: 2018,
        pmid: "29444771",
        summary:
          "A study of 104,980 people found that a 10% increase in ultra-processed food consumption was associated with a significant 10-12% increase in overall cancer risk.",
      },
      {
        authors: "Hiney KM, Sypniewski LA, Rudra P, et al.",
        title:
          "Clinical health markers in dogs fed raw meat-based or commercial extruded kibble diets",
        journal: "Journal of Animal Science",
        year: 2021,
        pmid: "33939804",
        summary:
          "Dogs fed raw meat-based diets showed differences in clinical health markers and metabolomic profiles compared to kibble-fed dogs, suggesting diet type has measurable physiological effects.",
      },
    ],
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
    deepDive: [
      "Cancer cachexia — the wasting syndrome of progressive weight loss and muscle deterioration — affects roughly 35% of dogs with cancer, with moderate to severe wasting in about 15%. It's driven by a complex interplay of tumor-produced factors, chronic inflammation, and metabolic changes that alter how the body processes nutrients. Cachexia is not simply \"not eating enough\" — it's a metabolic reprogramming that makes the body break down its own muscle and fat stores even when food is available.",
      "Meal frequency and presentation play a larger role in managing cachexia than most owners realize. Smaller, more frequent meals (3-4 per day instead of 2) reduce the metabolic burden on the digestive system and help maintain more stable blood sugar levels throughout the day. Studies on cancer cachexia management emphasize that early nutritional intervention — before significant weight loss occurs — is far more effective than trying to reverse cachexia once it's established. Start adjusting meal patterns at diagnosis, not when problems appear.",
      "Practical strategies matter as much as the science. Warming food to body temperature (about 100\u00b0F) releases volatile aromas that stimulate appetite. Bone broth is an excellent bridge — it provides hydration, glycine, collagen, and minerals in a form that even nauseous dogs will often accept. If your dog skips a meal, don't panic — offer something different an hour later. Track daily intake rather than individual meals, and report consistent appetite loss (more than 24-48 hours) to your vet, as it may indicate treatment side effects that can be managed.",
    ],
    references: [
      {
        authors: "Tisdale MJ",
        title: "Mechanisms of cancer cachexia",
        journal: "Physiological Reviews",
        year: 2009,
        pmid: "19342610",
        summary:
          "Definitive review of cancer cachexia mechanisms, explaining how tumor-derived factors and inflammatory cytokines drive muscle wasting and metabolic changes independent of food intake.",
      },
      {
        authors: "Michel KE, Sorenmo K, Shofer FS",
        title:
          "Evaluation of body condition and weight loss in dogs presented to a veterinary oncology service",
        journal: "Journal of Veterinary Internal Medicine",
        year: 2004,
        pmid: "15515586",
        summary:
          "Found that weight loss was common in dogs at oncology presentation, with 4% classified as emaciated. The study did not assess survival outcomes but highlighted the need for early nutritional assessment in canine cancer patients.",
      },
    ],
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
      "Wheat, corn, and rice are high in carbohydrates that convert to glucose. Most commercial kibble is grain-heavy. If you must use kibble, look for lower-carb options. Important: the FDA has been investigating a link between grain-free, legume-heavy diets and dilated cardiomyopathy (DCM) since 2018 — if going grain-free, choose formulas that don't rely heavily on peas, lentils, or potatoes as primary ingredients.",
    category: "avoid",
    icon: "grains.png",
  },
  {
    name: "Corn & Soy",
    description:
      "Common fillers in commercial dog food that are high in carbohydrates. Corn does provide some linoleic acid but is primarily a starch source in kibble. Soy contains phytoestrogens that can influence estrogen levels, though the link to tumor outcomes in dogs is unproven. Minimizing both helps reduce overall carbohydrate load.",
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
