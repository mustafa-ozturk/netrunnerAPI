// in milliseconds
export const DIFFICULTY_TO_DURATION_MAP: Record<string, number> = {
  easy: 10 * 1000,
  medium: 10 * 60 * 1000,
  hard: 60 * 60 * 1000,
  legendary: 60 * 60 * 24 * 1000,
};

export const TARGETS: Record<
  string,
  {
    id: string;
    name: string;
    description: string;
    difficulty: string;
    possibleLoot: string[];
  }
> = {
  megacorp_financials: {
    id: "megacorp_financials",
    name: "Mega-corp Financial Division",
    description:
      "Mega-corp's primary financial servers containing transaction records and budget allocations.",
    difficulty: "medium",
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
    possibleLoot: ["research_data", "neural_interface", "memory_chip"],
  },

  corporate_email_server: {
    id: "corporate_email_server",
    name: "Executive Communications Hub",
    description:
      "High-security email servers containing C-suite executive correspondence and internal memos.",
    difficulty: "medium",
    possibleLoot: [
      "exec_communications",
      "access_credentials",
      "corporate_blackmail",
    ],
  },

  security_contractor: {
    id: "security_contractor",
    name: "Mega-corp Security Division",
    description:
      "Private security firm's systems containing ICE programs and admin access tools.",
    difficulty: "easy",
    possibleLoot: ["ice_breaker", "admin_keycard", "trace_cleaner"],
  },

  underground_broker: {
    id: "underground_broker",
    name: "Black Market Data Broker",
    description:
      "Illegal data marketplace with zero-day exploits and system backdoors for sale.",
    difficulty: "legendary",
    possibleLoot: ["zero_day_exploit", "system_backdoor", "buffer_overflow"],
  },
};
