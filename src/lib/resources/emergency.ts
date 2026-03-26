// ──────────────────────────────────────────────────────────────
// Emergency Preparedness — content data
// This is the most safety-critical page on the site.
// Every word should be clear enough to read at 2 AM in a panic.
// ──────────────────────────────────────────────────────────────

/* ----------------------------------------------------------------
   Type definitions
   ---------------------------------------------------------------- */

export interface EmergencySign {
  sign: string;
  description: string;
  severity: "immediate" | "urgent" | "monitor";
}

export interface EmergencyScenario {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  description: string;
  signs: EmergencySign[];
  whatToDo: string[];
  atTheVet: string;
}

export interface EmergencyKitItem {
  item: string;
  why: string;
  priority: "essential" | "recommended";
}

export interface GumColorEntry {
  color: string;
  hex: string;
  meaning: string;
  action: string;
  severity: "normal" | "warning" | "emergency";
}

export interface VetConversation {
  question: string;
  why: string;
}

/* ----------------------------------------------------------------
   1. Page intro
   ---------------------------------------------------------------- */

export const EMERGENCY_INTRO = {
  title: "Emergency Preparedness",
  subtitle:
    "This information is hard to read. But knowing what to look for — and having a plan before you need one — gives you the power to act fast when your dog needs you most. Preparation is not pessimism. It is love in its most practical form.",
  urgentNote:
    "If your dog is in distress right now, go to the nearest emergency vet immediately.",
};

/* ----------------------------------------------------------------
   2. Gum Color Guide
   ---------------------------------------------------------------- */

export const GUM_COLORS: GumColorEntry[] = [
  {
    color: "Pink",
    hex: "#E8A0A0",
    meaning:
      "Healthy circulation. This is what normal gums look like. They should be moist and slippery to the touch.",
    action:
      "No action needed. Press the gum firmly with your finger, then release. The spot should return to pink within 1-2 seconds. This is called capillary refill time (CRT). Practice checking CRT now so you know what normal looks like for your dog.",
    severity: "normal",
  },
  {
    color: "Pale Pink / White",
    hex: "#F5E0E0",
    meaning:
      "Anemia or active internal blood loss. In HSA dogs, this is the most common emergency sign. It often means a tumor is bleeding into the abdomen or the chest.",
    action:
      "Call your emergency vet immediately and head to the clinic. Do not wait to see if the color improves. Pale or white gums in an HSA dog can indicate a splenic rupture that can be fatal within 1-6 hours without treatment. Check CRT — if it takes longer than 2 seconds to return to color, or does not return at all, this is critical.",
    severity: "emergency",
  },
  {
    color: "Bright Red",
    hex: "#E84040",
    meaning:
      "Possible sepsis (systemic infection), heatstroke, or toxin exposure. The gums may feel hot and dry. Bright red gums mean blood vessels are dilating, often in response to infection or inflammation.",
    action:
      "Call your vet or emergency clinic right away. Note whether your dog has a fever (rectal temperature above 103.5 F) and whether gums are dry or tacky. Sepsis can develop after surgery or during chemotherapy when the immune system is suppressed.",
    severity: "warning",
  },
  {
    color: "Blue / Purple",
    hex: "#8B78A8",
    meaning:
      "Cyanosis — your dog is not getting enough oxygen. This is a life-threatening emergency. It can result from fluid around the heart (pericardial effusion), fluid in the lungs, or severe blood loss.",
    action:
      "Go to the emergency vet NOW. Do not call ahead — just drive. Blue or purple gums mean your dog's organs are being starved of oxygen. Every minute matters. If possible, have someone else drive so you can keep your dog calm and monitor breathing.",
    severity: "emergency",
  },
];

/* ----------------------------------------------------------------
   3. Emergency Scenarios
   ---------------------------------------------------------------- */

