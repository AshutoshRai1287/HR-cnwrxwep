/*
  # Create employees table

  1. New Tables
    - `employees`
      - `id` (uuid, primary key)
      - `company_id` (uuid, foreign key to companies)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `date_of_birth` (date)
      - `hire_date` (date)
      - `department` (text)
      - `position` (text)
      - `employment_status` (text)
      - `salary` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `employees` table
    - Add policies for authenticated users to manage their company's employees
*/

CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  date_of_birth date,
  hire_date date NOT NULL,
  department text,
  position text,
  employment_status text DEFAULT 'active',
  salary numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their company's employees"
  ON employees
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = employees.company_id
  ));

CREATE POLICY "Allow users to insert employees in their company"
  ON employees
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = employees.company_id
  ));

CREATE POLICY "Allow users to update their company's employees"
  ON employees
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = employees.company_id
  ));

CREATE POLICY "Allow users to delete their company's employees"
  ON employees
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM companies
    WHERE companies.id = employees.company_id
  ));