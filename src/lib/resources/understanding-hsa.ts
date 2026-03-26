// ── Interfaces ──

export interface HSABasics {
  title: string;
  subtitle: string;
  intro: string;
}

export interface TumorLocation {
  id: string;
  name: string;
  percentage: string;
  description: string;
  symptoms: string[];
  prognosis: string;
  accentColor: string;
}

export interface StagingInfo {
  stage: string;
  title: string;
  description: string;
  medianSurvival: string;
}

export interface DiagnosticTest {
  name: string;
  whatItIs: string;
  whyItsUsed: string;
  whatToExpect: string;
}

export interface TreatmentPath {
  id: string;
  name: string;
  description: string;
  medianSurvival: string;
  costRange: string;
  details: string[];
  considerations: string;
}

export interface BreedRisk {
  breed: string;
  riskLevel: "high" | "moderate" | "some-evidence";
  notes: string;
}

export interface KeyFact {
  fact: string;
  context: string;
}

// ── Basics ──

export const HSA_BASICS: HSABasics = {
  title: "Understanding Hemangiosarcoma",
  subtitle: "What it is, what it means, and what comes next",
  intro:
    "Hemangiosarcoma (HSA) is a cancer that grows from the cells lining blood vessels. The name tells you what it is: hemangio means blood vessels, and sarcoma means a cancer of soft tissue. It is aggressive, it spreads quickly, and it is almost exclusively a disease of dogs. Most owners learn about it in an emergency room after their dog collapses from internal bleeding — and suddenly they need to understand a disease they have never heard of. This page is the starting point.",
};

// ── Key Facts ──

export const KEY_FACTS: KeyFact[] = [
  {
    fact: "HSA is the most common splenic tumor in dogs",
    context:
      "When a mass is found on the spleen, hemangiosarcoma is the most likely malignant diagnosis. However, not all splenic masses are cancer — roughly 50% turn out to be benign (hemangiomas or hematomas). You will not know for certain until histopathology results come back after surgery, which usually takes 5-7 business days.",
  },
  {
    fact: "About half of all splenic masses are benign",
    context:
      "This is important because many dogs undergo emergency splenectomy before a diagnosis is confirmed. If your dog is having surgery for a splenic mass, there is a real chance the news will be good. Histopathology — the microscopic examination of the removed tissue — is the only way to get a definitive answer. Until those results arrive, you are living in uncertainty. That is normal.",
  },
  {
    fact: "HSA is highly metastatic — it often spreads before it is found",
    context:
      "Because HSA grows inside blood vessels, it has direct access to the bloodstream. By the time a tumor is large enough to detect or cause symptoms, microscopic cancer cells have frequently already traveled to other organs. This is why treatment focuses on managing the disease rather than curing it in most cases. It is not because your vet missed something — it is the nature of this cancer.",
  },
  {
    fact: "It is usually silent until a crisis",
    context:
      "HSA tumors can grow for weeks or months without any obvious symptoms. Dogs often appear completely healthy right up until a tumor ruptures and causes internal bleeding. Many owners say their dog was running and playing normally just days before diagnosis. This is not because you missed warning signs — HSA simply does not give them in most cases.",
  },
  {
    fact: "Golden Retrievers have roughly a 1 in 5 lifetime risk",
    context:
      "While any dog can develop HSA, certain breeds are significantly more susceptible. Golden Retrievers, German Shepherds, and Labrador Retrievers are at the highest risk. The Golden Retriever Lifetime Study, funded by Morris Animal Foundation, is actively working to understand why. Screening with abdominal ultrasound starting around age 6-7 is increasingly recommended for high-risk breeds.",
  },
  {
    fact: "This is not caused by anything you did or did not do",
    context:
      "HSA is driven by genetic factors and the biology of how blood vessels form and repair themselves over a lifetime. It is not caused by diet, vaccines, exercise habits, or any choice you made as an owner. The guilt many people feel after diagnosis is real, but it is not warranted. You did not cause this, and you could not have prevented it.",
  },
  {
    fact: "There are zero reliable early detection methods for HSA",
    context:
      "Unlike many cancers in human medicine, there is currently no blood test, imaging protocol, or screening tool that can reliably detect hemangiosarcoma before it reaches an advanced stage. This is why research into early detection biomarkers is one of the most critical areas of HSA research. Several studies — including the Shine On Study's SOS test — are working to change this, but as of now, no validated early detection method exists.",
  },
];

