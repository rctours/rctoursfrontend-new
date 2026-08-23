"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  const GA_ID = "G-360GSJG3HF";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            window.dataLayer.push(arguments);
          }

          window.gtag = gtag;

          gtag('js', new Date());

          gtag('config', '${GA_ID}');

          // ==========================================
          // RC TOURS & TRAVELS - WHATSAPP TRACKING
          // ==========================================

          window.rcTrackWhatsApp = function(source = 'website') {
            try {
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'whatsapp_click', {
                  event_category: 'engagement',
                  event_label: 'WhatsApp Enquiry',
                  source: source,
                  page_location: window.location.href,
                  transport_type: 'beacon'
                });

                console.log(
                  'RC WhatsApp Conversion Sent to GA4:',
                  source
                );
              }
            } catch (error) {
              console.error(
                'WhatsApp GA4 tracking error:',
                error
              );
            }
          };


          // ==========================================
          // RC TOURS & TRAVELS - WHATSAPP EVENT LISTENER
          // ==========================================

          window.addEventListener(
            'rc_whatsapp_conversion',
            function(event) {
              const source =
                event?.detail?.source || 'website';

              if (
                typeof window.rcTrackWhatsApp === 'function'
              ) {
                window.rcTrackWhatsApp(source);
              }
            }
          );


          // ==========================================
          // RC TOURS & TRAVELS - PHONE CALL TRACKING
          // Automatically tracks all tel: links
          // ==========================================

          document.addEventListener(
            'click',
            function(event) {
              const phoneLink =
                event.target.closest(
                  'a[href^="tel:"]'
                );

              if (!phoneLink) return;

              try {
                const phoneNumber =
                  phoneLink.getAttribute('href') || '';

                const buttonText =
                  phoneLink.innerText ||
                  phoneLink.textContent ||
                  'Call Now';

                if (typeof window.gtag === 'function') {
                  window.gtag(
                    'event',
                    'phone_call_click',
                    {
                      event_category: 'engagement',
                      event_label:
                        buttonText.trim(),
                      phone_number:
                        phoneNumber.replace(
                          'tel:',
                          ''
                        ),
                      page_location:
                        window.location.href,
                      transport_type:
                        'beacon'
                    }
                  );

                  console.log(
                    'RC Phone Call Conversion Sent to GA4:',
                    phoneNumber
                  );
                }
              } catch (error) {
                console.error(
                  'Phone call GA4 tracking error:',
                  error
                );
              }
            }
          );


          // ==========================================
          // RC TOURS & TRAVELS - BOOKING CONVERSION
          // ==========================================

          window.addEventListener(
            'rc_booking_conversion',
            function(event) {
              try {
                const booking =
                  event?.detail || {};

                const bookingId =
                  booking.bookingId || '';

                // Same booking conversion only once
                const storageKey =
                  'rc_booking_conversion_' +
                  bookingId;

                if (
                  bookingId &&
                  sessionStorage.getItem(
                    storageKey
                  )
                ) {
                  console.log(
                    'Booking conversion already tracked:',
                    bookingId
                  );

                  return;
                }

                if (
                  typeof window.gtag === 'function'
                ) {
                  window.gtag(
                    'event',
                    'purchase',
                    {
                      transaction_id:
                        bookingId,

                      value:
                        Number(
                          booking.totalFare
                        ) || 0,

                      currency:
                        'INR',

                      payment_type:
                        booking.paymentType ||
                        'unknown',

                      page_location:
                        window.location.href,

                      transport_type:
                        'beacon'
                    }
                  );

                  // Also send custom booking event
                  window.gtag(
                    'event',
                    'booking_completed',
                    {
                      booking_id:
                        bookingId,

                      total_fare:
                        Number(
                          booking.totalFare
                        ) || 0,

                      payment_type:
                        booking.paymentType ||
                        'unknown'
                    }
                  );

                  if (bookingId) {
                    sessionStorage.setItem(
                      storageKey,
                      'tracked'
                    );
                  }

                  console.log(
                    'RC Booking Conversion Sent to GA4:',
                    bookingId
                  );
                }
              } catch (error) {
                console.error(
                  'Booking GA4 tracking error:',
                  error
                );
              }
            }
          );


          console.log(
            'RC Tours & Travels GA4 tracking initialized'
          );
        `}
      </Script>
    </>
  );
}