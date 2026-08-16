// ======================================================
// RC TOURS & TRAVELS
// LOCAL TRAVEL ASSISTANT TRIP EXTRACTOR
// ======================================================
//
// PURPOSE:
//
// Common customer booking sentences se basic trip details
// locally extract karna.
//
// IMPORTANT:
//
// - Gemini API call nahi hota.
// - Distance guess nahi hota.
// - Fare guess nahi hota.
// - Location verify nahi hoti.
// - Final road distance rcDistance.js verify karega.
//
// Example:
//
// "Nagpur se Pune kitna km hai?"
// pickup = Nagpur
// drop   = Pune
//
// "Nagpur to Shirdi distance"
// pickup = Nagpur
// drop   = Shirdi
//
// ======================================================


// ======================================================
// CLEAN TEXT
// ======================================================

function cleanText(value) {
  return (value || "")
    .toString()
    .trim()
    .replace(/\s+/g, " ");
}


// ======================================================
// CLEAN LOCATION NAME
// ======================================================

function cleanLocation(value) {
  if (!value) {
    return null;
  }

  let location = cleanText(value);

  // ----------------------------------------------------
  // QUESTION / BOOKING WORDS REMOVE FROM LOCATION END
  // ----------------------------------------------------

  location = location
      .replace(
    /\b\d+\s*(?:day|days|din)\b.*$/i,
    ""
    )
    .replace(
      /\b(kitna|kitne|distance|km|kilometer|kilometre|kms|fare|price|cost|rate|charges|charge)\b.*$/i,
      ""
    )
    .replace(
      /\b(jana|jaana|jane|jaane|travel|trip|cab|taxi|car)\b.*$/i,
      ""
    )
    .replace(
      /\b(hai|hain|hoga|hogi|chahiye|batao|bataiye|please)\b.*$/i,
      ""
    )
    .replace(/[?.!,]+$/g, "")
    .trim();

  if (!location) {
    return null;
  }

  // ----------------------------------------------------
  // SIMPLE TITLE CASE
  // ----------------------------------------------------

  location = location
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");

  return location || null;
}


// ======================================================
// VALID LOCATION
// ======================================================

function isValidLocation(value) {
  if (!value) {
    return false;
  }

  const location = value.trim();

  if (location.length < 2) {
    return false;
  }

  // Location me kam se kam ek alphabet hona chahiye.
  return /[a-zA-Z]/.test(location);
}


// ======================================================
// DETECT TRIP TYPE
// ======================================================

function detectTripType(text) {
  const lowerText =
    text.toLowerCase();

  // ----------------------------------------------------
  // AIRPORT
  // ----------------------------------------------------

  if (
    lowerText.includes("airport pickup") ||
    lowerText.includes("airport pick-up") ||
    lowerText.includes("airport drop") ||
    lowerText.includes("airport transfer")
  ) {
    return "Airport Pick-Up & Drop";
  }

  // ----------------------------------------------------
  // LOCAL RENTAL
  // ----------------------------------------------------

  if (
  lowerText.includes("local rental") ||
  lowerText.includes("local trip") ||
  lowerText.includes("local cab") ||
  /\blocal\b/i.test(lowerText)
  ) {
  return "Local Rental";
  }

  // ----------------------------------------------------
  // ROUND TRIP / OUTSTATION
  // ----------------------------------------------------

  if (
    lowerText.includes("round trip") ||
    lowerText.includes("round-trip") ||
    lowerText.includes("return trip") ||
    lowerText.includes("return journey") ||
    lowerText.includes("up down") ||
    lowerText.includes("up-down") ||
    lowerText.includes("wapas") ||
    lowerText.includes("aana jana") ||
    lowerText.includes("ana jana")
  ) {
    return "Outstation Trip";
  }

  // ----------------------------------------------------
  // ONE WAY
  // ----------------------------------------------------

  if (
    lowerText.includes("one way") ||
    lowerText.includes("one-way")
  ) {
    return "One Way Trip";
  }

  return null;
}


// ======================================================
// DETECT NUMBER OF DAYS
// ======================================================

function detectDays(text) {
  const match = text.match(
    /\b(\d+)\s*(?:day|days|din)\b/i
  );

  if (!match) {
    return null;
  }

  const days =
    Number(match[1]);

  if (
    !Number.isInteger(days) ||
    days < 1
  ) {
    return null;
  }

  return days;
}


// ======================================================
// DETECT PASSENGERS
// ======================================================