// ── Tumor Locations ──

export const TUMOR_LOCATIONS: TumorLocation[] = [
  {
    id: "spleen",
    name: "Spleen",
    percentage: "50-65% of cases",
    description:
      "The spleen is the most common site for hemangiosarcoma. Splenic HSA often grows silently until the tumor ruptures, causing sudden internal bleeding (hemoabdomen). Many cases are discovered during an emergency visit for sudden collapse or weakness. In some dogs, the mass is found incidentally during an ultrasound or physical exam before a crisis occurs.",
    symptoms: [
      "Sudden weakness or collapse",
      "Pale or white gums",
      "Distended (bloated) abdomen",
      "Rapid or shallow breathing",
      "Lethargy and loss of appetite",
      "Episodes of weakness that resolve on their own (small bleeds that stop)",
    ],
    prognosis:
      "With splenectomy (surgical removal of the spleen) alone, median survival is 1-3 months. Adding doxorubicin chemotherapy extends that to approximately 5-6 months. A small percentage of dogs — roughly 10% — survive past one year with aggressive treatment. Dogs can live a normal life without a spleen. The surgery itself is not the hard part; what matters is whether the cancer has already spread.",
    accentColor: "var(--terracotta)",
  },
  {
    id: "heart",
    name: "Heart (Right Atrium)",
    percentage: "5-25% of cases",
    description:
      "Cardiac HSA most commonly grows on the right atrium, the upper-right chamber of the heart. As the tumor grows or bleeds, blood collects in the pericardial sac — the thin membrane surrounding the heart. This is called pericardial effusion. When enough fluid accumulates, it compresses the heart and prevents it from filling properly, a life-threatening condition called cardiac tamponade.",
    symptoms: [
      "Sudden weakness or collapse",
      "Muffled heart sounds (detected by your vet)",
      "Distended jugular veins",
      "Exercise intolerance — tiring easily on walks",
      "Rapid breathing or panting at rest",
      "Fainting episodes",
    ],
    prognosis:
      "Cardiac HSA carries a more guarded prognosis than splenic HSA. Surgical removal is more complex and not always possible depending on tumor size and location. With surgery and chemotherapy, median survival is approximately 4 months. Pericardiocentesis (draining fluid from around the heart with a needle) can provide immediate relief during a crisis but is a temporary measure. Some dogs need repeated drainage procedures.",
    accentColor: "var(--terracotta)",
  },
  {
    id: "liver",
    name: "Liver",
    percentage: "5-6% of cases",
    description:
      "Hepatic (liver) HSA can occur as a primary tumor or as a metastatic site — meaning the cancer started elsewhere and spread to the liver. When it is primary, it may appear as a single large mass or multiple smaller masses throughout the liver. Liver involvement is often discovered during staging workup (the ultrasound and imaging done after the initial diagnosis) rather than as the first finding.",
    symptoms: [
      "Loss of appetite or weight loss",
      "Lethargy and general weakness",
      "Vomiting",
      "Distended abdomen (from bleeding or fluid accumulation)",
      "Jaundice (yellowing of the gums, eyes, or skin) in advanced cases",
      "Collapse from internal bleeding if a liver mass ruptures",
    ],
    prognosis:
      "Prognosis depends heavily on whether the liver tumor is primary or metastatic. A solitary primary liver mass may be treated with partial hepatectomy (removing the affected liver lobe), and some dogs do relatively well afterward. When multiple liver masses are present, or when the liver is a metastatic site from splenic or cardiac HSA, options are more limited. Median survival varies widely based on staging and response to treatment.",
    accentColor: "var(--gold)",
  },
  {
    id: "skin",
    name: "Skin and Subcutaneous",
    percentage: "13-17% of cases",
    description:
      "HSA can also develop in the skin (dermal) or just beneath it (subcutaneous). This is the one location where the prognosis can be significantly better — particularly for dermal tumors caught early. Dermal HSA appears as a red, raised, or dark mass on the skin surface, often on areas with less hair or more sun exposure (though sun exposure is not the only cause in dogs). Subcutaneous tumors are deeper, felt as lumps under the skin, and behave more aggressively than dermal ones.",
    symptoms: [
      "A visible red, purple, or dark mass on the skin surface (dermal)",
      "A firm lump felt beneath the skin (subcutaneous)",
      "Bleeding or bruising at the tumor site",
      "Growth or color change in an existing skin mass",
      "May be found incidentally during grooming or petting",
    ],
    prognosis:
      "Dermal HSA caught at Stage I is the one form of this disease that can potentially be cured. Wide surgical excision with clean margins can result in survival times exceeding two years — some studies report median survival over 780 days for Stage I dermal HSA. This is dramatically better than visceral (internal organ) HSA. Subcutaneous HSA, however, has a worse prognosis than dermal because it tends to invade deeper tissue and metastasize. Early detection and complete surgical removal are critical for the best outcome.",
    accentColor: "var(--sage)",
  },
];

