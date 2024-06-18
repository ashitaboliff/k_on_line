-- DB作成
CREATE DATABASE k_on_line;
-- 作成したDBに接続
\c k_on_line;

DROP TABLE IF EXISTS booking;

CREATE TABLE IF NOT EXISTS booking(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    booking_date TIMESTAMP NOT NULL,
    booking_time int NOT NULL,
    regist_name VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT uuid_table_pkey PRIMARY KEY (id)
);

INSERT INTO booking (id, created_at, updated_at, booking_date, booking_time, regist_name, name, password, is_deleted)
    VALUES (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-15T15:00:00.000Z', 3, 'バンドサンプル', 'ユーザサンプル001', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-16T15:00:00.000Z', 4, 'バンドサンプル', 'ユーザサンプル002', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-17T15:00:00.000Z', 5, 'バンドサンプル', 'ユーザサンプル003', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-18T15:00:00.000Z', 6, 'バンドサンプル', 'ユーザサンプル004', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-19T15:00:00.000Z', 7, 'バンドサンプル', 'ユーザサンプル005', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-20T15:00:00.000Z', 7, 'バンドサンプル', 'ユーザサンプル006', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-20T15:00:00.000Z', 7, 'バンドサンプル', 'ユーザサンプル007', 'password', FALSE);