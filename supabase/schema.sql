-- ============================================================
-- ETAL WEBSITE — Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE file_type AS ENUM (
  'datasheet', 'manual', 'certificate', 'drawing', 'catalog', 'other'
);

CREATE TYPE content_type AS ENUM ('text', 'html', 'image_url', 'json');

CREATE TYPE contact_status AS ENUM ('unread', 'read', 'replied', 'archived');

-- ============================================================
-- PRODUCT CATEGORIES
-- ============================================================

CREATE TABLE product_categories (
  id          UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(150) NOT NULL,
  slug        VARCHAR(160) NOT NULL UNIQUE,
  description TEXT,
  image_url   TEXT,
  icon_url    TEXT,
  sort_order  INTEGER      NOT NULL DEFAULT 0,
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PRODUCTS
-- ============================================================

CREATE TABLE products (
  id               UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id      UUID          NOT NULL REFERENCES product_categories(id) ON DELETE RESTRICT,
  name             VARCHAR(255)  NOT NULL,
  slug             VARCHAR(270)  NOT NULL UNIQUE,
  short_desc       VARCHAR(500),
  description      TEXT          NOT NULL DEFAULT '',
  primary_image    TEXT,
  image_gallery    TEXT[]        NOT NULL DEFAULT '{}',
  features         TEXT[]        NOT NULL DEFAULT '{}',
  datasheet_url    TEXT,
  certifications   TEXT[]        NOT NULL DEFAULT '{}',
  standards        TEXT[]        NOT NULL DEFAULT '{}',
  is_active        BOOLEAN       NOT NULL DEFAULT TRUE,
  is_featured      BOOLEAN       NOT NULL DEFAULT FALSE,
  sort_order       INTEGER       NOT NULL DEFAULT 0,
  meta_title       VARCHAR(160),
  meta_description VARCHAR(320),
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_fts ON products
  USING gin(to_tsvector('english', name || ' ' || COALESCE(short_desc, '') || ' ' || COALESCE(description, '')));
CREATE INDEX idx_products_category  ON products(category_id);
CREATE INDEX idx_products_active    ON products(is_active);
CREATE INDEX idx_products_featured  ON products(is_featured);
CREATE INDEX idx_products_slug      ON products(slug);

-- ============================================================
-- PRODUCT SPECS
-- ============================================================

CREATE TABLE product_specs (
  id           UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id   UUID         NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  spec_group   VARCHAR(100),
  spec_key     VARCHAR(150) NOT NULL,
  spec_value   VARCHAR(500) NOT NULL,
  spec_unit    VARCHAR(50),
  sort_order   INTEGER      NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_specs_product ON product_specs(product_id);

-- ============================================================
-- SECTORS
-- ============================================================

CREATE TABLE sectors (
  id               UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             VARCHAR(150) NOT NULL,
  slug             VARCHAR(160) NOT NULL UNIQUE,
  description      TEXT,
  body             TEXT,
  image_url        TEXT,
  icon_url         TEXT,
  sort_order       INTEGER      NOT NULL DEFAULT 0,
  is_active        BOOLEAN      NOT NULL DEFAULT TRUE,
  meta_title       VARCHAR(160),
  meta_description VARCHAR(320),
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PRODUCT ↔ SECTOR (Many-to-Many)
-- ============================================================

CREATE TABLE product_sectors (
  product_id UUID NOT NULL REFERENCES products(id)  ON DELETE CASCADE,
  sector_id  UUID NOT NULL REFERENCES sectors(id)   ON DELETE CASCADE,
  PRIMARY KEY (product_id, sector_id)
);

CREATE INDEX idx_product_sectors_sector ON product_sectors(sector_id);

-- ============================================================
-- DOWNLOAD CATEGORIES
-- ============================================================

CREATE TABLE download_categories (
  id          UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(150) NOT NULL,
  slug        VARCHAR(160) NOT NULL UNIQUE,
  description TEXT,
  sort_order  INTEGER      NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DOWNLOADS
-- ============================================================

CREATE TABLE downloads (
  id               UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            VARCHAR(255)  NOT NULL,
  description      TEXT,
  category_id      UUID          REFERENCES download_categories(id) ON DELETE SET NULL,
  product_id       UUID          REFERENCES products(id) ON DELETE SET NULL,
  file_type        file_type     NOT NULL DEFAULT 'datasheet',
  file_url         TEXT          NOT NULL,
  file_name        VARCHAR(255)  NOT NULL,
  file_size_bytes  BIGINT,
  mime_type        VARCHAR(100),
  is_public        BOOLEAN       NOT NULL DEFAULT TRUE,
  download_count   INTEGER       NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_downloads_product  ON downloads(product_id);
CREATE INDEX idx_downloads_category ON downloads(category_id);
CREATE INDEX idx_downloads_type     ON downloads(file_type);
CREATE INDEX idx_downloads_public   ON downloads(is_public);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================

CREATE TABLE contact_messages (
  id         UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       VARCHAR(200)   NOT NULL,
  email      VARCHAR(255)   NOT NULL,
  company    VARCHAR(200),
  phone      VARCHAR(50),
  country    VARCHAR(100),
  subject    VARCHAR(255)   NOT NULL,
  message    TEXT           NOT NULL,
  product_id UUID           REFERENCES products(id) ON DELETE SET NULL,
  status     contact_status NOT NULL DEFAULT 'unread',
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contacts_status  ON contact_messages(status);
CREATE INDEX idx_contacts_email   ON contact_messages(email);
CREATE INDEX idx_contacts_created ON contact_messages(created_at DESC);

-- ============================================================
-- SITE CONTENT (CMS)
-- ============================================================

CREATE TABLE site_content (
  id         UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
  section    VARCHAR(100) NOT NULL,
  key        VARCHAR(150) NOT NULL,
  value      TEXT,
  type       content_type NOT NULL DEFAULT 'text',
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  UNIQUE(section, key)
);

CREATE INDEX idx_content_section ON site_content(section);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_product_categories_updated_at
  BEFORE UPDATE ON product_categories FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_sectors_updated_at
  BEFORE UPDATE ON sectors FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_download_categories_updated_at
  BEFORE UPDATE ON download_categories FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_downloads_updated_at
  BEFORE UPDATE ON downloads FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_site_content_updated_at
  BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products           ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specs      ENABLE ROW LEVEL SECURITY;
ALTER TABLE sectors            ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sectors    ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads          ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages   ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content       ENABLE ROW LEVEL SECURITY;

-- Public read policies (anon can read active records)
CREATE POLICY "Public read categories"    ON product_categories   FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read products"      ON products             FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read specs"         ON product_specs        FOR SELECT USING (TRUE);
CREATE POLICY "Public read sectors"       ON sectors              FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public read product_sectors" ON product_sectors    FOR SELECT USING (TRUE);
CREATE POLICY "Public read dl_categories" ON download_categories  FOR SELECT USING (TRUE);
CREATE POLICY "Public read downloads"     ON downloads            FOR SELECT USING (is_public = TRUE);
CREATE POLICY "Public read site_content"  ON site_content         FOR SELECT USING (TRUE);

-- Anyone can submit contact
CREATE POLICY "Public insert contact"     ON contact_messages     FOR INSERT WITH CHECK (TRUE);

-- Authenticated (admin) can do everything
CREATE POLICY "Admin all categories"    ON product_categories   FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all products"      ON products             FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all specs"         ON product_specs        FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all sectors"       ON sectors              FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all dl_categories" ON download_categories  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all downloads"     ON downloads            FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all contacts"      ON contact_messages     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all content"       ON site_content         FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS (run separately or via Supabase UI)
-- ============================================================
-- insert into storage.buckets (id, name, public) values ('products', 'products', true);
-- insert into storage.buckets (id, name, public) values ('downloads', 'downloads', true);
-- insert into storage.buckets (id, name, public) values ('sectors', 'sectors', true);

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO product_categories (name, slug, description, sort_order) VALUES
  ('Current Transformers',       'current-transformers',      'Precision measurement and protection current transformers for LV/MV applications', 1),
  ('HRC Fuse Links',             'hrc-fuse-links',            'High Rupturing Capacity fuse links for industrial circuit protection',             2),
  ('Fuse Switch Disconnectors',  'fuse-switch-disconnectors', 'Combined fuse and switch disconnectors for safe circuit isolation',                3),
  ('Busbar Supports',            'busbar-supports',           'Insulated supports and clamps for LV busbar systems',                              4);

INSERT INTO download_categories (name, slug, sort_order) VALUES
  ('Datasheets',   'datasheets',   1),
  ('Catalogs',     'catalogs',     2),
  ('Certificates', 'certificates', 3),
  ('Drawings',     'drawings',     4),
  ('Manuals',      'manuals',      5);

INSERT INTO sectors (name, slug, description, sort_order) VALUES
  ('Power Distribution', 'power-distribution', 'Electrical protection for LV/MV power distribution networks', 1),
  ('Industrial',         'industrial',         'Heavy-duty protection for manufacturing and process plants',    2),
  ('Renewable Energy',   'renewable-energy',   'Solutions for solar, wind and energy storage systems',         3),
  ('Rail & Transport',   'rail-transport',     'Certified protection for rail and transit infrastructure',      4),
  ('Data Centres',       'data-centres',       'High-reliability solutions for critical IT infrastructure',     5),
  ('Oil & Gas',          'oil-gas',            'Robust protection for hazardous energy sector environments',    6);

INSERT INTO site_content (section, key, value, type) VALUES
  ('hero', 'headline',     'Silent Guardians',                                                        'text'),
  ('hero', 'subheadline',  'Engineering precision protection for every point on the LV loop',         'text'),
  ('hero', 'cta_primary',  'Explore Products',                                                        'text'),
  ('hero', 'cta_secondary','Request a Quote',                                                         'text'),
  ('about', 'headline',    'Built to Industrial Standard',                                            'text'),
  ('about', 'founded',     '2007',                                                                    'text'),
  ('about', 'factory_size','4,000m²',                                                                 'text'),
  ('about', 'location',    'Fayoum, Egypt',                                                           'text'),
  ('about', 'body',        'ETAL has been engineering electrical protection components since 2007, manufacturing from a 4,000m² facility in Fayoum, Egypt. Every product is manufactured to international standards including IEC, BS EN, and certified by SASO.', 'text'),
  ('footer', 'tagline',    'Electrical Protection. Engineered Right.',                                'text'),
  ('footer', 'address',    'Fayoum, Egypt',                                                           'text'),
  ('footer', 'email',      'info@etal.com',                                                           'text'),
  ('footer', 'phone',      '+20 xxx xxx xxxx',                                                        'text');

-- Sample product
INSERT INTO products (category_id, name, slug, short_desc, description, features, certifications, standards, is_featured, sort_order)
SELECT
  c.id,
  'ECT-3.5 Current Transformer',
  'ect-3-5-current-transformer',
  'Measurement-class current transformer for LV panel metering applications up to 3.5kV',
  'The ECT-3.5 is a precision-wound, resin-encapsulated current transformer designed for accurate measurement in low voltage distribution systems. Manufactured at our ISO-certified Fayoum facility, it meets IEC 60044-1 Class 0.5 accuracy requirements and is suitable for installation in LV panels, distribution boards, and metering cabinets.',
  ARRAY[
    'Class 0.5 measurement accuracy',
    'Rated primary current: 5A – 3000A',
    'Frequency: 50/60 Hz',
    'Resin-encapsulated for moisture and vibration resistance',
    'Suitable for DIN rail and panel mounting',
    'Thermal rating: continuous at 1.2× rated current'
  ],
  ARRAY['IEC 60044-1', 'BS 7626'],
  ARRAY['Class 0.5', 'Class 1'],
  TRUE,
  1
FROM product_categories c WHERE c.slug = 'current-transformers';

INSERT INTO product_specs (product_id, spec_group, spec_key, spec_value, spec_unit, sort_order)
SELECT
  p.id,
  grp,
  key,
  val,
  unit,
  ord
FROM products p,
(VALUES
  ('Electrical', 'Primary Current Range', '5 – 3000', 'A', 1),
  ('Electrical', 'Secondary Current',     '5',        'A', 2),
  ('Electrical', 'Accuracy Class',        '0.5 / 1',  '',  3),
  ('Electrical', 'Burden',                '5 – 30',   'VA', 4),
  ('Electrical', 'Frequency',             '50 / 60',  'Hz', 5),
  ('Mechanical', 'Insulation Voltage',    '0.72',     'kV', 6),
  ('Mechanical', 'Impulse Voltage',       '3.5',      'kV', 7),
  ('Mechanical', 'Encapsulation',         'Resin',    '',   8),
  ('Mechanical', 'Operating Temperature', '-10 to +50','°C', 9),
  ('Mechanical', 'Mounting',              'DIN rail / Panel', '', 10)
) AS specs(grp, key, val, unit, ord)
WHERE p.slug = 'ect-3-5-current-transformer';
