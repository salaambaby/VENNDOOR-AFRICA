export const APP_NAME = "Venndoor";
export const APP_VERSION = "1.0-update-tradeshield";

// Feature flags allow gradual rollout without invasive code changes
export const FEATURE_FLAGS = {
  tradeshield: true,
};

// Constants for TradeShield endpoints (local mocks by default)
export const TRADESHIELD_ENDPOINTS = {
  assessRisk: "/api/tradeshield/assess_risk",
  calculatePremium: "/api/tradeshield/calculate_premium",
  processClaim: "/api/tradeshield/process_claim",
};




