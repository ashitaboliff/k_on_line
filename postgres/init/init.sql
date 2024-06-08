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
    VALUES (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-06T15:00:00.000Z', 3, 'band001', 'exmaple001', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-07T15:00:00.000Z', 4, 'band001', 'exmaple002', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-08T15:00:00.000Z', 5, 'band001', 'exmaple003', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-09T15:00:00.000Z', 6, 'band001', 'exmaple004', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-09T15:00:00.000Z', 7, 'band001', 'exmaple005', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-10T15:00:00.000Z', 8, 'band001', 'exmaple006', 'password', FALSE),
              (gen_random_uuid(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '2024-06-11T15:00:00.000Z', 8, 'band001', 'exmaple007', 'password', FALSE);