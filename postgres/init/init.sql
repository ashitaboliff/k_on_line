-- DB作成
CREATE DATABASE k_on_line;
-- 作成したDBに接続
\c k_on_line;

DROP TABLE IF EXISTS booking;

CREATE TABLE IF NOT EXISTS booking(
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    booking_date date NOT NULL,
    booking_time int NOT NULL,
    regist_name VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO booking (created_at, booking_date, booking_time, regist_name, name, password)
    VALUES (CURRENT_TIMESTAMP, '2024-05-21', 3, 'band001', 'exmaple001', 'password');