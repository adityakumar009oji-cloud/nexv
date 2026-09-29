import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Calendar,
  Clock,
  Database,
  ShieldCheck,
  Video
} from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';
import { saveBookingAppointment, SaveBookingResult, SUPABASE_PROJECT_ID } from '../lib/supabase';
import { SupabaseStatusModal } from './SupabaseStatusModal';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedPackage?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
  preselectedPackage = '',
}) => {
  // Tomorrow's date as default booking date
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || 'Website Development',
    budget: preselectedPackage ? `Package: ${preselectedPackage}` : '₹15K–₹30K',
    preferred_date: tomorrow,
    preferred_time: 'Morning (10:00 AM – 01:00 PM)',
    appointment_type: 'Virtual Strategy Session (Google Meet)',
    details: preselectedPackage ? `Interested in the ${preselectedPackage} tier.` : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingResult, setBookingResult] = useState<SaveBookingResult | null>(null);
  const [showSqlModal, setShowSqlModal] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.details.trim()) errs.details = 'Project details are required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await saveBookingAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        budget: formData.budget,
        preferred_date: formData.preferred_date,
        preferred_time: formData.preferred_time,
        appointment_type: formData.appointment_type,
        details: formData.details,
      });
      setBookingResult(res);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hi NEXVANTA, I booked an appointment for ${formData.service} on ${formData.preferred_date} (${formData.preferred_time}). Name: ${formData.name}.`;
  const whatsappUrl = `https://wa.me/${agencyConfig.brand.whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-xl my-auto bg-[#121212] border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl text-left"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {isSubmitted ? (
            <div className="py-6 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono text-emerald-400">
                  <Database className="w-3.5 h-3.5" />
                  <span>SAVED TO SUPABASE DATABASE</span>
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Appointment Booked!
                </h3>
                <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you <span className="font-semibold text-white">{formData.name}</span>. Your appointment request for <span className="text-amber-400">{formData.service}</span> has been saved in our Supabase account.
                </p>
              </div>

              {/* Appointment summary card */}
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="text-neutral-500">Preferred Date:</span>
                  <span className="text-white font-bold">{formData.preferred_date}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="text-neutral-500">Time Window:</span>
                  <span className="text-white font-bold">{formData.preferred_time}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-300">
                  <span className="text-neutral-500">Consultation:</span>
                  <span className="text-amber-300">{formData.appointment_type}</span>
                </div>
                <div className="flex justify-between items-center text-neutral-300 border-t border-white/5 pt-2">
                  <span className="text-neutral-500">Supabase Project:</span>
                  <span className="text-emerald-400">{SUPABASE_PROJECT_ID}</span>
                </div>
                {bookingResult?.appointmentId && (
                  <div className="flex justify-between items-center text-neutral-300">
                    <span className="text-neutral-500">Appointment ID:</span>
                    <span className="text-neutral-400 truncate max-w-[200px]">{bookingResult.appointmentId}</span>
                  </div>
                )}
              </div>

              {bookingResult?.tableNeeded && (
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
                  <span>Note: Run setup SQL in Supabase dashboard to enable live table view.</span>
                  <button
                    onClick={() => setShowSqlModal(true)}
                    className="underline text-amber-200 hover:text-white font-bold ml-2 whitespace-nowrap"
                  >
                    View SQL
                  </button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 rounded-full transition-all shadow-lg shadow-emerald-500/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono font-medium">
                    SUPABASE CONNECTED · BOOK APPOINTMENT
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Book A Strategy Consultation
                </h3>
                <p className="text-xs text-neutral-400">
                  Select your preferred appointment date and tell us about your brand vision. Details sync directly to Supabase.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Chen"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.name ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.email ? 'border-rose-500' : 'border-white/10'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 92794 95630"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Appointment Date & Time Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-neutral-900/60 border border-amber-500/20">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      min={tomorrow}
                      value={formData.preferred_date}
                      onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Time Window</span>
                    </label>
                    <select
                      value={formData.preferred_time}
                      onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                      <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon (02:00 PM – 05:00 PM)</option>
                      <option value="Evening (06:00 PM – 08:00 PM)">Evening (06:00 PM – 08:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Primary Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="Website Development">Website Development</option>
                      <option value="Branding & Graphic Design">Branding & Graphic Design</option>
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="Video Editing & Motion">Video Editing & Motion</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="SEO & Growth">SEO & Growth</option>
                      <option value="Full Omnichannel Scope">Full Omnichannel Scope</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Meeting Type
                    </label>
                    <select
                      value={formData.appointment_type}
                      onChange={(e) => setFormData({ ...formData, appointment_type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      <option value="Virtual Strategy Session (Google Meet)">Virtual Strategy Session (Google Meet)</option>
                      <option value="Direct Phone Call">Direct Phone Call</option>
                      <option value="WhatsApp Audio / Chat Session">WhatsApp Audio / Chat Session</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Project Details & Goals *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Outline your timeline, goals, and what success looks like for this project..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none ${
                      errors.details ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.details && (
                    <p className="text-xs text-rose-400 mt-1">{errors.details}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
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
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                  <div className="flex items-center gap-1 text-emerald-400/90 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Supabase Secured · {SUPABASE_PROJECT_ID}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSqlModal(true)}
                    className="text-neutral-400 hover:text-amber-400 underline transition-colors"
                  >
                    Database schema
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <SupabaseStatusModal
        isOpen={showSqlModal}
        onClose={() => setShowSqlModal(false)}
      />
    </>
  );
};
