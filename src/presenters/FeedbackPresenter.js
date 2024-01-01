import React, { useState, useEffect } from 'react';
import FeedbackView from '@/views/FeedbackView';
import Course from '@/models/Course';

const FeedbackPresenter = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);

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

    const fetchFeedback = async (courseId) => {
        try {
          const response = await fetch(`/api/admin/feedback`, {
            method: 'POST',
            cache: 'no-store',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseId }),
          });
      
          if (response.ok) {
            const rawData = await response.json();

            const formattedData = rawData.rows.map(feedback => {
              // Format each feedback as needed, for example:
              return {
                id: feedback.feedback_id,
                username: feedback.username,
                comment: feedback.comment,
                rating: feedback.rating,
                // You might want to format the timestamp into a more readable format
                time: new Date(feedback.time).toLocaleString(),
                // Add any other transformations here
              };
            });
            setFeedbacks(formattedData);
          } else {
            console.error('Error fetching feedback list:', response.statusText);
          }
        } catch (error) {
            console.error('Access error: ', error);
        }
      };
      

    const handleSelectCourse = (courseId) => {
        setSelectedCourse(courseId);
        fetchFeedback(courseId);
    };

    return (
    <FeedbackView
        courses={courses}
        selectedCourse={selectedCourse}
        onSelectCourse={handleSelectCourse}
        feedbacks={feedbacks}
    />
    );
};

export default FeedbackPresenter;
