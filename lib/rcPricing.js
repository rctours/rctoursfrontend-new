// ========================================
// RC TOURS & TRAVELS
// VERIFIED PRICING SOURCE
// ========================================
//
// IMPORTANT:
// Ye file RC Tours & Travels ke verified
// Outstation Round Trip pricing rules ka
// central source hai.
//
// Is file me bina business verification ke
// koi rate ya extra charge add nahi karna.
//
// ========================================


// ========================================
// OUTSTATION ROUND TRIP RATES
// ========================================

export const roundTripRates = {
  dzire: {
    name: "Swift Dzire",
    rate: 13,
  },

  ertiga: {
    name: "Ertiga",
    rate: 15,
  },

  rumion: {
    name: "Toyota Rumion",
    rate: 15,
  },

  crysta: {
    name: "Innova Crysta",
    rate: 19,
  },
};


// ========================================
// ROUND TRIP MINIMUM KM RULE
// ========================================
//
// RC TOURS OFFICIAL RULE:
//
// Minimum billing = 300 KM per day.
//
// Lekin agar actual round-trip running KM
// minimum KM se zyada hai,
// to actual running KM bill hoga.
//
// Example:
//
// Nagpur -> Tuljapur = 606 KM one way
//
// Actual Round Trip:
// 606 × 2 = 1212 KM
//
// 2 Days Minimum:
// 2 × 300 = 600 KM
//
// Billable:
// MAX(1212, 600) = 1212 KM
//
// ========================================

export const ROUND_TRIP_MIN_KM_PER_DAY = 300;


// ========================================
// GET ROUND TRIP VEHICLE
// ========================================

export function getRoundTripVehicle(vehicleKey) {
  if (!vehicleKey) {
    return null;
  }

  const cleanVehicleKey = vehicleKey
    .toString()
    .trim()
    .toLowerCase();

  return roundTripRates[cleanVehicleKey] || null;
}


// ========================================
// CALCULATE ROUND TRIP BASE FARE
// ========================================

export function calculateRoundTripFare({
  vehicleKey,
  days,
  routeDistance,
}) {
  // =====================================
  // GET VERIFIED VEHICLE RATE
  // =====================================

  const vehicle =
    getRoundTripVehicle(vehicleKey);

  if (!vehicle) {
    return {
      success: false,
      verified: false,
      message:
        "Vehicle rate is not verified.",
    };
  }


  // =====================================
  // NORMALIZE VALUES
  // =====================================

  const tripDays = Number(days);

  const oneWayDistance =
    Number(routeDistance);


  // =====================================
  // VALIDATE DAYS
  // =====================================

  if (
    !Number.isFinite(tripDays) ||
    tripDays < 1 ||
    !Number.isInteger(tripDays)
  ) {
    return {
      success: false,
      verified: false,
      message:
        "Valid trip days are required.",
    };
  }


  // =====================================
  // VALIDATE VERIFIED ROUTE DISTANCE
  // =====================================

  if (
    !Number.isFinite(oneWayDistance) ||
    oneWayDistance <= 0
  ) {
    return {
      success: false,
      verified: false,
      message:
        "Verified one-way road distance is required.",
    };
  }


  // =====================================
  // ACTUAL ROUND TRIP DISTANCE
  // =====================================
  //
  // routeDistance helper one-way road
  // distance provide karta hai.
  //
  // Round Trip:
  //
  // One Way Distance × 2
  //
  // =====================================

  const actualRoundTripDistance =
    oneWayDistance * 2;


  // =====================================
  // MINIMUM BILLABLE DISTANCE
  // =====================================
  //
  // 300 KM × number of trip days
  //
  // =====================================

  const minimumBillableDistance =
    tripDays *
    ROUND_TRIP_MIN_KM_PER_DAY;


  // =====================================
  // FINAL BILLABLE DISTANCE
  // =====================================
  //
  // RC Tours Rule:
  //
  // Actual Round Trip KM
  // VS
  // 300 KM/day Minimum
  //
  // Jo zyada hoga wahi billable hoga.
  //
  // =====================================

  const billableDistance =
    Math.max(
      actualRoundTripDistance,
      minimumBillableDistance
    );


  // =====================================
  // CALCULATE VERIFIED BASE CAB FARE
  // =====================================

  const baseFare =
    Math.round(
      billableDistance *
        vehicle.rate
    );


  // =====================================
  // SUCCESS RESPONSE
  // =====================================

  return {
    success: true,

    verified: true,

    vehicleKey:
      vehicleKey
        .toString()
        .trim()
        .toLowerCase(),

    vehicleName:
      vehicle.name,

    ratePerKm:
      vehicle.rate,

    days:
      tripDays,

    // Verified one-way road distance
    routeDistance:
      oneWayDistance,

    oneWayDistance:
      oneWayDistance,

    // Actual estimated running for
    // pickup -> destination -> pickup
    actualRoundTripDistance,

    // RC Tours minimum billing rule
    minimumKmPerDay:
      ROUND_TRIP_MIN_KM_PER_DAY,

    minimumBillableDistance,

    // Final KM used for base fare
    billableDistance,

    // Base cab fare only
    baseFare,

    // ===================================
    // EXTRA CHARGES
    // ===================================
    //
    // In charges ko yahan guess nahi
    // kiya jayega.
    //
    // ===================================

    tollIncluded: false,

    parkingIncluded: false,

    stateTaxIncluded: false,

    driverAllowanceIncluded: false,

    note:
      "RC Tours & Travels round-trip base fare uses the higher of actual round-trip road distance or the minimum 300 KM per day billing rule. Toll, parking, state tax, driver allowance and other applicable charges are separate unless verified.",
  };
}
// ========================================
// OUTSTATION ONE WAY RATES
// ========================================
//
// IMPORTANT:
//
// Ye rates RC Tours & Travels ke verified
// One Way pricing rates hain.
//
// Customer-facing response me per-KM rate
// show nahi karna hai.
//
// Rate sirf internal fare calculation ke
// liye use hoga.
//
// ========================================

