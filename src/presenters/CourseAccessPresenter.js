import React, { useState, useEffect } from 'react';
import CourseAccessView from '../views/CourseAccessView';
import Course from '../models/Course';
import User from '../models/User';

const roles = ['Student', 'TA', 'Professor/Examiner']; 

const AccessControlPresenter = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses', {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        const processedData = data.map(item => {
          const course = new Course(item);
          return {
            id: course.id,
            title: course.title
          };
        });
        setCourses(processedData);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        const processedData = data.map(item => {
          const user = new User(item);
          console.log(user.id);
          return {
            id: user.id,
            username: user.username,
            admin: user.admin
          };
        });
        setUsers(processedData);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleGiveAccess = async (user, course, role) => {
    try {
      const response = await fetch('/api/admin/giveAccessToCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, course, role }),
      });

      if (response.ok) {
        alert("Access successfully given");
      } else {
        alert('Access unsuccessfully given');
      }
    } catch (error) {
      alert('Access error: presenter', error);
    }
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <CourseAccessView
      users={users}
      courses={courses}
      roles={roles}
      onUserChange={handleUserChange}
      onCourseChange={handleCourseChange}
      onRoleChange={handleRoleChange}
      onSubmit={handleSubmit}
      onGiveAccess={handleGiveAccess}
    />
  );
};

export default AccessControlPresenter;
