// ======================================================
// RC TOURS & TRAVELS
// TRAVEL ASSISTANT SMART ROUTER
// ======================================================
//
// PURPOSE:
//
// Customer ke question ko samajhkar decide karna:
//
// 1. RC business information
// 2. Vehicle information
// 3. Fare / route calculation
// 4. General travel / itinerary
// 5. Mixed question
// 6. Unknown / conversational question
//
// IMPORTANT:
//
// Ye helper:
// - Gemini API call nahi karta.
// - Fare calculate nahi karta.
// - Distance calculate nahi karta.
// - Business information invent nahi karta.
//
// Iska kaam sirf question ko ROUTE karna hai.
//
// ======================================================


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
// CHECK KEYWORDS
// ======================================================

function containsAny(text, keywords) {
  return keywords.some((keyword) =>
    text.includes(keyword)
  );
}


// ======================================================
// BUSINESS / POLICY KEYWORDS
// ======================================================

const BUSINESS_KEYWORDS = [
  // Hotel
  "hotel",
  "accommodation",
  "stay included",
  "room included",
  "hotel included",

  // Flight
  "flight",
  "plane ticket",
  "air ticket",

  // Train
  "train",
  "railway ticket",
  "train ticket",

  // RC services
  "service",
  "services",
  "rc tours",
  "rc tour",
  "what do you provide",
  "what services",
  "kya service",
  "kya services",
  "kya provide",
  "provide karte",
  "provide karte ho",

  // Business rules
  "300 km",
  "minimum km",
  "minimum kilometer",
  "billing rule",
  "driver allowance",
  "toll included",
  "parking included",
  "state tax",
];


// ======================================================
// VEHICLE KEYWORDS
// ======================================================

const VEHICLE_KEYWORDS = [
  "vehicle",
  "vehicles",
  "car",
  "cars",
  "cab available",
  "car available",
  "vehicle available",
  "fleet",

  "dzire",
  "swift dzire",
  "aura",
  "hyundai aura",
  "glanza",
  "toyota glanza",

  "ertiga",
  "maruti ertiga",
  "rumion",
  "toyota rumion",
  "carens",
  "kia carens",

  "crysta",
  "innova",
  "innova crysta",
  "hycross",
  "toyota hycross",

  "traveller",
  "traveler",
  "tempo traveller",
  "tempo traveler",
  "urbania",
  "force urbania",

  "which car",
  "which vehicle",
  "konsi car",
  "kaunsi car",
  "kon si car",
  "konsa vehicle",
  "kaunsa vehicle",
];


// ======================================================
// FARE / PRICING KEYWORDS
// ======================================================

const FARE_KEYWORDS = [
  "fare",
  "price",
  "pricing",
  "cost",
  "rate",
  "rates",
  "charges",
  "charge",

  "kitna hoga",
  "kitna lagega",
  "kitne paise",
  "kitna paisa",
  "kitna fare",
  "fare kitna",
  "rate kya",
  "rate kitna",

  "cab fare",
  "taxi fare",
  "car fare",

  "per km",
  "per kilometer",
  "₹",
  "rs.",
  "rupees",
  "rupaye",
];


// ======================================================
// ROUTE / DISTANCE KEYWORDS
// ======================================================

const ROUTE_KEYWORDS = [
  "distance",
  "kitna km",
  "kitne km",
  "how many km",
  "kilometer",
  "kilometre",

  "one way",
  "one-way",
  "round trip",
  "return trip",
  "up down",
  "up-down",
  "wapas",
  "return journey",

  "outstation",
  "local rental",
  "airport pickup",
  "airport drop",

  "se jana",
  "se jaana",
  "jana hai",
  "jaana hai",
  "travel from",
  "from nagpur",
];


// ======================================================
// GENERAL TRAVEL / ITINERARY KEYWORDS
// ======================================================

const TRAVEL_GUIDANCE_KEYWORDS = [
  "itinerary",
  "tour plan",
  "trip plan",
  "travel plan",
  "plan batao",
  "plan banao",

  "sightseeing",
  "sight seeing",

  "ghumne",
  "ghumna",
  "ghum sakte",
  "ghumne ki jagah",
  "ghumne ke liye",
  "dekhne ki jagah",

  "places to visit",
  "place to visit",
  "tourist places",
  "tourist place",
  "attractions",

  "what to see",
  "what to visit",
  "where to visit",

  "best time",
  "weather",
  "season",

  "travel time",
  "kitna time",
  "kitne ghante",
  "how long",

  "food",
  "restaurant",
  "shopping",

  "temple",
  "beach",
  "fort",
  "waterfall",
  "wildlife",
  "safari",
];


// ======================================================
// CONVERSATIONAL KEYWORDS
// ======================================================

const CONVERSATION_KEYWORDS = [
  "hello",
  "hi",
  "hey",
  "namaste",
  "namaskar",

  "thanks",
  "thank you",
  "dhanyavad",
  "dhanyawaad",

  "who are you",
  "aap kaun ho",
  "tum kaun ho",

  "help",
  "madad",
];


