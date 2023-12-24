-- Insert dummy data into 'users'
INSERT INTO users (username, password, admin) VALUES 
('john_doe', 'password123', 0),
('jane_smith', 'password123', 0),
('admin_user', 'adminpass', 1),
('alice_walker', 'password123', 0),
('bob_jones', 'password123', 0),
('carol_smith', 'password123', 0),
('david_brown', 'password123', 0),
('emma_johnson', 'password123', 0);

-- Insert dummy data into 'courses'
INSERT INTO courses (title) VALUES 
('Introduction to SQL'),
('Advanced Database Management'),
('Data Analysis with PostgreSQL'),
('Web Development Basics'),
('Machine Learning Fundamentals'),
('Cloud Computing Essentials'),
('Cybersecurity 101'),
('Mobile App Development');


-- 0 = student, 1 = TA, 2 = professor
INSERT INTO access (user_id, course_id, access_level) VALUES 
(3, 1, 1), -- admin_user is TA in the course 'Introduction to SQL'
(1, 1, 0),
(1, 2, 0),
(1, 3, 0),
(1, 4, 0),
(1, 5, 0),
(2, 2, 0),
(2, 3, 0),
(4, 1, 0), 
(5, 1, 0), 
(6, 1, 0), 
(7, 1, 0), 
(8, 1, 0); 


-- Insert dummy data into 'lists'
INSERT INTO lists (course_id, admin_id, description, location, start, interval, max_slots) VALUES 
(1, 3, 'Seminar 1 presentation', 'Room 101', '2023-12-04 09:00:00', 15, 5), -- admin_user creates a list of 5 slots with 15 min intervall per presentation for the course 'Introduction to SQL'
(1, 3, 'Seminar 2 presentation', 'Room 101', '2023-12-10 14:00:00', 20, 5),
(1, 3, 'Seminar 3 presentation', 'Room 101', '2023-12-20 11:00:00', 30, 5),
(2, 3, 'Database Project Defense', 'Room 202', '2023-12-11 10:00:00', 20, 4), 
(3, 3, 'Data Analysis Workshop', 'Lab 301', '2023-12-12 08:30:00', 30, 6), 
(3, 3, 'Help Session', 'Room 202', '2023-12-15 08:30:00', 20, 10), 
(4, 3, 'Web Dev Final Presentations', 'Room 204', '2023-12-13 09:00:00', 15, 5),
(5, 3, 'ML Model Showcase', 'Zoom', '2023-12-14 14:00:00', 45, 3);


-- Sequence starts with 0 -> max_slots, first booking is starttime from listst, next is start + interval from lists
INSERT INTO reservations (list_id, user_id, coop_id, sequence) VALUES 
(4, 2, NULL, 0), -- jane_smith books the first slot from 'Database Project Defense' list, sequence = 0 which means 10:00 to 10:20 from list_id = 1

(1, 4, 2, 0), -- alice_walker and jane_smith books 09:00 to 09:15 for 'Seminar 1 presentation'
(1, 5, NULL, 1), -- bob_jones books 09:15 to 09:30
(1, 6, NULL, 2), -- carol_smith books 09:30 to 09:45
(1, 7, NULL, 3), -- david_brown books 09:45 to 10:00
(1, 8, NULL, 4), -- emma_johnson books 10:00 to 10:15 -- This list is now fully booked

(2, 4, 2, 0), -- alice_walker and jane_smith books 14:00 to 14:20 for 'Seminar 2 presentation'
(2, 5, 6, 1); -- bob_jones and carol_smith books 14:20 to 14:40, 3 slots left for this list



-- Insert dummy data into 'feedback'
INSERT INTO feedback (user_id, course_id, comment, rating, time) VALUES 
(1, 1, 'Great course, learned a lot!', 5, '2023-01-01 10:00:00');