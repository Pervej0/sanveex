import prisma from "../src/lib/prisma";

export const relevantArticles = [
  {
    slug: "nationwide-cold-chain-expansion",
    title: "Sanveex Expands Temperature-Controlled Distribution Network Across All 64 Districts in Bangladesh",
    category: "Supply Chain",
    type: "PRESS RELEASE",
    readTime: "4 min read",
    authorName: "Operations & Supply Directorate",
    authorRole: "Logistics Division",
    isFeatured: true,
    isActive: true,
    publishedAt: new Date("2026-03-12T09:00:00Z"),
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Sanveex Global Health has announced the nationwide operational expansion of its GDP-compliant cold-chain and temperature-controlled pharmaceutical distribution network across all 64 administrative districts of Bangladesh.",
    content: `
      <h2>Nationwide Access to Quality-Assured Medicines</h2>
      <p>Sanveex Global Health has officially completed the phased expansion of its nationwide pharmaceutical supply chain, establishing direct, temperature-monitored distribution channels reaching licensed retail pharmacies, clinics, and hospital pharmacies across all 64 administrative districts of Bangladesh.</p>
      
      <p>Maintaining formulation integrity during transit is paramount, particularly in Bangladesh's tropical climate where ambient heat and humidity can compromise product stability. Through our centralized warehousing hub in Dhaka and regional transit distribution points in Chittagong, Rajshahi, Sylhet, Khulna, Barisal, Rangpur, and Mymensingh, every batch is monitored under strict Good Distribution Practice (GDP) guidelines.</p>

      <h2>Real-Time Temperature Monitoring & Cold-Chain Integrity</h2>
      <p>Key features of the upgraded Sanveex distribution infrastructure include:</p>
      <ul>
        <li><strong>Continuous Thermal Logging:</strong> Calibrated electronic data loggers embedded within bulk transit cartons recording temperature parameters from dispatch to receipt.</li>
        <li><strong>Climate-Controlled Fleet:</strong> Dedicated delivery vehicles equipped with secondary insulated compartments ensuring consistent ambient temperatures below 25°C.</li>
        <li><strong>Express Pharmacy Replenishment:</strong> Guaranteed replenishment cycles for critical respiratory and bone health therapies to eliminate stock-outs in district and upazila health centres.</li>
      </ul>

      <blockquote>
        "Our mission is to ensure that a patient in a remote upazila receives the exact same uncompromised therapeutic efficacy as a patient in a major tertiary hospital in Dhaka. Expanding our controlled supply chain to all 64 districts is a major operational milestone toward that commitment."
        <cite>— Directorate of Medical Affairs & Operations, Sanveex Global Health</cite>
      </blockquote>

      <h2>Auditable Compliance with DGDA Standards</h2>
      <p>All distribution procedures are fully registered and audited in alignment with regulatory guidelines issued by the Directorate General of Drug Administration (DGDA). Every consignment is accompanied by batch-specific certificates of analysis and verified delivery documentation to maintain complete chain of custody.</p>
    `.trim(),
  },
  {
    slug: "clinical-review-montelukast-montilet-10",
    title: "Clinical Review: The Role of Montelukast (Montilet 10) in Managing Chronic Asthma and Allergic Rhinitis",
    category: "Clinical Guidance",
    type: "CLINICAL UPDATE",
    readTime: "6 min read",
    authorName: "Dr. K. M. Rahman",
    authorRole: "Senior Medical Advisor",
    isFeatured: true,
    isActive: true,
    publishedAt: new Date("2026-02-28T10:30:00Z"),
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    excerpt: "A comprehensive clinical review evaluating leukotriene receptor antagonist (LTRA) therapy with Montelukast Sodium INN 10 mg (Montilet 10) in controlling nocturnal asthma symptoms, exercise-induced bronchospasm, and persistent allergic rhinitis.",
    content: `
      <h2>Understanding the Pathophysiology of Cysteinyl Leukotrienes</h2>
      <p>Cysteinyl leukotrienes (LTC4, LTD4, LTE4) are potent inflammatory lipid mediators synthesized from arachidonic acid through the 5-lipoxygenase pathway. In patients with asthma and allergic rhinitis, these mediators bind to high-affinity CysLT1 receptors on airway smooth muscle cells, vascular endothelium, and inflammatory cells.</p>

      <p>Activation of CysLT1 receptors triggers profound bronchoconstriction, hypersecretion of viscous mucus, mucosal edema, and eosinophil migration—producing the hallmark clinical symptoms of wheezing, chest tightness, nocturnal coughing, and seasonal rhinitis.</p>

      <h2>Mechanism and Clinical Pharmacology of Montilet 10</h2>
      <p><strong>Montilet 10</strong> contains Montelukast Sodium INN 10 mg, an orally active, highly selective antagonist of the CysLT1 receptor. By competitively inhibiting leukotriene binding, Montelukast provides targeted anti-inflammatory action complementary to inhaled corticosteroids (ICS).</p>

      <h3>Key Therapeutic Benefits Demonstrated in Practice:</h3>
      <ul>
        <li><strong>Nocturnal Symptom Reduction:</strong> Marked decrease in nighttime asthma awakenings and morning chest tightness, providing 24-hour baseline airway stability.</li>
        <li><strong>Exercise-Induced Bronchoconstriction (EIB):</strong> Significant attenuation of post-exercise fall in FEV1 when administered once daily in the evening.</li>
        <li><strong>Concomitant Allergic Rhinitis Relief:</strong> Dual therapeutic coverage reducing nasal congestion, rhinorrhea, and sneezing in patients with combined upper and lower airway disease.</li>
      </ul>

      <h2>Dosage, Administration & Clinical Safety</h2>
      <p>For adult and adolescent patients aged 15 years and older, the recommended dosage is one 10 mg tablet once daily taken in the evening, with or without food. Prescribing clinicians are advised to reinforce patient adherence as a continuous maintenance therapy rather than a rescue bronchodilator during acute bronchospasm.</p>

      <p><em>Manufactured under strict WHO-GMP compliance by Amulet Pharmaceuticals Ltd. (Mfg. Lic. 418 & 287) and marketed across Bangladesh by Sanveex Global Health under DGDA registration.</em></p>
    `.trim(),
  },
  {
    slug: "who-gmp-cleanroom-manufacturing-gazipur",
    title: "WHO-GMP Manufacturing Standards: Inside the Gazipur Facility Partnership with Amulet Pharmaceuticals",
    category: "Manufacturing & Quality",
    type: "FACILITY SPOTLIGHT",
    readTime: "5 min read",
    authorName: "Quality Assurance Directorate",
    authorRole: "Technical Operations",
    isFeatured: true,
    isActive: true,
    publishedAt: new Date("2026-02-15T08:15:00Z"),
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Manufactured in partnership with Amulet Pharmaceuticals Ltd. at Singdighi, Gazipur under Drug Licences 418 & 287, Sanveex formulations undergo rigorous Class C/D HVAC filtration, automated optical inspection, and validated in-process controls.",
    content: `
      <h2>A Manufacturing Foundation Built on Quality Assurance</h2>
      <p>Sanveex Global Health partners exclusively with <strong>Amulet Pharmaceuticals Ltd.</strong>, an advanced pharmaceutical manufacturer operating a state-of-the-art facility located in Singdighi, Mawna, Sreepur, Gazipur, Bangladesh. The facility operates in strict compliance with the World Health Organization's Good Manufacturing Practice (WHO-GMP) code and active Drug Manufacturing Licences No. 418 &amp; 287 issued by the Directorate General of Drug Administration (DGDA).</p>

      <h2>Class C and D Cleanroom Architecture</h2>
      <p>Formulation purity begins with environmental engineering. The Gazipur plant utilizes precision air-handling units (AHUs) with multi-stage HEPA filtration capable of removing 99.97% of airborne particulates down to 0.3 microns. Cleanroom suites maintain:</p>
      <ul>
        <li><strong>Differential Positive Pressure Cascades:</strong> Ensuring air always flows outward from critical processing areas to prevent cross-contamination.</li>
        <li><strong>Constant Environmental Validation:</strong> Continuous laser particle monitoring, temperature control (20°C ± 2°C), and relative humidity stabilization (below 45% for hygroscopic solid dosages).</li>
        <li><strong>Laminar Air Flow (LAF) Stations:</strong> Dedicated sterile booths for raw material sampling and active pharmaceutical ingredient (API) dispensing.</li>
      </ul>

      <h2>Automated High-Speed Packaging & 100% Optical Inspection</h2>
      <p>Solid oral dosages including <em>Montilet 10</em>, <em>Adcal D</em>, and <em>Xofedin 120</em> are packaged on high-speed thermoforming and cold-form Alu-Alu blister lines. Automated high-resolution optical inspection cameras scrutinize every single pocket for tablet completeness, color consistency, and surface defects before carton sealing.</p>

      <p>Retained reference samples and comprehensive batch production records (BPRs) are archived for every manufactured lot, ensuring total auditability throughout the product shelf life.</p>
    `.trim(),
  },
  {
    slug: "bone-health-calcium-vitamin-d3-adcal-d",
    title: "Bone Health in Adult Populations: The Synergistic Role of Calcium Carbonate & Vitamin D3 (Adcal D)",
    category: "Therapeutic Focus",
    type: "CLINICAL UPDATE",
    readTime: "5 min read",
    authorName: "Clinical Nutrition Team",
    authorRole: "Medical Affairs",
    isFeatured: false,
    isActive: true,
    publishedAt: new Date("2026-01-20T11:00:00Z"),
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Clinical insights on addressing calcium deficiency and osteoporosis in post-menopausal women and elderly populations using film-coated Calcium Carbonate 500 mg combined with Cholecalciferol (Vitamin D3) 200 IU (Adcal D).",
    content: `
      <h2>The Silent Epidemic of Osteopenia in South Asia</h2>
      <p>Osteoporosis and age-related bone mineral density (BMD) loss represent major public health concerns across Bangladesh, particularly among post-menopausal women and elderly adults. Inadequate dietary calcium intake combined with subclinical Vitamin D deficiency accelerates skeletal resorption, significantly increasing the risk of fragility fractures.</p>

      <h2>Synergistic Pharmacodynamics of Adcal D</h2>
      <p>Monotherapy with calcium alone is frequently insufficient due to limited intestinal absorption. <strong>Adcal D</strong> provides a balanced combination of 500 mg Elemental Calcium (as Calcium Carbonate BP 1250 mg) and 200 IU Cholecalciferol (Vitamin D3 BP):</p>
      <ul>
        <li><strong>Enhanced Active Transport:</strong> Vitamin D3 is metabolized in the liver and kidneys to calcitriol, which induces calcium-binding protein (calbindin-D28k) synthesis in enterocytes, boosting calcium absorption efficiency by over 300%.</li>
        <li><strong>Parathyroid Hormone (PTH) Suppression:</strong> Adequate serum calcium levels prevent secondary hyperparathyroidism, shutting down osteoclast-mediated bone breakdown.</li>
        <li><strong>High Bioavailability Salt:</strong> Calcium Carbonate provides 40% elemental calcium by weight, maximizing therapeutic yield in an easily swallowable film-coated tablet.</li>
      </ul>

      <h2>Clinical Indications & Dosage</h2>
      <p>Adcal D is indicated for the prevention and treatment of osteoporosis, osteomalacia, rickets, and conditions requiring increased calcium supplementation during pregnancy and lactation. The standard adult regimen is one tablet once or twice daily, preferably taken with or immediately after meals to maximize acid-dependent dissolution.</p>
    `.trim(),
  },
  {
    slug: "fexofenadine-efficacy-profile-xofedin-120",
    title: "Second-Generation Antihistamines: Why Fexofenadine (Xofedin 120) is the Preferred Daytime Choice",
    category: "Respiratory & Allergy",
    type: "CLINICAL UPDATE",
    readTime: "4 min read",
    authorName: "Allergy & Immunology Review Board",
    authorRole: "Clinical Affairs",
    isFeatured: false,
    isActive: true,
    publishedAt: new Date("2026-01-10T14:20:00Z"),
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=1200",
    excerpt: "Why non-sedating H1 receptor antagonists like Fexofenadine Hydrochloride 120 mg (Xofedin 120) provide superior daytime symptom control without cognitive impairment or psychomotor slowing.",
    content: `
      <h2>The Challenge of First-Generation Antihistamine Sedation</h2>
      <p>First-generation antihistamines readily cross the blood-brain barrier, occupying central H1 receptors and inducing profound drowsiness, impaired psychomotor performance, and reduced daytime work efficiency. In professional and student populations, this sedative burden can severely impact daily functioning.</p>

      <h2>Peripheral Selectivity of Xofedin 120</h2>
      <p><strong>Xofedin 120</strong> contains Fexofenadine Hydrochloride USP 120 mg, the active carboxylic acid metabolite of terfenadine. Due to its zwitterionic molecular structure, Fexofenadine demonstrates virtually zero penetration through the blood-brain barrier, offering genuine non-sedating relief.</p>

      <h3>Clinical Highlights:</h3>
      <ul>
        <li><strong>Rapid 1-Hour Onset:</strong> Clinically proven reduction in sneezing, ocular itching, and watery rhinorrhea within 60 minutes of oral administration.</li>
        <li><strong>True 24-Hour Duration:</strong> Convenient once-daily dosing sustaining continuous H1 blockade throughout the working day and overnight.</li>
        <li><strong>Clean Cardiac Profile:</strong> Devoid of cardiotoxic QT-prolongation effects associated with older second-generation compounds.</li>
      </ul>

      <p>Xofedin 120 is indicated for seasonal allergic rhinitis and chronic idiopathic urticaria in adults and adolescents aged 12 years and older.</p>
    `.trim(),
  },
  {
    slug: "dgda-serialization-2d-datamatrix-tracking",
    title: "DGDA Regulatory Compliance: Sanveex Deploys 2D DataMatrix Tracking for Patient Safety",
    category: "Regulatory Affairs",
    type: "PRESS RELEASE",
    readTime: "5 min read",
    authorName: "Regulatory Affairs Department",
    authorRole: "Quality & Compliance",
    isFeatured: false,
    isActive: true,
    publishedAt: new Date("2025-12-18T09:45:00Z"),
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1200",
    excerpt: "In full alignment with Directorate General of Drug Administration (DGDA) directives, Sanveex Global Health implements GS1-compliant 2D DataMatrix barcode serialization across all product packaging for anti-counterfeiting verification.",
    content: `
      <h2>Safeguarding Medicine Integrity from Factory to Patient</h2>
      <p>The global proliferation of substandard and falsified medical products represents a critical threat to patient safety. In response, Sanveex Global Health, in coordination with our manufacturing partner Amulet Pharmaceuticals Ltd., has deployed GS1-compliant 2D DataMatrix serialized barcoding across our complete commercial pharmaceutical portfolio.</p>

      <h2>How Serialized Verification Works</h2>
      <p>Every individual Sanveex carton features a unique, machine-readable 2D DataMatrix code encoding four critical data points:</p>
      <ul>
        <li><strong>Global Trade Item Number (GTIN):</strong> Standardized international product identification code.</li>
        <li><strong>Individual Serial Number:</strong> Unique randomized alphanumeric identifier assigned to each unit.</li>
        <li><strong>Batch / Lot Number:</strong> Traceable link to specific manufacturing and analytical records.</li>
        <li><strong>Expiration Date:</strong> Verification against dispensing expired formulations.</li>
      </ul>

      <p>This verification infrastructure enables pharmacists and healthcare providers to authenticate medicine legitimacy instantaneously using standard optical scanners, assuring patients of genuine, DGDA-approved formulations.</p>
    `.trim(),
  },
];

