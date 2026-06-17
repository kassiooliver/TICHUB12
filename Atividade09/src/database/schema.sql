CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  username VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER'
);

CREATE TABLE IF NOT EXISTS cart_items (
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (user_id, product_id)
);

INSERT INTO users (id, username, email, password_hash, role)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'admin', 'admin@email.com', 'atividade09-admin:6478293187efd3ae21056df6fcc04e4d44a27369adf92d20626da3586c9dcbbb4a94016705bad19d7aac786f515d510b526cba173a1dfff8cdd6c21ad1fd6b0a', 'ADMIN'),
  ('00000000-0000-0000-0000-000000000002', 'cliente', 'cliente@email.com', 'atividade09-customer:0e1569ee31631daf3669b1c4942b4e5327a8a601ab53bc5d6f8f2a0baf1232f4f8132166feea88bdc8298f50d81c04ad58a6d7933599f81506c6d5ceb5ba8151', 'CUSTOMER')
ON CONFLICT (email) DO NOTHING;

INSERT INTO categories (id, name)
VALUES ('10000000-0000-4000-8000-000000000001', 'Eletronicos')
ON CONFLICT (id) DO NOTHING;

WITH duplicated_base_products AS (
  SELECT
    id,
    ROW_NUMBER() OVER (
      PARTITION BY LOWER(TRIM(name))
      ORDER BY
        CASE
          WHEN id IN (
            '20000000-0000-4000-8000-000000000001',
            '20000000-0000-4000-8000-000000000002',
            '20000000-0000-4000-8000-000000000003'
          ) THEN 1
          ELSE 0
        END,
        id
    ) AS position
  FROM products
  WHERE LOWER(TRIM(name)) IN ('smartphone', 'notebook', 'tablet')
)
DELETE FROM products
WHERE id IN (
  SELECT id
  FROM duplicated_base_products
  WHERE position > 1
);

CREATE UNIQUE INDEX IF NOT EXISTS products_normalized_name_idx
ON products (LOWER(TRIM(name)));

INSERT INTO products (id, name, price, stock, category_id)
VALUES
  ('20000000-0000-4000-8000-000000000001', 'Smartphone', 2000.00, 10, '10000000-0000-4000-8000-000000000001'),
  ('20000000-0000-4000-8000-000000000002', 'Notebook', 5000.00, 5, '10000000-0000-4000-8000-000000000001'),
  ('20000000-0000-4000-8000-000000000003', 'Tablet', 1500.00, 8, '10000000-0000-4000-8000-000000000001')
ON CONFLICT (LOWER(TRIM(name))) DO NOTHING;
