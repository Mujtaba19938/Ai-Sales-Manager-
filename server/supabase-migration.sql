-- ============================================
-- Supabase Migration: AI Sales Calculator
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- 1. Categories Table
-- ============================================
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  color text default '#6366f1',
  type text default 'product' check (type in ('product', 'expense', 'both')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- 2. Products Table
-- ============================================
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  sku text unique,
  category_id uuid not null references categories(id) on delete restrict,
  default_price numeric not null check (default_price >= 0),
  default_cost numeric not null check (default_cost >= 0),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- 3. Sales Entries Table
-- ============================================
create table sales_entries (
  id uuid primary key default uuid_generate_v4(),
  date timestamptz not null,
  product_id uuid not null references products(id) on delete restrict,
  category_id uuid not null references categories(id) on delete restrict,
  quantity integer not null check (quantity >= 1),
  unit_price numeric not null check (unit_price >= 0),
  unit_cost numeric not null check (unit_cost >= 0),
  discount numeric default 0 check (discount >= 0),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_sales_date on sales_entries(date desc);
create index idx_sales_category_date on sales_entries(category_id, date desc);

-- ============================================
-- 4. Expense Entries Table
-- ============================================
create table expense_entries (
  id uuid primary key default uuid_generate_v4(),
  date timestamptz not null,
  category text not null check (category in ('rent', 'utilities', 'salaries', 'marketing', 'insurance', 'supplies', 'maintenance', 'software', 'travel', 'other')),
  description text not null,
  amount numeric not null check (amount >= 0.01),
  is_recurring boolean default false,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_expenses_date on expense_entries(date desc);
create index idx_expenses_category_date on expense_entries(category, date desc);

-- ============================================
-- 5. Dashboard Config Table
-- ============================================
create table dashboard_configs (
  id uuid primary key default uuid_generate_v4(),
  config_id text not null unique default 'default',
  layout jsonb default '{}',
  active_widgets text[] default '{}',
  theme jsonb default '{"mode": "light", "primaryColor": "#6366f1", "accentColor": "#f59e0b", "borderRadius": "0.5rem"}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- Auto-update updated_at trigger
-- ============================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger categories_updated_at before update on categories for each row execute function update_updated_at();
create trigger products_updated_at before update on products for each row execute function update_updated_at();
create trigger sales_entries_updated_at before update on sales_entries for each row execute function update_updated_at();
create trigger expense_entries_updated_at before update on expense_entries for each row execute function update_updated_at();
create trigger dashboard_configs_updated_at before update on dashboard_configs for each row execute function update_updated_at();