// ======================================================
// DETECT BUSINESS QUESTION
// ======================================================

function detectBusinessQuestion(text) {
  return containsAny(
    text,
    BUSINESS_KEYWORDS
  );
}


// ======================================================
// DETECT VEHICLE QUESTION
// ======================================================

function detectVehicleQuestion(text) {
  return containsAny(
    text,
    VEHICLE_KEYWORDS
  );
}


// ======================================================
// DETECT FARE QUESTION
// ======================================================

function detectFareQuestion(text) {
  return containsAny(
    text,
    FARE_KEYWORDS
  );
}


// ======================================================
// DETECT ROUTE QUESTION
// ======================================================

function detectRouteQuestion(text) {
  return containsAny(
    text,
    ROUTE_KEYWORDS
  );
}


// ======================================================
// DETECT GENERAL TRAVEL QUESTION
// ======================================================

function detectTravelGuidanceQuestion(text) {
  return containsAny(
    text,
    TRAVEL_GUIDANCE_KEYWORDS
  );
}


// ======================================================
// DETECT CONVERSATION
// ======================================================

function detectConversation(text) {
  return containsAny(
    text,
    CONVERSATION_KEYWORDS
  );
}


// ======================================================
// MAIN QUESTION ROUTER
// ======================================================

export function routeTravelAssistantQuestion(
  message
) {
  const text =
    normalizeText(message);


  // ====================================================
  // EMPTY MESSAGE
  // ====================================================

  if (!text) {
    return {
      success: false,

      type: "invalid",

      useGemini: false,

      needsDistance: false,

      needsPricing: false,

      message:
        "Customer message is required.",
    };
  }


  // ====================================================
  // DETECT QUESTION FEATURES
  // ====================================================

  const hasBusinessQuestion =
    detectBusinessQuestion(text);

  const hasVehicleQuestion =
    detectVehicleQuestion(text);

  const hasFareQuestion =
    detectFareQuestion(text);

  const hasRouteQuestion =
    detectRouteQuestion(text);

  const hasTravelGuidance =
    detectTravelGuidanceQuestion(text);

  const hasConversation =
    detectConversation(text);


  // ====================================================
  // FARE / ROUTE INTENT
  // ====================================================
  //
  // Fare ya distance wale questions ko
  // verified RC calculation system tak
  // pahunchana hai.
  //
  // ====================================================

  const needsPricing =
    hasFareQuestion;

  const needsDistance =
    hasFareQuestion ||
    hasRouteQuestion;


  // ====================================================
  // MIXED QUESTION
  // ====================================================
  //
  // Example:
  //
  // "Nagpur se Goa Ertiga ka fare aur
  //  4 din ka sightseeing plan batao"
  //
  // Isme:
  //
  // Verified fare/distance bhi chahiye
  // aur Gemini travel guidance bhi useful hai.
  //
  // ====================================================

  if (
    (hasFareQuestion ||
      hasRouteQuestion ||
      hasBusinessQuestion ||
      hasVehicleQuestion) &&
    hasTravelGuidance
  ) {
    return {
      success: true,

      type: "mixed",

      useGemini: true,

      needsDistance,

      needsPricing,

      flags: {
        business:
          hasBusinessQuestion,

        vehicle:
          hasVehicleQuestion,

        fare:
          hasFareQuestion,

        route:
          hasRouteQuestion,

        travelGuidance:
          hasTravelGuidance,

        conversation:
          hasConversation,
      },
    };
  }

    // ====================================================
  // VERIFIED BUSINESS / PRICING POLICY QUESTION
  // ====================================================
  //
  // IMPORTANT:
  //
  // Kuch business policy questions me route words bhi
  // aa sakte hain.
  //
  // Example:
  //
  // "Round trip minimum 300 KM rule kya hai?"
  //
  // Isme:
  // - "round trip" route keyword hai
  // - "300 km" business rule keyword hai
  //
  // Lekin customer actual route distance nahi pooch raha.
  // Wo RC Tours ka verified pricing rule pooch raha hai.
  //
  // Fare question ko yahan intercept nahi karna hai.
  //
  // Example:
  //
  // "Nagpur se Pune round trip fare kitna hai?"
  //
  // Ye genuine fare request hai aur pricing system
  // tak jana chahiye.
  //
  // ====================================================

  if (
    hasBusinessQuestion &&
    !hasFareQuestion &&
    !hasTravelGuidance
  ) {
    return {
      success: true,

      type: "business",

      useGemini: false,

      needsDistance: false,

      needsPricing: false,

      flags: {
        business: true,

        vehicle:
          hasVehicleQuestion,

        fare: false,

        route:
          hasRouteQuestion,

        travelGuidance: false,

        conversation:
          hasConversation,
      },
    };
  }

  // ====================================================
  // FARE QUESTION
  // ====================================================

  if (hasFareQuestion) {
    return {
      success: true,

      type: "fare",

      // Gemini may still be required later
      // for understanding natural customer
      // trip details.
      //
      // Final verified fare must come from
      // RC pricing code, not Gemini.
      useGemini: true,

      needsDistance: true,

      needsPricing: true,

      flags: {
        business:
          hasBusinessQuestion,

        vehicle:
          hasVehicleQuestion,

        fare: true,

        route:
          hasRouteQuestion,

        travelGuidance: false,

        conversation:
          hasConversation,
      },
    };
  }

    // ====================================================
  // ROUTE + VEHICLE COMBINED QUESTION
  // ====================================================
  //
  // Examples:
  //
  // "Nagpur se Hyderabad jana hai 5 log hai
  //  konsi car aur distance batao"
  //
  // "Pune kitna km hai aur 6 log ke liye
  //  konsi car best hai"
  //
  // IMPORTANT:
  //
  // Distance Gemini guess nahi karega.
  // Verified RC distance system use hoga.
  //
  // Vehicle recommendation passenger count ke
  // according RC verified vehicle knowledge se hogi.
  //
  // ====================================================

  if (
    hasRouteQuestion &&
    hasVehicleQuestion &&
    !hasFareQuestion &&
    !hasTravelGuidance
  ) {
    return {
      success: true,

      type: "route_vehicle",

      useGemini: false,

      needsDistance: true,

      needsPricing: false,

      flags: {
        business:
          hasBusinessQuestion,

        vehicle: true,

        fare: false,

        route: true,

        travelGuidance: false,

        conversation:
          hasConversation,
      },
    };
  }


  // ====================================================
  // ROUTE / DISTANCE QUESTION
  // ====================================================

  if (hasRouteQuestion) {
    return {
      success: true,

      type: "route",

      // Natural pickup/drop extraction may
      // still require Gemini.
      useGemini: true,

      needsDistance: true,

      needsPricing: false,

      flags: {
        business:
          hasBusinessQuestion,

        vehicle:
          hasVehicleQuestion,

        fare: false,

        route: true,

        travelGuidance: false,

        conversation:
          hasConversation,
      },
    };
  }


  // ====================================================
  // BUSINESS POLICY QUESTION
  // ====================================================
  //
  // Example:
  //
  // "Hotel included hai?"
  // "Train ticket karte ho?"
  // "300 KM rule kya hai?"
  //
  // In questions ke liye verified knowledge
  // available hai, isliye Gemini quota use
  // karna necessary nahi.
  //
  // ====================================================

  if (hasBusinessQuestion) {
    return {
      success: true,

      type: "business",

      useGemini: false,

      needsDistance: false,

      needsPricing: false,

      flags: {
        business: true,
        vehicle:
          hasVehicleQuestion,
        fare: false,
        route: false,
        travelGuidance: false,
        conversation:
          hasConversation,
      },
    };
  }


  // ====================================================
  // VEHICLE QUESTION
  // ====================================================

  if (hasVehicleQuestion) {
    return {
      success: true,

      type: "vehicle",

      useGemini: false,

      needsDistance: false,

      needsPricing: false,

      flags: {
        business: false,
        vehicle: true,
        fare: false,
        route: false,
        travelGuidance: false,
        conversation:
          hasConversation,
      },
    };
  }


  // ====================================================
  // GENERAL TRAVEL GUIDANCE
  // ====================================================
  //
  // Example:
  //
  // "Goa me kya kya ghum sakte hain?"
  //
  // Ye Gemini ka strong use-case hai.
  //
  // ====================================================

  if (hasTravelGuidance) {
    return {
      success: true,

      type: "travel_guidance",

      useGemini: true,

      needsDistance: false,

      needsPricing: false,

      flags: {
        business: false,
        vehicle: false,
        fare: false,
        route: false,
        travelGuidance: true,
        conversation:
          hasConversation,
      },
    };
  }


  // ====================================================
  // SIMPLE CONVERSATION
  // ====================================================

  if (hasConversation) {
    return {
      success: true,

      type: "conversation",

      // Basic greetings can be handled
      // locally without spending Gemini quota.
      useGemini: false,

      needsDistance: false,

      needsPricing: false,

      flags: {
        business: false,
        vehicle: false,
        fare: false,
        route: false,
        travelGuidance: false,
        conversation: true,
      },
    };
  }


  // ====================================================
  // UNKNOWN / COMPLEX QUESTION
  // ====================================================
  //
  // Customer kuch unexpected bhi pooch
  // sakta hai.
  //
  // Hum unknown question reject nahi karenge.
  // Gemini ko understanding ke liye use
  // karne denge.
  //
  // ====================================================

  return {
    success: true,

    type: "general",

    useGemini: true,

    needsDistance: false,

    needsPricing: false,

    flags: {
      business: false,
      vehicle: false,
      fare: false,
      route: false,
      travelGuidance: false,
      conversation: false,
    },
  };
}