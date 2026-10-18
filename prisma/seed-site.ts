/**
 * Seeds the corporate navigation tree and the standard content pages that the
 * navigation links to.
 *
 * Idempotent:
 *   • navigation is fully rebuilt from this file (it is structural config), and
 *   • pages are created only when their slug does not already exist, so any
 *     copy edited in the dashboard is never overwritten.
 *
 * Run:  npm run seed:site
 */

import "dotenv/config";
import prisma from "@/lib/prisma";
import { company } from "@/lib/company";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

const navigation = [
  {
    title: "About",
    href: "/about/overview",
    children: [
      {
        title: "Company Overview",
        href: "/about/overview",
        description: "Who we are, our mission and the markets we serve.",
      },
      {
        title: "Leadership Team",
        href: "/about/leadership",
        description: "The people accountable for quality and compliance.",
      },
      {
        title: "Mission & Values",
        href: "/about/mission-and-values",
        description: "The principles behind every product we release.",
      },
      {
        title: "Board Message",
        href: "/about/speech",
        description: "A word from our board of directors.",
      },
    ],
  },
  {
    title: "Products",
    href: "/products/overview",
    children: [
      {
        title: "Product Portfolio",
        href: "/products/overview",
        description: "The complete Sanveex range across therapeutic areas.",
      },
      {
        title: "Medical Information",
        href: "/products/medical-info",
        description: "Prescribing information and clinical references.",
      },
      {
        title: "Quality Assurance",
        href: "/products/quality",
        description: "WHO-GMP manufacturing and batch documentation.",
      },
      {
        title: "Safety Information",
        href: "/products/safety",
        description: "Adverse event reporting and pharmacovigilance.",
      },
    ],
  },
  {
    title: "Quality & Science",
    href: "/science/overview",
    children: [
      {
        title: "R&D Overview",
        href: "/science/overview",
        description: "How molecules are selected, evaluated and launched.",
      },
      {
        title: "Scientific Advisory",
        href: "/science/advisory",
        description: "Our medical and scientific advisory panel.",
      },
      {
        title: "Publications",
        href: "/science/publications",
        description: "Clinical literature and reference material.",
      },
    ],
  },
  {
    title: "Responsibility",
    href: "/stories/sustainability",
    children: [
      {
        title: "Sustainability",
        href: "/stories/sustainability",
        description: "Reducing the environmental footprint of our supply chain.",
      },
      {
        title: "Community Impact",
        href: "/stories/community",
        description: "Health camps, access programmes and local partnerships.",
      },
      {
        title: "Patient Stories",
        href: "/stories/patients",
        description: "Real outcomes from the therapies we distribute.",
      },
    ],
  },
  { title: "Newsroom", href: "/newsroom", children: [] },
  { title: "Contact", href: "/contact", children: [] },
];

/* -------------------------------------------------------------------------- */
/* Content helper                                                             */
/* -------------------------------------------------------------------------- */

const section = (heading: string, body: string) =>
  `<h2>${heading}</h2>${body}`;

