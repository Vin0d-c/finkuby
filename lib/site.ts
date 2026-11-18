/**
 * All site copy and data, ported from the live www.finkuby.com.
 * Edit text, rates and contact details here; the pages read from this file.
 */

export const SITE_URL = "https://www.finkuby.com";

/** Google Apps Script that writes leads into the Finkuby Google Sheet. */
export const LEADS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbywzOgqtLLur3Buvx0bMUSMfHR5lMTEOlV2yQd1PY41_ndYVAGKCrl22HBYVcm9DE0f/exec";

/** Where the header "Login" button goes. Point this at the customer portal once it exists. */
export const LOGIN_URL = "/login";

export const GTM_ID = "GTM-WDXHL82P";
export const GA_ID = "G-DD2T992PSP";

export const contact = {
  email: "support@finkuby.com",
  phone: "+91 9646887888",
  phoneHref: "tel:+919646887888",
  address:
    "GRB Avenue, Flat no. 101, Plot no. 83 & 84, A.S.Raju Nagar, Vivekananda Nagar, Kukatpally, Hyderabad, Telangana 500072",
  linkedin: "https://www.linkedin.com/company/finkuby/posts/?feedView=all",
};

export const COPYRIGHT_YEAR = 2026;

/* ------------------------------------------------------------------ */
/* EMI calculator                                                      */
/* ------------------------------------------------------------------ */

export type CalculatorProductKey =
  | "personal"
  | "insta-personal"
  | "business"
  | "home"
  | "used-car"
  | "lap"
  | "debt-consolidation";

export type CalculatorProduct = {
  key: CalculatorProductKey;
  label: string;
  /** Value sent to the Google Sheet as `loanType` (same values as the live site). */
  sheetType: string;
  defaultAmount: number;
  minRate: number;
  maxTenure: number;
  defaultTenure: number;
  /** Shown in the product picker. Debt consolidation is only reachable from the nav. */
  inPicker: boolean;
};

export const calculatorProducts: CalculatorProduct[] = [
  {
    key: "personal",
    label: "Personal Loan",
    sheetType: "Personal",
    defaultAmount: 500000,
    minRate: 9.97,
    maxTenure: 8,
    defaultTenure: 5,
    inPicker: true,
  },
  {
    key: "business",
    label: "Business Loan",
    sheetType: "Business",
    defaultAmount: 2000000,
    minRate: 14,
    maxTenure: 5,
    defaultTenure: 5,
    inPicker: true,
  },
  {
    key: "home",
    label: "Home Loan",
    sheetType: "Home",
    defaultAmount: 5000000,
    minRate: 7.1,
    maxTenure: 20,
    defaultTenure: 20,
    inPicker: true,
  },
  {
    key: "insta-personal",
    label: "Insta Personal Loan",
    sheetType: "Personal",
    defaultAmount: 500000,
    minRate: 9.97,
    maxTenure: 8,
    defaultTenure: 5,
    inPicker: true,
  },
  {
    key: "used-car",
    label: "Used Car Loan",
    sheetType: "Used Car",
    defaultAmount: 1000000,
    minRate: 8.15,
    maxTenure: 8,
    defaultTenure: 5,
    inPicker: true,
  },
  {
    key: "lap",
    label: "Loan on Property",
    sheetType: "Against Property",
    defaultAmount: 4000000,
    minRate: 8.85,
    maxTenure: 15,
    defaultTenure: 10,
    inPicker: true,
  },
  {
    key: "debt-consolidation",
    label: "Debt Consolidation Loan",
    sheetType: "Personal",
    defaultAmount: 1500000,
    minRate: 11.5,
    maxTenure: 5,
    defaultTenure: 5,
    inPicker: false,
  },
];

export const CALC_MIN_AMOUNT = 50_000;
export const CALC_MAX_AMOUNT = 10_000_000;
export const CALC_AMOUNT_STEP = 50_000;
export const CALC_MAX_RATE = 25;

