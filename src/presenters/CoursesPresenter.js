import React, { useState, useEffect } from 'react';
import CoursesView from '@/views/CoursesView';
import Course from '../models/Course';
import FeedbackDialogView from '@/views/feedbackDialogView';

const CoursesPresenter = () => {
  const [courses, setCourses] = useState([]);
  const [comment, setComment] = useState(null);
  const [rating, setRating] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleSubmitFeedback = async () => {  
    setIsSubmitting(true);
    try {
      
      const response = await fetch('/api/feedback', {
        method: 'POST',
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({comment, rating, courseId})
      });
  
      if (response.ok) {
        console.log("Feedback submitted, presenter.");
      } else {
      }
    } catch (error) {
      console.error('Error submitting feedback: ', error);
    } 

    setShowDialog(false);
    setIsSubmitting(false);
  };

  const handleGiveFeedback = () => {
    setShowDialog(true);
  } 

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses', {
        method: 'GET',
        credentials: 'include',
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

  return <>
    <CoursesView 
      courses={courses} 
      onGiveFeedback={handleGiveFeedback}
      setCourseId={setCourseId} 
    />;

    <FeedbackDialogView
      showDialog={showDialog}
      onCloseDialog={handleCloseDialog}
      setComment={setComment}
      setRating={setRating}
      onSubmitFeedback={handleSubmitFeedback}
      isSubmitting={isSubmitting}
    />
  </>
};

export default CoursesPresenter;
