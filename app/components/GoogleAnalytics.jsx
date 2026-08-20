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
          // RC TOURS & TRAVELS - WHATSAPP CONVERSION
          // ==========================================

          window.rcTrackWhatsApp = function(source = 'website') {
            try {
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'whatsapp_click', {
                  event_category: 'engagement',
                  event_label: 'WhatsApp Enquiry',
                  source: source,
                  transport_type: 'beacon'
                });

                console.log(
                  'RC WhatsApp Conversion Sent to GA4:',
                  source
                );
              } else {
                console.warn(
                  'GA4 gtag is not ready yet.'
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
          // RC TOURS & TRAVELS - CUSTOM WHATSAPP EVENT
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

          console.log(
            'RC Tours & Travels GA4 tracking initialized'
          );
        `}
      </Script>
    </>
  );
}