// ── Staging ──

export const STAGING_INFO: StagingInfo[] = [
  {
    stage: "I",
    title: "Stage I — Confined to the Primary Site",
    description:
      "The tumor is contained within the organ where it started (spleen, heart, liver, or skin) and has not ruptured or spread. There is no evidence of metastasis on imaging. This is the best-case scenario at diagnosis, but it is also the least common for visceral (internal organ) HSA, because the disease is usually advanced before symptoms appear. Stage I is more commonly seen with dermal (skin) HSA, where a visible mass prompts early veterinary attention.",
    medianSurvival:
      "Varies by location and treatment. For splenic HSA with splenectomy plus chemotherapy, Stage I dogs may survive 6-12 months or longer. For dermal Stage I with complete surgical excision, survival can exceed two years.",
  },
  {
    stage: "II",
    title: "Stage II — Ruptured or Locally Spread",
    description:
      "The tumor has ruptured (causing bleeding) or has spread to nearby lymph nodes or surrounding tissues, but there is no evidence of distant metastasis on imaging. Many splenic HSA cases are diagnosed at Stage II because the first sign of disease is a rupture event. It is important to understand that \"no evidence of distant metastasis\" means none was visible on imaging — microscopic spread may already exist but be too small to detect.",
    medianSurvival:
      "For splenic HSA with surgery and chemotherapy, median survival for Stage II is approximately 5-6 months. Individual results vary. Some dogs exceed this significantly; others do not reach it.",
  },
  {
    stage: "III",
    title: "Stage III — Distant Metastasis",
    description:
      "Cancer has spread to distant organs. The lungs and liver are the most common metastatic sites. Stage III is, unfortunately, the most common stage at the time of diagnosis for visceral HSA. Even when the primary tumor appears contained, staging tests frequently reveal that the cancer has already traveled. This reflects the biology of HSA — growing inside blood vessels gives it a direct highway to the rest of the body.",
    medianSurvival:
      "Median survival with treatment is typically 2-4 months for Stage III splenic HSA. Without treatment, survival is measured in days to weeks. Some owners choose treatment to gain quality time, while others choose supportive care. Neither choice is wrong.",
  },
];

// ── Diagnostic Tests ──

