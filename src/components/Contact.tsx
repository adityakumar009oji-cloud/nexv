import React, { useState } from 'react';
import { agencyConfig } from '../data/agencyConfig';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
  User,
  Calendar,
  Database,
  ShieldCheck,
  Check
} from 'lucide-react';
import { saveBookingAppointment, SaveBookingResult, SUPABASE_PROJECT_ID } from '../lib/supabase';
import { SupabaseStatusModal } from './SupabaseStatusModal';

interface ContactProps {
  initialService?: string;
  initialPackage?: string;
}

export const Contact: React.FC<ContactProps> = ({
  initialService = '',
  initialPackage = ''
}) => {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService || 'Website Development',
    budget: '₹15K–₹35K',
    preferred_date: tomorrow,
    preferred_time: 'Morning (10:00 AM – 01:00 PM)',
    appointment_type: 'Virtual Strategy Session (Google Meet)',
    details: initialPackage ? `Interested in the ${initialPackage} tier.` : ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingResult, setBookingResult] = useState<SaveBookingResult | null>(null);
  const [showSqlModal, setShowSqlModal] = useState(false);

  const servicesList = [
    'Website Development',
    'Branding & Graphic Design',
    'Social Media Management',
    'Video Editing & Motion Graphics',
    'Digital Marketing',
    'UI/UX Design',
    'SEO & Organic Growth',
    'AI-Powered Creative Solutions',
    'Full Scope / Other'
  ];

  const budgetOptions = [
    '₹5K–₹15K',
    '₹15K–₹20K',
    '₹20K–₹30K',
    '₹30K–₹75K',
    'Custom'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.details.trim()) {
      errs.details = 'Please briefly describe your project objectives.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await saveBookingAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        preferred_date: formData.preferred_date,
        preferred_time: formData.preferred_time,
        appointment_type: formData.appointment_type,
        details: formData.details
      });
      setBookingResult(result);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error saving appointment:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Website Development',
      budget: '₹15K–₹35K',
      preferred_date: tomorrow,
      preferred_time: 'Morning (10:00 AM – 01:00 PM)',
      appointment_type: 'Virtual Strategy Session (Google Meet)',
      details: ''
    });
    setIsSubmitted(false);
    setErrors({});
  };

  const whatsappMessage = `Hi NEXVANTA, I booked an appointment for ${formData.service} on ${formData.preferred_date} (${formData.preferred_time}). Name: ${formData.name}.`;
  const whatsappUrl = `https://wa.me/${agencyConfig.brand.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
      <section id="contact" className="relative py-28 bg-[#0E0E0E]/75 backdrop-blur-sm border-t border-white/5 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-medium font-mono">
                SUPABASE CONNECTED · BOOK APPOINTMENT
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              START YOUR PROJECT & BOOK A CALL
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              Choose your preferred appointment date and consultation slot. All appointment and project details are saved automatically into your Supabase database.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#121212] border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400">
                      <Database className="w-3.5 h-3.5" />
                      <span>SAVED TO SUPABASE DATABASE</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                      Appointment Booked!
                    </h3>
                    <p className="text-neutral-300 max-w-md mx-auto text-sm leading-relaxed">
                      Thanks <span className="font-semibold text-white">{formData.name}</span>! Your appointment details for <span className="text-amber-400 font-medium">{formData.service}</span> are recorded in our Supabase account.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 max-w-md mx-auto text-left text-xs font-mono space-y-2 text-neutral-300">
                    <div className="flex justify-between items-center"><span className="text-neutral-500">Service:</span> <span className="text-white font-medium">{formData.service}</span></div>
                    <div className="flex justify-between items-center"><span className="text-neutral-500">Scheduled Date:</span> <span className="text-white font-medium">{formData.preferred_date}</span></div>
                    <div className="flex justify-between items-center"><span className="text-neutral-500">Time Window:</span> <span className="text-white font-medium">{formData.preferred_time}</span></div>
                    <div className="flex justify-between items-center"><span className="text-neutral-500">Medium:</span> <span className="text-amber-300">{formData.appointment_type}</span></div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-2"><span className="text-neutral-500">Supabase Project:</span> <span className="text-emerald-400">{SUPABASE_PROJECT_ID}</span></div>
                  </div>

                  {bookingResult?.tableNeeded && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-md mx-auto text-xs text-amber-300 flex items-center justify-between text-left">
                      <span>Database table needs creation in your Supabase dashboard.</span>
                      <button
                        onClick={() => setShowSqlModal(true)}
                        className="underline text-amber-200 hover:text-white font-bold ml-2 whitespace-nowrap"
                      >
                        View SQL
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-full transition-all shadow-lg shadow-emerald-500/25"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Fast-Track on WhatsApp</span>
                    </a>

                    <button
                      onClick={resetForm}
                      className="w-full sm:w-auto px-6 py-3 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Your Name <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maya Chen"
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Work Email <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="maya@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 92794 95630"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Studio"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Appointment Schedule Box */}
                  <div className="p-4 rounded-2xl bg-neutral-900/80 border border-amber-500/25 space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-display">
                        Appointment Scheduling
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          min={tomorrow}
                          value={formData.preferred_date}
                          onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                          Time Window
                        </label>
                        <select
                          value={formData.preferred_time}
                          onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                        >
                          <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                          <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon (02:00 PM – 05:00 PM)</option>
                          <option value="Evening (06:00 PM – 08:00 PM)">Evening (06:00 PM – 08:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-1 font-mono">
                        Consultation Medium
                      </label>
                      <select
                        value={formData.appointment_type}
                        onChange={(e) => setFormData({ ...formData, appointment_type: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                      >
                        <option value="Virtual Strategy Session (Google Meet)">Virtual Strategy Session (Google Meet)</option>
                        <option value="Direct Phone Call">Direct Phone Call</option>
                        <option value="WhatsApp Audio / Chat Session">WhatsApp Audio / Chat Session</option>
                      </select>
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors cursor-pointer"
                    >
                      {servicesList.map((svc) => (
                        <option key={svc} value={svc} className="bg-neutral-900 text-white">
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Selection */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {budgetOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setFormData({ ...formData, budget: opt })}
                          className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                            formData.budget === opt
                              ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-sm'
                              : 'bg-neutral-900 text-neutral-400 border-white/5 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                      Project Details & Objectives <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Tell us about your brand goals, target timeline, and what success looks like for this project..."
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors resize-none ${
                        errors.details ? 'border-rose-500' : 'border-white/10'
                      }`}
                    />
                    {errors.details && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.details}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all duration-200 active:scale-95 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Database className="w-4 h-4 animate-spin text-black" />
                        Saving to Supabase Database...
                      </span>
                    ) : (
                      <>
                        <span>Book Appointment & Save to Supabase</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <div className="flex items-center gap-1 text-emerald-400/90 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Supabase Project {SUPABASE_PROJECT_ID}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSqlModal(true)}
                      className="text-neutral-400 hover:text-amber-400 underline transition-colors"
                    >
                      Database SQL Setup
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Direct Info Column */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Supabase Database Live Status Card */}
              <div className="p-6 rounded-3xl bg-neutral-900/60 border border-emerald-500/25 backdrop-blur-sm space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-semibold">
                        Database Connected
                      </div>
                      <div className="text-sm font-bold text-white font-display">
                        Supabase Account
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>

                <div className="text-xs text-neutral-400 leading-relaxed">
                  All appointment bookings submitted through this platform automatically persist directly into your Supabase database instance (<code className="text-amber-300 font-mono">{SUPABASE_PROJECT_ID}</code>).
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono">Table: public.appointments</span>
                  <button
                    onClick={() => setShowSqlModal(true)}
                    className="text-amber-400 hover:text-amber-300 font-medium underline transition-colors"
                  >
                    View SQL Schema
                  </button>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-900/40 border border-white/5 space-y-6">
                <h3 className="text-xl font-bold text-white font-display">
                  Direct Studio Contacts
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 uppercase tracking-wider block font-mono">
                        General Enquiries
                      </span>
                      <a
                        href={`mailto:${agencyConfig.brand.email}`}
                        className="text-sm font-medium text-white hover:text-amber-400 transition-colors"
                      >
                        {agencyConfig.brand.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 uppercase tracking-wider block font-mono">
                        Direct Studio Line
                      </span>
                      <a
                        href={`tel:${agencyConfig.brand.phone}`}
                        className="text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                      >
                        {agencyConfig.brand.displayPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 uppercase tracking-wider block font-mono">
                        Agency Founder
                      </span>
                      <span className="text-sm font-medium text-white">
                        Aditya Kumar
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 uppercase tracking-wider block font-mono">
                        Studio Location
                      </span>
                      <span className="text-sm font-medium text-white">
                        {agencyConfig.brand.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-neutral-400 uppercase tracking-wider block">
                        Operating Hours
                      </span>
                      <span className="text-sm font-medium text-white">
                        Monday – Friday: 09:00 – 19:00 IST
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Card */}
              <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                    Instant Messaging
                  </div>
                  <div className="text-xs text-neutral-300">
                    Need an immediate response? Chat directly with our founders on WhatsApp.
                  </div>
                </div>

                <a
                  href={`https://wa.me/${agencyConfig.brand.whatsappNumber}?text=${encodeURIComponent(agencyConfig.brand.whatsappDefaultMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      <SupabaseStatusModal
        isOpen={showSqlModal}
        onClose={() => setShowSqlModal(false)}
      />
    </>
  );
};
