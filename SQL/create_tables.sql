--DROP TABLE IF EXISTS feedback;
--DROP TABLE IF EXISTS reservations;
--DROP TABLE IF EXISTS lists;
--DROP TABLE IF EXISTS access;
--DROP TABLE IF EXISTS courses;
--DROP TABLE IF EXISTS users;

-- Table creation for 'users'
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    admin INTEGER NOT NULL
);

-- Table creation for 'courses'
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(64) NOT NULL
);

-- Table creation for 'access'
CREATE TABLE access (
    user_id INTEGER NOT NULL REFERENCES users(id),
    course_id INTEGER NOT NULL REFERENCES courses(id),
    access_level INTEGER NOT NULL,
    PRIMARY KEY (user_id, course_id)
);

-- Table creation for 'lists'
CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id),
    admin_id INTEGER NOT NULL REFERENCES users(id),
    description VARCHAR(64) NOT NULL,
    location VARCHAR(64) NOT NULL,
    start TIMESTAMP NOT NULL,
    interval INTEGER NOT NULL,
    max_slots INTEGER NOT NULL
);

-- Table creation for 'reservations'
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    list_id INTEGER REFERENCES lists(id),
    user_id INTEGER REFERENCES users(id),
    coop_id INTEGER REFERENCES users(id),
    sequence INTEGER NOT NULL
);

-- Table creation for 'feedback'
CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    course_id INTEGER NOT NULL REFERENCES courses(id),
    comment TEXT NOT NULL,
    rating INTEGER NOT NULL,
    time TIMESTAMP NOT NULL
);