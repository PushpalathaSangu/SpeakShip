// src/constants/navLinks.js
export const navLinks = [
  { to: "/delivery/customer", label: "My Deliveries" },
  { to: "/delivery/driver", label: "Deliveries Status" },
  { to: "/orders", label: "Orders" },
  { to: "/reviews", label: "Reviews", roles: ["driver", "customer"] }
  //{ to: "/track", label: "Track Delivery" },
 // { to: "/feedback", label: "Feedback" },
 // { to: "/voice", label: "Voice Command" },
  
];