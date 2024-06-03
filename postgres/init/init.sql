-- DB作成
CREATE DATABASE k_on_line;
-- 作成したDBに接続
\c k_on_line;

DROP TABLE IF EXISTS booking;

CREATE TABLE IF NOT EXISTS booking(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    booking_date date NOT NULL,
    booking_time int NOT NULL,
    regist_name VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO booking (id, created_at, booking_date, booking_time, regist_name, name, password)
    VALUES (1, CURRENT_TIMESTAMP, '2024-06-07', 3, 'band001', 'exmaple001', 'password'),
              (2, CURRENT_TIMESTAMP, '2024-06-08', 4, 'band001', 'exmaple002', 'password'),
              (3, CURRENT_TIMESTAMP, '2024-06-09', 5, 'band001', 'exmaple003', 'password'),
              (4, CURRENT_TIMESTAMP, '2024-06-10', 6, 'band001', 'exmaple004', 'password'),
              (5, CURRENT_TIMESTAMP, '2024-06-10', 7, 'band001', 'exmaple005', 'password'),
              (6, CURRENT_TIMESTAMP, '2024-06-11', 8, 'band001', 'exmaple006', 'password'),
              (7, CURRENT_TIMESTAMP, '2024-06-12', 8, 'band001', 'exmaple007', 'password');