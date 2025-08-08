export const ITEMS_INGAME = [
  "encrypted_data_shard",
  "financial_records",
  "research_data",
];

export const ITEMS_MAP: Record<
  string,
  {
    name: string;
    type: string;
    description: string;
    rarity: string;
    baseValue: number;
    usable?: boolean;
    equipable?: boolean;
    persistent?: boolean;
  }
> = {
  // Data & Information (Common loot from hacks)
  encrypted_data_shard: {
    name: "Encrypted Data Shard",
    type: "hacked_data",
    description:
      "Valuable digital files containing secrets, research, or financial information. Can be sold on the black market.",
    rarity: "common",
    baseValue: 500,
  },

  financial_records: {
    name: "Corporate Financial Records",
    type: "hacked_data",
    description:
      "Detailed financial data from a major corporation. Always in demand by competitors.",
    rarity: "uncommon",
    baseValue: 1200,
  },

  research_data: {
    name: "R&D Research Data",
    type: "hacked_data",
    description:
      "Cutting-edge research findings from corporate labs. Highly valuable to the right buyer.",
    rarity: "rare",
    baseValue: 2500,
  },

  // Access Tools (Reusable for future hacks)
  access_credentials: {
    name: "Access Credentials",
    type: "access_tool",
    description:
      "Login credentials and digital certificates. Provides access to restricted networks.",
    rarity: "uncommon",
    baseValue: 800,
    usable: true,
  },

  admin_keycard: {
    name: "Administrator Keycard",
    type: "access_tool",
    description:
      "High-level access card bypassing most security checkpoints. Single use but very effective.",
    rarity: "rare",
    baseValue: 1500,
    usable: true,
  },

  // Exploits & Software (Hack enhancement tools)
  zero_day_exploit: {
    name: "Zero-Day Exploit",
    type: "software",
    description:
      "Unpatched vulnerability that can bypass cutting-edge security. Extremely valuable and rare.",
    rarity: "legendary",
    baseValue: 5000,
    usable: true,
  },

  buffer_overflow: {
    name: "Buffer Overflow Kit",
    type: "software",
    description:
      "Reliable exploit targeting memory vulnerabilities. Standard netrunner toolkit.",
    rarity: "common",
    baseValue: 300,
    usable: true,
  },

  // Persistent Access (High-value strategic items)
  system_backdoor: {
    name: "System Backdoor",
    type: "access_tool",
    description:
      "Persistent access point in a compromised system. Allows repeated entry or profitable resale.",
    rarity: "rare",
    baseValue: 3000,
    persistent: true, // Generates passive income or hack bonuses
  },

  // Blackmail & Social Engineering
  corporate_blackmail: {
    name: "Corporate Blackmail Material",
    type: "hacked_data",
    description:
      "Incriminating recordings and scandalous documents. Premium prices from the right contacts.",
    rarity: "epic",
    baseValue: 4000,
  },

  exec_communications: {
    name: "Executive Email Archive",
    type: "hacked_data",
    description:
      "Private communications between C-suite executives. Contains potential blackmail material.",
    rarity: "rare",
    baseValue: 1800,
  },

  // Hardware (Physical components)

  // this will require decrypt mechanic in the game
  memory_chip: {
    name: "Encrypted Memory Chip",
    type: "hardware",
    description:
      "Physical storage device with encrypted corporate data. Requires decryption software.",
    rarity: "uncommon",
    baseValue: 600,
  },

  neural_interface: {
    name: "Modified Neural Interface",
    type: "hardware",
    description:
      "Black market cyberware that enhances hacking capabilities. Dangerous but effective.",
    rarity: "epic",
    baseValue: 8000,
    // permanent stat boosts
    equipable: true,
  },

  // Utility Items
  ice_breaker: {
    name: "ICE Breaker Program",
    type: "software",
    description:
      "Specialized software for defeating Intrusion Countermeasures. Essential for serious netrunners.",
    rarity: "uncommon",
    baseValue: 900,
    usable: true,
  },

  trace_cleaner: {
    name: "Trace Cleaner",
    type: "software",
    description:
      "Utility that removes digital footprints and reduces detection risk during hacks.",
    rarity: "common",
    baseValue: 400,
    usable: true,
  },
};
