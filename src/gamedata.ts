export const TARGETS = {
  megacorp_financials: {
    id: "megacorp_financials",
    name: "Mega-corp Financial Division",
    description:
      "Mega-corp's primary financial servers containing transaction records and budget allocations.",
    difficulty: "medium",
    estimatedTime: "5-8 minutes",
    possibleLoot: [
      "financial_records",
      "corporate_blackmail",
      "encrypted_data_shard",
    ],
  },

  private_research_lab: {
    id: "private_research_lab",
    name: "Private Research Laboratory",
    description:
      "Cutting-edge medical research facility with experimental data and prototype neural interfaces.",
    difficulty: "hard",
    estimatedTime: "8-12 minutes",
    possibleLoot: ["research_data", "neural_interface", "memory_chip"],
  },

  corporate_email_server: {
    name: "Executive Communications Hub",
    description:
      "High-security email servers containing C-suite executive correspondence and internal memos.",
    difficulty: "medium",
    estimatedTime: "6-9 minutes",
    possibleLoot: [
      "exec_communications",
      "access_credentials",
      "corporate_blackmail",
    ],
  },

  security_contractor: {
    name: "Mega-corp Security Division",
    description:
      "Private security firm's systems containing ICE programs and admin access tools.",
    difficulty: "easy",
    estimatedTime: "3-5 minutes",
    possibleLoot: ["ice_breaker", "admin_keycard", "trace_cleaner"],
  },

  underground_broker: {
    name: "Black Market Data Broker",
    description:
      "Illegal data marketplace with zero-day exploits and system backdoors for sale.",
    difficulty: "legendary",
    estimatedTime: "15-20 minutes",
    possibleLoot: ["zero_day_exploit", "system_backdoor", "buffer_overflow"],
  },
};
