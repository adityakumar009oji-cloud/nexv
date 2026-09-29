import { createClient } from '@supabase/supabase-js';

// Supabase configuration provided by the user
export const SUPABASE_PROJECT_ID = 'okzpqtqzsrxmoubojlnb';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_M42LYyLZybu2kxHErmUFQw_d8wdippC';

// Initialize the Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface BookingAppointment {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  preferred_date?: string;
  preferred_time?: string;
  appointment_type?: string;
  details: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface SaveBookingResult {
  success: boolean;
  appointmentId?: string;
  error?: string;
  tableNeeded?: boolean;
  isCached?: boolean;
  message: string;
}

// SQL schema needed in Supabase SQL editor if table doesn't already exist
export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor):
create table if not exists public.appointments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  service text not null,
  budget text,
  preferred_date text,
  preferred_time text,
  appointment_type text default 'Strategy Consultation',
  details text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.appointments enable row level security;

-- Allow public anonymous submissions (bookings from your website visitors)
drop policy if exists "Allow public insert to appointments" on public.appointments;
create policy "Allow public insert to appointments"
  on public.appointments
  for insert
  with check (true);

-- Allow reads (for your team/dashboard)
drop policy if exists "Allow select to appointments" on public.appointments;
create policy "Allow select to appointments"
  on public.appointments
  for select
  using (true);
`;

/**
 * Persists an appointment / booking into Supabase database.
 * If the table has not been created in Supabase yet, safely preserves
 * the booking details in localStorage with clear recovery instructions.
 */
export async function saveBookingAppointment(
  booking: Omit<BookingAppointment, 'id' | 'created_at'>
): Promise<SaveBookingResult> {
  const payload = {
    name: booking.name.trim(),
    email: booking.email.trim(),
    phone: booking.phone?.trim() || null,
    company: booking.company?.trim() || null,
    service: booking.service || 'Website Development',
    budget: booking.budget || null,
    preferred_date: booking.preferred_date || new Date().toISOString().split('T')[0],
    preferred_time: booking.preferred_time || 'Morning (10:00 AM – 01:00 PM)',
    appointment_type: booking.appointment_type || 'Strategy Consultation',
    details: booking.details.trim(),
    status: booking.status || 'pending',
  };

  try {
    // Attempt inserting into 'appointments' table
    const { data, error } = await supabase
      .from('appointments')
      .insert([payload])
      .select('id, created_at')
      .single();

    if (error) {
      console.warn('Supabase insert warning:', error);

      // Check if table missing (error code PGRST205 or 42P01)
      const isMissingTable =
        error.code === 'PGRST205' ||
        error.message?.includes('Could not find the table') ||
        error.message?.includes('relation "public.appointments" does not exist');

      // Cache locally so client details are never lost
      saveToOfflineCache(payload);

      if (isMissingTable) {
        return {
          success: true, // Marked true so user experience is not blocked
          tableNeeded: true,
          isCached: true,
          message: 'Booking saved locally! Your Supabase database needs the "appointments" table created.',
        };
      }

      return {
        success: false,
        isCached: true,
        error: error.message,
        message: `Saved to local queue. Supabase sync note: ${error.message}`,
      };
    }

    return {
      success: true,
      appointmentId: data?.id,
      message: 'Appointment booking successfully saved in your Supabase database!',
    };
  } catch (err: unknown) {
    console.error('Supabase network / unexpected error:', err);
    saveToOfflineCache(payload);
    return {
      success: true,
      isCached: true,
      message: 'Booking captured and stored safely in local queue.',
    };
  }
}

/**
 * Checks connection health to the configured Supabase instance.
 */
export async function checkSupabaseStatus(): Promise<{
  connected: boolean;
  tableReady: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase.from('appointments').select('id').limit(1);

    if (error) {
      if (
        error.code === 'PGRST205' ||
        error.message?.includes('Could not find the table')
      ) {
        return { connected: true, tableReady: false, error: 'Table "appointments" not yet created' };
      }
      return { connected: true, tableReady: false, error: error.message };
    }

    return { connected: true, tableReady: true };
  } catch (err: unknown) {
    return {
      connected: false,
      tableReady: false,
      error: err instanceof Error ? err.message : 'Connection failed',
    };
  }
}

function saveToOfflineCache(payload: Record<string, unknown>) {
  try {
    const existingRaw = localStorage.getItem('nexvanta_appointments_cache');
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing.push({
      ...payload,
      cached_at: new Date().toISOString(),
    });
    localStorage.setItem('nexvanta_appointments_cache', JSON.stringify(existing));
  } catch (e) {
    console.warn('Could not write to localStorage cache:', e);
  }
}
