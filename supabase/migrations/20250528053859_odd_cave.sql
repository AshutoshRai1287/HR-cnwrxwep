/*
  # Create companies table

  1. New Tables
    - `companies`
      - `id` (uuid, primary key)
      - `name` (text, company name)
      - `address` (text)
      - `contact_number` (text)
      - `email` (text)
      - `website` (text)
      - `registration_number` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `companies` table
    - Add policies for authenticated users to:
      - Read all companies
      - Insert/update/delete their own companies
*/

CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  contact_number text,
  email text,
  website text,
  registration_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read companies"
  ON companies
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert companies"
  ON companies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update their companies"
  ON companies
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete their companies"
  ON companies
  FOR DELETE
  TO authenticated
  USING (true);