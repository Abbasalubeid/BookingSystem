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
(1, 3, 'Advanced SQL Queries', 'Room 101', '2023-12-12 10:00:00', 45, 15),
(1, 3, 'SQL for Data Analysis', 'Room 102', '2023-12-14 14:00:00', 90, 12),
(1, 3, 'Database Management Essentials', 'Room 103', '2023-12-16 09:00:00', 60, 10),
(1, 3, 'SQL Performance Tuning', 'Room 104', '2023-12-18 11:00:00', 75, 8),
(1, 3, 'Relational Database Design', 'Room 105', '2023-12-20 13:00:00', 60, 10),
(1, 3, 'SQL Joins and Subqueries', 'Room 106', '2023-12-22 15:00:00', 50, 14),
(1, 3, 'SQL in Practice: Case Studies', 'Room 107', '2023-12-24 10:00:00', 85, 9),
(1, 3, 'Data Warehousing with SQL', 'Room 108', '2023-12-26 09:00:00', 70, 11),
(1, 3, 'SQL Security Best Practices', 'Room 109', '2023-12-28 16:00:00', 65, 13),
(1, 3, 'Optimizing SQL Queries', 'Room 110', '2023-12-30 12:00:00', 55, 10);


-- Insert dummy data into 'reservations'
INSERT INTO reservations (list_id, user_id, coop_id, sequence) VALUES 
(1, 1, 2, 1),
(2, 2, 1, 2);
(1, 2, 3, 3),
(2, 1, 3, 4),
(3, 2, 1, 5),
(4, 3, 2, 6),
(5, 1, 3, 7),
(6, 2, 3, 8),
(7, 1, 2, 9),
(8, 3, 1, 10),
(9, 2, 3, 11),
(10, 1, 2, 12),
(11, 3, 1, 13),
(12, 2, 3, 14);

-- Insert dummy data into 'feedback'
INSERT INTO feedback (user_id, course_id, comment, rating, time) VALUES 
(1, 1, 'Great course, learned a lot!', 5, '2023-01-01 10:00:00'),
(2, 2, 'Course was too advanced for my level.', 3, '2023-01-02 15:30:00');