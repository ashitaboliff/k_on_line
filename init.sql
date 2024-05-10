DROP TABLE IF EXISTS booking;

CREATE TABLE IF NOT EXISTS booking(
    id serial PRIMARY KEY,
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

INSERT INTO booking (title, body) VALUES ('Initial Message', 'hello from python');