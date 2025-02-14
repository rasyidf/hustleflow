import { ModuleItem } from "./ModuleItem"

// Subcomponents
export const subcomponents: ModuleItem[] = [
  // CRUD subcomponents
  new ModuleItem("data-table", "Data Table/List Views", "Interactive data display component", 150, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 10 }),
  new ModuleItem("add-form", "Add Item Form", "Form component for data creation", 100, "module", [], [], { timeWeight: 1, complexityWeight: 2, estimatedHours: 8 }),
  new ModuleItem("edit-form", "Edit Item Form", "Form component for data editing", 100, "module", [], [], { timeWeight: 1, complexityWeight: 2, estimatedHours: 8 }),
  new ModuleItem("delete-func", "Delete Functionality", "Data deletion handling", 50, "module", [], [], { timeWeight: 1, complexityWeight: 1, estimatedHours: 4 }),
  new ModuleItem("search-filter", "Search and Filter", "Advanced search and filtering system", 150, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 12 }),
  new ModuleItem("pagination", "Pagination", "Data pagination component", 50, "module", [], [], { timeWeight: 1, complexityWeight: 1, estimatedHours: 4 }),

  // Checkout subcomponents
  new ModuleItem("product-catalog", "Product Catalog", "Product listing and management", 200, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 16 }),
  new ModuleItem("checkout-flow", "Checkout Workflows", "Checkout process management", 300, "module", [], [], { timeWeight: 2, complexityWeight: 5, estimatedHours: 24 }),
  new ModuleItem("payment-gateway", "Payment Gateways", "Payment processing integration", 250, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 20 }),
  new ModuleItem("order-confirm", "Order Confirmation", "Order confirmation handling", 100, "module", [], [], { timeWeight: 1, complexityWeight: 2, estimatedHours: 8 }),
  new ModuleItem("invoice-gen", "Invoice Generation", "Invoice creation system", 150, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 12 }),

  // Marketing subcomponents
  new ModuleItem("landing-page", "Landing Page", "Main landing page component", 200, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 12 }),
  new ModuleItem("about-section", "About Us Section", "Company information section", 100, "module", [], [], { timeWeight: 1, complexityWeight: 2, estimatedHours: 6 }),
  new ModuleItem("contact-forms", "Contact Forms", "Interactive contact forms", 150, "module", [], [], { timeWeight: 1, complexityWeight: 2, estimatedHours: 8 }),
  new ModuleItem("hero-sections", "Hero Sections", "Hero section components", 100, "module", [], [], { timeWeight: 1, complexityWeight: 2, estimatedHours: 6 }),
  new ModuleItem("seo-opt", "SEO Optimization", "Search engine optimization features", 150, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 10 }),

  // Auth subcomponents
  new ModuleItem("user-auth", "User Authentication", "Core authentication system", 200, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 16 }),
  new ModuleItem("rbac", "Role-Based Access Control", "Access control system", 250, "module", [], [], { timeWeight: 2, complexityWeight: 5, estimatedHours: 20 }),
  new ModuleItem("password-reset", "Password Reset", "Password recovery system", 100, "module", [], [], { timeWeight: 1, complexityWeight: 2, estimatedHours: 8 }),
  new ModuleItem("mfa", "Multi-Factor Authentication", "2FA/MFA implementation", 200, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 16 }),
  new ModuleItem("social-login", "Social Login", "OAuth integration", 150, "module", [], [], { timeWeight: 2, complexityWeight: 3, estimatedHours: 12 }),

  // Multitenant subcomponents
  new ModuleItem("tenant-mgmt", "Tenant Management", "Tenant administration system", 300, "module", [], [], { timeWeight: 2, complexityWeight: 5, estimatedHours: 24 }),
  new ModuleItem("data-segregation", "Data Segregation", "Multi-tenant data isolation", 250, "module", [], [], { timeWeight: 2, complexityWeight: 5, estimatedHours: 20 }),
  new ModuleItem("custom-branding", "Custom Branding", "Tenant branding system", 200, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 16 }),
  new ModuleItem("usage-analytics", "Usage Analytics", "Tenant usage tracking", 250, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 20 }),

  // Reporting subcomponents
  new ModuleItem("interactive-charts", "Interactive Charts", "Dynamic data visualization", 250, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 20 }),
  new ModuleItem("data-exports", "Data Exports", "Export functionality", 150, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 12 }),
  new ModuleItem("report-gen", "Report Generation", "Report creation system", 200, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 16 }),
  new ModuleItem("scheduled-reports", "Scheduled Reports", "Automated reporting", 200, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 16 }),
  new ModuleItem("custom-dashboards", "Customizable Dashboards", "Dashboard builder", 250, "module", [], [], { timeWeight: 2, complexityWeight: 5, estimatedHours: 20 }),

  // Collaboration subcomponents
  new ModuleItem("task-assign", "Task Assignment", "Task management system", 200, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 16 }),
  new ModuleItem("realtime-chat", "Real-Time Chat", "Chat functionality", 250, "module", [], [], { timeWeight: 2, complexityWeight: 5, estimatedHours: 20 }),
  new ModuleItem("notifications", "Notification Systems", "Notification handling", 200, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 16 }),
  new ModuleItem("file-sharing", "File Sharing", "File management system", 200, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 16 }),
  new ModuleItem("activity-logs", "Activity Logs", "User activity tracking", 150, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 12 }),

  // Subscription subcomponents
  new ModuleItem("tiered-pricing", "Tiered Pricing", "Pricing management", 200, "module", [], [], { timeWeight: 2, complexityWeight: 4, estimatedHours: 16 }),
  new ModuleItem("sub-mgmt", "Subscription Management", "Subscription handling", 250, "module", [], [], { timeWeight: 2, complexityWeight: 5, estimatedHours: 20 }),
  new ModuleItem("billing-integ", "Billing Integration", "Payment system integration", 250, "module", [], [], { timeWeight: 2, complexityWeight: 5, estimatedHours: 20 }),
  new ModuleItem("trial-periods", "Trial Periods", "Trial management", 150, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 12 }),
  new ModuleItem("coupon-support", "Coupon Support", "Discount system", 150, "module", [], [], { timeWeight: 1, complexityWeight: 3, estimatedHours: 12 })
];

