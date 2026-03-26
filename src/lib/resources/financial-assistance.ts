// ──────────────────────────────────────────────────────────────
// Financial Assistance — resources for families facing treatment costs
// HSA treatment can run $5,000–$15,000+. Nobody should have to
// give up on their dog because they can't afford care.
// ──────────────────────────────────────────────────────────────

export interface FinancialOrg {
  slug: string;
  name: string;
  description: string;
  focus: string;
  url: string;
  typicalAmount: string;
  turnaround: string;
  eligibility: string[];
  tags: ("grant" | "loan" | "financing" | "cancer-specific" | "emergency" | "national")[];
  accentColor: string;
}

export interface ApplicationTip {
  title: string;
  detail: string;
}

export const FINANCIAL_INTRO = {
  title: "Financial Help",
  subtitle: "Finding help with treatment costs",
  description:
    "An HSA diagnosis often comes with an overwhelming price tag — emergency surgery, chemotherapy, imaging, and ongoing monitoring can add up fast. You should never have to choose between your dog's life and financial ruin. These organizations exist specifically to help.",
  importantNote:
    "Many of these programs have limited funding and application windows. Apply to multiple organizations simultaneously — do not wait for one rejection before trying the next. Your oncologist's office may also have information about local or breed-specific funds not listed here.",
};

export const FINANCIAL_ORGS: FinancialOrg[] = [
  {
    slug: "magic-bullet-fund",
    name: "The Magic Bullet Fund",
    description:
      "One of the few organizations specifically dedicated to helping dogs with cancer. Founded by a family who lost their dog to cancer and understood firsthand how costs can spiral. They have helped thousands of dogs receive treatment they otherwise could not have afforded.",
    focus: "Grants specifically for dogs diagnosed with cancer",
    url: "https://www.themagicbulletfund.org",
    typicalAmount: "Varies — they work directly with your vet to cover specific treatment costs",
    turnaround: "1-2 weeks (can be faster for urgent cases)",
    eligibility: [
      "Dog must have a cancer diagnosis from a veterinarian",
      "Owner must demonstrate financial need",
      "Funds are paid directly to the veterinary clinic, not to the owner",
      "Must provide veterinary records and treatment plan",
    ],
    tags: ["grant", "cancer-specific", "national"],
    accentColor: "var(--sage)",
  },
  {
    slug: "brown-dog-foundation",
    name: "Brown Dog Foundation",
    description:
      "Focuses on the gap between what pet owners can afford and the cost of treatment. They specifically help families who do not qualify for other assistance — people who earn too much for charity care but not enough to cover a $10,000 vet bill. They call this 'bridge funding.'",
    focus: "Bridge-the-gap funding for pet owners with income but not enough savings",
    url: "https://www.browndogfoundation.org",
    typicalAmount: "Up to $1,500 per case (paid directly to veterinary provider)",
    turnaround: "48-72 hours for initial review",
    eligibility: [
      "Must demonstrate financial need — but specifically designed for working families",
      "Pet must be current on basic veterinary care",
      "Must have a diagnosis and treatment plan from a licensed vet",
      "Owner must contribute to the cost — this is bridge funding, not full coverage",
    ],
    tags: ["grant", "national"],
    accentColor: "var(--gold)",
  },
  {
    slug: "redrover-relief",
    name: "RedRover Relief",
    description:
      "Part of the larger RedRover organization (formerly United Animal Nations). Their Relief program provides emergency financial assistance for animals in crisis situations, including urgent medical needs. They have awarded millions in grants since their founding.",
    focus: "Emergency and urgent care financial assistance",
    url: "https://redrover.org/relief/",
    typicalAmount: "Up to $200 per grant (smaller but fast)",
    turnaround: "24-48 hours for emergency cases",
    eligibility: [
      "Situation must be urgent or emergent",
      "Owner must demonstrate financial hardship",
      "Animal must be a personal pet (not breeding stock or working animals)",
      "Must provide documentation from treating veterinarian",
    ],
    tags: ["grant", "emergency", "national"],
    accentColor: "var(--terracotta)",
  },
  {
    slug: "pet-fund",
    name: "The Pet Fund",
    description:
      "A nonprofit that provides financial assistance for owners of domestic animals who need veterinary care beyond basic preventive services. They focus on non-routine, medically necessary care — exactly the kind of treatment HSA requires.",
    focus: "Grants for non-basic, non-cosmetic veterinary care",
    url: "https://www.thepetfund.com",
    typicalAmount: "Varies by case and available funding",
    turnaround: "2-4 weeks (not ideal for emergencies)",
    eligibility: [
      "Must complete an application with veterinary documentation",
      "Treatment must be non-elective and medically necessary",
      "Owner must demonstrate financial need",
      "Funds are sent directly to the veterinary provider",
    ],
    tags: ["grant", "national"],
    accentColor: "var(--sage)",
  },
  {
    slug: "frankies-friends",
    name: "Frankie's Friends",
    description:
      "A national foundation focused on helping pets receive emergency and specialty care. They partner directly with veterinary specialty hospitals, which makes the process faster. If your oncologist works at a Frankie's Friends partner hospital, the application process can be streamlined.",
    focus: "Emergency and specialty veterinary care grants",
    url: "https://www.frankiesfriends.org",
    typicalAmount: "Up to $1,000 per case (larger grants in special circumstances)",
    turnaround: "1-3 business days",
    eligibility: [
      "Pet must be treated at a participating veterinary hospital",
      "Owner must demonstrate financial need",
      "Must have an estimated treatment plan and cost from the vet",
      "Application is usually submitted by the veterinary hospital on your behalf",
    ],
    tags: ["grant", "emergency", "national"],
    accentColor: "var(--gold)",
  },
  {
    slug: "mosby-foundation",
    name: "The Mosby Foundation",
    description:
      "Dedicated to helping animals with cancer and other serious illnesses. Named after a dog who was rescued and later diagnosed with cancer, the foundation understands the HSA journey firsthand. They provide grants to help cover the costs of diagnosis and treatment.",
    focus: "Cancer treatment and serious illness financial assistance",
    url: "https://www.themosbyfoundation.org",
    typicalAmount: "Varies — works with your vet on a case-by-case basis",
    turnaround: "1-2 weeks",
    eligibility: [
      "Dog must have a cancer or serious illness diagnosis",
      "Owner must demonstrate financial need",
      "Must provide veterinary records",
      "Must be willing to share your dog's story to help raise awareness",
    ],
    tags: ["grant", "cancer-specific", "national"],
    accentColor: "var(--terracotta)",
  },
  {
    slug: "face-foundation",
    name: "FACE Foundation",
    description:
      "The Foundation for Animal Care and Education (FACE) primarily serves the San Diego, California area but accepts applications nationally for emergency cases. They have saved thousands of animals by funding life-saving treatment their owners could not otherwise afford.",
    focus: "Life-saving veterinary care, with focus on Southern California",
    url: "https://face4pets.org",
    typicalAmount: "Varies — they cover treatment costs directly with the vet",
    turnaround: "24-72 hours for emergencies",
    eligibility: [
      "Treatment must be life-saving or significantly life-improving",
      "Owner must demonstrate financial hardship",
      "Priority given to San Diego area residents, but national cases considered",
      "Must have a treatment plan from a licensed veterinarian",
    ],
    tags: ["grant", "emergency", "national"],
    accentColor: "var(--sage)",
  },
  {
    slug: "carecredit",
    name: "CareCredit",
    description:
      "A healthcare credit card accepted at most veterinary clinics and emergency hospitals. Not a grant — this is a financing option with promotional interest rates. The key advantage: you can apply online in minutes and get an instant decision, which is critical during an emergency when you need to approve surgery right now. Many families use CareCredit for the immediate emergency and then apply for grants to help pay it down.",
    focus: "Healthcare financing with promotional interest rates",
    url: "https://www.carecredit.com",
    typicalAmount: "Credit lines from $200 to $25,000+ depending on approval",
    turnaround: "Instant approval decision online",
    eligibility: [
      "Must pass a credit check (minimum credit score required)",
      "Often offers 0% promotional APR for 6-24 months on qualifying purchases",
      "Interest rates after the promotional period can be high (26.99% APR typical) — pay it off during the promo period",
      "Accepted at most veterinary clinics — ask your vet's front desk",
    ],
    tags: ["financing", "national"],
    accentColor: "var(--gold)",
  },
  {
    slug: "scratchpay",
    name: "Scratchpay",
    description:
      "A newer financing option designed specifically for veterinary care. Offers payment plans with clear terms and no hidden fees. The application process is entirely online and takes minutes. Unlike CareCredit, Scratchpay is more transparent about rates and offers plans even for applicants with lower credit scores.",
    focus: "Simple, transparent payment plans for veterinary care",
    url: "https://scratchpay.com",
    typicalAmount: "Payment plans from $200 to $10,000+",
    turnaround: "Instant approval decision",
    eligibility: [
      "Must complete online application (soft credit check — does not affect credit score)",
      "Offers plans for a range of credit profiles",
      "Interest rates vary from 0% to 24.99% depending on plan and credit",
      "Must be used at a Scratchpay partner veterinary clinic",
    ],
    tags: ["financing", "national"],
    accentColor: "var(--terracotta)",
  },
];

