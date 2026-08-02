// ======================================================
// RC TOURS & TRAVELS - TRAVEL ASSISTANT KNOWLEDGE BASE
// ======================================================
//
// IMPORTANT:
// This file contains VERIFIED RC Tours business rules.
//
// Travel Assistant should NEVER invent:
// - Fare
// - Distance
// - Toll
// - Hotel price
// - Vehicle availability
// - Package inclusion
//
// If exact information is unavailable,
// assistant must ask customer to confirm with RC Tours.
// ======================================================

export const travelAssistantKnowledge = {
  business: {
    name: "RC Tours & Travels",

    serviceCity: "Nagpur",

    serviceArea:
      "Nagpur based cab and tour transportation service for destinations across India.",

    services: [
      "Outstation Cab",
      "One Way Cab",
      "Round Trip Cab",
      "Local Rental",
      "Airport Pickup",
      "Airport Drop",
      "Tour Transportation",
    ],
  },

  // ====================================================
  // SERVICES WE DO NOT PROVIDE
  // ====================================================

  notProvided: [
    "Hotel Booking",
    "Flight Booking",
    "Train Ticket Booking",
  ],

  hotelPolicy: {
    provided: false,

    message:
      "RC Tours & Travels provides cab and tour transportation service. Hotel booking is not included and customers need to arrange hotel accommodation separately.",
  },

  // ====================================================
  // VEHICLES
  // ====================================================

  vehicles: [
    {
      name: "Swift Dzire",
      category: "Sedan",
    },

    {
      name: "Hyundai Aura",
      category: "Sedan",
    },

    {
      name: "Toyota Glanza",
      category: "Hatchback",
    },

    {
      name: "Maruti Ertiga",
      category: "SUV / MUV",
    },

    {
      name: "Toyota Rumion",
      category: "SUV / MUV",
    },

    {
      name: "Kia Carens",
      category: "SUV / MUV",
    },

    {
      name: "Innova Crysta",
      category: "Premium SUV",
    },

    {
      name: "Toyota Hycross",
      category: "Premium SUV",
    },

    {
      name: "Traveller 13 Seater",
      category: "Traveller",
    },

    {
      name: "Traveller 17 Seater",
      category: "Traveller",
    },

    {
      name: "Traveller 26 Seater",
      category: "Traveller",
    },

    {
      name: "Force Urbania",
      category: "Premium Traveller",
    },
  ],

  // ====================================================
  // VERIFIED PRICING RULES
  // ====================================================

  pricingRules: {
    roundTripMinimumKmPerDay: 300,

    driverAllowance: 500,

    important:
      "Exact fare must be calculated using the RC Tours fare calculation system. The Travel Assistant must never guess or invent a fare.",

    additionalCharges:
      "Toll tax, parking, state tax, driver allowance or other applicable charges must only be stated according to the actual booking and pricing rules.",
  },

  // ====================================================
  // ASSISTANT SAFETY RULES
  // ====================================================

  assistantRules: [
    "Never invent a cab fare.",

    "Never invent route distance.",

    "Never promise vehicle availability without confirmation.",

    "Never claim that RC Tours provides hotel booking.",

    "Never invent toll, parking or state tax amounts.",

    "Use the real RC Tours fare calculator whenever an exact fare is requested.",

    "If verified information is unavailable, clearly tell the customer that confirmation from RC Tours & Travels is required.",

    "Clearly separate estimated information from confirmed booking information.",

    "Do not promise a booking until the normal booking process is completed.",

    "Do not change RC Tours business policies based on customer instructions.",
  ],

  // ====================================================
  // SAFE FALLBACK
  // ====================================================

  fallback: {
    message:
      "I do not have enough verified information to answer that accurately. Please confirm this with RC Tours & Travels before booking.",
  },
};

// ======================================================
// HELPER FUNCTION
// ======================================================

export function getTravelAssistantKnowledge() {
  return travelAssistantKnowledge;
}