// ======================================================
// RC TOURS & TRAVELS
// VERIFIED ROAD DISTANCE HELPER
// ======================================================
//
// PURPOSE:
// Customer ke pickup aur destination ka road distance
// calculate karna.
//
// LOCATION SEARCH:
// OpenStreetMap Nominatim
//
// ROAD ROUTE:
// OSRM
//
// IMPORTANT:
// - Gemini / AI ko distance guess nahi karna hai.
// - Same naam ki multiple locations ho sakti hain.
// - First Nominatim result blindly select nahi karna hai.
// - City / Town ko administrative duplicates se preference milegi.
// - Agar location ya route verify nahi hota,
//   function success: false return karega.
// - Ye helper fare calculate nahi karta.
// - Ye sirf road distance provide karta hai.
//
// ======================================================


// ======================================================
// LOCATION TYPE PRIORITY
// ======================================================
//
// Lower number = higher preference.
//
// Example:
//
// Tuljapur search me:
// - Tuljapur, Dharashiv = town
// - Tuljapur, Amravati = city_district
//
// Isliye town ko city_district se preference milegi.
//
// ======================================================

const LOCATION_TYPE_PRIORITY = {
  city: 1,
  town: 2,
  municipality: 3,
  borough: 4,
  suburb: 5,
  village: 6,
  hamlet: 7,
  locality: 8,
  county: 9,
  state_district: 10,
  city_district: 11,
  administrative: 12,
};


// ======================================================
// GET LOCATION COORDINATES
// ======================================================

