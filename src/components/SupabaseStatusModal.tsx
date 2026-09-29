import React, { useState, useEffect } from 'react';
import { X, Database, CheckCircle2, Copy, Check, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_SETUP_SQL,
  checkSupabaseStatus
} from '../lib/supabase';

interface SupabaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseStatusModal: React.FC<SupabaseStatusModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<{ connected: boolean; tableReady: boolean; error?: string } | null>(null);

  const runCheck = async () => {
    setChecking(true);
    const res = await checkSupabaseStatus();
    setStatus(res);
    setChecking(false);
  };

  useEffect(() => {
    if (isOpen) {
      runCheck();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-auto bg-[#121212] border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">
                SUPABASE DATABASE INTEGRATION
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Appointments & Bookings Storage
            </h3>
          </div>
        </div>

        {/* Credentials / Status Card */}
        <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 space-y-3 text-xs font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
            <span className="text-neutral-400">Project ID:</span>
            <span className="text-amber-400 font-bold">{SUPABASE_PROJECT_ID}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
            <span className="text-neutral-400">Endpoint URL:</span>
            <span className="text-neutral-200 truncate max-w-sm">{SUPABASE_URL}</span>
          </div>
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-neutral-400">Database Table:</span>
            <div className="flex items-center gap-2">
              <code className="text-white bg-black/50 px-2 py-0.5 rounded">public.appointments</code>
              {checking ? (
                <RefreshCw className="w-3.5 h-3.5 text-neutral-400 animate-spin" />
              ) : status?.tableReady ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Setup SQL needed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Setup Instructions if table not created */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Supabase SQL Table Schema
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={runCheck}
                disabled={checking}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
                <span>Test Connection</span>
              </button>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied SQL!' : 'Copy SQL'}</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            In your{' '}
            <a
              href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Supabase SQL Editor</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            , paste and run this script once to create the <code className="text-white">appointments</code> table and grant public insert permissions:
          </p>

          <div className="relative rounded-xl bg-black border border-white/10 p-4 overflow-x-auto max-h-56">
            <pre className="text-[11px] font-mono text-neutral-300 leading-relaxed">
              {SUPABASE_SETUP_SQL}
            </pre>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10 text-xs">
          <span className="text-neutral-400">
            All submitted bookings are stored directly in your Supabase project.
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