function detectPassengers(text) {
  const patterns = [
    /\b(\d+)\s*(?:passenger|passengers|people|persons|person|log|people)\b/i,

    /\b(?:passenger|passengers|people|persons|person|log)\s*(\d+)\b/i,
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
// DETECT VEHICLE
// ======================================================

function detectVehicle(text) {
  const lowerText =
    text.toLowerCase();

  const vehicles = [
    {
      keywords: [
        "swift dzire",
        "dzire",
        "dezire",
      ],
      value: "Swift Dzire",
    },

    {
      keywords: [
        "hyundai aura",
        "aura",
      ],
      value: "Hyundai Aura",
    },

    {
      keywords: [
        "toyota glanza",
        "glanza",
      ],
      value: "Toyota Glanza",
    },

    {
      keywords: [
        "maruti ertiga",
        "ertiga",
      ],
      value: "Ertiga",
    },

    {
      keywords: [
        "toyota rumion",
        "rumion",
      ],
      value: "Toyota Rumion",
    },

    {
      keywords: [
        "kia carens",
        "carens",
      ],
      value: "Kia Carens",
    },

    {
      keywords: [
        "innova crysta",
        "crysta",
      ],
      value: "Innova Crysta",
    },

    {
      keywords: [
        "toyota hycross",
        "hycross",
      ],
      value: "Toyota Hycross",
    },

    {
      keywords: [
        "traveller 13",
        "traveler 13",
        "13 seater",
      ],
      value: "Traveller 13 Seater",
    },

    {
      keywords: [
        "traveller 17",
        "traveler 17",
        "17 seater",
      ],
      value: "Traveller 17 Seater",
    },

    {
      keywords: [
        "traveller 26",
        "traveler 26",
        "26 seater",
      ],
      value: "Traveller 26 Seater",
    },

    {
      keywords: [
        "force urbania",
        "urbania",
      ],
      value: "Force Urbania",
    },
  ];

  for (const vehicle of vehicles) {
    const found =
      vehicle.keywords.some(
        (keyword) =>
          lowerText.includes(keyword)
      );

    if (found) {
      return vehicle.value;
    }
  }

  return null;
}


// ======================================================
// EXTRACT "FROM ... TO ..." LOCATIONS
// ======================================================

function extractFromToLocations(text) {
  const match = text.match(
    /\bfrom\s+(.+?)\s+to\s+(.+?)(?=\s+(?:distance|kitna|kitne|fare|price|cost|rate|cab|taxi|car|round trip|one way|for|ka|ki|ke)\b|[?.!,]|$)/i
  );

  if (!match) {
    return null;
  }

  const pickup =
    cleanLocation(match[1]);

  const drop =
    cleanLocation(match[2]);

  if (
    !isValidLocation(pickup) ||
    !isValidLocation(drop)
  ) {
    return null;
  }

  return {
    pickup,
    drop,
  };
}


// ======================================================
// EXTRACT "LOCATION SE LOCATION" PATTERN
// ======================================================

function extractSeLocations(text) {
  // ====================================================
  // "Nagpur se Pune ..." TYPE LOCATION EXTRACTION
  // ====================================================
  //
  // IMPORTANT:
  //
  // Destination ke baad customer vehicle name,
  // passenger count, fare question, trip type etc.
  // likh sakta hai.
  //
  // Examples:
  //
  // Nagpur se Hyderabad Ertiga ka fare kitna hoga
  //
  // pickup = Nagpur
  // drop   = Hyderabad
  //
  // Nagpur se Pune 5 log jana hai
  //
  // pickup = Nagpur
  // drop   = Pune
  //
  // Vehicle ko destination ka part nahi banana hai.
  //
  // ====================================================

  const match = text.match(
    /^(.+?)\s+se\s+(.+?)(?=\s+(?:(?:swift\s+)?dzire|dezire|hyundai\s+aura|aura|toyota\s+glanza|glanza|(?:maruti\s+)?ertiga|(?:toyota\s+)?rumion|kia\s+carens|carens|(?:innova\s+)?crysta|innova|toyota\s+hycross|hycross|traveller|traveler|urbania|\d+\s*(?:passenger|passengers|people|persons|person|log)|kitna|kitne|distance|km|kilometer|kilometre|fare|price|cost|rate|cab|taxi|car|jana|jaana|jane|jaane|round\s+trip|one\s+way|ke\s+liye|ka|ki|hoga|hai|hain|batao|bataiye)\b|[?.!,]|$)/i
  );

  if (!match) {
    return null;
  }

  const pickup =
    cleanLocation(match[1]);

  const drop =
    cleanLocation(match[2]);

  if (
    !isValidLocation(pickup) ||
    !isValidLocation(drop)
  ) {
    return null;
  }

  return {
    pickup,
    drop,
  };
}


// ======================================================
// EXTRACT "LOCATION TO LOCATION" PATTERN
// ======================================================

function extractToLocations(text) {
  const match = text.match(
    /^(.+?)\s+to\s+(.+?)(?=\s+(?:kitna|kitne|distance|km|kilometer|kilometre|fare|price|cost|rate|cab|taxi|car|round trip|one way|ke liye|ka|ki|hoga|hai|batao)\b|[?.!,]|$)/i
  );

  if (!match) {
    return null;
  }

  const pickup =
    cleanLocation(match[1]);

  const drop =
    cleanLocation(match[2]);

  if (
    !isValidLocation(pickup) ||
    !isValidLocation(drop)
  ) {
    return null;
  }

  return {
    pickup,
    drop,
  };
}


// ======================================================
// EXTRACT REVERSE HINDI PATTERN
// ======================================================
//
// Example:
//
// "Pune jana hai Nagpur se"
//
// Is case me:
// pickup = Nagpur
// drop   = Pune
//
// ======================================================

function extractReverseHindiLocations(text) {
  const match = text.match(
    /^(.+?)\s+(?:jana|jaana|jane|jaane)\s+(?:hai|hain|hoga|chahiye)?\s*(.+?)\s+se[?.!,]*$/i
  );

  if (!match) {
    return null;
  }

  const drop =
    cleanLocation(match[1]);

  const pickup =
    cleanLocation(match[2]);

  if (
    !isValidLocation(pickup) ||
    !isValidLocation(drop)
  ) {
    return null;
  }

  return {
    pickup,
    drop,
  };
}


// ======================================================
// EXTRACT LOCATIONS
// ======================================================

function extractLocations(text) {
  // ----------------------------------------------------
  // 1. "from Nagpur to Pune"
  // ----------------------------------------------------

  const fromTo =
    extractFromToLocations(text);

  if (fromTo) {
    return fromTo;
  }


  // ----------------------------------------------------
  // 2. "Nagpur se Pune"
  // ----------------------------------------------------

  const seLocations =
    extractSeLocations(text);

  if (seLocations) {
    return seLocations;
  }


  // ----------------------------------------------------
  // 3. "Nagpur to Pune"
  // ----------------------------------------------------

  const toLocations =
    extractToLocations(text);

  if (toLocations) {
    return toLocations;
  }


  // ----------------------------------------------------
  // 4. "Pune jana hai Nagpur se"
  // ----------------------------------------------------

  const reverseHindi =
    extractReverseHindiLocations(text);

  if (reverseHindi) {
    return reverseHindi;
  }


  return {
    pickup: null,
    drop: null,
  };
}

// ======================================================
// DETECT LOCAL RENTAL PACKAGE
// ======================================================
//
// Supported RC Tours local packages:
//
// 8 hour  -> 8hr
// 10 hour -> 10hr
// 12 hour -> 12hr
//
// Ye sirf package type identify karta hai.
// Fare yahan calculate nahi hota.
//
// ======================================================

function detectLocalPackageType(text) {
  if (!text) {
    return null;
  }

  const match = text.match(
    /\b(8|10|12)\s*(?:hour|hours|hr|hrs)\b/i
  );

  if (!match) {
    return null;
  }

  return `${match[1]}hr`;
}

// ======================================================
// MAIN LOCAL TRIP EXTRACTOR
// ======================================================

export function extractLocalTripDetails(
  message
) {
  const text =
    cleanText(message);

  if (!text) {
    return {
      success: false,

      extracted: false,

      pickup: null,

      drop: null,

      tripType: null,

      days: null,

      passengers: null,

      vehicle: null,

      message:
        "Customer message is required.",
    };
  }


  // ====================================================
  // EXTRACT LOCATIONS
  // ====================================================

  const locations =
    extractLocations(text);


  // ====================================================
  // OTHER BOOKING DETAILS
  // ====================================================

  const tripType =
    detectTripType(text);

  const days =
    detectDays(text);

  const passengers =
    detectPassengers(text);

  const vehicle =
    detectVehicle(text);

    const packageType =
  tripType === "Local Rental"
    ? detectLocalPackageType(text)
    : null;


  // ====================================================
  // CHECK IF SOMETHING WAS EXTRACTED
  // ====================================================

  const extracted =
  Boolean(
    locations.pickup ||
    locations.drop ||
    tripType ||
    days ||
    passengers ||
    vehicle ||
    packageType
  );


  // ====================================================
  // RETURN
  // ====================================================

  return {
    success: true,

    extracted,

    source:
      "RC Tours local trip extractor",

    pickup:
      locations.pickup || null,

    drop:
      locations.drop || null,

    tripType,

    days,

    passengers,

    vehicle,

    packageType,
  };
}