async function seedArticles() {
  console.log("🌱 Seeding relevant Sanveex news & clinical articles...");

  for (const article of relevantArticles) {
    const upserted = await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        category: article.category,
        type: article.type,
        readTime: article.readTime,
        authorName: article.authorName,
        authorRole: article.authorRole,
        isFeatured: article.isFeatured,
        isActive: article.isActive,
        publishedAt: article.publishedAt,
        image: article.image,
        excerpt: article.excerpt,
        content: article.content,
      },
      create: {
        slug: article.slug,
        title: article.title,
        category: article.category,
        type: article.type,
        readTime: article.readTime,
        authorName: article.authorName,
        authorRole: article.authorRole,
        isFeatured: article.isFeatured,
        isActive: article.isActive,
        publishedAt: article.publishedAt,
        image: article.image,
        excerpt: article.excerpt,
        content: article.content,
      },
    });

    console.log(`✅ Seeded article: [${upserted.category}] ${upserted.title}`);
  }

  // Deactivate old placeholder template articles if present
  const oldSlugs = ["jpm-conference", "acquisition", "clinical-data"];
  await prisma.article.updateMany({
    where: { slug: { in: oldSlugs } },
    data: { isActive: false, isFeatured: false },
  });

  console.log("✨ Successfully seeded 6 relevant Sanveex news & clinical articles!");
}

seedArticles()
  .catch((e) => {
    console.error("❌ Error seeding articles:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