export function getCalculatorProduct(key: string | null | undefined) {
  return calculatorProducts.find((p) => p.key === key) ?? calculatorProducts[0];
}

/** Items in the header "EMI Calculator" menu. */
export const calculatorMenu: { label: string; key: CalculatorProductKey }[] = [
  { label: "Personal Loan EMI Calculator", key: "personal" },
  { label: "Business Loan EMI Calculator", key: "business" },
  {
    label: "Debt Consolidation Loan EMI Calculator",
    key: "debt-consolidation",
  },
  { label: "Home / Loan on Property EMI Calculator", key: "lap" },
];

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export type Product = {
  slug: string;
  title: string;
  description: string;
  rate: string;
  maxLimit: string;
  features: string[];
  /** Calculator preset opened by "Apply & Check Eligibility". */
  calculator?: CalculatorProductKey;
  icon: "user" | "home" | "briefcase" | "car" | "building" | "card";
};

export const products: Product[] = [
  {
    slug: "personal-loan",
    title: "Personal Loan",
    description:
      "Quick funds for medical emergencies, travel, weddings, or debt consolidation.",
    rate: "from 9.97% p.a.",
    maxLimit: "Up to ₹40 Lakhs",
    features: [
      "No end-use restriction",
      "Instant pre-approval",
      "Minimal documentation",
    ],
    calculator: "personal",
    icon: "user",
  },
  {
    slug: "home-loan",
    title: "Home Loan",
    description:
      "Finance your dream home with low rates and flexible repayment options.",
    rate: "from 7.10% p.a.",
    maxLimit: "Up to ₹10 Crores",
    features: [
      "Balance transfer facility",
      "Zero prepayment charges",
      "Long tenure up to 30 years",
    ],
    calculator: "home",
    icon: "home",
  },
  {
    slug: "business-loan",
    title: "Business Loan",
    description:
      "Expand your company operations, manage inventory, or invest in new equipment.",
    rate: "from 14% p.a.",
    maxLimit: "Up to ₹75 Lakhs",
    features: [
      "Collateral-free funding",
      "Flexible repayment structures",
      "Fast disbursal in 48 hours",
    ],
    calculator: "business",
    icon: "briefcase",
  },
  {
    slug: "used-car-loan",
    title: "Used Car Loan",
    description:
      "Get behind the wheel of your favorite pre-owned vehicle hassle-free.",
    rate: "from 8.15% p.a.",
    maxLimit: "Up to 90% Valuation",
    features: [
      "Instant valuation service",
      "Repayment tenure up to 7 years",
      "Quick transfer support",
    ],
    calculator: "used-car",
    icon: "car",
  },
  {
    slug: "loan-against-property",
    title: "Loan on Property",
    description:
      "Unlock the hidden equity in your residential or commercial property.",
    rate: "from 8.85% p.a.",
    maxLimit: "Up to ₹15 Crores",
    features: [
      "High-value loan amounts",
      "Repay while using property",
      "Simple eligibility criteria",
    ],
    calculator: "lap",
    icon: "building",
  },
  {
    slug: "credit-cards",
    title: "Premium Credit Cards",
    description:
      "Elevate your lifestyle with cards that reward every transaction.",
    rate: "Pre-approved deals",
    maxLimit: "Up to ₹15 Lakhs Limit",
    features: [
      "Airport lounge access",
      "Fuel surcharge waivers",
      "10x rewards on spending",
    ],
    icon: "card",
  },
];

/** Items in the header "Products" menu (same list as the live site). */
export const productMenu: { label: string; slug: string }[] = [
  { label: "Personal Loan", slug: "personal-loan" },
  { label: "Home Loan", slug: "home-loan" },
  { label: "Business Loan", slug: "business-loan" },
  { label: "Used Car Loan", slug: "used-car-loan" },
  { label: "Loan on Property", slug: "loan-against-property" },
  { label: "Premium Credit Cards", slug: "credit-cards" },
];

/**
 * Footer "Products" list. Items with `href` link to a product card on the home page;
 * the rest have no page yet and render as plain text.
 */
