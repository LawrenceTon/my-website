-- Bountiful Journey Creator Profiles Table
CREATE TABLE creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  persona TEXT CHECK (persona IN ('Creator', 'Visionary', 'Protector', 'Refugee')),
  solution TEXT,
  barrier TEXT CHECK (barrier IN ('Operational Drag', 'Distribution Gap', 'IP Vulnerability', 'Other')),
  ip_status TEXT CHECK (ip_status IN ('Formally Registered', 'Documented Privately', 'Undocumented', 'Other')),
  current_stage INTEGER DEFAULT 1,
  completed_stages INTEGER[] DEFAULT ARRAY[]::INTEGER[],
  calendly_booked BOOLEAN DEFAULT FALSE,
  calendly_event_id TEXT,
  calendly_date TIMESTAMP,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own profiles
CREATE POLICY "Users can read their own profile"
  ON creator_profiles
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- Create policy for users to update their own profiles
CREATE POLICY "Users can update their own profile"
  ON creator_profiles
  FOR UPDATE
  USING (auth.jwt() ->> 'email' = email);

-- Create policy for users to insert their own profiles
CREATE POLICY "Users can insert their own profile"
  ON creator_profiles
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = email);

-- Create index for faster queries
CREATE INDEX idx_creator_profiles_email ON creator_profiles(email);
CREATE INDEX idx_creator_profiles_created_at ON creator_profiles(created_at);

-- Magic Links Table (for tracking recovery links)
CREATE TABLE magic_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_magic_links_token ON magic_links(token);
CREATE INDEX idx_magic_links_email ON magic_links(email);