export const DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  {
    name: "Abdominal Ultrasound",
    whatItIs:
      "A non-invasive imaging scan that uses sound waves to visualize the organs in the abdomen, including the spleen, liver, and kidneys.",
    whyItsUsed:
      "This is usually the first test that identifies a splenic or liver mass. It can detect tumors, free fluid in the abdomen (suggesting a rupture), and masses on other organs that may indicate metastasis. It is also used for ongoing monitoring after treatment.",
    whatToExpect:
      "Your dog will lie on their side or back, usually without sedation. The belly is shaved and gel is applied. The scan takes 20-30 minutes. It is painless. Results are typically available the same day. An ultrasound can identify that a mass exists, but it cannot tell you whether it is benign or malignant — that requires histopathology.",
  },
  {
    name: "Echocardiogram",
    whatItIs:
      "An ultrasound of the heart. It lets the veterinarian see the heart chambers, valves, and surrounding pericardial sac in real time.",
    whyItsUsed:
      "This is the primary tool for diagnosing cardiac HSA. It can detect masses on the heart (most commonly the right atrium), pericardial effusion (fluid around the heart), and how well the heart is functioning. It is also used to check for cardiac involvement in dogs with HSA diagnosed elsewhere.",
    whatToExpect:
      "Similar to an abdominal ultrasound. Your dog lies on their side, a small area of the chest is shaved, and the cardiologist uses a specialized probe. Most dogs tolerate it well without sedation. The scan takes 20-45 minutes. A board-certified veterinary cardiologist will provide the most accurate reading.",
  },
  {
    name: "Chest X-Rays (Thoracic Radiographs)",
    whatItIs:
      "Standard X-ray images of the chest, usually taken from three views: right side, left side, and a top-down view.",
    whyItsUsed:
      "Chest X-rays check for lung metastasis — one of the most common sites where HSA spreads. They are a standard part of the staging workup. If the lungs show visible metastatic nodules, it confirms Stage III disease and significantly affects treatment planning. Chest X-rays also help assess heart size and check for pleural effusion (fluid around the lungs).",
    whatToExpect:
      "Your dog will be positioned on the X-ray table, and images are taken from multiple angles. No sedation is usually required unless your dog is very anxious or in pain. The results are available within minutes. Important: normal-looking chest X-rays do not guarantee the lungs are free of cancer. Metastatic nodules must reach a certain size (usually a few millimeters) before they become visible on X-ray.",
  },
  {
    name: "CBC (Complete Blood Count)",
    whatItIs:
      "A blood test that measures the number and types of cells in your dog's blood, including red blood cells, white blood cells, and platelets.",
    whyItsUsed:
      "The CBC reveals critical information for HSA dogs. Anemia (low red blood cell count) is common due to bleeding, either from a rupture event or chronic slow leaking. Low platelet counts can indicate a clotting disorder called DIC (disseminated intravascular coagulation), which is a serious complication of HSA. The CBC is monitored repeatedly throughout treatment — before each chemo session, after bleeding episodes, and to track overall health.",
    whatToExpect:
      "A simple blood draw, usually from the jugular vein or a front leg. Results come back the same day, often within an hour at hospitals with in-house labs. Key numbers to learn: PCV/HCT (packed cell volume — measures anemia), platelet count, and white blood cell count. Your vet team will explain what your dog's specific numbers mean.",
  },
  {
    name: "Coagulation Panel",
    whatItIs:
      "A blood test that measures how well your dog's blood clots. It checks prothrombin time (PT), activated partial thromboplastin time (aPTT), fibrinogen, and D-dimers.",
    whyItsUsed:
      "HSA can cause a dangerous clotting disorder called DIC (disseminated intravascular coagulation), where the body uses up its clotting factors trying to manage tumor bleeding, leaving it unable to form normal clots. A coagulation panel identifies this problem. It is especially important before surgery — operating on a dog with uncorrected DIC is extremely risky. Elevated D-dimers can also suggest active bleeding or tumor activity.",
    whatToExpect:
      "Part of the same blood draw as the CBC. Processing takes a bit longer — results may take a few hours or be sent to an outside lab. If clotting times are abnormal, your vet may recommend a plasma transfusion before surgery to replace the depleted clotting factors.",
  },
  {
    name: "CT Scan (Computed Tomography)",
    whatItIs:
      "A detailed cross-sectional imaging scan that creates a 3D picture of your dog's body. It provides much more detail than standard X-rays or ultrasound.",
    whyItsUsed:
      "CT scans are used for precise staging — identifying the exact size and location of the primary tumor, checking for metastasis in the lungs, liver, and other organs, and planning surgery. They are particularly valuable for cardiac HSA and liver tumors where surgical approach matters. A CT scan can detect smaller metastatic nodules than chest X-rays can.",
    whatToExpect:
      "CT scans require general anesthesia or heavy sedation because your dog must stay completely still. The scan itself is fast — usually 10-15 minutes — but the anesthesia adds time. Your dog will need to fast beforehand. A contrast dye is usually injected to highlight blood vessels and tumors. Results are read by a veterinary radiologist. CT scans are more expensive than X-rays and ultrasound, typically $1,000-$2,500, and are available at specialty hospitals and veterinary schools.",
  },
];

// ── Treatment Paths ──

