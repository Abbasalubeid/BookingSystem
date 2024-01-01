"use client"
import CoursesPresenter from '@/presenters/CoursesPresenter';
import withAdminAuth from '../withAdminAuth';

const AdminCoursesPage = withAdminAuth(CoursesPresenter);

export default AdminCoursesPage;

