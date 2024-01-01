"use client"
import CourseAccessPresenter from '@/presenters/CourseAccessPresenter';
import withAdminAuth from '../withAdminAuth';

const CourseAccessPage = withAdminAuth(CourseAccessPresenter);

export default CourseAccessPage;