export const TREATMENT_PATHS: TreatmentPath[] = [
  {
    id: "surgery-alone",
    name: "Surgery Alone (Splenectomy)",
    description:
      "Surgical removal of the spleen (splenectomy) and any visible tumor. This is the most common emergency intervention and the first step in most treatment plans. Dogs can live a normal life without a spleen. Surgery addresses the immediate risk of bleeding and removes the primary tumor, but it does not treat cancer that may have already spread to other sites.",
    medianSurvival: "1-3 months (19-86 days)",
    costRange: "$2,000 - $5,000",
    details: [
      "Emergency splenectomy is often performed the same day as diagnosis when the dog presents with internal bleeding",
      "Recovery from surgery takes 10-14 days, with activity restriction for 2-3 weeks",
      "Histopathology of the removed spleen provides the definitive diagnosis — results take 5-7 business days",
      "If the mass turns out to be benign (about 50% chance), no further cancer treatment is needed and prognosis is excellent",
      "If confirmed as HSA, your vet will discuss whether to add chemotherapy",
    ],
    considerations:
      "Surgery alone is often chosen when chemotherapy is not an option due to cost, the dog's age or other health conditions, or owner preference. It provides meaningful time for many families. The 1-3 month median means that roughly half of dogs live longer than this, and some significantly so. The quality of life during this time is usually good — dogs bounce back quickly from splenectomy.",
  },
  {
    id: "surgery-plus-doxorubicin",
    name: "Surgery + Doxorubicin Chemotherapy",
    description:
      "Splenectomy followed by a course of doxorubicin, the most studied and widely used chemotherapy drug for HSA. Doxorubicin is given intravenously every 2-3 weeks for 5-6 treatments. This is currently the standard-of-care protocol recommended by most veterinary oncologists.",
    medianSurvival: "5-6 months (141-179 days)",
    costRange: "$5,000 - $10,000+",
    details: [
      "Chemotherapy typically starts 10-14 days after surgery, once your dog has healed from the incision and bloodwork is stable",
      "Doxorubicin is given as an IV infusion at a veterinary oncology clinic — each session takes about 30-60 minutes",
      "Treatment involves 5-6 sessions spaced 2-3 weeks apart, for a total treatment period of roughly 3-4 months",
      "Side effects are generally mild in dogs compared to humans — most dogs maintain their appetite and energy between sessions",
      "The most common side effects are temporary nausea, decreased appetite for 1-2 days, mild lethargy, and occasionally diarrhea",
      "A small percentage of dogs (under 5%) have more serious reactions requiring hospitalization",
      "Doxorubicin has a cumulative dose limit due to cardiotoxicity — your oncologist tracks the total dose carefully",
    ],
    considerations:
      "This is the most well-studied treatment path and roughly doubles survival time compared to surgery alone. The 5-6 month median is an average — some dogs live much longer, and a small percentage reach one year. Side effects are manageable for most dogs, and quality of life during treatment is usually maintained. The decision often comes down to whether the cost and time commitment for vet visits feel right for your family. There is no wrong answer.",
  },
  {
    id: "surgery-plus-immunotherapy",
    name: "Surgery + Doxorubicin + Immunotherapy (eBAT)",
    description:
      "The most promising emerging protocol combines standard chemotherapy with eBAT, a targeted biologic therapy developed at the University of Minnesota. eBAT delivers a toxin directly to tumor blood vessel cells. A Phase II clinical trial showed improved survival compared to chemotherapy alone.",
    medianSurvival: "~6.5 months (197 days in Phase II trial)",
    costRange: "Variable — often available through clinical trials at reduced cost",
    details: [
      "eBAT (EGF bispecific angiotoxin) is given alongside doxorubicin, not instead of it",
      "The Phase II trial showed a median survival of 197 days compared to 133 days with doxorubicin alone",
      "Currently available at select veterinary academic centers, primarily through clinical trials",
      "Other immunotherapy approaches being studied include ELIAS dendritic cell vaccine (autologous cancer vaccine) and propranolol (a beta-blocker with anti-angiogenic properties)",
      "Clinical trial enrollment may cover some or all treatment costs",
      "Ask your oncologist whether your dog qualifies for any open HSA clinical trials",
    ],
    considerations:
      "Immunotherapy is where the most active HSA research is happening. Access is the main barrier — these treatments are primarily available at veterinary universities and large specialty hospitals. If you live near a veterinary school (University of Minnesota, Ohio State, UPenn, Colorado State, NC State, UC Davis), ask about open trials. Even if your dog does not qualify for a trial, the oncologists at these institutions see a high volume of HSA cases and may offer valuable perspective on treatment planning.",
  },
  {
    id: "metronomic-chemo",
    name: "Metronomic Chemotherapy",
    description:
      "A lower-dose oral chemotherapy approach that uses daily or every-other-day pills instead of high-dose IV infusions. Rather than directly killing cancer cells, metronomic chemo works by inhibiting the growth of new blood vessels (anti-angiogenesis) that tumors need to grow, and by stimulating the immune system. It is gaining popularity as an option that is gentler on dogs and easier for owners to manage at home.",
    medianSurvival: "Varies — comparable to or slightly less than standard doxorubicin in ongoing studies",
    costRange: "$50 - $200/month for medications",
    details: [
      "Typically uses cyclophosphamide (oral) at a low daily dose, sometimes combined with a non-steroidal anti-inflammatory drug (NSAID) like piroxicam",
      "Given at home as pills — no regular IV chemo visits required, though monitoring bloodwork visits are still needed",
      "Fewer and milder side effects than standard IV chemotherapy — most dogs tolerate it very well",
      "May be used as a standalone approach, after standard chemo, or when IV chemo is not an option",
      "Regular bloodwork (CBC) is monitored every 2-4 weeks to check for low white blood cell counts",
      "This is an active area of research — protocols are being refined as more data becomes available",
    ],
    considerations:
      "Metronomic chemo appeals to many families because it is lower-cost, given at home, and easier on the dog. It is a reasonable option when standard IV chemo is not feasible due to cost, geography, or concerns about side effects. The survival data is still maturing, but early results are encouraging. Some oncologists use it as a follow-up after completing a standard doxorubicin course. Discuss with your oncologist whether it is appropriate for your dog's specific situation.",
  },
  {
    id: "supportive-care",
    name: "Supportive Care (No Surgery or Chemo)",
    description:
      "Comfort-focused care without pursuing surgery or chemotherapy. This means managing symptoms, keeping your dog comfortable, and focusing on quality of life for whatever time remains. This is a valid, compassionate, and loving choice — and one that many families make for good reasons.",
    medianSurvival: "Days to weeks without surgery; highly individual",
    costRange: "Variable — typically lower overall, focused on comfort medications",
    details: [
      "Pain management with medications like gabapentin, tramadol, or NSAIDs as recommended by your vet",
      "Yunnan Baiyao to help manage bleeding episodes",
      "Anti-nausea medications if needed",
      "Nutritional support — feeding your dog whatever they enjoy eating",
      "Monitoring gum color and energy level daily as indicators of internal bleeding",
      "Having a clear plan with your vet for when quality of life declines — including in-home euthanasia options",
      "Focusing on good days: favorite walks, treats, time together",
    ],
    considerations:
      "Some dogs are not good candidates for surgery due to age, concurrent health problems, or the extent of the cancer. Some families cannot manage the financial cost of surgery and chemotherapy. Some owners look at the median survival statistics and decide they would rather focus on comfort than treatment. All of these are legitimate reasons. The decision not to pursue aggressive treatment is not giving up — it is choosing to prioritize your dog's comfort and your time together. Talk honestly with your vet about what supportive care looks like and how to plan for the end with as much peace as possible.",
  },
];

