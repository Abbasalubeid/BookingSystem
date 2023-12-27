import React, { useState, useEffect } from 'react';
import ListManagementView from '@/views/ListManagementView';
import Course from '../models/Course';
import List from "@/models/List";

const AdminListPresenter = ({}) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
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

  const fetchLists = async (id) => {
    try {
      const response = await fetch(`/api/course?id=${id}`);

      if (response.ok) {
        const data = await response.json();
        const newProcessedData = [];
        const newModelsMap = {};

        data.forEach((item) => {
          const list = new List(item);
          newProcessedData.push({
            id: list.id,
            description: list.description,
            location: list.location,
            startTime: list.formatStartTime(),
            duration: list.interval,
            maxSlots: list.maxSlots,
            courseTitle: list.courseTitle,
            availableSlots: list.getAvailableSlots(),
            isFull: list.isFull(),
          });
          newModelsMap[list.id] = list;
        });

        setLists(newProcessedData)
      } else {
        console.error('Error fetching course list:');
      }
    } catch (error) {
        console.error('Access error: ', error);
    }
  };

  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
    fetchLists(courseId);
  };


  return (
    <ListManagementView
      courses={courses}
      selectedCourse={selectedCourse}
      onSelectCourse={handleSelectCourse}
      lists={lists}
      on
    />
  );
};

export default AdminListPresenter;