export const footerProducts: { label: string; href?: string }[] = [
  { label: "Personal Loans", href: "/#product-personal-loan" },
  { label: "Business Funding", href: "/#product-business-loan" },
  { label: "Home Purchase", href: "/#product-home-loan" },
  { label: "Used Car Finance", href: "/#product-used-car-loan" },
  { label: "Credit Card", href: "/#product-credit-cards" },
  { label: "Loan Against Property", href: "/#product-loan-against-property" },
  { label: "Professional Loan" },
  { label: "Working Capital Loan" },
  { label: "Education Loan" },
  { label: "Gold Loan" },
  { label: "Consumer Durable Loan" },
  { label: "New Car Loan" },
  { label: "Pre-owned Two Wheeler Loan" },
  { label: "Commercial Vehicle Loan" },
  { label: "Corporate Salary Account" },
  { label: "Current Account" },
  { label: "NRI Account" },
  { label: "Fixed Deposit" },
  { label: "Recurring Deposit" },
  { label: "FASTag" },
];

/**
 * Footer link columns. `href` makes an item a link (`external` opens it in a new tab);
 * items without one have no page yet and render as plain text — add an `href` when the
 * page exists. "calculator" opens the EMI calculator.
 */
export type FooterItem = { label: string; href?: string; external?: boolean };

