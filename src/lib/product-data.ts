/**
 * Sanveex Global Health — product catalogue.
 *
 * Single source of truth for:
 *   1. `prisma/seed-products.ts` (writes the catalogue into MongoDB), and
 *   2. the public site fallback (`getFeaturedProducts` / listing / detail page),
 *      so the website never renders empty if the database is unreachable.
 *
 * Authentic data derived directly from the 4 approved Sanveex product-label images:
 *   - 1.jpeg: Montilet 10 (Montelukast INN 10 mg)
 *   - 2.jpeg: Adcal D (Calcium & Vitamin D3)
 *   - 3.jpeg: Xofedin 120 Side Panel (Manufacturer & Marketer)
 *   - 4.jpeg: Xofedin 120 (Fexofenadine Hydrochloride BP 120 mg)
 */

export type ProductSpec = { label: string; value: string };
export type ProductLink = { label: string; link: string };

export type SanveexCategory = {
  name: string;
  slug: string;
  description: string;
  order: number;
};

export type SanveexProduct = {
  name: string;
  slug: string;
  brandBangla?: string;
  genericName: string;
  genericBangla?: string;
  strength: string;
  therapeuticClass: string;
  dosageForm: string;
  dosageFormBangla?: string;
  packSize: string;
  packSizeBangla?: string;
  /** Category slug — resolved to a Category document during seeding. */
  category: string;
  /** Short summary used on cards and search results. */
  description: string;
  /** Long-form HTML used on the product detail page. */
  content: string;
  image: string;
  gallery: string[];
  features: string[];
  specifications: ProductSpec[];
  clinical: ProductSpec[];
  links: ProductLink[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
};

export const categories: SanveexCategory[] = [
  {
    name: "Respiratory & Allergy",
    slug: "respiratory-allergy",
    description:
      "Targeted therapies for asthma, allergic rhinitis and histamine-mediated hypersensitivity conditions.",
    order: 1,
  },
  {
    name: "Bone & Nutritional Health",
    slug: "bone-nutritional-health",
    description:
      "High-potency calcium, vitamin D3 and essential mineral supplementation for musculoskeletal integrity and metabolic wellbeing.",
    order: 2,
  },
];

export const products: SanveexProduct[] = [
  {
    name: "Montilet 10",
    slug: "montilet-10",
    brandBangla: "মন্টিলেট® ১০",
    genericName: "Montelukast Sodium INN",
    genericBangla: "মন্টেলুকাস্ট আইএনএন ১০ মি.গ্রা.",
    strength: "10 mg",
    therapeuticClass: "Leukotriene Receptor Antagonist (LTRA)",
    dosageForm: "Film-coated Tablet",
    dosageFormBangla: "ফিল্ম-কোটেড ট্যাবলেট",
    packSize: "3 × 10 tablets",
    packSizeBangla: "৩ × ১০ ট্যাবলেট",
    category: "respiratory-allergy",
    description:
      "Montelukast 10 mg film-coated tablets — a once-daily selective leukotriene receptor antagonist indicated for the prophylaxis and chronic management of asthma, prevention of exercise-induced bronchoconstriction, and relief of allergic rhinitis.",
    content:
      "<p><strong>Montilet® 10</strong> contains montelukast sodium, a selective cysteinyl leukotriene receptor antagonist (CysLT<sub>1</sub>). By selectively binding to CysLT<sub>1</sub> receptors in airway smooth muscle and inflammatory cells, Montilet 10 inhibits bronchoconstriction, airway edema, mucus hypersecretion and inflammatory cell recruitment.</p>" +
      "<p>It is indicated as maintenance controller therapy for the prophylaxis and chronic management of asthma in adults and adolescents aged 15 years and older, prevention of exercise-induced bronchoconstriction (EIB), and symptomatic relief of seasonal and perennial allergic rhinitis.</p>" +
      "<p>Marketed and distributed nationwide across Bangladesh by <strong>SANVEEX GLOBAL HEALTH</strong> (3/8, Pirerbag, Mirpur-2, Dhaka) and manufactured under strict WHO-GMP compliance by <strong>Amulet Pharmaceuticals Ltd.</strong> (Mfg. Lic. No. 418 & 287, MA No. 246-41-018).</p>",
    image: "/products/montilet-10.webp",
    gallery: ["/products/montilet-10-label.webp", "/1.jpeg"],
    features: [
      "Convenient once-daily evening dosing enhances patient compliance",
      "Dual therapeutic action: manages asthma and relieves allergic rhinitis",
      "Inhibits cysteinyl leukotriene-mediated airway inflammation and bronchospasm",
      "Manufactured in state-of-the-art WHO-GMP facility by Amulet Pharmaceuticals",
      "Approved by DGDA Bangladesh (MA No. 246-41-018)",
    ],
    specifications: [
      { label: "Brand Name", value: "Montilet® 10 (মন্টিলেট® ১০)" },
      { label: "Generic Name", value: "Montelukast Sodium INN" },
      { label: "Strength", value: "Montelukast 10 mg (equivalent to Montelukast Sodium INN)" },
      { label: "Dosage Form", value: "Film Coated Tablet (ফিল্ম-কোটেড ট্যাবলেট)" },
      { label: "Pack Size", value: "3 × 10 Film Coated Tablets (৩ × ১০ ট্যাবলেট)" },
      { label: "Therapeutic Class", value: "Leukotriene Receptor Antagonist (LTRA)" },
      { label: "Marketing Authorisation (MA) No.", value: "246-41-018" },
      { label: "Manufacturing Licence No.", value: "418 & 287" },
      {
        label: "Manufacturer",
        value: "Amulet Pharmaceuticals Ltd., Singdighi, Mawna, Sreepur, Gazipur, Bangladesh",
      },
      {
        label: "Marketed & Distributed By",
        value: "SANVEEX GLOBAL HEALTH, 3/8, Pirerbag (60 feet), Mirpur-2, Dhaka - 1216",
      },
    ],
    clinical: [
      {
        label: "Composition (English & Bangla)",
        value:
          "Each film-coated tablet contains: Montelukast Sodium INN equivalent to Montelukast 10 mg.\n(প্রতিটি ফিল্ম কোটেড ট্যাবলেটে আছে মন্টেলুকাস্ট সোডিয়াম আইএনএন যা মন্টেলুকাস্ট ১০ মি.গ্রা. এর সমতুল্য।)",
      },
      {
        label: "Indications",
        value:
          "1. Prophylaxis and chronic treatment of bronchial asthma in adults and adolescents aged 15 years and older.\n2. Prevention of exercise-induced bronchoconstriction (EIB).\n3. Relief of symptoms of seasonal and perennial allergic rhinitis in patients with concomitant asthma or allergic diathesis.",
      },
      {
        label: "Dosage & Administration",
        value:
          "Adults and adolescents 15 years of age and older: One tablet (10 mg) once daily.\n• For Asthma: Take once daily in the evening.\n• For Allergic Rhinitis: Take once daily at approximately the same time each day.\n• For Exercise-Induced Bronchoconstriction: Take one tablet at least 2 hours before exercise.\n(শুধুমাত্র রেজিস্টার্ড চিকিৎসকের ব্যবস্থাপত্র অনুযায়ী সেব্য। নির্দেশনা ও সেবন বিধি: ভিতরের নির্দেশনামা দেখুন।)",
      },
      {
        label: "Contraindications",
        value:
          "Known hypersensitivity to montelukast sodium or to any inactive excipient in the tablet formulation.",
      },
      {
        label: "Precautions & Warnings",
        value:
          "Montilet 10 is not indicated for the treatment of acute bronchospasm or asthma attacks. Patients must keep their rapid-acting rescue inhaler readily available. Monitor patients for potential neuropsychiatric symptoms; if mood changes occur, consult a healthcare provider promptly.",
      },
      {
        label: "Storage & Handling",
        value:
          "Store below 30°C in a dry place, protected from direct light and moisture. Keep all medicines strictly out of the reach of children.\n(সকল ঔষধ শিশুদের নাগালের বাহিরে রাখুন। আলো থেকে দূরে, শুষ্ক ও ঠান্ডা স্থানে রাখুন।)",
      },
    ],
    links: [],
    isActive: true,
    isFeatured: true,
    order: 1,
  },

  {
    name: "Adcal D",
    slug: "adcal-d",
    brandBangla: "এডক্যাল ডি",
    genericName: "Calcium Carbonate BP & Cholecalciferol USP",
    genericBangla: "ক্যালসিয়াম ও ভিটামিন ডি৩",
    strength: "500 mg Elemental Calcium + 200 IU Vitamin D3",
    therapeuticClass: "Calcium & Vitamin D3 Supplement",
    dosageForm: "Film-coated Tablet",
    dosageFormBangla: "ফিল্ম-কোটেড ট্যাবলেট",
    packSize: "30 tablets",
    packSizeBangla: "৩০ ট্যাবলেট",
    category: "bone-nutritional-health",
    description:
      "Calcium Carbonate BP 1250 mg (providing 500 mg elemental calcium) with Cholecalciferol USP (Vitamin D3) 200 IU — a balanced bone-mineral formulation for the prevention and treatment of osteoporosis, osteomalacia, rickets, and calcium deficiency states.",
    content:
      "<p><strong>Adcal D (এডক্যাল ডি)</strong> provides an optimal synergistic combination of elemental calcium and cholecalciferol (vitamin D<sub>3</sub>) in an easy-to-swallow film-coated tablet. Vitamin D<sub>3</sub> facilitates intestinal active calcium absorption and governs osteoblast mineralisation, ensuring optimal skeletal density and neuromuscular integrity.</p>" +
      "<p><strong>Clinical Indications (Approved Label):</strong> Calcium and vitamin D3 are used for the treatment of osteoporosis, osteomalacia, rickets, tetany, and parathyroid disease. Also used in raised calcium requirement for children and adolescents at times of rapid growth, inadequate intake of calcium in the diet due to malnutrition, prevention and treatment of osteoporosis, disorders of osteogenesis and tooth formation, and during pregnancy and lactation.</p>" +
      "<p><em>(অস্থি ও অস্থিমজ্জার বিভিন্ন জটিলতায়, দাঁতের সুগঠন এবং মহিলাদের গর্ভকালীন ও স্তন্যদানকালীন সময় নানা প্রয়োজনে ক্যালসিয়াম ও ভিটামিন ডি৩ ব্যবহার হয়।)</em></p>" +
      "<p>Marketed and distributed by <strong>SANVEEX GLOBAL HEALTH</strong> (3/8, Pirerbag, Mirpur-2, Dhaka - 1216) and manufactured by <strong>Amulet Pharmaceuticals Ltd.</strong> under WHO-GMP compliance (Mfg. Lic. No. 418 & 287, MA No. 246-19-062, Code: L-ADLT-03(W)).</p>",
    image: "/products/adcal-d.webp",
    gallery: ["/products/adcal-d-label.webp", "/2.jpeg"],
    features: [
      "Optimal elemental calcium (500 mg) combined with bioavailable Vitamin D3 (200 IU)",
      "Essential for prevention and management of osteoporosis, osteomalacia and rickets",
      "Supports enhanced calcium requirements during pregnancy, lactation and growth spurts",
      "Convenient morning and night dosing regimen (1 tablet twice daily)",
      "DGDA Bangladesh Registered (MA No. 246-19-062)",
    ],
    specifications: [
      { label: "Brand Name", value: "Adcal D (এডক্যাল ডি)" },
      {
        label: "Generic Name",
        value: "Calcium Carbonate BP & Cholecalciferol USP (Calcium & Vitamin D3)",
      },
      {
        label: "Strength",
        value: "500 mg Elemental Calcium (from Calcium Carbonate 1250 mg) + 200 IU Vitamin D3",
      },
      { label: "Dosage Form", value: "Film Coated Tablet" },
      { label: "Pack Size", value: "30 Tablets (৩০ ট্যাবলেট)" },
      { label: "Therapeutic Class", value: "Calcium & Vitamin D3 Supplement / Musculoskeletal Health" },
      { label: "Product Label Code", value: "L-ADLT-03(W)" },
      { label: "Marketing Authorisation (MA) No.", value: "246-19-062" },
      { label: "Manufacturing Licence No.", value: "418 & 287" },
      {
        label: "Manufacturer",
        value: "Amulet Pharmaceuticals Ltd., Singdighi, Mawna, Sreepur, Gazipur, Bangladesh",
      },
      {
        label: "Marketed & Distributed By",
        value: "SANVEEX GLOBAL HEALTH, 3/8, Pirerbag (60 feet), Mirpur-2, Dhaka - 1216",
      },
    ],
    clinical: [
      {
        label: "Composition (English & Bangla)",
        value:
          "Each film-coated tablet contains: Calcium Carbonate BP 1250 mg equivalent to 500 mg Elemental Calcium, and Cholecalciferol USP (Vitamin D3) 200 IU.\n(প্রতিটি ফিল্ম কোটেড ট্যাবলেটে আছে ক্যালসিয়াম কার্বনেট বিপি ১২৫০ মি.গ্রা. যা ৫০০ মি.গ্রা. এলিমেন্টাল ক্যালসিয়াম এর সমতুল্য এবং কোলেকালসিফেরল ইউএসপি (ভিটামিন ডি৩) ২০০ আইইউ।)",
      },
      {
        label: "Indications (Official Packaging Specification)",
        value:
          "Calcium and vitamin D3 are used for the treatment of osteoporosis, osteomalacia, rickets, tetany and parathyroid disease. Also used in raised calcium requirement for children and adolescents at times of rapid growth, inadequate intake of calcium in the diet due to malnutrition, prevention and treatment of osteoporosis, disorders of osteogenesis and tooth formation, and during pregnancy and lactation.\n(অস্থি ও অস্থিমজ্জার বিভিন্ন জটিলতায়, দাঁতের সুগঠন এবং মহিলাদের গর্ভকালীন ও স্তন্যদানকালীন সময় নানা প্রয়োজনে ক্যালসিয়াম ও ভিটামিন ডি৩ ব্যবহার হয়।)",
      },
      {
        label: "Dosage & Administration (Official Packaging Direction)",
        value:
          "1 tablet in the morning and 1 tablet at night or as recommended by the physician.\n(রেজিস্টার্ড চিকিৎসকের ব্যবস্থাপত্র অনুযায়ী সেব্য। সকাল ও রাতে ১টি করে ট্যাবলেট অথবা চিকিৎসকের পরামর্শ অনুযায়ী সেব্য।)",
      },
      {
        label: "Contraindications",
        value:
          "Hypercalcaemia, hypercalciuria, severe renal impairment, nephrolithiasis (kidney stones), and hypersensitivity to calcium carbonate, cholecalciferol, or any excipients.",
      },
      {
        label: "Precautions",
        value:
          "Use cautiously in patients with renal impairment or a history of renal calculi. Periodic monitoring of serum and urinary calcium is recommended during prolonged high-dose therapy. Avoid concurrent administration with tetracycline antibiotics without at least a 2-hour interval.",
      },
      {
        label: "Storage & Safety",
        value:
          "Store below 30°C in a dry place, protected from light. Keep all medicines strictly out of the reach of children.\n(সকল ঔষধ শিশুদের নাগালের বাহিরে রাখুন। আলো থেকে দূরে, শুকনো ও ঠান্ডা স্থানে রাখুন।)",
      },
    ],
    links: [],
    isActive: true,
    isFeatured: true,
    order: 2,
  },

  {
    name: "Xofedin 120",
    slug: "xofedin-120",
    brandBangla: "জোফেডিন® ১২০",
    genericName: "Fexofenadine Hydrochloride BP",
    genericBangla: "ফেক্সোফেনাডিন হাইড্রোক্লোরাইড বিপি ১২০ মি.গ্রা.",
    strength: "120 mg",
    therapeuticClass: "Second-generation (Non-sedating) H1 Antihistamine",
    dosageForm: "Film-coated Tablet",
    dosageFormBangla: "ফিল্ম-কোটেড ট্যাবলেট",
    packSize: "3 × 10 tablets",
    packSizeBangla: "৩ × ১০ ট্যাবলেট",
    category: "respiratory-allergy",
    description:
      "Fexofenadine Hydrochloride BP 120 mg film-coated tablets — a fast-acting, once-daily non-sedating H1 receptor antagonist for 24-hour symptom relief in seasonal allergic rhinitis and chronic idiopathic urticaria.",
    content:
      "<p><strong>Xofedin® 120 (জোফেডিন ১২০)</strong> contains fexofenadine hydrochloride 120 mg, an advanced second-generation, peripherally selective histamine H<sub>1</sub>-receptor antagonist. Fexofenadine delivers rapid, 24-hour control of allergic symptoms without penetrating the blood-brain barrier, providing effective symptom relief without causing drowsiness or psychomotor impairment.</p>" +
      "<p>Indicated for the relief of symptoms associated with seasonal allergic rhinitis (sneezing, rhinorrhea, itchy/watery eyes, itching of the nose or throat) and the symptomatic management of uncomplicated skin manifestations of chronic idiopathic urticaria in adults and children 12 years of age and older.</p>" +
      "<p>Marketed and distributed by <strong>SANVEEX GLOBAL HEALTH</strong> (3/8, Pirerbag (60 feet), Mirpur-2, Dhaka - 1216) and manufactured under WHO-GMP compliance by <strong>Amulet Pharmaceuticals Ltd.</strong> (Mfg. Lic. No. 418 & 287, MA No. 246-17-021).</p>",
    image: "/products/xofedin-120.webp",
    gallery: [
      "/products/xofedin-120-label.webp",
      "/4.jpeg",
      "/3.jpeg",
    ],
    features: [
      "True non-sedating profile: preserves daytime alertness and cognitive performance",
      "Once-daily 120 mg dosing gives full 24-hour continuous allergic protection",
      "Rapid onset of action relieves sneezing, nasal discharge and ocular pruritus",
      "Effective relief in chronic idiopathic urticaria (hives, wheals and pruritus)",
      "WHO-GMP manufactured and DGDA Bangladesh certified (MA No. 246-17-021)",
    ],
    specifications: [
      { label: "Brand Name", value: "Xofedin® 120 (জোফেডিন ১২০)" },
      { label: "Generic Name", value: "Fexofenadine Hydrochloride BP" },
      { label: "Strength", value: "120 mg" },
      { label: "Dosage Form", value: "Film Coated Tablet (ফিল্ম-কোটেড ট্যাবলেট)" },
      { label: "Pack Size", value: "3 × 10 Tablets (৩ × ১০ ট্যাবলেট)" },
      { label: "Therapeutic Class", value: "Second-generation Non-sedating Antihistamine" },
      { label: "Marketing Authorisation (MA) No.", value: "246-17-021" },
      { label: "Manufacturing Licence No.", value: "418 & 287" },
      {
        label: "Manufacturer",
        value: "Amulet Pharmaceuticals Ltd., Singdighi, Mawna, Sreepur, Gazipur, Bangladesh",
      },
      {
        label: "Marketed & Distributed By",
        value: "SANVEEX GLOBAL HEALTH, 3/8, Pirerbag (60 feet), Mirpur-2, Dhaka - 1216",
      },
    ],
    clinical: [
      {
        label: "Composition (English & Bangla)",
        value:
          "Each film-coated tablet contains: Fexofenadine Hydrochloride BP 120 mg.\n(প্রতিটি ফিল্ম কোটেড ট্যাবলেটে আছে ফেক্সোফেনাডিন হাইড্রোক্লোরাইড বিপি ১২০ মি.গ্রা.।)",
      },
      {
        label: "Indications",
        value:
          "1. Relief of symptoms associated with seasonal allergic rhinitis in adults and adolescents aged 12 years and older (sneezing, runny nose, itchy/red/watery eyes, nasal pruritus).\n2. Symptomatic relief of uncomplicated skin manifestations of chronic idiopathic urticaria (pruritus, wheals, erythema).",
      },
      {
        label: "Dosage & Administration",
        value:
          "Adults and children 12 years of age and older: One 120 mg tablet once daily.\n• Administer with a glass of water. Swallow whole.\n• Avoid co-administration with fruit juices (such as apple, orange, or grapefruit juice) as they significantly attenuate bioavailability.\n(শুধুমাত্র রেজিস্টার্ড চিকিৎসকের ব্যবস্থাপত্র অনুযায়ী সেব্য। নির্দেশনা ও সেবনবিধি: ভিতরের নির্দেশনামা দেখুন।)",
      },
      {
        label: "Contraindications",
        value:
          "Known hypersensitivity to fexofenadine hydrochloride, terfenadine, or to any of the tablet excipients.",
      },
      {
        label: "Precautions & Drug Interactions",
        value:
          "Dose adjustment may be warranted in patients with significant renal impairment. Antacids containing aluminium or magnesium hydroxide should be spaced by at least 2 hours before or after fexofenadine ingestion.",
      },
      {
        label: "Storage & Safety",
        value:
          "Store below 30°C in a dry place, protected from light. Keep all medicines strictly out of the reach of children.\n(সকল ঔষধ শিশুদের নাগালের বাহিরে রাখুন। আলো থেকে দূরে, শুকনো ও ঠান্ডা স্থানে রাখুন।)",
      },
    ],
    links: [],
    isActive: true,
    isFeatured: true,
    order: 3,
  },
];

export const productsBySlug = Object.fromEntries(
  products.map((p) => [p.slug, p]),
) as Record<string, SanveexProduct>;