export const oneWayRates = {
  dzire: {
    name: "Swift Dzire",
    rate: 22,
  },

  ertiga: {
    name: "Ertiga",
    rate: 26,
  },

  rumion: {
    name: "Toyota Rumion",
    rate: 28,
  },

  crysta: {
    name: "Innova Crysta",
    rate: 36,
  },

  tt13: {
    name: "Tempo Traveller 13 Seater",
    rate: 48,
  },

  tt17: {
    name: "Tempo Traveller 17 Seater",
    rate: 56,
  },

  urbania: {
    name: "Force Urbania",
    rate: 70,
  },
};


// ========================================
// GET VERIFIED ONE WAY VEHICLE
// ========================================

export function getOneWayVehicle(vehicleKey) {
  if (!vehicleKey) {
    return null;
  }

  const cleanVehicleKey = vehicleKey
    .toString()
    .trim()
    .toLowerCase();

  return oneWayRates[cleanVehicleKey] || null;
}


// ========================================
// CALCULATE VERIFIED ONE WAY BASE FARE
// ========================================
//
// Formula:
//
// Verified One Way Road Distance
// ×
// Internal Vehicle One Way Rate
//
// IMPORTANT:
//
// Per-KM rate customer ko expose nahi
// karna hai.
//
// Example:
//
// 150 KM × internal rate
// = calculated base fare
//
// Customer ko sirf final base fare
// dikhaya jayega.
//
// ========================================

export function calculateOneWayFare({
  vehicleKey,
  routeDistance,
}) {
  // =====================================
  // GET VERIFIED VEHICLE RATE
  // =====================================

  const vehicle =
    getOneWayVehicle(vehicleKey);

  if (!vehicle) {
    return {
      success: false,
      verified: false,
      message:
        "Vehicle one-way rate is not verified.",
    };
  }


  // =====================================
  // NORMALIZE VERIFIED DISTANCE
  // =====================================

  const oneWayDistance =
    Number(routeDistance);


  // =====================================
  // VALIDATE VERIFIED ROAD DISTANCE
  // =====================================

  if (
    !Number.isFinite(oneWayDistance) ||
    oneWayDistance <= 0
  ) {
    return {
      success: false,
      verified: false,
      message:
        "Verified one-way road distance is required.",
    };
  }


  // =====================================
  // CALCULATE VERIFIED BASE FARE
  // =====================================

  const baseFare =
    Math.round(
      oneWayDistance *
        vehicle.rate
    );


  // =====================================
  // SUCCESS RESPONSE
  // =====================================

  return {
    success: true,

    verified: true,

    vehicleKey:
      vehicleKey
        .toString()
        .trim()
        .toLowerCase(),

    vehicleName:
      vehicle.name,

    // Verified road distance
    routeDistance:
      oneWayDistance,

    oneWayDistance:
      oneWayDistance,

    // IMPORTANT:
    // Internal calculation rate.
    // Is value ko customer-facing response
    // me show nahi karna hai.
    ratePerKm:
      vehicle.rate,

    // Base cab fare only
    baseFare,

    tollIncluded: false,

    parkingIncluded: false,

    stateTaxIncluded: false,

    driverAllowanceIncluded: false,

    note:
      "RC Tours & Travels one-way base fare is calculated using the verified road distance and internal verified one-way vehicle rate. The per-KM rate must not be displayed in the customer-facing response. Toll, parking, state tax, driver allowance and other applicable charges are separate unless verified.",
  };
}
// ========================================
// LOCAL RENTAL VERIFIED PACKAGES
// ========================================
//
// RC Tours & Travels ke existing verified
// Local Rental package rates.
//
// Package:
// 8 Hours  / 80 KM
// 10 Hours / 100 KM
// 12 Hours / 120 KM
//
// ========================================

