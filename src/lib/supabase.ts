import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta as any).env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database types
export interface CreatorProfile {
  id: string;
  email: string;
  name: string;
  persona: 'Creator' | 'Visionary' | 'Protector' | 'Refugee';
  solution: string;
  barrier: 'Operational Drag' | 'Distribution Gap' | 'IP Vulnerability' | 'Other';
  ip_status: 'Formally Registered' | 'Documented Privately' | 'Undocumented' | 'Other';
  current_stage: number;
  completed_stages: number[];
  calendly_booked: boolean;
  calendly_event_id?: string;
  calendly_date?: string;
  created_at: string;
  updated_at: string;
  email_verified: boolean;
}

// Send magic link
export const sendMagicLink = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
  });
  return { data, error };
};

// Save creator profile
export const saveCreatorProfile = async (profile: Omit<CreatorProfile, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('creator_profiles')
    .upsert(
      {
        email: profile.email,
        name: profile.name,
        persona: profile.persona,
        solution: profile.solution,
        barrier: profile.barrier,
        ip_status: profile.ip_status,
        current_stage: profile.current_stage,
        completed_stages: profile.completed_stages,
        calendly_booked: profile.calendly_booked,
        email_verified: profile.email_verified,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    )
    .select();
  return { data, error };
};

// Get creator profile
export const getCreatorProfile = async (email: string) => {
  const { data, error } = await supabase
    .from('creator_profiles')
    .select('*')
    .eq('email', email)
    .single();
  return { data, error };
};

// Update Calendly booking
export const updateCalendlyBooking = async (email: string, eventId: string, eventDate: string) => {
  const { data, error } = await supabase
    .from('creator_profiles')
    .update({
      calendly_booked: true,
      calendly_event_id: eventId,
      calendly_date: eventDate,
      current_stage: 7, // Move to final stage
      updated_at: new Date().toISOString(),
    })
    .eq('email', email)
    .select();
  return { data, error };
};
