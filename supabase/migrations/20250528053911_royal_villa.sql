/*
  # Create attendance table

  1. New Tables
    - `attendance`
      - `id` (uuid, primary key)
      - `employee_id` (uuid, foreign key to employees)
      - `date` (date)
      - `check_in` (timestamp)
      - `check_out` (timestamp)
      - `status` (text: present, absent, half-day, leave)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `attendance` table
    - Add policies for authenticated users to manage attendance records
*/

CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  date date NOT NULL,
  check_in timestamptz,
  check_out timestamptz,
  status text DEFAULT 'present',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read attendance for their company's employees"
  ON attendance
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM employees
    JOIN companies ON companies.id = employees.company_id
    WHERE employees.id = attendance.employee_id
  ));

CREATE POLICY "Allow users to insert attendance for their company's employees"
  ON attendance
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM employees
    JOIN companies ON companies.id = employees.company_id
    WHERE employees.id = attendance.employee_id
  ));

CREATE POLICY "Allow users to update attendance for their company's employees"
  ON attendance
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM employees
    JOIN companies ON companies.id = employees.company_id
    WHERE employees.id = attendance.employee_id
  ));

CREATE POLICY "Allow users to delete attendance for their company's employees"
  ON attendance
  FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM employees
    JOIN companies ON companies.id = employees.company_id
    WHERE employees.id = attendance.employee_id
  ));

-- Create unique constraint to prevent multiple attendance records for the same employee on the same day
CREATE UNIQUE INDEX attendance_employee_date_idx ON attendance (employee_id, date);