export const footerColumns: { title: string; items: FooterItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/about" },
      { label: "Become a Partner", href: "/partners" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "Careers" },
      { label: "News Room" },
      { label: "Corporate Governance" },
      { label: "ESG & CSR" },
      { label: "Regulatory Disclosures" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "EMI Calculator", href: "calculator" },
      { label: "Interest Rates", href: "/#products" },
      { label: "Lending Partners", href: "/#partners" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Fees & Charges" },
      { label: "Forms Centre" },
      { label: "Notice Board" },
      { label: "Important Messages" },
      { label: "Better Money Choices" },
      { label: "Security" },
    ],
  },
  {
    title: "Help & Support",
    items: [
      { label: "Lodge a Complaint / Query", href: `mailto:${contact.email}` },
      { label: "Customer Care", href: contact.phoneHref },
      { label: "FAQs" },
      { label: "Active Channel Partners" },
      { label: "Consent to Call Registration" },
      { label: "Do-Not-Call Registration" },
      { label: "WhatsApp Support" },
    ],
  },
  {
    title: "Policies",
    items: [
      { label: "Privacy Policy" },
      { label: "Terms of Use" },
      { label: "Grievance Redressal Officer" },
      { label: "Grievance Redressal (Digital)" },
      { label: "Digital Lending – Important Links" },
      { label: "Citizen's Charter" },
      { label: "Equal Opportunity Policy" },
      { label: "Use of Unparliamentary Language by Customers" },
    ],
  },
  {
    title: "RBI Links",
    items: [
      { label: "RBI Kehta Hai", href: "https://rbikehtahai.rbi.org.in/", external: true },
      { label: "RBI Complaint Management System", href: "https://cms.rbi.org.in/", external: true },
      { label: "RBI Sachet Portal", href: "https://sachet.rbi.org.in/", external: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    num: "01",
    title: "Submit Application",
    subtitle: "Takes less than 2 minutes",
    description:
      "Fill in basic details and income specifications. No paperwork, just a simple digital form.",
    rating: "100% Digital",
  },
  {
    num: "02",
    title: "Profile Evaluation",
    subtitle: "Instant credit scan",
    description:
      "Our advanced AI engines verify parameters, credit score, and match risk metrics in real-time.",
    rating: "Under 10s",
  },
  {
    num: "03",
    title: "Quick Approval",
    subtitle: "Soft approval in seconds",
    description:
      "Get immediate confirmation of approved limits and eligible rates from lending partners.",
    rating: "Pre-Approved",
  },
  {
    num: "04",
    title: "Bank Matching",
    subtitle: "Compare & Select offer",
    description:
      "Choose the best offer from 25+ matched RBI-registered banks (SBI, HDFC, ICICI, etc.).",
    rating: "AI Matched",
  },
  {
    num: "05",
    title: "Loan Disbursal",
    subtitle: "Direct credit in 4 hours",
    description:
      "Once digitally signed via e-NACH, funds are directly credited to your registered bank account.",
    rating: "4-Hour Disbursal",
  },
];

/* ------------------------------------------------------------------ */
/* Banking partners                                                    */
/* ------------------------------------------------------------------ */

export const banks = [
  {
    name: "State Bank of India",
    logo: "/banks/sbi.svg",
    rate: "8.4% p.a.",
    approval: "92%",
  },
  {
    name: "HDFC Bank",
    logo: "/banks/hdfc.svg",
    rate: "8.5% p.a.",
    approval: "94%",
  },
  {
    name: "ICICI Bank",
    logo: "/banks/icici.svg",
    rate: "8.6% p.a.",
    approval: "91%",
  },
  {
    name: "Axis Bank",
    logo: "/banks/axis.svg",
    rate: "8.7% p.a.",
    approval: "89%",
  },
  {
    name: "Kotak Mahindra",
    logo: "/banks/kotak.svg",
    rate: "8.55% p.a.",
    approval: "93%",
  },
  {
    name: "Punjab National Bank",
    logo: "/banks/pnb.svg",
    rate: "8.8% p.a.",
    approval: "85%",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
      "10 months ago, I applied for a consolidation loan to club my EMIs into one. A huge thanks to my RM, Sindhu, for her incredible support! She worked tirelessly with multiple financing partners and managed the entire loan proceeds. She clearly explained the processing challenges and ensured a smooth disbursement. Thank you, Sindhu and team—keep up the great work!",
    name: "Manoj Kumar",
    initials: "MK",
    role: "Software Engineer",
    company: "Wipro Limited",
  },
  {
    quote:
      "At first, I had some doubts, but the team explained everything clearly. They responded instantly, and the loan consolidation helped reduce my monthly payment burden. Very happy with the service....Thank you Sindhuja.!",
    name: "Varun Kumar",
    initials: "VK",
    role: "Software Engineer",
    company: "Beneflex private limited",
  },
  {
    quote:
      "I have been in touch with Sindhuja for the past 1 year. Recently, I had an urgent financial need, and within just 2 hours she selected a lender that suited my profile and helped get my loan amount disbursed. The process was very easy and was completed with minimal documentation. Thank you for the quick support.",
    name: "Swetha Goud",
    initials: "SG",
    role: "Business Owner",
    company: "Mangalagiri Sarees",
  },
];

export const disclaimer =
  "Finkuby (Finkuby Technologies Private Limited) is not an RBI-registered NBFC or bank. We operate as an online loan facilitator matching eligible applicants with registered lending institutions. Interest rates, loan tenures, and processing fees are determined solely by the partner lending institutions based on credit risk evaluation. Pre-approval estimations do not guarantee final credit disbursals.";

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const aboutValues = [
  {
    title: "Security First",
    body: "We employ banking-grade 256-bit encryption and strict data protocols to ensure your sensitive financial profiles remain completely private and secure.",
    icon: "shield" as const,
  },
  {
    title: "Expert Guidance",
    body: "Our advanced matching engine compares dozens of lenders to recommend the best tenure and rate pairing tailored to your unique credit footprint.",
    icon: "compass" as const,
  },
  {
    title: "Client Focused",
    body: "We design with empathy. Our dedicated support team and clear calculators ensure you are fully in control of your borrowing journey every step of the way.",
    icon: "heart" as const,
  },
];

export const mission =
  "To democratize access to credit across India, making capital disbursal friction-free, instantaneous, and fully transparent for every deserving business and individual. We believe in leveling the playing field so opportunities can grow with financial freedom.";

export const vision =
  "To become India's primary financial facilitator, driving economic growth by connecting borrowers and regulated lenders through elite technology and seamless integration. We look forward to powering digital onboarding for modern Indian businesses.";

export const leaders = [
  {
    name: "Ravindra Kumar Rangala",
    title: "Co-Founder & CEO",
    photo: "/about/ravindra-kumar-rangala.jpg",
    bio: "Ravindra leads strategic expansion and technology integrations at Finkuby. With over 15 years in retail banking and fintech systems, he is passionate about building accessible credit structures for emerging markets.",
    linkedin: "https://www.linkedin.com/in/ravindra-kumar-rangala-51128316/",
  },
  {
    name: "Raji KLR",
    // Same title as the live site. Check with the team: both founders are listed as CEO.
    title: "Co-Founder & CEO",
    photo: "/about/raji-klr.jpg",
    bio: "Raji leads user experience, brand growth, and risk operations. A former fintech product architect, she believes in creating empathetic design systems that simplify financial decision-making for everyone.",
    linkedin: "https://www.linkedin.com/in/raji-klr-967290411/",
  },
];

export const teamPhotos = [
  { src: "/about/team/1.jpg", width: 840, height: 1120 },
  { src: "/about/team/2.jpg", width: 1407, height: 986 },
  { src: "/about/team/3.jpg", width: 1280, height: 1143 },
  { src: "/about/team/4.jpg", width: 1280, height: 960 },
  { src: "/about/team/5.jpg", width: 576, height: 1024 },
  { src: "/about/team/6.jpg", width: 1107, height: 900 },
  { src: "/about/team/7.jpg", width: 1024, height: 471 },
  { src: "/about/team/8.jpg", width: 1040, height: 780 },
  { src: "/about/team/9.jpg", width: 1200, height: 1600 },
  { src: "/about/team/10.jpg", width: 1024, height: 472 },
  { src: "/about/team/11.jpg", width: 1024, height: 472 },
  { src: "/about/team/12.jpg", width: 1152, height: 864 },
];

/* ------------------------------------------------------------------ */
/* Partner program                                                     */
/* ------------------------------------------------------------------ */

export const partnerBenefits = [
  {
    title: "Industry-Best Payouts",
    body: "Earn top-tier commissions and referral rewards on every successful capital disbursement.",
    icon: "coins" as const,
  },
  // "21+ banks" is the live copy; the rest of the site says 25+.
  {
    title: "Automated Matchmaker",
    body: "Utilize our AI matching engine to instantly pair customers with optimal lending options from 21+ banks.",
    icon: "spark" as const,
  },
  {
    title: "Transparent CRM Portal",
    body: "Log and monitor every lead status, approval update, and commission flow in real time.",
    icon: "chart" as const,
  },
  {
    title: "Dedicated Manager Support",
    body: "A relationship manager is assigned to guide you through onboarding and resolve customer files.",
    icon: "headset" as const,
  },
];

export const partnerTypes = [
  {
    title: "DSA/Bankers",
    body: "Active loan agents and banking executives seeking multi-lender access.",
  },
  {
    title: "Financial Advisors",
    body: "Wealth managers wanting to offer debt and liquidity advice to clients.",
  },
  {
    title: "Mutual Fund Distributors",
    body: "Investment advisors looking to diversify their client solutions.",
  },
  {
    title: "Life Insurance Agents",
    body: "Insurance professionals offering comprehensive credit folders.",
  },
  {
    title: "Tax Consultants",
    body: "Tax practitioners facilitating working capital folders for businesses.",
  },
  {
    title: "Chartered Accountants",
    body: "CAs assisting corporate clients with structured loan request files.",
  },
];

export const partnerSteps = [
  {
    step: "Step 1",
    title: "Register Online",
    body: "Submit your basic profile details and profession credentials via our partner form.",
  },
  {
    step: "Step 2",
    title: "Get Verified",
    body: "Our relationship team audits your background and activates your agent access.",
  },
  {
    step: "Step 3",
    title: "Fast Training",
    body: "Access tutorials on how to submit client application folders and read AI matches.",
  },
  {
    step: "Step 4",
    title: "Refer & Earn",
    body: "Log borrower data and start earning transparent commission payouts.",
  },
];
