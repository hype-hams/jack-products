-- CREATE DATABASE --
CREATE DATABASE products;

-- USE THE DATABASE --
\c products;

-- CREATE TABLES --
CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  slogan VARCHAR(255),
  description TEXT,
  category TEXT,
  default_price INT
);

CREATE TABLE IF NOT EXISTS feature (
  id SERIAL PRIMARY KEY,
  product_id INT,
  feature TEXT,
  value TEXT,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS related (
  id SERIAL PRIMARY KEY,
  product_id INT,
  related_id INT,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS style (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR(255),
  sale_price INT,
  original_price INT,
  default_style BOOLEAN,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL PRIMARY KEY,
  style_id INT,
  size TEXT,
  quantity INT,
  FOREIGN KEY (style_id) REFERENCES style(id)
);

CREATE TABLE IF NOT EXISTS photo (
  id SERIAL PRIMARY KEY,
  style_id INT,
  url text,
  thumbnail_url text,
  FOREIGN KEY (style_id) REFERENCES style(id)
);

-- copy CSV data into relevant tables--
COPY product (id, name, slogan, description, category, default_price)
FROM '/home/jackuzzi/hackreactor/jack-products/CSVs/product.csv' DELIMITER ',' CSV HEADER;

COPY feature (id, product_id, feature, value)
FROM '/home/jackuzzi/hackreactor/jack-products/CSVs/features.csv' DELIMITER ',' CSV HEADER;

COPY related (id, product_id, related_id)
FROM '/home/jackuzzi/hackreactor/jack-products/CSVs/related.csv' DELIMITER ',' CSV HEADER;

COPY style (id, product_id, name, sale_price, original_price, default_style)
FROM '/home/jackuzzi/hackreactor/jack-products/CSVs/styles.csv' DELIMITER ',' CSV HEADER NULL 'null';

COPY skus (id, style_id, size, quantity)
FROM '/home/jackuzzi/hackreactor/jack-products/CSVs/skus.csv' DELIMITER ',' CSV HEADER NULL 'null';

COPY public.photo (id, style_id, url, thumbnail_url)
FROM '/home/jackuzzi/hackreactor/jack-products/CSVs/photos.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8' QUOTE '"' NULL 'null' ESCAPE '''';

-- CREATE INDEXES for tables --
CREATE INDEX idx_product ON product(id, name, category);
CREATE INDEX idx_feature ON feature(id, product_id, feature, value);
CREATE INDEX idx_related ON related(id, product_id, related_id);
CREATE INDEX idx_photo_style_id ON photo(style_id);
CREATE INDEX idx_skus_style_id ON skus(style_id);
CREATE INDEX idx_style_product_id ON style(product_id);

-- ANALYZE TABLES --
ANALYZE product;
ANALYZE feature;
ANALYZE related;
ANALYZE style;
ANALYZE skus;
ANALYZE photo;