export const EMERGENCY_SCENARIOS: EmergencyScenario[] = [
  {
    id: "splenic-rupture",
    title: "Splenic Rupture / Internal Bleeding",
    subtitle: "The most common HSA emergency",
    accentColor: "var(--terracotta)",
    description:
      "Hemangiosarcoma tumors on the spleen are filled with blood. When a tumor ruptures, blood spills into the abdominal cavity. This can happen with no warning — your dog may seem perfectly fine one moment and collapse the next. A splenic rupture can be fatal within 1-6 hours without intervention. However, not every bleed is fatal. Some dogs experience small bleeds that the body temporarily clots on its own, giving you a window to act.",
    signs: [
      {
        sign: "Sudden weakness or collapse",
        description:
          "Your dog may stagger, fall over, or be unable to stand. They may try to get up and fall again. This happens because blood pressure drops rapidly as blood fills the abdomen.",
        severity: "immediate",
      },
      {
        sign: "Pale or white gums",
        description:
          "Lift your dog's lip and look at the gums. If they are pale pink, white, or grayish instead of their normal pink, blood is leaving circulation. Check CRT — press the gum and count how long it takes to return to color.",
        severity: "immediate",
      },
      {
        sign: "Distended (swollen) abdomen",
        description:
          "The belly may look bloated or feel tight. In a large bleed, the abdomen fills with blood visibly. Your dog may be reluctant to lie down because the pressure is painful. Compare to how their belly normally looks and feels.",
        severity: "immediate",
      },
      {
        sign: "Rapid or shallow breathing",
        description:
          "When blood volume drops, the body tries to compensate by breathing faster. You may see your dog panting heavily even while lying still, or taking fast, shallow breaths.",
        severity: "urgent",
      },
      {
        sign: "Cold ears, paws, or nose",
        description:
          "The body redirects blood flow to vital organs, pulling it from the extremities. If your dog's ears or paws feel noticeably colder than usual, circulation is compromised.",
        severity: "urgent",
      },
      {
        sign: "Restlessness or sudden anxiety",
        description:
          "Some dogs pace, whine, or seem unable to settle before more obvious signs appear. They may seek you out with unusual urgency. Trust your instinct if your dog is acting off — you know them best.",
        severity: "monitor",
      },
    ],
    whatToDo: [
      "**Go to the nearest emergency vet immediately.** Do not wait for your regular vet to open. Do not wait to see if your dog improves. Internal bleeding does not stop on its own.",
      "Call the ER while someone else drives. Tell them: 'I have an HSA dog with suspected splenic rupture. Pale gums, collapsed, distended belly.' This lets them prepare before you arrive.",
      "Keep your dog as still and calm as possible during transport. Lift them gently — use a blanket or board as a stretcher for large dogs. Avoid pressure on the abdomen.",
      "Do not give food or water. If emergency surgery is needed, an empty stomach is safer for anesthesia.",
      "Bring your emergency kit, including current bloodwork copies and medication list. The ER vet needs this information fast.",
      "If you have Yunnan Baiyao and your vet has previously approved its use, give the red emergency pill (the small red capsule inside the packet) on the way to the ER. This is not a substitute for veterinary care — it is a bridge.",
    ],
    atTheVet:
      "The ER vet will likely do an abdominal ultrasound (called a FAST scan) to confirm free fluid (blood) in the abdomen. They will check your dog's PCV (packed cell volume) to measure how much blood has been lost. If the bleed is severe, your dog may need a blood transfusion to stabilize before surgery. Emergency splenectomy (removal of the spleen) is the standard treatment for a ruptured splenic mass. The surgery itself is straightforward for experienced surgeons. The hard part is the decision — about 50% of splenic masses in dogs are malignant (HSA), and about 50% are benign. Histopathology (lab analysis of the removed tissue) is the only way to know for sure, and results take 5-10 days. Your vet will discuss whether surgery is appropriate based on your dog's overall condition, other health factors, and the goals you have discussed in advance.",
  },
  {
    id: "cardiac-tamponade",
    title: "Cardiac Tamponade",
    subtitle: "When fluid compresses the heart",
    accentColor: "var(--gold)",
    description:
      "HSA can grow on the heart, most commonly on the right atrium. When these tumors bleed, blood fills the pericardial sac — the thin membrane surrounding the heart. This trapped fluid squeezes the heart and prevents it from filling properly, causing a sudden drop in blood output. This is called cardiac tamponade, and it is a medical emergency. The good news: it can often be relieved quickly with a procedure called pericardiocentesis.",
    signs: [
      {
        sign: "Sudden weakness or collapse",
        description:
          "Similar to a splenic bleed, but the cause is different. The heart cannot pump effectively because fluid is compressing it. Your dog may collapse during normal activity or even while resting.",
        severity: "immediate",
      },
      {
        sign: "Muffled heart sounds",
        description:
          "A vet listening with a stethoscope will notice the heartbeat sounds distant or muffled because fluid is insulating the heart. You will not be able to detect this at home, but it is a key diagnostic sign.",
        severity: "immediate",
      },
      {
        sign: "Distended jugular veins",
        description:
          "The veins in your dog's neck may look swollen or visibly pulsing. This happens because blood cannot enter the compressed heart efficiently and backs up in the veins. Part the fur on the neck and look for visible pulsing.",
        severity: "urgent",
      },
      {
        sign: "Exercise intolerance that develops suddenly",
        description:
          "Your dog may become winded after minimal activity — a short walk to the yard, or even standing up. If your dog was walking normally yesterday and is gasping after 10 steps today, something has changed acutely.",
        severity: "urgent",
      },
      {
        sign: "Fluid buildup in the abdomen",
        description:
          "Chronic or repeated pericardial effusion can cause fluid to accumulate in the belly (ascites) as the backed-up blood pressure forces fluid into body cavities. The belly may look swollen or feel sloshy.",
        severity: "monitor",
      },
    ],
    whatToDo: [
      "**Get to an emergency vet immediately.** Cardiac tamponade can cause death within minutes to hours depending on how fast the fluid accumulates.",
      "Keep your dog calm and still. Exertion makes the heart work harder, which is exactly what it cannot do right now.",
      "Call ahead and say: 'I have an HSA dog with suspected pericardial effusion. They collapsed and are weak.' The ER can prepare an ultrasound and pericardiocentesis setup.",
      "Do not attempt CPR unless your dog stops breathing entirely. Chest compressions on a heart surrounded by fluid can cause more damage.",
      "Note the time of collapse and any events leading up to it. The ER vet will ask how quickly symptoms developed.",
    ],
    atTheVet:
      "The vet will perform an echocardiogram (heart ultrasound) to confirm fluid around the heart. If tamponade is confirmed, the treatment is pericardiocentesis — inserting a needle or catheter through the chest wall and into the pericardial sac to drain the fluid. This sounds dramatic, but it often provides immediate, visible relief. Many dogs go from near-collapse to walking within minutes of the fluid being removed. The fluid will be analyzed for cancer cells. Unfortunately, pericardial effusion from cardiac HSA tends to recur. Your vet will discuss how many times this procedure is reasonable and when repeated episodes may signal that quality of life can no longer be maintained. Some dogs do well through multiple drainages over weeks to months. Median survival for cardiac HSA with surgery and chemotherapy is approximately 4 months.",
  },
  {
    id: "dic",
    title: "DIC (Disseminated Intravascular Coagulation)",
    subtitle: "When the clotting system fails",
    accentColor: "var(--sage-dark)",
    description:
      "DIC is a catastrophic breakdown of your dog's clotting system. It can be triggered by HSA itself, by a large tumor rupture, by sepsis, or during surgery. In DIC, the body uses up all its clotting factors in a cascade of tiny clots throughout the blood vessels. Paradoxically, this leaves nothing to stop actual bleeding — so the dog bleeds from everywhere at once. DIC is extremely serious. It is important to know what it looks like so you are not blindsided, but it is also important to know that the prognosis is very poor once DIC is established.",
    signs: [
      {
        sign: "Petechiae (tiny red/purple dots on skin or gums)",
        description:
          "These look like a rash of pinpoint-sized red or purple spots. Lift your dog's lip and look at the gums, or check the belly and inner ear flaps where skin is thin. Petechiae indicate that tiny blood vessels are leaking because there are not enough platelets to keep them sealed.",
        severity: "immediate",
      },
      {
        sign: "Excessive or unusual bruising",
        description:
          "Large purple or dark red patches on the belly, inner thighs, or ear flaps. These are not from injury — they appear spontaneously because the blood cannot clot properly. Even gentle handling may cause new bruises.",
        severity: "immediate",
      },
      {
        sign: "Bleeding from multiple sites",
        description:
          "Blood in the urine, bloody stool, nosebleeds, bleeding from the gums, or oozing from injection or catheter sites. When a dog bleeds from more than one location simultaneously, DIC is high on the list.",
        severity: "immediate",
      },
      {
        sign: "Blood that will not clot",
        description:
          "If your dog has a wound or surgical site that was clotting normally and then starts oozing again, or if bleeding from a blood draw does not stop with normal pressure, the clotting system may be failing.",
        severity: "immediate",
      },
      {
        sign: "Rapid decline in energy and responsiveness",
        description:
          "Dogs with DIC deteriorate quickly. They may become lethargic, unresponsive, or seem dazed. This happens because micro-clots are damaging organs and blood loss is draining their reserves simultaneously.",
        severity: "urgent",
      },
    ],
    whatToDo: [
      "**Go to the emergency vet immediately.** DIC requires aggressive critical care — there is nothing you can do at home to treat it.",
      "Handle your dog very gently. Rough handling or pressure can worsen bleeding in a dog whose clotting system has failed.",
      "Tell the ER: 'I have an HSA dog with spontaneous bleeding from multiple sites. I suspect DIC.' This is a case where the right words get the fastest response.",
      "Bring towels to manage any active bleeding during transport. Apply gentle pressure with clean gauze or cloth, but do not remove blood-soaked material — layer fresh material on top.",
      "Be prepared for a very difficult conversation. DIC in HSA dogs carries a very poor prognosis. Treatment involves blood transfusions, plasma transfusions, and intensive supportive care, but even with aggressive treatment, many dogs do not survive. Your vet will give you an honest assessment, and it is okay to ask: 'Is treatment giving my dog a real chance, or is it prolonging suffering?'",
    ],
    atTheVet:
      "The vet will run blood clotting panels (PT, PTT, fibrinogen, D-dimer, platelet count) to confirm DIC. Treatment focuses on addressing the underlying cause (if possible), replacing clotting factors with fresh frozen plasma transfusions, and supporting the dog with blood transfusions and IV fluids. DIC is one of the most difficult conditions to treat in veterinary medicine. The honest truth: once DIC is fully established in an HSA patient, the mortality rate is very high. Some dogs can be stabilized if DIC is caught early and the triggering event (like a tumor rupture) can be surgically addressed. But in many cases, DIC signals that the cancer has overwhelmed the body's ability to compensate. This is a moment where your pre-planned conversations with your vet about goals and limits become critically important. There is no wrong answer — only the answer that is right for your dog and your family.",
  },
];