// Services
export const services: ModuleItem[] = [
  new ModuleItem("consulting", "Technical Consulting", "Expert technical consultation services", 150, "service", [], [], { timeWeight: 1, complexityWeight: 1, estimatedHours: 1 }),
  new ModuleItem("deployment", "Deployment Service", "Application deployment and setup", 500, "service", [], [], { timeWeight: 2, complexityWeight: 3, estimatedHours: 8 }),
  new ModuleItem("maintenance", "Maintenance", "Ongoing system maintenance", 300, "service", [], [], { timeWeight: 1, complexityWeight: 2, estimatedHours: 4 }),
  new ModuleItem("training", "User Training", "End-user system training", 200, "service", [], [], { timeWeight: 1, complexityWeight: 1, estimatedHours: 4 }),
];

// Main modules
export const modules: ModuleItem[] = [
  new ModuleItem("crud", "CRUD Block", "Complete data management system", 500, "module",
    [], ["data-table", "add-form", "edit-form", "delete-func", "search-filter", "pagination"],
    { timeWeight: 2, complexityWeight: 8, estimatedHours: 40 }
  ),
  new ModuleItem("checkout", "Checkout Block", "Full e-commerce checkout system", 800, "module",
    ["crud"], ["product-catalog", "checkout-flow", "payment-gateway", "order-confirm", "invoice-gen"],
    { timeWeight: 4, complexityWeight: 13, estimatedHours: 80 }
  ),
  new ModuleItem("marketing", "Marketing Block", "Marketing and landing page components", 400, "module",
    [], ["landing-page", "about-section", "contact-forms", "hero-sections", "seo-opt"],
    { timeWeight: 1, complexityWeight: 6, estimatedHours: 20 }
  ),
  new ModuleItem("auth", "Auth Block", "Complete authentication and authorization system", 700, "module",
    [], ["user-auth", "rbac", "password-reset", "mfa", "social-login"],
    { timeWeight: 2, complexityWeight: 9, estimatedHours: 40 }
  ),
  new ModuleItem("multitenant", "Multitenant Block", "Multi-tenant infrastructure", 900, "module",
    ["auth"], ["tenant-mgmt", "data-segregation", "custom-branding", "usage-analytics"],
    { timeWeight: 3, complexityWeight: 14, estimatedHours: 60 }
  ),
  new ModuleItem("reporting", "Reporting Block", "Advanced reporting and analytics", 800, "module",
    [], ["interactive-charts", "data-exports", "report-gen", "scheduled-reports", "custom-dashboards"],
    { timeWeight: 3, complexityWeight: 9, estimatedHours: 60 }
  ),
  new ModuleItem("collaboration", "Collaboration Block", "Team collaboration features", 900, "module",
    ["auth"], ["task-assign", "realtime-chat", "notifications", "file-sharing", "activity-logs"],
    { timeWeight: 4, complexityWeight: 14, estimatedHours: 80 }
  ),
  new ModuleItem("subscription", "Subscription Block", "Subscription management system", 800, "module",
    ["auth"], ["tiered-pricing", "sub-mgmt", "billing-integ", "trial-periods", "coupon-support"],
    { timeWeight: 3, complexityWeight: 11, estimatedHours: 60 }
  )
];

// Export complete collection including subcomponents
export const allItems = [...modules, ...services];

