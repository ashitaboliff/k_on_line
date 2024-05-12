-- DB作成
CREATE DATABASE k_on_line;
-- 作成したDBに接続
\c k_on_line;

DROP TABLE IF EXISTS booking;

CREATE TABLE IF NOT EXISTS booking(
    id serial PRIMARY KEY NOT NULL DEFAULT nextval('seq_table_id_seq'::regclass),
    booking_date date NOT NULL,
    booking_time int NOT NULL,
    regist_name VARCHAR(100) NOT NULL,
    part text[] NOT NULL,
    otherpart boolean NOT NULL,
    remark text,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO booking (id, booking_date, booking_time, regist_name, part, otherpart, remark, name, password, created_at)
    VALUES (nextval('seq_table_id_seq'::regclass),'2024-05-21', 3, 'band001', ARRAY['bass', 'keybord'], true, '', 'exmaple001', 'password', CURRENT_TIMESTAMP);