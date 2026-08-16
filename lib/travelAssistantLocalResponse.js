// ======================================================
// RC TOURS & TRAVELS
// TRAVEL ASSISTANT LOCAL RESPONSE HELPER
// ======================================================
//
// PURPOSE:
//
// Verified RC Tours business questions ka answer
// Gemini API use kiye bina dena.
//
// BENEFITS:
//
// - Gemini quota save hogi.
// - Gemini unavailable ho tab bhi basic RC information
//   customer ko mil sakti hai.
// - Business policies AI invent nahi karega.
// - Vehicle availability falsely promise nahi hogi.
//
// IMPORTANT:
//
// Ye helper:
// - Fare calculate nahi karta.
// - Distance calculate nahi karta.
// - Vehicle availability confirm nahi karta.
// - Hotel / flight / train booking invent nahi karta.
//
// Verified information:
// travelAssistantKnowledge.js se li jayegi.
//
// ======================================================

import {
  getTravelAssistantKnowledge,
} from "./travelAssistantKnowledge.js";


// ======================================================
// NORMALIZE TEXT
// ======================================================

function normalizeText(value) {
  return (value || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}


// ======================================================
// CONTAINS ANY KEYWORD
// ======================================================

function containsAny(text, keywords) {
  return keywords.some((keyword) =>
    text.includes(keyword)
  );
}


// ======================================================
// GET VEHICLE LIST TEXT
// ======================================================

function getVehicleListText(knowledge) {
  const vehicles =
    knowledge?.vehicles || [];

  if (!vehicles.length) {
    return (
      "Vehicle information is currently unavailable. " +
      "Please confirm your vehicle requirement with RC Tours & Travels."
    );
  }

  const vehicleLines =
    vehicles.map(
      (vehicle) =>
        `• ${vehicle.name} — ${vehicle.category}`
    );

  return [
    "RC Tours & Travels ke fleet options:",
    "",
    ...vehicleLines,
    "",
    "Aap passengers ki sankhya batayenge to suitable vehicle suggest ki ja sakti hai.",
    "",
    "Final vehicle availability booking ke time confirm hogi.",
  ].join("\n");
}


// ======================================================
// DETECT PASSENGER COUNT
// ======================================================
//
// Examples:
//
// "5 log hai konsi car best hai"
// -> 5
//
// "6 passengers ke liye car"
// -> 6
//
// "passenger 4"
// -> 4
//
// ======================================================

function getPassengerCount(text) {
  const patterns = [
    /\b(\d+)\s*(?:passenger|passengers|people|persons|person|log|members|member)\b/i,

    /\b(?:passenger|passengers|people|persons|person|log|members|member)\s*(\d+)\b/i,
  ];

  for (const pattern of patterns) {
    const match =
      text.match(pattern);

    if (!match) {
      continue;
    }

    const passengers =
      Number(match[1]);

    if (
      Number.isInteger(passengers) &&
      passengers > 0
    ) {
      return passengers;
    }
  }

  return null;
}


// ======================================================
// GET VEHICLE RECOMMENDATION TEXT
// ======================================================
//
// IMPORTANT:
//
// Ye recommendation passenger count ke according hai.
//
// Final vehicle availability booking ke time
// confirm hogi.
//
// ======================================================

function getVehicleRecommendationText({
  knowledge,
  passengers,
}) {
  // ====================================================
  // NO PASSENGER COUNT
  // ====================================================

  if (!passengers) {
    return getVehicleListText(
      knowledge
    );
  }


  // ====================================================
  // 1 TO 3 PASSENGERS
  // ====================================================

  if (passengers <= 3) {
    return [
      `${passengers} passengers ke liye Sedan category practical aur comfortable rahegi.`,
      "",
      "Recommended options:",
      "• Swift Dzire",
      "• Hyundai Aura",
      "",
      "Agar extra comfort ya zyada luggage space chahiye to larger vehicle bhi choose kar sakte hain.",
      "",
      "Final vehicle availability booking ke time confirm hogi.",
    ].join("\n");
  }


  // ====================================================
  // 4 TO 6 PASSENGERS
  // ====================================================

  if (passengers <= 6) {
    return [
      `${passengers} passengers ke liye SUV / MUV category best practical aur comfortable option rahegi.`,
      "",
      "Recommended options:",
      "• Maruti Ertiga",
      "• Toyota Rumion",
      "• Kia Carens",
      "",
      "Extra comfort aur luggage space ke liye:",
      "• Innova Crysta",
      "• Toyota Hycross",
      "",
      "Final vehicle availability booking ke time confirm hogi.",
    ].join("\n");
  }


  // ====================================================
  // 7 TO 12 PASSENGERS
  // ====================================================

  if (passengers <= 12) {
    return [
      `${passengers} passengers ke group ke liye Traveller category suitable rahegi.`,
      "",
      "Recommended option:",
      "• Traveller 13 Seater",
      "",
      "Passenger luggage aur trip requirement ke according final vehicle confirm ki jayegi.",
      "",
      "Final vehicle availability booking ke time confirm hogi.",
    ].join("\n");
  }


  // ====================================================
  // 13 TO 16 PASSENGERS
  // ====================================================

  if (passengers <= 16) {
    return [
      `${passengers} passengers ke group ke liye larger Traveller category suitable rahegi.`,
      "",
      "Recommended options:",
      "• Traveller 17 Seater",
      "• Force Urbania",
      "",
      "Passenger luggage aur comfort requirement ke according final vehicle select ki jayegi.",
      "",
      "Final vehicle availability booking ke time confirm hogi.",
    ].join("\n");
  }


  // ====================================================
  // 17 TO 25 PASSENGERS
  // ====================================================

  if (passengers <= 25) {
    return [
      `${passengers} passengers ke group ke liye large Traveller category suitable rahegi.`,
      "",
      "Recommended option:",
      "• Traveller 26 Seater",
      "",
      "Passenger luggage aur trip requirement ke according final vehicle confirm ki jayegi.",
      "",
      "Final vehicle availability booking ke time confirm hogi.",
    ].join("\n");
  }


  // ====================================================
  // MORE THAN 25 PASSENGERS
  // ====================================================

  return [
    `${passengers} passengers ke group ke liye multiple vehicles ya special vehicle arrangement required ho sakta hai.`,
    "",
    "RC Tours & Travels team passenger count, luggage aur trip requirement ke according suitable vehicle arrangement confirm karegi.",
    "",
    "Final vehicle availability booking ke time confirm hogi.",
  ].join("\n");
}


// ======================================================
// GET SERVICE LIST TEXT
// ======================================================

function getServiceListText(knowledge) {
  const services =
    knowledge?.business?.services || [];

  if (!services.length) {
    return (
      "Service information is currently unavailable. " +
      "Please confirm with RC Tours & Travels."
    );
  }

  const serviceLines =
    services.map(
      (service) => `• ${service}`
    );

  return [
    "RC Tours & Travels Nagpur based cab aur tour transportation service hai.",
    "",
    "Hamari services:",
    "",
    ...serviceLines,
    "",
    "Hotel, flight aur train ticket booking RC Tours & Travels provide nahi karta.",
  ].join("\n");
}


// ======================================================
// GREETING RESPONSE
// ======================================================

function getGreetingResponse() {
  return [
    "Namaste! 👋",
    "",
    "Main RC Tours & Travels Travel Assistant hoon.",
    "",
    "Aap mujhse cab fare, route distance, vehicles, outstation trip, local rental, airport transfer aur travel planning ke baare me pooch sakte hain.",
    "",
    "Example:",
    "• Nagpur se Tuljapur round trip ka fare?",
    "• Family ke liye kaunsi car suitable rahegi?",
    "• Goa me 4 din kya kya ghum sakte hain?",
  ].join("\n");
}


// ======================================================
// THANK YOU RESPONSE
// ======================================================

function getThankYouResponse() {
  return [
    "Aapka swagat hai! 😊",
    "",
    "RC Tours & Travels se related cab, route ya trip planning ke baare me aur kuch poochna ho to bataiye.",
  ].join("\n");
}


// ======================================================
// WHO ARE YOU RESPONSE
// ======================================================

function getIdentityResponse() {
  return [
    "Main RC Tours & Travels ka Travel Assistant hoon.",
    "",
    "Main RC Tours ki verified business information ke saath cab, vehicle, route aur travel planning me help karta hoon.",
    "",
    "Exact fare aur distance ke liye verified RC calculation system ka use kiya jata hai.",
  ].join("\n");
}


// ======================================================
// HOTEL POLICY RESPONSE
// ======================================================

function getHotelResponse(knowledge) {
  const hotelMessage =
    knowledge?.hotelPolicy?.message;

  if (hotelMessage) {
    return [
      "Hotel booking RC Tours & Travels ki service me included nahi hai.",
      "",
      hotelMessage,
      "",
      "Cab aur tour transportation RC Tours & Travels arrange kar sakta hai, lekin accommodation customer ko separately arrange karna hota hai.",
    ].join("\n");
  }

  return [
    "RC Tours & Travels hotel booking provide nahi karta.",
    "",
    "Accommodation customer ko separately arrange karna hota hai.",
  ].join("\n");
}


// ======================================================
// FLIGHT RESPONSE
// ======================================================

function getFlightResponse() {
  return [
    "RC Tours & Travels flight booking provide nahi karta.",
    "",
    "Hum cab aur tour transportation service provide karte hain.",
    "",
    "Airport pickup ya airport drop ke liye aap cab requirement pooch sakte hain.",
  ].join("\n");
}


// ======================================================
// TRAIN RESPONSE
// ======================================================

function getTrainResponse() {
  return [
    "RC Tours & Travels train ticket booking provide nahi karta.",
    "",
    "Hum cab aur tour transportation service provide karte hain.",
    "",
    "Railway station pickup/drop ya outstation cab requirement ke liye aap details bata sakte hain.",
  ].join("\n");
}


// ======================================================
// 300 KM MINIMUM RULE RESPONSE
// ======================================================

function getMinimumKmResponse(knowledge) {
  const minimumKm =
    Number(
      knowledge?.pricingRules
        ?.roundTripMinimumKmPerDay
    );

  if (
    !Number.isFinite(minimumKm) ||
    minimumKm <= 0
  ) {
    return (
      "Round-trip minimum KM rule ki verified information " +
      "abhi available nahi hai. Please RC Tours & Travels se confirm karein."
    );
  }

  return [
    `RC Tours & Travels ke current round-trip pricing rule me minimum billing ${minimumKm} KM per day hai.`,
    "",
    "Final billable KM trip ke actual verified road distance aur applicable minimum billing rule ke according calculate kiya jata hai.",
    "",
    "Exact fare ke liye pickup, destination, trip days aur vehicle details required hongi.",
  ].join("\n");
}


// ======================================================
// DRIVER ALLOWANCE RESPONSE
// ======================================================

function getDriverAllowanceResponse(
  knowledge
) {
  const allowance =
    Number(
      knowledge?.pricingRules
        ?.driverAllowance
    );

  if (
    !Number.isFinite(allowance) ||
    allowance < 0
  ) {
    return [
      "Driver allowance exact booking rules ke according confirm kiya jayega.",
      "",
      "Main unverified charge invent nahi karunga.",
    ].join("\n");
  }

  return [
    `Current stored RC Tours driver allowance value ₹${allowance} hai.`,
    "",
    "Lekin final applicable driver allowance trip type, duration aur actual booking rules ke according verify kiya jana chahiye.",
  ].join("\n");
}


// ======================================================
// TOLL RESPONSE
// ======================================================

function getTollResponse() {
  return [
    "Toll amount route aur actual booking ke according change ho sakta hai.",
    "",
    "RC Tours Travel Assistant unverified toll amount guess nahi karega.",
    "",
    "Exact applicable toll booking/fare calculation ke time verify kiya jayega.",
  ].join("\n");
}


// ======================================================
// PARKING RESPONSE
// ======================================================

function getParkingResponse() {
  return [
    "Parking charges location aur actual trip ke according applicable ho sakte hain.",
    "",
    "Unverified parking amount Travel Assistant guess nahi karega.",
    "",
    "Applicable parking charge actual booking/trip ke according confirm kiya jayega.",
  ].join("\n");
}


// ======================================================
// STATE TAX RESPONSE
// ======================================================

function getStateTaxResponse() {
  return [
    "State tax route aur applicable state entry rules ke according change ho sakta hai.",
    "",
    "Travel Assistant unverified state tax amount invent nahi karega.",
    "",
    "Applicable amount booking ke time verify kiya jayega.",
  ].join("\n");
}


// ======================================================
// LOCAL BUSINESS RESPONSE
// ======================================================

function getBusinessResponse({
  text,
  knowledge,
}) {
  // ====================================================
  // HOTEL
  // ====================================================

  if (
    containsAny(text, [
      "hotel",
      "accommodation",
      "room included",
      "stay included",
    ])
  ) {
    return getHotelResponse(
      knowledge
    );
  }


  // ====================================================
  // FLIGHT
  // ====================================================

  if (
    containsAny(text, [
      "flight",
      "plane ticket",
      "air ticket",
    ])
  ) {
    return getFlightResponse();
  }


  // ====================================================
  // TRAIN
  // ====================================================

  if (
    containsAny(text, [
      "train",
      "railway ticket",
      "train ticket",
    ])
  ) {
    return getTrainResponse();
  }


  // ====================================================
  // DRIVER ALLOWANCE
  // ====================================================

  if (
    containsAny(text, [
      "driver allowance",
      "driver charge",
      "driver charges",
    ])
  ) {
    return getDriverAllowanceResponse(
      knowledge
    );
  }


  // ====================================================
  // MINIMUM KM RULE
  // ====================================================

  if (
    containsAny(text, [
      "300 km",
      "minimum km",
      "minimum kilometer",
      "billing rule",
    ])
  ) {
    return getMinimumKmResponse(
      knowledge
    );
  }


  // ====================================================
  // TOLL
  // ====================================================

  if (
    containsAny(text, [
      "toll",
      "toll included",
      "toll charge",
      "toll charges",
    ])
  ) {
    return getTollResponse();
  }


  // ====================================================
  // PARKING
  // ====================================================

  if (
    containsAny(text, [
      "parking",
      "parking included",
      "parking charge",
      "parking charges",
    ])
  ) {
    return getParkingResponse();
  }


  // ====================================================
  // STATE TAX
  // ====================================================

  if (
    containsAny(text, [
      "state tax",
      "state entry",
      "entry tax",
    ])
  ) {
    return getStateTaxResponse();
  }


  // ====================================================
  // DEFAULT BUSINESS / SERVICES
  // ====================================================

  return getServiceListText(
    knowledge
  );
}


// ======================================================
// LOCAL CONVERSATION RESPONSE
// ======================================================

function getConversationResponse(text) {
  // ====================================================
  // THANK YOU
  // ====================================================

  if (
    containsAny(text, [
      "thank you",
      "thanks",
      "dhanyavad",
      "dhanyawaad",
    ])
  ) {
    return getThankYouResponse();
  }


  // ====================================================
  // IDENTITY
  // ====================================================

  if (
    containsAny(text, [
      "who are you",
      "aap kaun ho",
      "tum kaun ho",
    ])
  ) {
    return getIdentityResponse();
  }


  // ====================================================
  // DEFAULT GREETING / HELP
  // ====================================================

  return getGreetingResponse();
}


// ======================================================
// MAIN LOCAL RESPONSE FUNCTION
// ======================================================

export function getTravelAssistantLocalResponse({
  message,
  route,
}) {
  const text =
    normalizeText(message);

  const knowledge =
    getTravelAssistantKnowledge();


  // ====================================================
  // VALIDATION
  // ====================================================

  if (!text) {
    return {
      success: false,

      handled: false,

      verified: false,

      reply:
        "Please enter your travel question.",
    };
  }

  if (!route || !route.type) {
    return {
      success: false,

      handled: false,

      verified: false,

      reply: null,
    };
  }


  // ====================================================
  // BUSINESS
  // ====================================================

  if (route.type === "business") {
    return {
      success: true,

      handled: true,

      verified: true,

      source:
        "RC Tours verified business knowledge",

      reply:
        getBusinessResponse({
          text,
          knowledge,
        }),
    };
  }


  // ====================================================
// VEHICLES
// ====================================================
//
// Passenger count diya ho to:
// suitable vehicle recommendation.
//
// Passenger count nahi diya ho to:
// complete fleet list.
//
// Examples:
//
// "5 log hai konsi car best hai?"
// -> SUV / MUV recommendation
//
// "konsi cars available hain?"
// -> complete fleet list
//
// ====================================================

if (route.type === "vehicle") {
  const passengers =
    getPassengerCount(text);

  return {
    success: true,

    handled: true,

    verified: true,

    source:
      "RC Tours verified vehicle knowledge",

    reply:
      passengers
        ? getVehicleRecommendationText({
            knowledge,
            passengers,
          })
        : getVehicleListText(
            knowledge
          ),
  };
}


  // ====================================================
  // CONVERSATION
  // ====================================================

  if (
    route.type ===
    "conversation"
  ) {
    return {
      success: true,

      handled: true,

      verified: true,

      source:
        "RC Tours local assistant",

      reply:
        getConversationResponse(
          text
        ),
    };
  }


  // ====================================================
  // NOT A LOCAL-ONLY QUESTION
  // ====================================================
  //
  // Fare / route / travel guidance / mixed
  // questions ko ye helper answer nahi karega.
  //
  // Unhe main Travel Assistant route handle karega.
  //
  // ====================================================

  return {
    success: true,

    handled: false,

    verified: false,

    source: null,

    reply: null,
  };
}