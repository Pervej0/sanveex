/**
 * Canonical corporate details for Sanveex Global Health.
 *
 * Kept in one place so the header, footer, product pages and structured data
 * (SEO) always agree. Values mirror the information printed on the approved
 * Sanveex product artwork.
 */

export const company = {
  legalName: "Sanveex Global Health",
  shortName: "Sanveex",
  tagline: "Global Health",
  establishedNote: "Pharmaceutical Marketing & Distribution",

  /** Registered marketing & distribution office — printed on approved Sanveex cartons. */
  address: {
    line1: "3/8, Pirerbag (60 feet), Mirpur-2",
    line2: "Dhaka-1216",
    country: "Bangladesh",
    full: "3/8, Pirerbag (60 feet), Mirpur-2, Dhaka-1216, Bangladesh",
    corporateLine: "24 Tejkunipara, Farmgate, Dhaka-1215, Bangladesh",
  },

  contact: {
    phone: "+880 1996 716929",
    phoneHref: "+8801996716929",
    email: "info@sanveex.com",
    supportEmail: "info@sanveex.com",
    hours: "Sun – Thu, 9:00 AM – 6:00 PM (BST)",
  },

  /** Contract manufacturer holding the product registrations. */
  manufacturer: {
    name: "Amulet Pharmaceuticals Ltd.",
    address: "Singdighi, Mawna, Sreepur, Gazipur, Bangladesh",
    licence: "418 & 287",
  },

  regulatory: {
    /** Drug manufacturing licence numbers printed on Sanveex packs. */
    mfgLicence: "418 & 287",
    authority: "Directorate General of Drug Administration (DGDA), Bangladesh",
    qualityStandard: "WHO-GMP compliant manufacturing",
  },

  stats: [
    { value: "WHO-GMP", label: "Certified Manufacturing" },
    { value: "DGDA", label: "Approved Formulations" },
    { value: "64", label: "Districts Covered" },
    { value: "100%", label: "Batch Traceability" },
  ],
} as const;

export const legalDisclaimer =
  "This information is intended for healthcare professionals and is not a substitute for professional medical advice. Always prescribe, dispense and use medicines in accordance with the prescribing information approved by the Directorate General of Drug Administration (DGDA).";

export const productDisclaimer =
  "Prescription-only medicine. To be used strictly as directed by a registered physician. Keep all medicines out of the reach of children. Store in a cool, dry place away from direct light.";
