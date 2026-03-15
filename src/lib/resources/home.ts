export interface ChecklistItem {
  text: string;
}

export interface DetailCard {
  title: string;
  summary: string;
  whyItMatters: string;
}

export interface ProductPick {
  name: string;
  description: string;
  url: string;
}

export interface RoomSection {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  intro: string;
  checklist: ChecklistItem[];
  details: DetailCard[];
  products: ProductPick[];
}

export const ROOM_SECTIONS: RoomSection[] = [
  {
    id: "flooring",
    title: "Flooring & Traction",
    subtitle: "Preventing slips and falls on hard surfaces",
    accentColor: "var(--sage)",
    intro:
      "Hard floors are the number-one hazard for dogs with mobility issues. Cancer treatments, pain, and muscle loss can make your dog unsteady — and a single bad slip can cause injury, fear, or reluctance to move. A few simple changes create safe footing throughout your home.",
    checklist: [
      { text: "Place non-slip rugs or runners on tile, hardwood, and laminate floors in high-traffic paths" },
      { text: "Secure rug edges with non-slip pads or carpet tape to prevent bunching" },
      { text: "Apply paw wax or grip socks for dogs who slip even on rugs" },
      { text: "Add yoga mats or rubber-backed bath mats in spots where your dog stands (food bowls, doorways)" },
      { text: "Remove throw rugs that slide or curl at the edges" },
    ],
    details: [
      {
        title: "Choosing the Right Rug Runners",
        summary:
          "Low-pile, rubber-backed runners work best. Avoid shag or high-pile options that can catch nails or make walking harder.",
        whyItMatters:
          "Dogs recovering from surgery or dealing with arthritis from cancer need predictable, stable surfaces underfoot. A rug that shifts when they step on it is worse than bare floor because it teaches them the surface is untrustworthy. Rubber-backed, low-pile runners give them confident footing without catching on weakened nails — a common side effect of chemotherapy.",
      },
      {
        title: "Paw Wax & Grip Solutions",
        summary:
          "Paw wax creates micro-traction on pads. Toe grips (small rubber rings) can also help dogs with smooth, worn pads.",
        whyItMatters:
          "As dogs age or undergo treatment, their paw pads can become smooth and dry, losing natural traction. Paw wax is a low-effort solution you apply in seconds that gives immediate grip improvement. Toe grips are another option for dogs whose nails are too short or brittle (from chemo) to provide natural traction on hard floors.",
      },
      {
        title: "Creating Clear Walking Paths",
        summary:
          "Map out the routes your dog walks most — to food, water, door, bed — and ensure continuous traction along each path.",
        whyItMatters:
          "Dogs are creatures of habit and follow the same paths through your home. If even one section of that path is slippery, they may avoid moving altogether. Continuous traction from resting spot to food bowl to back door removes the mental calculation of whether it is safe to get up, which directly impacts quality of life.",
      },
    ],
    products: [
      {
        name: "Gorilla Grip Non-Slip Runner Rug",
        description:
          "Machine-washable runner with grip dots on the underside. Pet-safe, BPA-free, and stays put on hardwood and tile.",
        url: "https://www.amazon.com/Gorilla-Grip-Washable-Resistant-Bedroom/dp/B07DF9J49C",
      },
      {
        name: "Musher's Secret Paw Wax (200g)",
        description:
          "All-natural beeswax blend that creates an invisible barrier on paw pads for extra grip and protection. Non-toxic, fast-drying.",
        url: "https://www.amazon.com/Mushers-Secret-Pet-Protection-200-Gram/dp/B0002XIZXY",
      },
      {
        name: "Aqumax Anti-Slip Paw Grip Pads",
        description:
          "Self-adhesive silicone traction pads that stick directly to paw pads. Great for senior dogs on hardwood and tile floors.",
        url: "https://www.amazon.com/Aqumax-Traction-Protection-Non-Toxic-Multi-Use/dp/B08FG82PS7",
      },
    ],
  },
  {
    id: "rest",
    title: "Rest & Recovery Areas",
    subtitle: "Comfortable, accessible spots for healing",
    accentColor: "var(--sage-light)",
    intro:
      "Dogs with cancer sleep more and need truly supportive rest areas. The right bed in the right location can reduce pain, support joints, and help your dog feel safe. Think about temperature, noise, and accessibility when setting up their space.",
    checklist: [
      { text: "Provide an orthopedic (memory foam) bed that supports joints and pressure points" },
      { text: "Place beds in quiet areas away from foot traffic and loud appliances" },
      { text: "Keep multiple beds around the house so there is always one nearby" },
      { text: "Ensure beds are easy to get into — low profile or with a ramped edge" },
      { text: "Use washable covers for easy cleanup (accidents are common during treatment)" },
      { text: "Consider a heated bed or pad for cold months — warmth soothes sore joints" },
    ],
    details: [
      {
        title: "Orthopedic Bed Selection",
        summary:
          "Look for 4+ inches of memory foam with a removable, washable cover. Avoid beds that bottom out when your dog lies down.",
        whyItMatters:
          "Dogs with cancer often develop muscle wasting and lose the natural padding that protects their joints and bones. A thin or flat bed means their weight presses directly on bony prominences like elbows and hips, causing pressure sores that heal slowly during treatment. Quality memory foam distributes weight evenly and reduces the pain of getting up and down.",
      },
      {
        title: "Temperature Control",
        summary:
          "Heated pads help in winter; cooling mats help in summer. Monitor for overheating if your dog cannot easily move away.",
        whyItMatters:
          "Cancer and its treatments can affect your dog's ability to regulate body temperature. Chemotherapy can cause temperature sensitivity, and dogs in pain may not move away from a heat source even when they are too warm. Provide options (warm and cool spots) and check on them regularly. A simple test: if it is too warm for your hand after 10 minutes, it is too warm for your dog.",
      },
      {
        title: "Creating a Quiet Zone",
        summary:
          "Designate one area of your home as a low-stimulation retreat — dim lighting, minimal foot traffic, away from the TV.",
        whyItMatters:
          "Rest quality matters as much as rest quantity. Dogs undergoing treatment may feel nauseous, anxious, or in pain, and a noisy or busy environment prevents deep restorative sleep. A dedicated quiet zone gives them a predictable, calm space to retreat to. Many caregivers notice their dog actively seeks out this space on treatment days.",
      },
    ],
    products: [
      {
        name: "Bedsure Orthopedic Memory Foam Dog Bed",
        description:
          "4-inch egg-crate memory foam with bolstered edges, removable washable cover, and non-slip bottom. Available in multiple sizes.",
        url: "https://www.amazon.com/Bedsure-Orthopedic-Memory-Large-Medium/dp/B0828MKKYG",
      },
      {
        name: "K&H Pet Products Pet Bed Warmer",
        description:
          "Thermostatically controlled warming pad insert that heats to 102\u00b0F. Place inside any dog bed for gentle, automatic warmth.",
        url: "https://www.amazon.com/Pet-Bed-Warmer-Large-x24/dp/B001AZLVG6",
      },
      {
        name: "EHEYCIGA Orthopedic Waterproof Dog Bed",
        description:
          "Memory foam plus egg-crate foam with 3-sided bolsters for neck and head support. Waterproof liner under washable cover.",
        url: "https://www.amazon.com/EHEYCIGA-Orthopedic-Waterproof-Egg-Crate-Removable/dp/B0F6CSPYQ3",
      },
    ],
  },
  {
    id: "stairs",
    title: "Stairs & Mobility",
    subtitle: "Safe movement between levels and onto furniture",
    accentColor: "var(--gold)",
    intro:
      "Stairs are one of the biggest risk areas. Dogs with cancer-related weakness, post-surgical restrictions, or pain medications that affect coordination can fall on stairs. Limiting or assisting stair access prevents injuries that could derail treatment.",
    checklist: [
      { text: "Install baby gates at the top and bottom of staircases to control access" },
      { text: "Add non-slip stair treads or carpet runners to any stairs your dog must use" },
      { text: "Use a support harness or sling for dogs who need help on stairs" },
      { text: "Consider a ramp for steps between rooms or at exterior doors" },
      { text: "Move food, water, and a bed to the same floor as your dog to minimize stair use" },
    ],
    details: [
      {
        title: "Baby Gates & Access Control",
        summary:
          "Pressure-mounted gates work for most doorways. Use hardware-mounted gates at the top of stairs for safety.",
        whyItMatters:
          "Dogs do not understand that they should not use stairs after surgery or during a bad pain day. They will try to follow you, respond to the doorbell, or chase a sound. Gates remove the decision entirely. Hardware-mounted gates at stair tops are essential because a pressure-mounted gate that pops loose sends your dog tumbling down the stairs.",
      },
      {
        title: "Support Harnesses & Slings",
        summary:
          "A rear-support harness helps dogs with hind-leg weakness. Full-body harnesses work for larger dogs or those with general instability.",
        whyItMatters:
          "Many cancers affect the hind legs — either through tumor location, nerve compression, or post-surgical weakness. A support harness lets you bear some of your dog's weight during movement, preventing falls while still allowing them to walk and maintain muscle. This is especially critical in the first weeks after surgery when your dog is motivated to move but physically not ready for full independence.",
      },
      {
        title: "Portable Ramps",
        summary:
          "Folding ramps can bridge 1-3 steps at doorways or porches. Look for textured, non-slip surfaces and adjustable lengths.",
        whyItMatters:
          "Even a single step can be painful or dangerous for a dog with joint involvement, an amputation, or post-surgical restrictions. Ramps convert a jarring step-down into a gentle slope. For car access, ramps are essential — the impact of jumping out of a vehicle can stress surgical sites and cause pain that makes your dog reluctant to travel to vet appointments.",
      },
    ],
    products: [
      {
        name: "Cumbor Auto-Close Baby Gate for Stairs",
        description:
          "Mom's Choice Award winner. Fits 29.7\u201346\" wide openings, auto-close with hold-open feature. Pressure-mounted for doorways, hardware-mount option for stair tops.",
        url: "https://www.amazon.com/Winner-Cumbor-29-5-46-Pressure-Hardware-Black/dp/B07WFZSW72",
      },
      {
        name: "LOOBANI Dog Sling for Back Legs",
        description:
          "Rear-support sling harness for dogs with hind-leg weakness. Padded handle, adjustable fit, helps with stairs, car entry, and bathroom trips.",
        url: "https://www.amazon.com/LOOBANI-Portable-Cruciate-Ligament-Rehabilitation/dp/B07L3VLH5S",
      },
      {
        name: "PetThem Folding Dog Ramp (63\" Long)",
        description:
          "Portable folding ramp with non-slip surface for cars, SUVs, and porch steps. Supports up to 250 lbs, folds compact for storage.",
        url: "https://www.amazon.com/PetThem-Portable-Non-Slip-Surface-Folding/dp/B0CZL3XNWT",
      },
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen & Feeding",
    subtitle: "Comfortable, clean mealtimes during treatment",
    accentColor: "var(--gold-light)",
    intro:
      "Treatment changes how and when your dog eats. Elevated bowls, non-slip mats, and organized medication stations reduce mess and stress around mealtimes — which may already be challenging if your dog has a reduced appetite.",
    checklist: [
      { text: "Use elevated food and water bowls appropriate for your dog's height" },
      { text: "Place a non-slip mat under bowls to prevent sliding" },
      { text: "Set up a dedicated medication station with a schedule and pill organizer" },
      { text: "Keep multiple water stations around the house for easy access" },
      { text: "Switch to stainless steel or ceramic bowls (plastic harbors bacteria)" },
      { text: "Clean bowls daily — immunocompromised dogs are more vulnerable to bacteria" },
    ],
    details: [
      {
        title: "Elevated Bowl Setup",
        summary:
          "The bowl rim should be at your dog's lower chest height. Adjustable stands let you fine-tune the height.",
        whyItMatters:
          "Dogs with neck pain, spinal tumors, or post-surgical restrictions may struggle to bend down to floor-level bowls. Eating from a lowered position can also cause aspiration in dogs with certain throat or esophageal conditions. An elevated bowl at the right height lets your dog eat comfortably without straining, which can mean the difference between eating and refusing food on bad days.",
      },
      {
        title: "Medication Organization",
        summary:
          "A weekly pill organizer, a written schedule, and a designated prep area prevent missed doses and confusion.",
        whyItMatters:
          "Cancer treatment often involves multiple medications with different schedules — some with food, some without, some twice daily, some weekly. Missed doses or accidental double-doses can have serious consequences. A simple organizational system (pill organizer plus a printed schedule on the fridge) reduces caregiver stress and keeps treatment on track during an already overwhelming time.",
      },
    ],
    products: [
      {
        name: "XIAZ Adjustable Elevated Dog Bowl Stand",
        description:
          "5 height settings (3\u201314\"), two stainless steel bowls included, non-slip pads. Adjusts as your dog's needs change.",
        url: "https://www.amazon.com/Elevated-Medium-Height-Adjustable-Stainless/dp/B0CRV41Q3Y",
      },
      {
        name: "EZY DOSE Pets Weekly Pill Organizer",
        description:
          "7-day pill case with large compartments sized for dog medications and treats. BPA-free, made in the USA.",
        url: "https://www.amazon.com/Medicine-Vitamin-Organizer-Planner-Compartments/dp/B084GFZZNW",
      },
    ],
  },
  {
    id: "living",
    title: "Living Spaces",
    subtitle: "Making shared areas safe and accessible",
    accentColor: "var(--terracotta)",
    intro:
      "Your dog wants to be where you are. Making living spaces accessible and hazard-free means they can stay part of daily family life — which is important for their emotional wellbeing during treatment.",
    checklist: [
      { text: "Add pet stairs or a ramp to the couch or bed if your dog is allowed on furniture" },
      { text: "Secure or hide electrical cords that a disoriented or restless dog might chew" },
      { text: "Remove or relocate toxic houseplants (lilies, sago palm, pothos, dieffenbachia)" },
      { text: "Clear clutter from floor paths — dogs on pain meds may have impaired coordination" },
      { text: "Ensure your dog can reach their favorite resting spots without jumping" },
    ],
    details: [
      {
        title: "Furniture Access Ramps",
        summary:
          "Foam pet stairs or gentle ramps let dogs reach couches and beds without jumping. Wider is better for stability.",
        whyItMatters:
          "Jumping up and down from furniture puts sudden stress on joints and surgical sites. For dogs with bone cancer, a bad landing can risk a pathological fracture. For post-amputation dogs, jumping disrupts their balance. A ramp or pet stairs preserves their access to the spots that bring them comfort and closeness to you, without the physical risk.",
      },
      {
        title: "Cord & Hazard Management",
        summary:
          "Use cord covers or tape cords to baseboards. Move breakables off low tables. Block access behind furniture where dogs might get stuck.",
        whyItMatters:
          "Pain medications, anesthesia after-effects, and some cancer-related neurological changes can cause disorientation or restlessness, especially at night. A dog who normally navigates your living room perfectly may stumble into cords or knock things over. Proactive hazard-proofing prevents injuries during these vulnerable periods and gives you peace of mind overnight.",
      },
      {
        title: "Toxic Plant Removal",
        summary:
          "Many common houseplants are toxic to dogs. When in doubt, move it up high or to a room your dog does not access.",
        whyItMatters:
          "Dogs undergoing cancer treatment have compromised immune systems and organ function. A nibble on a toxic plant that a healthy dog might shrug off could cause serious problems in an immunocompromised dog. Nausea from treatment can also cause unusual chewing behavior — dogs may mouth plants they have never touched before. Remove the risk entirely.",
      },
    ],
    products: [
      {
        name: "2-in-1 Convertible Dog Ramp Stairs",
        description:
          "Foldable wooden ramp that doubles as a step stool and ottoman. Non-slip surface, supports up to 200 lbs, fits couches and beds.",
        url: "https://www.amazon.com/Convertible-Upgraded-Folding-Foldable-Ottoman/dp/B0FJFP6WML",
      },
      {
        name: "Romrol Dog Stairs for Beds & Couches",
        description:
          "Extra-wide foam stairs with non-slip waterproof cover and gentle slope. Designed for dogs with joint issues.",
        url: "https://www.amazon.com/Couches-Durable-Non-Slip-Waterproof-Friendly/dp/B0BQYSJ95C",
      },
    ],
  },
  {
    id: "outdoor",
    title: "Outdoor & Yard",
    subtitle: "Safe, comfortable time outside",
    accentColor: "var(--terracotta-light)",
    intro:
      "Fresh air and outdoor time are good for your dog's mood and mental health. But treatment can make them more sensitive to heat, cold, and rough terrain. A few adjustments ensure outdoor time stays safe and enjoyable.",
    checklist: [
      { text: "Provide shaded areas with water available at all times" },
      { text: "Check pavement temperature before walks — if it is too hot for your hand, it is too hot for paws" },
      { text: "Ensure fencing is secure — dogs on pain meds may wander or lose spatial awareness" },
      { text: "Create a gentle, flat path to their usual bathroom spot" },
      { text: "Limit sun exposure for dogs with skin sensitivities from treatment" },
      { text: "Supervise all outdoor time if your dog is unsteady or post-surgical" },
    ],
    details: [
      {
        title: "Shade & Temperature Awareness",
        summary:
          "Set up a shaded rest area with a cooling mat. Limit outdoor time to early morning and evening during hot months.",
        whyItMatters:
          "Some chemotherapy drugs and steroids affect your dog's ability to regulate temperature. Dogs who previously loved sunbathing may overheat quickly during treatment. A shaded area with water and a cooling mat lets them enjoy being outside without the risk. In winter, treatment-thinned coats may not provide enough insulation — a light jacket can help.",
      },
      {
        title: "Gentle Yard Paths",
        summary:
          "Create a flat, non-muddy route to the bathroom area. Stepping stones, pea gravel, or a mowed grass path all work well.",
        whyItMatters:
          "An unsteady dog on wet grass, mud, or uneven ground is a fall waiting to happen. This is especially true for midnight bathroom trips when visibility is low. A defined, flat path with good footing means your dog can relieve themselves safely and independently for as long as possible — which matters for their dignity and your sleep.",
      },
      {
        title: "Fencing & Supervision",
        summary:
          "Walk the fence line monthly to check for gaps. Consider a shorter leash or long-line for yard time if your dog is disoriented.",
        whyItMatters:
          "Pain medications — especially gabapentin and tramadol — can cause disorientation and altered spatial awareness. Dogs who have never tried to escape may wander through a gap they previously ignored. Secure fencing is the safety net that lets your dog have outdoor freedom while you do not need to hover anxiously every second they are outside.",
      },
    ],
    products: [
      {
        name: "The Green Pet Shop Chillz Cooling Mat (Large)",
        description:
          "Pressure-activated gel pad that cools for up to 3 hours. No water, electricity, or refrigeration needed. Recharges automatically.",
        url: "https://www.amazon.com/Chillz-Cooling-Dogs-Large-Size/dp/B007JT4P88",
      },
      {
        name: "DELIFUR Dog Cooling Mat",
        description:
          "Machine-washable ice-silk cooling pad for indoor or outdoor shade use. Portable, foldable, works on beds, kennels, and car seats.",
        url: "https://www.amazon.com/dp/B0D2D5KWY6",
      },
    ],
  },
  {
    id: "recovery",
    title: "Post-Surgery & Recovery",
    subtitle: "Setting up a safe recovery space at home",
    accentColor: "var(--sage-dark)",
    intro:
      "If your dog is coming home from surgery, the first two weeks are critical. A well-prepared recovery area reduces complications, speeds healing, and makes the experience less stressful for both of you.",
    checklist: [
      { text: "Set up a confined recovery area (crate, pen, or small room) before your dog comes home" },
      { text: "Line the area with washable bedding and puppy pads for accidents" },
      { text: "Have an e-collar or recovery suit ready to prevent licking or chewing at the incision" },
      { text: "Place food, water, and medications within arm's reach of the recovery area" },
      { text: "Prepare a wound care station with supplies your vet recommends" },
      { text: "Block access to stairs, furniture, and slippery floors completely" },
    ],
    details: [
      {
        title: "Crate & Confinement Setup",
        summary:
          "The crate should be large enough for your dog to stand, turn, and lie down comfortably, but small enough to discourage zoomies.",
        whyItMatters:
          "Movement restriction after surgery is not optional — it is medical. Torn sutures, seroma formation, and surgical site infections are directly correlated with too much activity too soon. A properly sized crate or exercise pen is the single most effective tool for preventing these complications. Make it comfortable with bedding and a chew toy so it feels like a den, not a punishment.",
      },
      {
        title: "E-Collar Alternatives",
        summary:
          "If your dog hates the cone, try an inflatable collar, soft cone, or recovery bodysuit. The goal is preventing access to the incision.",
        whyItMatters:
          "Dogs who are stressed by their e-collar sleep less, eat less, and recover more slowly. A recovery suit or inflatable collar that achieves the same protection with less stress can make a real difference in healing speed and your dog's mood. Ask your vet which alternatives are appropriate for your dog's specific surgical site — some locations require a hard cone regardless.",
      },
      {
        title: "Wound Care Station",
        summary:
          "Keep saline solution, gauze, prescribed ointments, and a flashlight in one spot. Check the incision twice daily for redness, swelling, or discharge.",
        whyItMatters:
          "Catching a wound complication early — within the first 24-48 hours — usually means a quick fix. Missing it can mean a return to surgery or a serious infection in a dog whose immune system is already compromised by cancer treatment. A dedicated wound care station with a checklist makes it easy to do consistent, thorough checks without hunting for supplies.",
      },
      {
        title: "Restricted Movement Zones",
        summary:
          "Use baby gates, closed doors, and exercise pens to create a small, safe world for the recovery period.",
        whyItMatters:
          "Your dog will feel better before they are healed — this is the dangerous window. A dog who feels good on day 5 post-surgery may try to jump, run, or play, but internal healing is not complete for 10-14 days (or longer for orthopedic procedures). Physical barriers are more reliable than supervision alone, because all it takes is one moment of distraction for your dog to leap off the couch and tear an incision.",
      },
    ],
    products: [
      {
        name: "MAXX Dog Recovery Suit",
        description:
          "Breathable cotton/spandex bodysuit that replaces the cone. Covers wounds, prevents licking, and reduces anxiety. Sizes from 4XS to XL.",
        url: "https://www.amazon.com/MAXX-Alternative-Post-Operative-Abdominal-Protection/dp/B07ZKZJHVK",
      },
      {
        name: "MidWest Folding Metal Exercise Pen",
        description:
          "Eight 2-foot panels create 16 sq ft of safe confinement space. Folds flat for storage, configurable into multiple shapes.",
        url: "https://www.amazon.com/MidWest-Foldable-Metal-Exercise-Playpen/dp/B000H904WI",
      },
      {
        name: "Amazon Basics Foldable Metal Dog Playpen",
        description:
          "Octagonal exercise pen with single door and slide-bolt latch. 36\" tall, easy to assemble and store. Indoor/outdoor use.",
        url: "https://www.amazon.com/AmazonBasics-Foldable-Metal-Exercise-Fence/dp/B0758FX7MJ",
      },
    ],
  },
];