// ── Breed Risk ──

export const BREED_RISKS: BreedRisk[] = [
  {
    breed: "Golden Retriever",
    riskLevel: "high",
    notes:
      "Approximately 1 in 5 Golden Retrievers will develop hemangiosarcoma in their lifetime. This is the highest documented breed risk. The Morris Animal Foundation Golden Retriever Lifetime Study is actively researching why. Abdominal ultrasound screening starting at age 6-7 is increasingly recommended by oncologists.",
  },
  {
    breed: "German Shepherd",
    riskLevel: "high",
    notes:
      "4.17x higher risk than average breed. German Shepherds have a significantly elevated HSA risk, with a notably higher incidence of cardiac (right atrial) HSA compared to other breeds. Echocardiogram screening may be warranted for older dogs, particularly those showing exercise intolerance.",
  },
  {
    breed: "Labrador Retriever",
    riskLevel: "high",
    notes:
      "Labrador Retrievers are among the highest-risk breeds for HSA, with splenic HSA being particularly common. Their large size and popularity mean they represent a substantial number of HSA cases seen in veterinary practice.",
  },
  {
    breed: "Portuguese Water Dog",
    riskLevel: "moderate",
    notes:
      "Portuguese Water Dogs show a moderately elevated risk of HSA. Owners of this breed should be aware of the general signs — sudden weakness, pale gums, distended abdomen — and have a relationship with an emergency vet.",
  },
  {
    breed: "Bernese Mountain Dog",
    riskLevel: "moderate",
    notes:
      "Bernese Mountain Dogs are predisposed to several cancer types, including hemangiosarcoma. Their overall cancer risk is among the highest of any breed, and HSA is one of the more common forms they develop.",
  },
  {
    breed: "Flat-Coated Retriever",
    riskLevel: "moderate",
    notes:
      "Flat-Coated Retrievers have an elevated risk of multiple cancer types, including hemangiosarcoma. Cancer is the leading cause of death in this breed, with HSA being one of several common diagnoses.",
  },
  {
    breed: "Boxer",
    riskLevel: "moderate",
    notes:
      "Boxers have a moderately elevated HSA risk. They are also prone to other cardiac conditions, which can complicate diagnosis when cardiac symptoms appear — an echocardiogram helps distinguish between HSA and other heart diseases.",
  },
  {
    breed: "Skye Terrier",
    riskLevel: "moderate",
    notes:
      "Skye Terriers show a moderately elevated risk despite their smaller size. HSA is more commonly associated with large breeds, but this breed is a notable exception.",
  },
  {
    breed: "English Setter",
    riskLevel: "moderate",
    notes:
      "English Setters have a moderately elevated risk of developing hemangiosarcoma. As with most at-risk breeds, awareness of the warning signs and access to emergency care are the most important preparedness steps.",
  },
  {
    breed: "Vizsla",
    riskLevel: "some-evidence",
    notes:
      "Some studies suggest an elevated HSA incidence in Vizslas, though the evidence is less robust than for the highest-risk breeds. Vizsla owners should be aware of the disease but should not assume their dog will develop it.",
  },
  {
    breed: "Whippet",
    riskLevel: "some-evidence",
    notes:
      "Whippets and other sighthound breeds have appeared in some HSA case reports at rates that suggest a possible predisposition. More research is needed to confirm whether this represents a true breed-level risk.",
  },
  {
    breed: "Standard Poodle",
    riskLevel: "some-evidence",
    notes:
      "Standard Poodles appear in HSA literature as a breed with some elevated incidence. Their large size may be a contributing factor, as HSA is generally more common in medium-to-large breed dogs.",
  },
];

