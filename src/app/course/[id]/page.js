"use client"
import CourseListPresenter from '@/presenters/CourseListPresenter';

const CourseListPage = ({ params, isAdmin }) => {
  
  return <CourseListPresenter courseId={params.id} isAdmin={isAdmin}/>;
};

export default CourseListPage;