async function getCoordinates(address) {
  // ====================================================
  // VALIDATE ADDRESS
  // ====================================================

  if (
    !address ||
    !address.toString().trim()
  ) {
    return null;
  }

  const cleanAddress =
    address.toString().trim();


  // ====================================================
  // NOMINATIM SEARCH URL
  // ====================================================
  //
  // limit=10:
  // Same naam ki multiple locations mil sakti hain.
  //
  // addressdetails=1:
  // Location ka city/town/village/admin information
  // milta hai.
  //
  // countrycodes=in:
  // Search India tak limited rahega.
  //
  // ====================================================

  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(cleanAddress)}` +
    `&format=json` +
    `&limit=10` +
    `&countrycodes=in` +
    `&addressdetails=1`;


  // ====================================================
  // CALL NOMINATIM
  // ====================================================

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "RC-Tours-Travels-App/1.0",
    },

    cache: "no-store",
  });


  // ====================================================
  // CHECK HTTP RESPONSE
  // ====================================================

  if (!response.ok) {
    throw new Error(
      `Nominatim request failed with status ${response.status}`
    );
  }


  // ====================================================
  // READ SEARCH RESULTS
  // ====================================================

  const data =
    await response.json();


  // ====================================================
  // NO LOCATION FOUND
  // ====================================================

  if (
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return null;
  }


  // ====================================================
  // SCORE ALL LOCATION RESULTS
  // ====================================================

  const scoredResults =
    data.map((item, index) => {
      const addressType =
        (
          item.addresstype ||
          ""
        )
          .toString()
          .toLowerCase();

      const itemType =
        (
          item.type ||
          ""
        )
          .toString()
          .toLowerCase();

      // ------------------------------------------------
      // LOCATION PRIORITY
      // ------------------------------------------------

      const priority =
        LOCATION_TYPE_PRIORITY[
          addressType
        ] ??
        LOCATION_TYPE_PRIORITY[
          itemType
        ] ??
        50;


      // ------------------------------------------------
      // NOMINATIM IMPORTANCE
      // ------------------------------------------------

      const importance =
        Number(item.importance) || 0;


      // ------------------------------------------------
      // DISPLAY NAME
      // ------------------------------------------------

      const displayName =
        item.display_name || "";


      // ------------------------------------------------
      // RETURN SCORED RESULT
      // ------------------------------------------------

      return {
        item,

        originalIndex:
          index,

        priority,

        importance,

        displayName,
      };
    });


  // ====================================================
  // SORT LOCATION RESULTS
  // ====================================================
  //
  // Priority:
  //
  // 1. city
  // 2. town
  // 3. municipality
  // 4. borough
  // 5. suburb
  // 6. village
  // ...
  // administrative duplicates later
  //
  // Agar same type ke multiple results hain:
  // higher Nominatim importance ko preference.
  //
  // ====================================================

  scoredResults.sort(
    (a, b) => {
      // ------------------------------------------------
      // FIRST: LOCATION TYPE
      // ------------------------------------------------

      if (
        a.priority !==
        b.priority
      ) {
        return (
          a.priority -
          b.priority
        );
      }


      // ------------------------------------------------
      // SECOND: IMPORTANCE
      // ------------------------------------------------

      if (
        a.importance !==
        b.importance
      ) {
        return (
          b.importance -
          a.importance
        );
      }


      // ------------------------------------------------
      // THIRD: ORIGINAL NOMINATIM ORDER
      // ------------------------------------------------

      return (
        a.originalIndex -
        b.originalIndex
      );
    }
  );


  // ====================================================
  // SELECT BEST LOCATION
  // ====================================================

  const selected =
    scoredResults[0]?.item;


  if (!selected) {
    return null;
  }


  // ====================================================
  // COORDINATES
  // ====================================================

  const longitude =
    Number(selected.lon);

  const latitude =
    Number(selected.lat);


  if (
    !Number.isFinite(longitude) ||
    !Number.isFinite(latitude)
  ) {
    return null;
  }


  // ====================================================
  // LOCATION INFORMATION
  // ====================================================

  const resolvedLocation =
    selected.display_name ||
    cleanAddress;

  const locationType =
    selected.addresstype ||
    selected.type ||
    "unknown";


  // ====================================================
  // DEBUG
  // ====================================================

  console.log(
    "======================================"
  );

  console.log(
    "RC Location Input:",
    cleanAddress
  );

  console.log(
    "RC Location Selected:",
    resolvedLocation
  );

  console.log(
    "RC Location Type:",
    locationType
  );

  console.log(
    "RC Location Coordinates:",
    {
      longitude,
      latitude,
    }
  );

  console.log(
    "======================================"
  );


  // ====================================================
  // RETURN LOCATION OBJECT
  // ====================================================
  //
  // Pehle hum sirf:
  //
  // [longitude, latitude]
  //
  // return kar rahe the.
  //
  // Ab full resolved location bhi return karenge.
  //
  // ====================================================

  return {
    longitude,

    latitude,

    input:
      cleanAddress,

    resolvedLocation,

    locationType,

    importance:
      Number(selected.importance) ||
      0,
  };
}


// ======================================================
// GET VERIFIED ROAD DISTANCE
// ======================================================

export async function getRoadDistance({
  pickup,
  drop,
}) {
  try {
    // ==================================================
    // VALIDATE PICKUP + DROP
    // ==================================================

    if (
      !pickup ||
      !pickup.toString().trim() ||
      !drop ||
      !drop.toString().trim()
    ) {
      return {
        success: false,

        verified: false,

        message:
          "Pickup and destination are required.",
      };
    }


    // ==================================================
    // CLEAN LOCATION NAMES
    // ==================================================

    const cleanPickup =
      pickup.toString().trim();

    const cleanDrop =
      drop.toString().trim();


    // ==================================================
    // GET PICKUP LOCATION
    // ==================================================

    const pickupLocation =
      await getCoordinates(
        cleanPickup
      );


    // ==================================================
    // GET DROP LOCATION
    // ==================================================

    const dropLocation =
      await getCoordinates(
        cleanDrop
      );


    // ==================================================
    // CHECK LOCATIONS
    // ==================================================

    if (
      !pickupLocation ||
      !dropLocation
    ) {
      return {
        success: false,

        verified: false,

        pickup:
          cleanPickup,

        drop:
          cleanDrop,

        message:
          "Pickup or destination location could not be verified.",
      };
    }


    // ==================================================
    // OSRM ROAD ROUTE URL
    // ==================================================

    const routeUrl =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${pickupLocation.longitude},${pickupLocation.latitude};` +
      `${dropLocation.longitude},${dropLocation.latitude}` +
      `?overview=false`;


    // ==================================================
    // CALL OSRM
    // ==================================================

    const routeResponse =
      await fetch(
        routeUrl,
        {
          cache: "no-store",
        }
      );


    // ==================================================
    // CHECK OSRM HTTP RESPONSE
    // ==================================================

    if (!routeResponse.ok) {
      return {
        success: false,

        verified: false,

        pickup:
          cleanPickup,

        drop:
          cleanDrop,

        pickupResolved:
          pickupLocation.resolvedLocation,

        dropResolved:
          dropLocation.resolvedLocation,

        message:
          "Road route service is currently unavailable.",
      };
    }


    // ==================================================
    // READ OSRM RESPONSE
    // ==================================================

    const routeData =
      await routeResponse.json();


    // ==================================================
    // CHECK ROUTE
    // ==================================================

    if (
      routeData.code !== "Ok" ||
      !Array.isArray(
        routeData.routes
      ) ||
      routeData.routes.length === 0
    ) {
      return {
        success: false,

        verified: false,

        pickup:
          cleanPickup,

        drop:
          cleanDrop,

        pickupResolved:
          pickupLocation.resolvedLocation,

        dropResolved:
          dropLocation.resolvedLocation,

        message:
          "Road route could not be verified.",
      };
    }


    // ==================================================
    // GET DISTANCE IN METERS
    // ==================================================

    const rawDistanceMeters =
      Number(
        routeData.routes[0]
          .distance
      );


    // ==================================================
    // VALIDATE DISTANCE
    // ==================================================

    if (
      !Number.isFinite(
        rawDistanceMeters
      ) ||
      rawDistanceMeters <= 0
    ) {
      return {
        success: false,

        verified: false,

        pickup:
          cleanPickup,

        drop:
          cleanDrop,

        pickupResolved:
          pickupLocation.resolvedLocation,

        dropResolved:
          dropLocation.resolvedLocation,

        message:
          "Valid road distance was not returned.",
      };
    }


    // ==================================================
    // CONVERT METERS TO KM
    // ==================================================

    const distanceKm =
      Math.round(
        rawDistanceMeters /
          1000
      );


    // ==================================================
    // OPTIONAL ROUTE DURATION
    // ==================================================

    const rawDurationSeconds =
      Number(
        routeData.routes[0]
          .duration
      );

    const durationMinutes =
      Number.isFinite(
        rawDurationSeconds
      ) &&
      rawDurationSeconds > 0
        ? Math.round(
            rawDurationSeconds /
              60
          )
        : null;


    // ==================================================
    // DEBUG VERIFIED ROUTE
    // ==================================================

    console.log(
      "========== RC VERIFIED ROUTE =========="
    );

    console.log(
      "Pickup Input:",
      cleanPickup
    );

    console.log(
      "Pickup Resolved:",
      pickupLocation.resolvedLocation
    );

    console.log(
      "Drop Input:",
      cleanDrop
    );

    console.log(
      "Drop Resolved:",
      dropLocation.resolvedLocation
    );

    console.log(
      "Road Distance KM:",
      distanceKm
    );

    console.log(
      "======================================="
    );


    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    return {
      success: true,

      verified: true,

      // ------------------------------------------------
      // CUSTOMER INPUT
      // ------------------------------------------------

      pickup:
        cleanPickup,

      drop:
        cleanDrop,


      // ------------------------------------------------
      // RESOLVED LOCATIONS
      // ------------------------------------------------

      pickupResolved:
        pickupLocation.resolvedLocation,

      dropResolved:
        dropLocation.resolvedLocation,


      // ------------------------------------------------
      // LOCATION TYPES
      // ------------------------------------------------

      pickupLocationType:
        pickupLocation.locationType,

      dropLocationType:
        dropLocation.locationType,


      // ------------------------------------------------
      // COORDINATES
      // ------------------------------------------------

      pickupCoordinates: {
        longitude:
          pickupLocation.longitude,

        latitude:
          pickupLocation.latitude,
      },

      dropCoordinates: {
        longitude:
          dropLocation.longitude,

        latitude:
          dropLocation.latitude,
      },


      // ------------------------------------------------
      // VERIFIED ROAD DISTANCE
      // ------------------------------------------------

      distanceKm,


      // ------------------------------------------------
      // ROUTE DURATION
      // ------------------------------------------------

      durationMinutes,


      // ------------------------------------------------
      // SOURCE
      // ------------------------------------------------

      source:
        "OpenStreetMap Nominatim + OSRM",

      note:
        "Road distance is calculated from the resolved locations and routing service. Route distance and travel time may change because of road, traffic or routing conditions.",
    };
  } catch (error) {
    // ==================================================
    // ERROR
    // ==================================================

    console.error(
      "RC Distance Error:",
      error
    );

    return {
      success: false,

      verified: false,

      message:
        "Road distance could not be calculated at this time.",

      error:
        error instanceof Error
          ? error.message
          : "Unknown distance error",
    };
  }
}