export const localRentalPackages = {
  dzire: {
    name: "Swift Dzire",

    packages: {
      "8hr": {
        fare: 2000,
        km: 80,
        hrs: 8,
        extraKm: 13,
        extraHr: 200,
      },

      "10hr": {
        fare: 2300,
        km: 100,
        hrs: 10,
        extraKm: 13,
        extraHr: 200,
      },

      "12hr": {
        fare: 2600,
        km: 120,
        hrs: 12,
        extraKm: 13,
        extraHr: 200,
      },
    },
  },

  rumion: {
    name: "Toyota Rumion",

    packages: {
      "8hr": {
        fare: 2500,
        km: 80,
        hrs: 8,
        extraKm: 14,
        extraHr: 300,
      },

      "10hr": {
        fare: 2800,
        km: 100,
        hrs: 10,
        extraKm: 14,
        extraHr: 300,
      },

      "12hr": {
        fare: 3000,
        km: 120,
        hrs: 12,
        extraKm: 14,
        extraHr: 300,
      },
    },
  },

  ertiga: {
    name: "Ertiga",

    packages: {
      "8hr": {
        fare: 2500,
        km: 80,
        hrs: 8,
        extraKm: 14,
        extraHr: 300,
      },

      "10hr": {
        fare: 2800,
        km: 100,
        hrs: 10,
        extraKm: 14,
        extraHr: 300,
      },

      "12hr": {
        fare: 3000,
        km: 120,
        hrs: 12,
        extraKm: 14,
        extraHr: 300,
      },
    },
  },

  crysta: {
    name: "Innova Crysta",

    packages: {
      "8hr": {
        fare: 3500,
        km: 80,
        hrs: 8,
        extraKm: 19,
        extraHr: 400,
      },

      "10hr": {
        fare: 4000,
        km: 100,
        hrs: 10,
        extraKm: 19,
        extraHr: 400,
      },

      "12hr": {
        fare: 4500,
        km: 120,
        hrs: 12,
        extraKm: 19,
        extraHr: 400,
      },
    },
  },
};


// ========================================
// GET VERIFIED LOCAL RENTAL VEHICLE
// ========================================

export function getLocalRentalVehicle(
  vehicleKey
) {
  if (!vehicleKey) {
    return null;
  }

  const cleanVehicleKey =
    vehicleKey
      .toString()
      .trim()
      .toLowerCase();

  return (
    localRentalPackages[
      cleanVehicleKey
    ] || null
  );
}


// ========================================
// GET VERIFIED LOCAL RENTAL PACKAGE
// ========================================

export function getLocalRentalPackage({
  vehicleKey,
  packageType,
}) {
  const vehicle =
    getLocalRentalVehicle(vehicleKey);

  if (!vehicle || !packageType) {
    return null;
  }

  const cleanPackageType =
    packageType
      .toString()
      .trim()
      .toLowerCase();

  const pkg =
    vehicle.packages[
      cleanPackageType
    ];

  if (!pkg) {
    return null;
  }

  return {
    vehicleName: vehicle.name,
    packageType: cleanPackageType,
    ...pkg,
  };
}


// ========================================
// CALCULATE VERIFIED LOCAL RENTAL FARE
// ========================================

export function calculateLocalRentalFare({
  vehicleKey,
  packageType,
  actualKm = 0,
  actualHours = 0,
}) {
  const pkg =
    getLocalRentalPackage({
      vehicleKey,
      packageType,
    });

  if (!pkg) {
    return {
      success: false,
      verified: false,
      message:
        "Local Rental vehicle or package is not verified.",
    };
  }

  const runningKm =
    Number(actualKm || 0);

  const runningHours =
    Number(actualHours || 0);

  const extraKm =
    Math.max(
      0,
      runningKm - pkg.km
    );

  const extraHours =
    Math.max(
      0,
      runningHours - pkg.hrs
    );

  const extraKmCharge =
    extraKm * pkg.extraKm;

  const extraHourCharge =
    extraHours * pkg.extraHr;

  const totalFare =
    pkg.fare +
    extraKmCharge +
    extraHourCharge;

  return {
    success: true,

    verified: true,

    vehicleName:
      pkg.vehicleName,

    packageType:
      pkg.packageType,

    includedKm:
      pkg.km,

    includedHours:
      pkg.hrs,

    packageFare:
      pkg.fare,

    extraKmRate:
      pkg.extraKm,

    extraHourRate:
      pkg.extraHr,

    actualKm:
      runningKm,

    actualHours:
      runningHours,

    extraKm,

    extraHours,

    extraKmCharge,

    extraHourCharge,

    totalFare,

    tollIncluded: false,

    parkingIncluded: false,

    note:
      "Local Rental fare is based on the selected verified RC Tours package. Extra KM and extra hours are charged separately when package limits are exceeded.",
  };
}