// ── Questions for Your Oncologist ──

export const ONCOLOGIST_QUESTIONS: string[] = [
  "What stage is the cancer, and how was it staged?",
  "Has the cancer spread beyond the primary site? What did the imaging show?",
  "What are my treatment options, and what does each one actually involve — schedule, medications, and visits?",
  "What are the expected survival times for each treatment option? What does the range look like, not just the median?",
  "What will treatment cost, start to finish? Are there payment plans or financial assistance programs?",
  "What are the realistic side effects of chemotherapy? What percentage of dogs have serious reactions?",
  "Are there any clinical trials my dog might qualify for, either here or at nearby veterinary schools?",
  "What should I watch for at home between appointments — what is normal and what warrants an emergency visit?",
  "How will we assess quality of life throughout treatment, and what would make you recommend stopping?",
  "What happens if I choose not to pursue treatment? What does supportive care look like, and what should I expect?",
];

// ── Episodic Weakness Warning ──

export interface WarningDetail {
  title: string;
  description: string;
  signs: string[];
  whatToDo: string;
}

export const EPISODIC_WEAKNESS_WARNING: WarningDetail = {
  title: "Episodic Weakness: The Early Warning Most Owners Miss",
  description:
    "One of the most important — and most commonly missed — signs of splenic HSA is episodic weakness. This happens when a tumor bleeds a small amount into the abdomen, causing sudden weakness or wobbliness. The body then reabsorbs the blood and clots the bleed on its own, so your dog appears to recover fully within 30 minutes to a few hours. Many owners chalk this up to 'getting older' or 'a bad day.' In reality, these episodes are small tumor bleeds — and each one is a warning that a larger, potentially fatal rupture could follow. If your dog has unexplained episodes of weakness that resolve on their own, tell your vet immediately and ask for an abdominal ultrasound.",
  signs: [
    "Sudden weakness or wobbliness lasting 15 minutes to a few hours, then full recovery",
    "Episodes of lethargy that seem to resolve completely on their own",
    "Intermittent pale gums that return to normal pink",
    "Reluctance to eat or drink during an episode, then returning to normal appetite",
    "Your dog seems 'off' for a few hours, then acts completely fine — this pattern repeating over days or weeks",
  ],
  whatToDo:
    "Do not wait for another episode. Tell your vet about the pattern and specifically ask: 'Could this be a splenic mass with intermittent bleeding?' Request an abdominal ultrasound. These episodes are your dog's body giving you a warning that many owners only recognize in hindsight. Acting on episodic weakness is one of the few ways HSA can be caught before a catastrophic rupture.",
};

// ── Clinical Trials ──

export interface ClinicalTrial {
  name: string;
  institution: string;
  description: string;
  status: "enrolling" | "active" | "completed" | "planned";
  type: string;
}

