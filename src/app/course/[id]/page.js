"use client"
import CourseListPresenter from '@/presenters/CourseListPresenter';

const CourseListPage = ({ params }) => {

  return <CourseListPresenter id={params.id}/>;
};

export default CourseListPage;
