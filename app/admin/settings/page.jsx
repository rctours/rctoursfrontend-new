"use client";

import { useEffect, useState } from "react";

const defaultSettings = {
  companyName: "RC Tours & Travels",
  mobile: "",
  email: "",
  website: "",
  address: "",
  gstNumber: "",
  logo: "",
  invoicePrefix: "RC",
  invoiceFooter: "Thank you for choosing RC Tours & Travels.",
  terms: "",
  loyaltyPoints: 100,
  couponAmount: 300,
  driverAllowance: 500,
  whatsapp: "",
  facebook: "",
  instagram: "",
  youtube: "",
  metaTitle: "",
  metaDescription: "",
  analyticsId: "",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("/api/admin/settings", { cache: "no-store" });
      const data = await res.json();

      if (data.success) {
        setSettings({ ...defaultSettings, ...data.settings });
      } else {
        setMessage(data.message || "Failed to load settings.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setSettings((current) => ({ ...current, [name]: value }));
  }

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...settings,
          loyaltyPoints: Number(settings.loyaltyPoints || 0),
          couponAmount: Number(settings.couponAmount || 0),
          driverAllowance: Number(settings.driverAllowance || 0),
        }),
      });
      const data = await res.json();

      setMessage(data.message || (data.success ? "Settings saved successfully." : "Failed to save settings."));
    } catch (error) {
      console.error(error);
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-center font-semibold text-slate-500">Loading settings...</div>;
  }

  const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white";
  const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-400";

  return (
    <main className="min-h-screen space-y-6 bg-slate-50 p-4 md:p-8">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">Control Center</span>
        <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">⚙️ Business Settings</h1>
        <p className="mt-1 text-sm text-slate-400">Manage company, invoice, booking, social, and SEO settings.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {message && (
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">{message}</div>
        )}

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-100 pb-3 text-lg font-black text-slate-900">🏢 Company Information</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Company Name" name="companyName" value={settings.companyName} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Mobile Number" name="mobile" value={settings.mobile} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Email Address" name="email" type="email" value={settings.email} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Website URL" name="website" type="url" value={settings.website} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="GST Number" name="gstNumber" value={settings.gstNumber} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Logo URL" name="logo" type="url" value={settings.logo} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <TextArea label="Business Address" name="address" value={settings.address} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-100 pb-3 text-lg font-black text-slate-900">📄 Invoice Settings</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Invoice Prefix" name="invoicePrefix" value={settings.invoicePrefix} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <TextArea label="Invoice Footer" name="invoiceFooter" value={settings.invoiceFooter} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <TextArea label="Invoice Terms & Conditions" name="terms" value={settings.terms} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-100 pb-3 text-lg font-black text-slate-900">🚖 Booking & Rewards</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            <Field label="Loyalty Points per Trip" name="loyaltyPoints" type="number" value={settings.loyaltyPoints} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Coupon Amount (₹)" name="couponAmount" type="number" value={settings.couponAmount} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Driver Allowance (₹)" name="driverAllowance" type="number" value={settings.driverAllowance} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-100 pb-3 text-lg font-black text-slate-900">🌐 Social Links</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="WhatsApp Number / Link" name="whatsapp" value={settings.whatsapp} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Facebook URL" name="facebook" type="url" value={settings.facebook} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Instagram URL" name="instagram" type="url" value={settings.instagram} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="YouTube URL" name="youtube" type="url" value={settings.youtube} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="border-b border-slate-100 pb-3 text-lg font-black text-slate-900">🔎 SEO Settings</h2>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Default Meta Title" name="metaTitle" value={settings.metaTitle} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <Field label="Google Analytics ID" name="analyticsId" value={settings.analyticsId} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
            <TextArea label="Default Meta Description" name="metaDescription" value={settings.metaDescription} onChange={handleChange} inputClass={inputClass} labelClass={labelClass} />
          </div>
        </section>

        <div className="flex justify-end">
          <button disabled={saving} className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300">
            {saving ? "Saving Settings..." : "Save All Settings"}
          </button>
        </div>
      </form>
    </main>
  );
}

function Field({ label, name, value, onChange, type = "text", inputClass, labelClass }) {
  return (
    <div>
      <label className={labelClass} htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value ?? ""} onChange={onChange} className={inputClass} />
    </div>
  );
}

function TextArea({ label, name, value, onChange, inputClass, labelClass }) {
  return (
    <div className="md:col-span-2">
      <label className={labelClass} htmlFor={name}>{label}</label>
      <textarea id={name} name={name} rows={4} value={value ?? ""} onChange={onChange} className={inputClass} />
    </div>
  );
}
