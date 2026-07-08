export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$499",
    description: "Perfect for experts just getting started with their first online course.",
    features: [
      "1 Course Curriculum Design",
      "Technical Platform Setup",
      "Basic Email Automation",
      "1 Landing Page Design",
      "30 Days Email Support",
      "Standard AI Content Tools"
    ],
    buttonText: "Buy Now",
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    price: "$1,299",
    description: "The complete solution for scaling your e-learning business to the next level.",
    features: [
      "3 Course Curriculum Designs",
      "Advanced Kajabi/LMS Setup",
      "Full Funnel Automation",
      "3 Pro Landing Pages",
      "90 Days Priority Support",
      "Premium AI Content Support"
    ],
    buttonText: "Buy Now",
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "Bespoke solutions for established institutions and high-volume creators.",
    features: [
      "Unlimited Course Designs",
      "Custom Platform Development",
      "Dedicated Account Manager",
      "Unlimited Funnels & Pages",
      "Lifetime Priority Support",
      "Custom AI Integrations"
    ],
    buttonText: "Buy Now",
    popular: false
  }
];

export const COMPARISON = [
  { feature: "Curriculum Design", starter: "1 Course", pro: "3 Courses", enterprise: "Unlimited" },
  { feature: "Technical Setup", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
  { feature: "Landing Pages", starter: "1 Page", pro: "3 Pages", enterprise: "Unlimited" },
  { feature: "Support", starter: "30 Days", pro: "90 Days Priority", enterprise: "Dedicated Manager" },
  { feature: "AI Support", starter: "Standard", pro: "Premium", enterprise: "Custom" },
  { feature: "Automation", starter: "Basic", pro: "Full Funnel", enterprise: "Advanced Custom" },
];
