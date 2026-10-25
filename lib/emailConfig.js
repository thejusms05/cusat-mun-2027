// Everything the allotment email says that isn't about one specific delegate.
// Edit the values below, save, and push — no other file needs to change.
// Optional lines: leave "" or [] and that part of the email simply doesn't appear.

export const EMAIL_CONFIG = {
  eventName: "CUSAT MUN 2027",
  dateText: "22nd, 23rd and 24th January 2027",
  venue: "Cochin University of Science and Technology, Kalamassery, Kochi",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://cusat-mun-2027.vercel.app",

  // e.g. "The committees will be in session on all three days."
  scheduleNote: "",

  // Payment section (all optional)
  paymentUrl: "",            // link to your payment form
  accommodationUrl: "",      // link to an accommodation form
  paymentDeadline: "",       // e.g. "20/1/2027, 5:00 PM"
  fees: [],                  // e.g. [{label:"Individual", amount:"INR 1499"}, {label:"School (Delegation)", amount:"INR 1399"}]
  feeNote: "",               // e.g. "Fee reductions for delegations are processed on arrival."

  // Extra paragraphs shown before the sign-off, e.g. WhatsApp group / re-allotment policy
  extraParagraphs: [],

  // Contact block
  contactEmail: "thejusmsajeem2000@gmail.com",   // <-- REPLACE with your real address (sending is blocked until you do)
  instagram: "",                                // e.g. "@cusatmun"
  delegateAffairs: [],                          // e.g. [{name:"Austin", phone:"+91 00000 00000"}]
  contacts: [],                                 // e.g. [{name:"Name", role:"Secretary General", phone:"+91 00000 00000"}]
};