export const APPLICATION_TIPS: ApplicationTip[] = [
  {
    title: "Apply to multiple organizations at the same time",
    detail:
      "Do not wait for one rejection before trying the next. Many of these funds have limited budgets and application windows. Submitting to 3-4 organizations simultaneously maximizes your chances of getting help quickly.",
  },
  {
    title: "Ask your oncologist's office for help",
    detail:
      "Veterinary oncology clinics deal with the financial side of cancer treatment every day. They often know about local funds, breed-specific assistance programs, and hospital-specific payment plans that are not widely advertised. Some clinics have a social worker or financial coordinator on staff.",
  },
  {
    title: "Have your records ready before you apply",
    detail:
      "Every application will ask for: your dog's diagnosis, a treatment plan with estimated costs, and proof of financial need. Having these ready in advance speeds up the process dramatically. Ask your vet for a written treatment plan with line-item costs.",
  },
  {
    title: "Ask about clinical trials",
    detail:
      "Clinical trials often cover some or all treatment costs in exchange for your dog participating in the study. This is not experimental in a scary sense — it means your dog gets cutting-edge treatment, often at veterinary universities with the most experienced oncologists. Ask your vet: 'Are there any open clinical trials my dog might qualify for?'",
  },
  {
    title: "Consider a fundraiser as a bridge",
    detail:
      "Platforms like GoFundMe are used by thousands of pet owners facing cancer treatment costs. People want to help — especially when they can see exactly where their money is going. Be specific about costs, share your dog's story honestly, and update donors on progress. Even partial fundraising can close the gap between what you can afford and what the grants cover.",
  },
  {
    title: "Negotiate a payment plan directly with your vet",
    detail:
      "Before applying for outside help, ask your veterinary clinic if they offer in-house payment plans. Many will — especially for established clients. Some clinics will reduce fees or waive certain charges for financial hardship cases. It never hurts to ask, and most vets would rather work out a payment arrangement than see a dog go without treatment.",
  },
];