/* ----------------------------------------------------------------
   4. Emergency Kit
   ---------------------------------------------------------------- */

export const EMERGENCY_KIT: EmergencyKitItem[] = [
  {
    item: "Yunnan Baiyao (with red emergency pill)",
    why: "A traditional Chinese medicine used to help control bleeding. The small red pill inside each packet is the emergency dose, meant for acute hemorrhage. Give it only if your vet has pre-approved its use and told you the correct dosage for your dog's weight. It is not a cure — it is a bridge to buy time on the way to the ER.",
    priority: "essential",
  },
  {
    item: "Written emergency vet address, phone number, and driving directions",
    why: "At 2 AM in a panic, you will not remember the address. Write it down and keep it on the fridge, in your car, and in your phone. Include the 24-hour emergency clinic AND a backup clinic in case the first is on divert. Test the drive so you know the route.",
    priority: "essential",
  },
  {
    item: "Copy of current bloodwork and medication list",
    why: "The ER vet has never seen your dog before. A printed copy of the most recent CBC, chemistry panel, and a list of all current medications (with doses) saves critical minutes. Update this after every vet visit. Keep one copy at home and one in the car.",
    priority: "essential",
  },
  {
    item: "Gauze pads, non-stick wound pads, and self-adhering vet wrap",
    why: "For managing any external bleeding during transport. Non-stick pads go directly on wounds (regular gauze sticks and reopens the wound when removed). Vet wrap holds everything in place without tape. Apply gentle pressure — do not tourniquet.",
    priority: "essential",
  },
  {
    item: "Styptic powder (or cornstarch as a backup)",
    why: "Stops minor external bleeding from nail quicks, small skin nicks, or superficial wounds. Press the powder directly into the bleeding area and hold for 30 seconds. Not useful for internal bleeding, but helpful for the small bleeds that HSA dogs are prone to, like bruises that ooze or nails that crack and bleed.",
    priority: "essential",
  },
  {
    item: "Large blanket or flat board for transport",
    why: "If your dog cannot walk, you need a way to carry them. A blanket used as a sling or stretcher (two people each hold one end) is the fastest improvised solution. For large dogs, a rigid board or the removable shelf from a crate works well. Practice this before you need it.",
    priority: "essential",
  },
  {
    item: "Phone charger (car and portable)",
    why: "You will be making calls, looking up directions, and waiting at the ER for hours. A dead phone in an emergency is a preventable disaster. Keep a car charger plugged in and a portable battery pack in your emergency kit at all times.",
    priority: "essential",
  },
  {
    item: "Towels (dark colored)",
    why: "Dark towels hide blood, which reduces your own panic and keeps the scene calmer for everyone in the car. Use them to pad the car seat, absorb fluids, and keep your dog warm. Blood loss causes body temperature to drop — keeping your dog warm during transport matters.",
    priority: "recommended",
  },
  {
    item: "Slip leash",
    why: "A slip leash can be put on in one motion without fiddling with clips or buckles. In an emergency, your dog may be disoriented or agitated. A slip leash gives you quick, secure control during the transition from car to ER door.",
    priority: "recommended",
  },
  {
    item: "Written list of your dog's critical information",
    why: "Name, breed, age, weight, diagnosis, oncologist's name and phone number, any known drug allergies, and your pre-discussed emergency wishes (e.g., 'DNR if cardiac arrest' or 'pursue stabilization and surgery'). When you are panicking, you will forget details you know by heart. Write them down.",
    priority: "recommended",
  },
];

