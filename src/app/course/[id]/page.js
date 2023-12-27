"use client"
import CourseListPresenter from '@/presenters/CourseListPresenter';

const CourseListPage = ({ params }) => {
  
  return <CourseListPresenter courseId={params.id}/>;
};

export default CourseListPage;
