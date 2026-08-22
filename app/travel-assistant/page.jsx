"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

import {
  ArrowLeft,
  Car,
  CheckCircle2,
  IndianRupee,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

// ======================================================
// RC TOURS & TRAVELS
// PREMIUM AI TRAVEL ASSISTANT
// ======================================================

export default function TravelAssistantPage() {
  // ====================================================
  // STATE
  // ====================================================

  const [message, setMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        role: "assistant",

        text:
          "Namaste! 👋\n\n" +
          "Main RC Tours & Travels ka AI Travel Assistant hoon.\n\n" +
          "Aap mujhse cab fare, outstation trips, vehicles, local rental aur travel planning ke baare me pooch sakte hain.",

        verified: true,
      },
    ]);

  // ====================================================
  // REFERENCES
  // ====================================================

  const messagesEndRef =
    useRef(null);

  const textareaRef =
    useRef(null);

  // ====================================================
  // QUICK QUESTIONS
  // ====================================================

  const quickQuestions = [
    {
      icon: IndianRupee,
      title: "Check Cab Fare",
      text:
        "Nagpur se Tuljapur 2 din round trip Ertiga ka fare batao",
    },

    {
      icon: Car,
      title: "Choose Vehicle",
      text:
        "Family trip ke liye kaunsi car achhi rahegi?",
    },

    {
      icon: Route,
      title: "Plan Outstation Trip",
      text:
        "Nagpur se Goa 4 din ka trip plan batao",
    },

    {
      icon: MapPin,
      title: "Local Sightseeing",
      text:
        "Nagpur me 1 day sightseeing plan batao",
    },
  ];

  // ====================================================
  // AUTO SCROLL
  // ====================================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, sending]);

  // ====================================================
  // AUTO RESIZE TEXTAREA
  // ====================================================

  useEffect(() => {
    const textarea =
      textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height =
      "auto";

    textarea.style.height =
      `${Math.min(
        textarea.scrollHeight,
        140
      )}px`;
  }, [message]);

  // ====================================================
  // SEND MESSAGE
  // ====================================================

  const sendMessage = async (
    customMessage = null
  ) => {
    const customerMessage = (
      customMessage || message
    ).trim();

    if (
      !customerMessage ||
      sending
    ) {
      return;
    }

    // --------------------------------------------------
    // ADD CUSTOMER MESSAGE
    // --------------------------------------------------

    setMessages((prev) => [
      ...prev,

      {
        role: "user",
        text: customerMessage,
      },
    ]);

    setMessage("");
    setSending(true);

    try {
      // ------------------------------------------------
      // CALL RC TRAVEL ASSISTANT API
      // ------------------------------------------------

      const response =
        await fetch(
          "/api/travel-assistant",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
            message:
            customerMessage,

            history:
            messages
            .filter(
            (item) =>
            item.role === "user" ||
            item.role === "assistant"
            )
            .slice(-10)
            .map((item) => ({
            role:
              item.role,

            text:
              item.text,

            // ================================================
            // VERIFIED ASSISTANT CONTEXT
            // ================================================
            //
          // Sirf API se aaye structured values forward
          // karenge. Backend next step me in values ko
          // validate karke use karega.
            //
          // User messages me normally ye null honge.
          //
          // ================================================

          verified:
            item.verified === true,

          fareVerified:
            item.fareVerified === true,

          distanceVerified:
            item.distanceVerified === true,

          trip:
            item.trip || null,

          distance:
            item.distance || null,

          pricing:
            item.pricing || null,
            })),
          }),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Travel Assistant request failed."
        );
      }

        // ------------------------------------------------
      // ADD ASSISTANT RESPONSE
      // ------------------------------------------------

      setMessages((prev) => [
        ...prev,

        {
  role: "assistant",

  text:
    data.reply,

  verified:
    data.verified ??
    data.verifiedBusinessRules ??
    true,

  fareVerified:
    data.fareVerified === true,

  distanceVerified:
    data.distanceVerified === true,

  // ================================================
  // VERIFIED CONVERSATION CONTEXT
  // ================================================
  //
  // API ne agar trip / distance / pricing verify
  // kiya hai to assistant message ke saath us
  // structured data ko bhi preserve karenge.
  //
  // Example:
  //
  // trip:
  // Nagpur -> Hyderabad
  // One Way
  // Ertiga
  //
  // distance:
  // 497 KM
  //
  // pricing:
  // baseFare = 12922
  //
  // Isse next customer follow-up me verified
  // information safely API ko wapas bheji ja sakegi.
  //
  // ================================================

  trip:
    data.trip || null,

  distance:
    data.distance || null,

  pricing:
    data.pricing || null,

  chatId:
    data.chatId,
},
      ]);
    } catch (error) {
      console.error(
        "Travel Assistant UI Error:",
        error
      );

      // ================================================
      // FRIENDLY FALLBACK RESPONSE
      // ================================================
      //
      // Agar AI API temporarily respond na kare,
      // network issue ho, ya question unclear ho,
      // customer ko technical error nahi dikhayenge.
      //
      // ================================================

      setMessages((prev) => [
        ...prev,

        {
          role: "assistant",

          text:
            "Main aapka question clearly samajh nahi paaya. 🙂\n\n" +
            "Aap thoda aur detail me bata sakte hain ki aapko kya chahiye?\n\n" +
            "Example:\n" +
            "• 5 logon ke liye kaunsi car best rahegi?\n" +
            "• Nagpur se Pune Dzire ka fare kitna hai?\n" +
            "• Nagpur local 8 hour Ertiga ka fare batao\n" +
            "• Nagpur se Tadoba 2 din ka trip plan batao\n\n" +
            "Agar aap chahein to RC Tours & Travels team se directly Call ya WhatsApp bhi kar sakte hain.",

          verified: false,

          // Is flag se message ke niche
          // Call + WhatsApp buttons show karenge.
          showContactActions: true,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  // ====================================================
  // ENTER KEY
  // ====================================================

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();
    }
  };

  // ====================================================
  // PAGE
  // ====================================================

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#071a4d] via-[#0b45c8] to-[#08a7d4] text-white pt-[92px] md:pt-[105px]">
        {/* Decorative Glow */}

        <div className="pointer-events-none absolute -top-24 right-[-80px] h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="pointer-events-none absolute left-[-120px] bottom-[-150px] h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 pb-8 md:px-6 md:pb-10">
          {/* Back */}

          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={17} />

            Back to Home
          </Link>

          {/* Hero Content */}

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              {/* RC TOURS AI LOGO */}

              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-white/30 bg-white shadow-xl md:h-16 md:w-16">
                <Image
                  src="/logo.webp"
                  alt="RC Tours & Travels"
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                  priority
                />
              </div>

              <div>
                {/* AI Badge */}

                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">
                  <Sparkles size={14} />

                  Smart Travel Help
                </div>

                <h1 className="text-2xl font-black tracking-tight md:text-4xl">
                  RC Travel Assistant
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 md:text-base">
                  Cab fares, vehicles,
                  outstation trips and
                  travel planning — ask
                  naturally in Hindi,
                  Hinglish or English.
                </p>
              </div>
            </div>


            {/* VERIFIED BUSINESS CARD */}

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-200">
                <ShieldCheck size={21} />
              </div>

              <div>
                <p className="text-xs font-bold text-white">
                  RC Business Information
                </p>

                <p className="mt-0.5 text-[11px] text-blue-100">
                  Verified rules used
                  where available
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          MAIN CHAT SECTION
      ================================================== */}

      <section className="relative z-10 mx-auto max-w-6xl px-3 pb-10 md:px-6">
        <div className="-mt-1 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] md:-mt-3 md:rounded-[30px]">
          {/* ==============================================
              CHAT TOP BAR
          ============================================== */}

          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
                <Image
                src="/logo.webp"
                alt="RC Tours & Travels AI Assistant"
                fill
                sizes="44px"
                className="object-contain p-1"
                />
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
              </div>

              <div>
                <p className="text-sm font-extrabold text-slate-900 md:text-base">
                  RC AI Assistant
                </p>

                <p className="text-[11px] font-medium text-emerald-600 md:text-xs">
                  ● Online • Ready to help
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:flex">
              <ShieldCheck size={14} />

              Safe Travel Guidance
            </div>
          </div>

          {/* ==============================================
              QUICK ACTIONS
          ============================================== */}

          <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-4 md:px-6">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles
                size={14}
                className="text-blue-600"
              />

              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                Try asking
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
              {quickQuestions.map(
                (item, index) => {
                  const Icon =
                    item.icon;

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={sending}
                      onClick={() =>
                        sendMessage(
                          item.text
                        )
                      }
                      className="group flex min-w-[190px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 md:min-w-0"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                        <Icon size={18} />
                      </div>

                      <span className="text-xs font-bold leading-4 text-slate-700">
                        {item.title}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* ==============================================
              MESSAGES
          ============================================== */}

          <div className="h-[430px] overflow-y-auto bg-gradient-to-b from-white to-slate-50/70 px-3 py-5 md:h-[500px] md:px-6 md:py-6">
            <div className="mx-auto max-w-4xl space-y-6">
              {messages.map(
                (item, index) => {
                  const isUser =
                    item.role ===
                    "user";

                  return (
                    <div
                      key={index}
                      className={`flex ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex max-w-[94%] items-start gap-2.5 md:max-w-[82%] md:gap-3 ${
                          isUser
                            ? "flex-row-reverse"
                            : ""
                        }`}
                      >
                        {/* AVATAR */}

                  {isUser ? (
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm md:h-10 md:w-10">
                  <User size={18} />
                  </div>
                  ) : (
                  <div className="relative mt-0.5 h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm md:h-10 md:w-10">
                  <Image
                  src="/logo.webp"
                  alt="RC Tours & Travels AI Assistant"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                  />
                  </div>
                  )}

                        <div
                          className={
                            isUser
                              ? "text-right"
                              : "text-left"
                          }
                        >
                          {/* NAME */}

                          <p
                            className={`mb-1.5 px-1 text-[11px] font-bold ${
                              isUser
                                ? "text-slate-500"
                                : "text-blue-700"
                            }`}
                          >
                            {isUser
                              ? "You"
                              : "RC Travel Assistant"}
                          </p>

                          {/* MESSAGE */}

                          <div
                            className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-left text-sm leading-6 shadow-sm md:px-5 md:py-4 md:text-[15px] ${
                              isUser
                                ? "rounded-tr-md bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                                : "rounded-tl-md border border-slate-200 bg-white text-slate-700"
                            }`}
                          >
                            {item.text}
                            </div>

                          {/* ==============================================
                          FALLBACK CONTACT ACTIONS
                          ============================================== */}

                          {!isUser &&
                          item.showContactActions === true && (
                          <div className="mt-3 flex flex-wrap gap-2 px-1">

                        {/* CALL NOW */}
                        <a
                        href="tel:+919172271464"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md md:text-sm"
                        >
                        <Phone size={16} />
                        Call Now
                        </a>

                        {/* WHATSAPP */}
                        <a
                        href="https://wa.me/919172271464?text=Hello%20RC%20Tours%20%26%20Travels%2C%20mujhe%20cab%20booking%20ke%20liye%20help%20chahiye."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md md:text-sm"
                        >
                        <FaWhatsapp size={18} />
                        WhatsApp
                        </a>

                        </div>
                        )}

                        {/* VERIFIED INFORMATION */}

                          {!isUser &&
                            item.verified ===
                              true && (
                              <div className="mt-2 flex flex-wrap items-center gap-2 px-1">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 md:text-[11px]">
                                  <CheckCircle2
                                    size={
                                      12
                                    }
                                  />

                                  RC information
                                </span>

                                {item.distanceVerified ===
                                  true && (
                                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                                    Distance
                                    verified
                                  </span>
                                )}

                                {item.fareVerified ===
                                  true && (
                                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                    Fare
                                    verified
                                  </span>
                                )}
                              </div>
                            )}

                          {!isUser &&
                          item.verified === false &&
                          item.showContactActions !== true && (
                          <p className="mt-2 px-1 text-[10px] font-semibold text-amber-600 md:text-[11px]">
                          Confirmation may be required before booking.
                          </p>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}

              {/* ==========================================
                  THINKING / LOADING
              ========================================== */}

              {sending && (
                <div className="flex justify-start">
                  <div className="flex max-w-[90%] items-start gap-2.5 md:gap-3">
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm md:h-10 md:w-10">
                  <Image
                  src="/logo.webp"
                  alt="RC Tours & Travels AI Assistant"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                  />
                  </div>

                    <div>
                      <p className="mb-1.5 px-1 text-[11px] font-bold text-blue-700">
                        RC Travel
                        Assistant
                      </p>

                      <div className="flex items-center gap-3 rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <Loader2
                          size={17}
                          className="animate-spin text-blue-600"
                        />

                        <span className="text-sm font-medium text-slate-500">
                          Checking
                          your trip...
                        </span>

                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />

                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 [animation-delay:150ms]" />

                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 [animation-delay:300ms]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div
                ref={
                  messagesEndRef
                }
              />
            </div>
          </div>

          {/* ==============================================
              MESSAGE COMPOSER
          ============================================== */}

          <div className="border-t border-slate-200 bg-white px-3 py-3 md:px-6 md:py-5">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-end gap-2 rounded-[22px] border border-slate-300 bg-white p-2 shadow-[0_5px_25px_rgba(15,23,42,0.08)] transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 md:gap-3 md:p-2.5">
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:flex">
                  <MessageCircle
                    size={19}
                  />
                </div>

                <textarea
                  ref={
                    textareaRef
                  }
                  value={message}
                  onChange={(
                    event
                  ) =>
                    setMessage(
                      event.target
                        .value
                    )
                  }
                  onKeyDown={
                    handleKeyDown
                  }
                  rows={1}
                  disabled={sending}
                  placeholder="Ask about your trip... e.g. Nagpur se Shirdi 2 din round trip"
                  className="max-h-[140px] min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed md:text-[15px]"
                />

                <button
                  type="button"
                  disabled={
                    sending ||
                    !message.trim()
                  }
                  onClick={() =>
                    sendMessage()
                  }
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md transition hover:scale-[1.03] hover:shadow-lg disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none md:h-12 md:w-12"
                >
                  {sending ? (
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                  ) : (
                    <Send
                      size={20}
                    />
                  )}
                </button>
              </div>

              {/* FOOT NOTE */}

              <div className="mt-3 flex flex-col items-center justify-between gap-2 px-1 text-center sm:flex-row sm:text-left">
                <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 md:text-[11px]">
                  <ShieldCheck
                    size={12}
                  />

                  RC Tours business
                  rules are used for
                  verified information.
                </p>

                <p className="text-[10px] font-medium text-slate-400 md:text-[11px]">
                  Enter to send •
                  Shift + Enter for
                  new line
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            BOTTOM INFORMATION
        ================================================== */}

        <div className="mt-5 flex justify-center">
          <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
            <p className="text-[11px] leading-5 text-slate-500 md:text-xs">
              AI travel guidance may
              be approximate. Final
              fare, route, applicable
              charges and vehicle
              availability should be
              confirmed during the
              booking process.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}