/* ----------------------------------------------------------------
   5. Vet Conversations to Have NOW
   ---------------------------------------------------------------- */

export const VET_CONVERSATIONS: VetConversation[] = [
  {
    question: "What is our plan if there's an acute bleed at 2 AM?",
    why: "You need to know before it happens: which emergency clinic should you go to? Will your regular vet accept a transfer afterward? Is there a standing order for Yunnan Baiyao dosing? Having this conversation in advance means you are executing a plan at 2 AM, not making life-or-death decisions in a panic.",
  },
  {
    question:
      "Should we pursue emergency surgery if there's a splenic rupture?",
    why: "This depends on your dog's overall health, the stage of cancer, how they are responding to treatment, and your family's goals and financial situation. There is no universally right answer. Some families choose surgery every time to buy more days. Some set a limit of one surgery. Some decide in advance that a rupture is their stopping point. All of these are valid — but the decision should be made calmly, not in an ER waiting room at midnight.",
  },
  {
    question:
      "At what point would you recommend against emergency intervention?",
    why: "Your vet sees the medical picture you cannot. Ask them to be honest about what scenarios would make intervention unlikely to help — for example, DIC, multiple organ involvement, or a second major bleed. Knowing these boundaries in advance means you will not push for treatment that only prolongs suffering, and you will not give up too soon either.",
  },
  {
    question: "What are the signs that it's time to let go?",
    why: "This is the hardest conversation, and the most important one to have before you need it. HSA can go from seemingly fine to crisis in hours. Waiting for obvious decline risks an emergency death rather than a peaceful one. Ask your vet to help you define specific, objective markers — not just 'when quality of life declines,' but concrete things like 'when she stops eating for two full days' or 'when he can no longer stand on his own.' Write these down.",
  },
  {
    question: "Do you offer or recommend in-home euthanasia services?",
    why: "Many families want their dog's last moments to be at home, surrounded by familiar smells and people — not on a cold table in a clinic. In-home euthanasia services (like Lap of Love) come to your house. But these services often need 24-48 hours notice and may not be available for after-hours emergencies. Know your options now so you are not searching for this information during the worst moment of the process.",
  },
  {
    question:
      "What comfort medications should we have on hand for end-of-life?",
    why: "Ask your vet about having a small supply of pain relief and anti-anxiety medication at home in case your dog enters a crisis outside of vet hours. Medications like gabapentin (for pain and anxiety) or trazodone (for sedation) can keep your dog comfortable while you arrange next steps. Your vet may also prescribe an anti-nausea medication. Having these on hand is not giving up — it is making sure your dog does not suffer while you figure out the plan.",
  },
];

