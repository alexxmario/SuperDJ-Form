-- Super DJ Event Form Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DJs table (links to Supabase auth.users)
CREATE TABLE public.djs (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  access_token TEXT UNIQUE NOT NULL,
  dj_id UUID REFERENCES public.djs(id) ON DELETE SET NULL,
  client_name TEXT,
  event_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event Details (Step 1)
CREATE TABLE public.event_details (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE UNIQUE NOT NULL,
  client_name TEXT,
  email TEXT,
  phone TEXT,
  event_type TEXT,
  location TEXT,
  start_time TIME,
  end_time TIME,
  guest_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Musical Moments (Step 2)
CREATE TABLE public.musical_moments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  moment_name TEXT NOT NULL,
  song_title TEXT,
  artist TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Important Songs (Step 3)
CREATE TYPE song_type AS ENUM ('must_have', 'do_not_play');

CREATE TABLE public.important_songs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  song_title TEXT NOT NULL,
  artist TEXT,
  type song_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Genre Preferences (Step 4)
CREATE TABLE public.genre_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE UNIQUE NOT NULL,
  genres TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Observations (Step 5)
CREATE TABLE public.observations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE UNIQUE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_events_access_token ON public.events(access_token);
CREATE INDEX idx_events_dj_id ON public.events(dj_id);
CREATE INDEX idx_events_event_date ON public.events(event_date);
CREATE INDEX idx_musical_moments_event_id ON public.musical_moments(event_id);
CREATE INDEX idx_important_songs_event_id ON public.important_songs(event_id);

-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE public.djs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.musical_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.important_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.genre_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.observations ENABLE ROW LEVEL SECURITY;

-- DJs policies
CREATE POLICY "DJs can view their own profile" ON public.djs
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all DJs" ON public.djs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.djs WHERE id = auth.uid() AND is_admin = TRUE)
  );

CREATE POLICY "Admins can manage DJs" ON public.djs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.djs WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Events policies (public read with token, authenticated for DJ access)
CREATE POLICY "Anyone can view events by token" ON public.events
  FOR SELECT USING (TRUE);

CREATE POLICY "DJs can view their assigned events" ON public.events
  FOR SELECT USING (dj_id = auth.uid());

CREATE POLICY "Admins can manage all events" ON public.events
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.djs WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Event details policies
CREATE POLICY "Anyone can view event details by event" ON public.event_details
  FOR SELECT USING (TRUE);

CREATE POLICY "Anyone can upsert event details" ON public.event_details
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Anyone can update event details" ON public.event_details
  FOR UPDATE USING (TRUE);

-- Musical moments policies
CREATE POLICY "Anyone can view musical moments" ON public.musical_moments
  FOR SELECT USING (TRUE);

CREATE POLICY "Anyone can manage musical moments" ON public.musical_moments
  FOR ALL USING (TRUE);

-- Important songs policies
CREATE POLICY "Anyone can view important songs" ON public.important_songs
  FOR SELECT USING (TRUE);

CREATE POLICY "Anyone can manage important songs" ON public.important_songs
  FOR ALL USING (TRUE);

-- Genre preferences policies
CREATE POLICY "Anyone can view genre preferences" ON public.genre_preferences
  FOR SELECT USING (TRUE);

CREATE POLICY "Anyone can manage genre preferences" ON public.genre_preferences
  FOR ALL USING (TRUE);

-- Observations policies
CREATE POLICY "Anyone can view observations" ON public.observations
  FOR SELECT USING (TRUE);

CREATE POLICY "Anyone can manage observations" ON public.observations
  FOR ALL USING (TRUE);

-- Functions

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_event_details_updated_at
  BEFORE UPDATE ON public.event_details
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_genre_preferences_updated_at
  BEFORE UPDATE ON public.genre_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_observations_updated_at
  BEFORE UPDATE ON public.observations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to check if event is locked (7 days before)
CREATE OR REPLACE FUNCTION is_event_locked(event_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  event_date DATE;
BEGIN
  SELECT e.event_date INTO event_date FROM public.events e WHERE e.id = event_id;
  IF event_date IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN CURRENT_DATE >= (event_date - INTERVAL '7 days');
END;
$$ LANGUAGE plpgsql;
