// ======================================================
// RC TOURS & TRAVELS - PUSH NOTIFICATION SERVICE WORKER
// ======================================================

// INSTALL SERVICE WORKER
self.addEventListener("install", () => {
  console.log("RC Tours Push Service Worker Installed");

  self.skipWaiting();
});

// ACTIVATE SERVICE WORKER
self.addEventListener("activate", (event) => {
  console.log("RC Tours Push Service Worker Activated");

  event.waitUntil(self.clients.claim());
});

// ======================================================
// RECEIVE PUSH NOTIFICATION
// ======================================================

self.addEventListener("push", (event) => {
  console.log("Push notification received");

  let data = {
    title: "RC Tours & Travels",
    body: "You have a new notification.",
    url: "/my-profile",
  };

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (error) {
    console.error("Push data error:", error);
  }

  const title =
    data.title || "RC Tours & Travels";

  const options = {
    body:
      data.body || "You have a new notification.",

    icon: "/web-app-manifest-192x192.png",

    badge: "/web-app-manifest-192x192.png",

    data: {
      url: data.url || "/my-profile",
    },

    vibrate: [200, 100, 200],

    tag: data.tag || "rc-tours-notification",

    renotify: true,
  };

  event.waitUntil(
    self.registration.showNotification(
      title,
      options
    )
  );
});

// ======================================================
// NOTIFICATION CLICK
// ======================================================

self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();

    const targetUrl =
      event.notification.data?.url ||
      "/my-profile";

    event.waitUntil(
      clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      }).then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
    );
  }
);