const list = (items: string[]) =>
  `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

/* -------------------------------------------------------------------------- */
/* Content pages                                                              */
/* -------------------------------------------------------------------------- */

type ContentPage = {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  content: string;
};

const pages: ContentPage[] = [
  {
    slug: "/about/leadership",
    title: "Leadership Team",
    description:
      "Meet the management team responsible for Sanveex Global Health's commercial operations, quality systems and regulatory compliance.",
    keywords: "Sanveex leadership, pharmaceutical management Bangladesh",
    content:
      section(
        "Accountable leadership",
        `<p>Sanveex Global Health is led by a compact management team with combined experience across pharmaceutical manufacturing, regulatory affairs, medical affairs and nationwide distribution. Each function reports directly to the board and owns a defined set of compliance obligations.</p>`,
      ) +
      section(
        "Our functions",
        list([
          "<strong>Managing Director</strong> — overall strategy, partnerships and governance.",
          "<strong>Director, Regulatory Affairs</strong> — product registration with the DGDA, licence maintenance and labelling compliance.",
          "<strong>Head of Quality</strong> — batch documentation review, deviation management and recall readiness.",
          "<strong>Medical Affairs Lead</strong> — prescriber education, medical information responses and pharmacovigilance oversight.",
          "<strong>Head of Commercial</strong> — distributor network, institutional supply and key-account management.",
          "<strong>Head of Supply Chain</strong> — warehousing, cold-chain integrity and nationwide logistics.",
        ]),
      ) +
      section(
        "Governance",
        `<p>Management reviews quality metrics, complaints and adverse event reports on a fixed monthly cycle. Serious quality defects and safety signals are escalated to the board within 24 hours and reported onwards to the ${company.regulatory.authority} in line with statutory timelines.</p>`,
      ),
  },
  {
    slug: "/about/mission-and-values",
    title: "Mission & Values",
    description:
      "Our mission is to make quality-assured medicines reliably available — supported by five values that govern how we operate.",
    keywords: "Sanveex mission, values, corporate governance",
    content:
      section(
        "Our mission",
        `<p>To make quality-assured, affordable medicines reliably available to clinicians and patients in Bangladesh — through ethical marketing, disciplined distribution and uncompromising documentation.</p>`,
      ) +
      section(
        "Our values",
        list([
          "<strong>Patient safety first.</strong> No commercial target outranks a safety obligation.",
          "<strong>Evidence over promotion.</strong> We communicate only what is supported by approved prescribing information.",
          "<strong>Traceability.</strong> If we cannot document it, we do not distribute it.",
          "<strong>Partnership.</strong> We treat clinicians, pharmacists and distributors as long-term collaborators.",
          "<strong>Continuous improvement.</strong> Every complaint and deviation becomes a corrective action.",
        ]),
      ) +
      section(
        "Code of conduct",
        `<p>Sanveex operates a written code of conduct covering interactions with healthcare professionals, gifts and hospitality, promotional material approval, and conflicts of interest. All field colleagues are trained on it annually and confirm compliance in writing.</p><p>We do not offer inducements for prescribing, and we do not promote prescription-only medicines to the general public.</p>`,
      ),
  },
  {
    slug: "/about/speech",
    title: "Board Message",
    description:
      "A message from the board of Sanveex Global Health on quality, ethics and long-term commitment to Bangladeshi healthcare.",
    keywords: "Sanveex board message",
    content:
      section(
        "Building a company clinicians can rely on",
        `<p>Sanveex Global Health was founded on a straightforward observation: clinicians in Bangladesh should not have to choose between affordable therapy and dependable quality. Our answer has been to build the company around documentation — registration dossiers, batch records, stability data and distribution traceability — rather than around volume alone.</p>
         <p>We partner with Amulet Pharmaceuticals Ltd., a manufacturer operating to WHO Good Manufacturing Practice standards, and we hold ourselves to the same discipline on the commercial side. Every product we release has an approved marketing authorisation, a defined batch identity and a documented route to market.</p>`,
      ) +
      section(
        "What we commit to",
        list([
          "Transparent, evidence-based communication with healthcare professionals.",
          "Rapid, documented handling of quality complaints and adverse event reports.",
          "Fair, consistent terms for our distributor and institutional partners.",
          "Continued investment in the people who make our quality system work.",
        ]),
      ) +
      section(
        "Looking ahead",
        `<p>Our priority for the coming years is depth rather than breadth — strengthening the therapeutic areas we already serve, widening access through institutional and public-health channels, and continuing to raise the standard of our pharmacovigilance and medical information services.</p><p>We are grateful to the clinicians, pharmacists and partners who have placed their trust in us, and we intend to keep earning it.</p>`,
      ),
  },
  {
    slug: "/products/medical-info",
    title: "Medical Information",
    description:
      "Prescribing information, composition, dosage and clinical references for Sanveex products, for healthcare professionals.",
    keywords: "Sanveex prescribing information, medical information",
    content:
      section(
        "Information for healthcare professionals",
        `<p>This section is intended for registered physicians, pharmacists and other licensed healthcare professionals. Product summaries are provided for reference only and do not replace the full prescribing information approved by the ${company.regulatory.authority}.</p>`,
      ) +
      section(
        "What we can provide",
        list([
          "Full approved prescribing information (product insert).",
          "Composition, strength and excipient details.",
          "Indications, posology and administration guidance.",
          "Contraindications, warnings and interactions.",
          "Stability, storage and shelf-life data.",
          "Batch-specific certificates of analysis on request.",
        ]),
      ) +
      section(
        "Requesting information",
        `<p>Send your request to <a href="mailto:${company.contact.email}">${company.contact.email}</a> stating the product name, your institution and the specific document required. Our medical information team acknowledges requests within one business day.</p><p>For urgent clinical queries outside office hours, call ${company.contact.phone}.</p>`,
      ),
  },
  {
    slug: "/products/quality",
    title: "Quality Assurance",
    description:
      "How Sanveex Global Health assures batch quality: WHO-GMP manufacturing, retained samples, stability programmes and recall readiness.",
    keywords: "WHO-GMP, quality assurance, pharmaceutical quality Bangladesh",
    content:
      section(
        "Quality is a system, not a certificate",
        `<p>All Sanveex products are manufactured by ${company.manufacturer.name} (${company.manufacturer.address}) under licence number ${company.regulatory.mfgLicence}. The facilities operate to World Health Organization Good Manufacturing Practice (WHO-GMP) standards and are inspected by the ${company.regulatory.authority}.</p>`,
      ) +
      section(
        "What we verify before release",
        list([
          "Valid marketing authorisation for the specific strength and pack.",
          "Batch manufacturing and analytical records reviewed against specification.",
          "Assay, dissolution, uniformity of mass and microbiological results within limits.",
          "Correct artwork, Bengali and English labelling, and approved pack configuration.",
          "Storage and transport conditions maintained from factory to warehouse.",
        ]),
      ) +
      section(
        "Stability and retention",
        `<p>Ongoing stability programmes are maintained for every registered product, and retention samples are held for the full shelf-life plus one year. This allows any quality question raised after distribution to be investigated against the original batch.</p>`,
      ) +
      section(
        "Complaints and recalls",
        `<p>Quality complaints are logged, investigated and closed with a documented root cause and corrective action. Where a batch fails to meet specification or a safety issue is identified, a written recall procedure is activated within 24 hours, with distribution records used to trace every affected unit.</p><p>Report a quality complaint to <a href="mailto:${company.contact.email}">${company.contact.email}</a> quoting the product name and batch number printed on the pack.</p>`,
      ),
  },
  {
    slug: "/products/safety",
    title: "Safety Information",
    description:
      "Report an adverse event or side effect from a Sanveex product. Pharmacovigilance contact and reporting process.",
    keywords: "pharmacovigilance Bangladesh, adverse event reporting, SANVEEX safety",
    content:
      section(
        "Pharmacovigilance at Sanveex",
        `<p>Sanveex Global Health operates a pharmacovigilance system for every product we market. We collect, assess and report adverse events in line with the requirements of the ${company.regulatory.authority}.</p>`,
      ) +
      section(
        "Report an adverse event",
        `<p>If you or a patient experiences a suspected side effect, please contact us as soon as possible. Serious events should be reported within 24 hours.</p>
         ${list([
           `Email: <a href="mailto:${company.contact.email}">${company.contact.email}</a>`,
           `Telephone: <a href="tel:${company.contact.phoneHref}">${company.contact.phone}</a>`,
           `Post: ${company.address.line1}, ${company.address.line2}, ${company.address.country}`,
         ])}`,
      ) +
      section(
        "What to include",
        list([
          "Product name and strength.",
          "Batch number and expiry date, as printed on the pack.",
          "A description of the event and when it started.",
          "Patient age, sex and whether other medicines were being taken.",
          "Your contact details so we can follow up, if required.",
        ]),
      ) +
      section(
        "What happens next",
        `<p>Every report is logged, assessed for causality and seriousness, and acknowledged within one business day. Serious and unexpected events are forwarded to the ${company.regulatory.authority} within statutory timelines. Personal identifiers are handled confidentially and are never used for commercial purposes.</p>`,
      ),
  },
  {
    slug: "/science/overview",
    title: "R&D Overview",
    description:
      "How Sanveex selects, evaluates and launches molecules — from therapeutic gap analysis to regulatory submission.",
    keywords: "pharmaceutical R&D, product selection Bangladesh",
    content:
      section(
        "How we choose what to make available",
        `<p>Sanveex is a marketing and distribution company rather than a research laboratory. Our product development work therefore focuses on identifying molecules that already have a strong evidence base but remain under-served or inconsistently available in Bangladesh.</p>`,
      ) +
      section(
        "Our selection framework",
        list([
          "<strong>Unmet clinical need</strong> — where does local prescriber demand outstrip reliable supply?",
          "<strong>Evidence quality</strong> — is there peer-reviewed, guideline-level support for the indication?",
          "<strong>Manufacturing feasibility</strong> — can the product be produced to WHO-GMP standard at a sustainable cost?",
          "<strong>Regulatory pathway</strong> — is a clear and achievable registration route available with the DGDA?",
          "<strong>Commercial viability</strong> — can it be delivered at a price clinicians and patients can accept?",
        ]),
      ) +
      section(
        "From decision to launch",
        `<p>A validated molecule moves through dossier preparation, stability and bioequivalence requirements where applicable, artwork development for Bengali and English labelling, DGDA submission and approval. Only after authorisation is granted does commercial launch planning begin — including prescriber education, distributor briefing and pharmacovigilance preparation.</p>`,
      ),
  },
  {
    slug: "/science/advisory",
    title: "Scientific Advisory",
    description:
      "Sanveex works with an external scientific advisory panel of clinicians and pharmacists to guide medical strategy.",
    keywords: "scientific advisory board, medical affairs Bangladesh",
    content:
      section(
        "External clinical guidance",
        `<p>Our medical strategy is reviewed by an external panel of practising clinicians and senior pharmacists. The panel does not participate in commercial decisions; its role is to test whether our claims, educational material and portfolio priorities reflect current clinical practice.</p>`,
      ) +
      section(
        "What the panel reviews",
        list([
          "Prescribing information and product summaries before publication.",
          "Educational material issued to healthcare professionals.",
          "Portfolio gaps in the therapeutic areas we serve.",
          "Pharmacovigilance and risk-minimisation priorities.",
        ]),
      ) +
      section(
        "Independence",
        `<p>All panel members declare potential conflicts of interest annually, including any financial relationship with Sanveex or its manufacturing partners. Members are not compensated for endorsing specific products, and any opinion recorded against a proposal is documented in the medical affairs file.</p>`,
      ),
  },
  {
    slug: "/science/publications",
    title: "Publications",
    description:
      "Clinical literature and reference material supporting the molecules distributed by Sanveex Global Health.",
    keywords: "clinical publications, medical literature, Sanveex",
    content:
      section(
        "Reference literature",
        `<p>For each molecule in our portfolio we maintain a curated reference list covering pivotal trials, systematic reviews and current guideline recommendations. Healthcare professionals can request the reference pack for any Sanveex product.</p>`,
      ) +
      section(
        "Typical reference material",
        list([
          "Pivotal randomised controlled trials supporting the approved indication.",
          "Cochrane or equivalent systematic reviews where available.",
          "National and international guideline recommendations.",
          "Safety and pharmacovigilance literature reviews.",
        ]),
      ) +
      section(
        "Request a literature pack",
        `<p>Email <a href="mailto:${company.contact.email}">${company.contact.email}</a> with the product name and the clinical question you are addressing. Reference packs are issued to licensed healthcare professionals only.</p>`,
      ),
  },
  {
    slug: "/stories/sustainability",
    title: "Sustainability",
    description:
      "How Sanveex Global Health is reducing the environmental footprint of pharmaceutical warehousing and distribution.",
    keywords: "sustainability, pharmaceutical distribution impact",
    content:
      section(
        "Doing less harm across the supply chain",
        `<p>Pharmaceutical distribution has a measurable footprint — energy for climate-controlled storage, packaging for transport, and fuel for nationwide delivery. We manage these deliberately rather than treating them as fixed costs.</p>`,
      ) +
      section(
        "Current priorities",
        list([
          "<strong>Energy.</strong> LED lighting and scheduled HVAC operation in warehousing areas, with consumption tracked monthly.",
          "<strong>Packaging.</strong> Consolidated secondary cartons and a shift to recyclable outer materials where regulators allow.",
          "<strong>Logistics.</strong> Route consolidation to reduce the number of partial-load deliveries per district.",
          "<strong>E-waste.</strong> Controlled disposal of decommissioned IT and cold-chain monitoring equipment.",
        ]),
      ) +
      section(
        "Expired and returned medicines",
        `<p>Expired stock and customer returns are quarantined immediately and destroyed through licensed waste contractors. Destruction certificates are retained against the original batch record, so nothing re-enters the supply chain and nothing is disposed of informally.</p>`,
      ),
  },
  {
    slug: "/stories/community",
    title: "Community Impact",
    description:
      "Health camps, access programmes and local partnerships supported by Sanveex Global Health.",
    keywords: "community health Bangladesh, access to medicine",
    content:
      section(
        "Access beyond the pharmacy counter",
        `<p>A medicine only creates value when a patient can actually reach it. Alongside our commercial distribution, Sanveex supports programmes that widen access in underserved districts.</p>`,
      ) +
      section(
        "Our activities",
        list([
          "<strong>Free health camps.</strong> Joint camps with local physicians offering blood pressure, blood glucose and bone-health screening.",
          "<strong>Institutional supply.</strong> Preferential terms for charitable clinics and non-profit hospitals serving low-income communities.",
          "<strong>Prescriber education.</strong> Non-promotional sessions on rational use of medicines, held with district medical associations.",
          "<strong>Disaster response.</strong> Rapid allocation of essential stock to relief operations during floods and cyclones.",
        ]),
      ) +
      section(
        "Partnerships",
        `<p>We prefer to work through existing local institutions — district hospitals, medical colleges and registered non-profits — rather than running parallel structures. If your organisation would like to partner with us, write to <a href="mailto:${company.contact.email}">${company.contact.email}</a>.</p>`,
      ),
  },
  {
    slug: "/stories/innovation",
    title: "Innovation Stories",
    description:
      "Practical improvements Sanveex has made to product availability, packaging and distribution in Bangladesh.",
    keywords: "pharmaceutical innovation, distribution technology",
    content:
      section(
        "Innovation in practice, not in press releases",
        `<p>For a marketing and distribution company, innovation usually means removing friction — fewer stock-outs, clearer pack information, faster complaint resolution. These are the improvements we prioritise.</p>`,
      ) +
      section(
        "Recent improvements",
        list([
          "<strong>Bilingual pack information.</strong> Every Sanveex carton carries complete Bengali and English instructions, composition and storage guidance.",
          "<strong>Batch-level visibility.</strong> Distribution records allow a specific batch to be traced to the districts and institutions it reached.",
          "<strong>Structured complaint intake.</strong> A standard report format shortens the time between a pharmacist noticing a defect and our investigation starting.",
          "<strong>Stock planning with distributors.</strong> Consumption-based replenishment reduces emergency orders and improves availability of core molecules.",
        ]),
      ) +
      section(
        "What we are working on",
        `<p>Current projects include tighter cold-chain monitoring for temperature-sensitive lines and a simplified adverse event reporting form designed to be completed in under two minutes.</p>`,
      ),
  },
  {
    slug: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "How Sanveex Global Health collects, uses and protects personal information submitted through this website.",
    keywords: "privacy policy, data protection",
    content:
      section(
        "Information we collect",
        `<p>We collect only the information you choose to provide through our contact and enquiry forms — typically your name, organisation, email address, telephone number and the content of your message. We also collect standard server logs for security and performance monitoring.</p>`,
      ) +
      section(
        "How we use it",
        list([
          "To respond to your enquiry or product information request.",
          "To handle quality complaints and adverse event reports, including forwarding to the regulator where legally required.",
          "To maintain records required by pharmaceutical regulation.",
        ]),
      ) +
      section(
        "What we do not do",
        `<p>We do not sell, rent or trade personal information. We do not use the data submitted through this website for advertising profiling.</p>`,
      ) +
      section(
        "Retention and your rights",
        `<p>Enquiry records are retained for as long as necessary to handle the matter and to satisfy regulatory retention requirements. You may request access to, correction of, or deletion of your personal information by writing to <a href="mailto:${company.contact.email}">${company.contact.email}</a>. We respond to such requests within 30 days.</p>`,
      ),
  },
  {
    slug: "/terms",
    title: "Terms of Use",
    description:
      "Terms governing use of the Sanveex Global Health website and the medical information published on it.",
    keywords: "terms of use, website terms",
    content:
      section(
        "Acceptance",
        `<p>By accessing this website you agree to these terms. If you do not agree, please discontinue use.</p>`,
      ) +
      section(
        "Intended audience",
        `<p>This website is published for healthcare professionals, existing and prospective business partners, and members of the public seeking general corporate information. Product information is provided for healthcare professionals and is not medical advice.</p>`,
      ) +
      section(
        "No medical advice",
        `<p>Nothing on this website should be used to diagnose or treat any condition. Always consult a registered physician before starting, stopping or changing any medicine. Always follow the approved prescribing information supplied with the product.</p>`,
      ) +
      section(
        "Accuracy",
        `<p>We take reasonable care to keep product information current, but composition, pack presentation and regulatory details may change. The information printed on the approved pack and the current prescribing information always takes precedence over this website.</p>`,
      ) +
      section(
        "Intellectual property",
        `<p>All trademarks, brand names and artwork shown on this website are the property of their respective owners and may not be reproduced without written permission.</p>`,
      ),
  },
];

/* -------------------------------------------------------------------------- */
/* Seeders                                                                    */
/* -------------------------------------------------------------------------- */

async function seedNavigation() {
  const existing = await prisma.navItem.count();
  if (existing > 0) {
    // Children first — the self-relation forbids deleting a parent while
    // dependants still reference it.
    await prisma.navItem.deleteMany({ where: { parentId: { not: null } } });
    await prisma.navItem.deleteMany({ where: { parentId: null } });
    console.log(`  · removed ${existing} existing navigation entries`);
  }

  let order = 0;
  for (const item of navigation) {
    const parent = await prisma.navItem.create({
      data: {
        title: item.title,
        href: item.href,
        order: order++,
        isActive: true,
      },
    });

    let childOrder = 0;
    for (const child of item.children) {
      await prisma.navItem.create({
        data: {
          title: child.title,
          href: child.href,
          description: child.description,
          parentId: parent.id,
          order: childOrder++,
          isActive: true,
        },
      });
    }

    console.log(
      `  ✓ nav: ${item.title} (${item.children.length} children)`,
    );
  }
}

async function seedPages() {
  let created = 0;
  let skipped = 0;

  for (const page of pages) {
    const exists = await prisma.page.findUnique({
      where: { slug: page.slug },
    });

    if (exists) {
      skipped += 1;
      continue;
    }

    await prisma.page.create({
      data: {
        title: page.title,
        slug: page.slug,
        description: page.description,
        keywords: page.keywords,
        content: page.content,
        layout: "default",
        isActive: true,
      },
    });
    created += 1;
    console.log(`  ✓ page: ${page.slug} — ${page.title}`);
  }

  console.log(`  · pages created: ${created}, already present: ${skipped}`);
}

async function main() {
  console.log("Seeding Sanveex site navigation and content pages…\n");
  await seedNavigation();
  console.log("");
  await seedPages();
  console.log("\nNavigation and content seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Site seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
