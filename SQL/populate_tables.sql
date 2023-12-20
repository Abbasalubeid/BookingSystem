-- Insert dummy data into 'users'
INSERT INTO users (username, password, admin) VALUES 
('john_doe', 'password123', 0),
('jane_smith', 'password123', 0),
('admin_user', 'adminpass', 1);

-- Insert dummy data into 'courses'
INSERT INTO courses (title) VALUES 
('Introduction to SQL'),
('Advanced Database Management'),
('Data Analysis with PostgreSQL');


-- Insert dummy data into 'access'
INSERT INTO access (user_id, course_id, access_level) VALUES 
(1, 1, 1),
(2, 2, 1),
(2, 3, 2),
(3, 1, 3);
-- 1 = student, 2 = TA, 3 = professor

-- Insert dummy data into 'lists'
INSERT INTO lists (course_id, admin_id, description, location, start, interval, max_slots) VALUES 
(1, 3, 'SQL Basics Session', 'Room 101', '2023-12-10 09:00:00', 60, 10),
(2, 3, 'Database Optimization Workshop', 'Room 202', '2023-12-11 14:00:00', 120, 5);


-- Insert dummy data into 'reservations'
INSERT INTO reservations (list_id, user_id, coop_id, sequence) VALUES 
(1, 1, 2, 1),
(2, 2, 1, 2);

-- Insert dummy data into 'feedback'
INSERT INTO feedback (user_id, course_id, comment, rating, time) VALUES 
(1, 1, 'Great course, learned a lot!', 5, '2023-01-01 10:00:00'),
(2, 2, 'Course was too advanced for my level.', 3, '2023-01-02 15:30:00');