/* ----------------------------------------------------------------
   6. Daily Monitoring Checklist
   ---------------------------------------------------------------- */

export const DAILY_MONITORING: { item: string; detail: string }[] = [
  {
    item: "Gum color",
    detail:
      "Lift your dog's lip and look at the color of the gums above the teeth. They should be pink and moist. Press firmly with your finger for 2 seconds, then release — the white spot should return to pink within 1-2 seconds (this is capillary refill time). Do this every morning and evening so you know what normal looks like. Any change toward pale, white, or blue means call your vet immediately.",
  },
  {
    item: "Energy level",
    detail:
      "Is your dog doing their normal activities — greeting you, going outside, moving between rooms? A bad day here and there is expected during treatment. But a steady decline in activity over several days, or sudden inability to stand or walk, is a red flag. Keep a simple daily note: 'good day,' 'okay day,' or 'bad day.' Patterns matter more than any single day.",
  },
  {
    item: "Appetite",
    detail:
      "Track whether your dog is eating their full meal, half, or refusing food. Skipping one meal can be normal (especially on chemo days). Skipping two or more meals in a row is worth a call to your vet. Also note if your dog seems interested in food but walks away after a few bites — this can indicate nausea or mouth pain.",
  },
  {
    item: "Breathing rate and effort",
    detail:
      "Count your dog's breaths while they are resting (not panting). Normal is 15-30 breaths per minute. Count for 15 seconds and multiply by four. A resting breathing rate consistently above 40, or breathing that looks labored — belly heaving, nostrils flaring, neck extending — warrants a call to your vet. Rapid breathing can indicate pain, anemia, or fluid in the chest.",
  },
  {
    item: "Abdomen",
    detail:
      "Gently feel your dog's belly while they are standing or lying on their side. It should feel soft and your dog should not flinch or tense up. Compare to how it normally feels — is it more bloated, tighter, or tender than usual? A suddenly distended abdomen in an HSA dog can mean internal bleeding. If the belly looks or feels different, do not wait — call your vet.",
  },
  {
    item: "Bruising and bleeding",
    detail:
      "Check your dog's belly, inner thighs, and ear flaps for new bruises (purple or dark red patches that were not there before). Look for blood in stool (red or tarry black), blood in urine, nosebleeds, or bleeding from the gums. Unexplained bruising or bleeding from multiple sites can be an early sign of clotting problems (DIC) or dangerously low platelet counts. Report any new bruising to your vet the same day.",
  },
];