export const CLINICAL_TRIALS: ClinicalTrial[] = [
  {
    name: "eBAT (EGF Bispecific Angiotoxin)",
    institution: "University of Minnesota",
    description:
      "A targeted biologic therapy that delivers a toxin directly to tumor blood vessel cells. The Phase II trial showed median survival of 197 days when combined with doxorubicin, compared to 133 days with doxorubicin alone. This is one of the most promising emerging treatments for splenic HSA.",
    status: "active",
    type: "Immunotherapy",
  },
  {
    name: "Propranolol Study",
    institution: "University of Minnesota",
    description:
      "Investigating whether propranolol, a common beta-blocker heart medication, can slow HSA growth by blocking the stress hormones that HSA tumors exploit. Propranolol has shown anti-angiogenic (blood vessel growth blocking) properties in lab studies. The appeal: it is inexpensive, widely available, and well-tolerated.",
    status: "enrolling",
    type: "Repurposed Drug",
  },
  {
    name: "CAR-T Cell Therapy",
    institution: "Multiple centers",
    description:
      "Chimeric antigen receptor T-cell therapy engineers the dog's own immune cells to recognize and attack cancer. This approach has revolutionized treatment of certain human cancers and is being adapted for canine HSA. Early results are promising but the technology is still in early-stage trials.",
    status: "active",
    type: "Immunotherapy",
  },
  {
    name: "ELIAS Cancer Immunotherapy",
    institution: "ELIAS Animal Health",
    description:
      "An autologous cancer vaccine that uses the dog's own tumor tissue to train the immune system to fight the cancer. The treatment involves collecting tumor tissue during surgery, creating a personalized vaccine, and administering it alongside standard chemotherapy.",
    status: "active",
    type: "Cancer Vaccine",
  },
  {
    name: "Shine On Study (SOS Test)",
    institution: "Multiple veterinary universities",
    description:
      "A blood-based biomarker test in development that aims to detect HSA through a simple blood draw before clinical symptoms appear. If validated, this could become the first reliable early detection screening tool for at-risk breeds. The study is actively collecting blood samples from dogs with and without HSA.",
    status: "enrolling",
    type: "Early Detection",
  },
];

// ── Research Breakthroughs ──

export interface ResearchBreakthrough {
  institution: string;
  title: string;
  finding: string;
  significance: string;
  year: number;
}

export const RESEARCH_BREAKTHROUGHS: ResearchBreakthrough[] = [
  {
    institution: "University of Florida",
    title: "HSA hijacks healthy cells via PIK3CA mutation",
    finding:
      "Researchers discovered that hemangiosarcoma tumors can hijack nearby healthy blood vessel cells by activating a specific gene mutation (PIK3CA). This means the tumor is not just growing on its own — it is actively recruiting healthy cells to become cancerous.",
    significance:
      "This discovery identifies PIK3CA as a potential drug target. If a therapy can block this recruitment mechanism, it could slow tumor growth significantly. Several existing human cancer drugs target this pathway and could potentially be repurposed.",
    year: 2025,
  },
  {
    institution: "Cornell University",
    title: "Single-cell analysis identifies cancer stem cells",
    finding:
      "Using advanced single-cell sequencing technology, researchers at Cornell identified a population of cancer stem cells within HSA tumors that are responsible for driving tumor growth and metastasis. These stem cells are distinct from the bulk of the tumor and may explain why HSA recurs after treatment.",
    significance:
      "If treatments can target these specific stem cells rather than the entire tumor, it could prevent recurrence and metastasis — the two main reasons HSA is so deadly. This research opens a new avenue for precision medicine in canine cancer.",
    year: 2024,
  },
  {
    institution: "Morris Animal Foundation",
    title: "Golden Retriever Lifetime Study & HSA Initiative",
    finding:
      "The Morris Animal Foundation launched a multimillion-dollar, multiyear HSA Initiative alongside their ongoing Golden Retriever Lifetime Study — the largest prospective study of canine health ever conducted, following over 3,000 Golden Retrievers throughout their lives. Five new HSA-focused research proposals were funded in 2025.",
    significance:
      "The Lifetime Study provides unprecedented longitudinal data that could reveal environmental and genetic risk factors for HSA. The dedicated HSA Initiative signals a major institutional commitment to solving this disease, with funding flowing to early detection, treatment, and prevention research simultaneously.",
    year: 2025,
  },
];
