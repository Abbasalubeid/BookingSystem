"use client"
import React from 'react';
import CourseListPresenter from '../../presenters/CourseListPresenter';

const CourseListPage = ({ searchParams }) => {

  return <CourseListPresenter id={searchParams.id}/>;
};

export default CourseListPage;
