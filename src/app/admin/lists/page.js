"use client"
import ListManagementPresenter from '@/presenters/ListManagementPresenter';
import withAdminAuth from '../withAdminAuth';

const CourseListPage = withAdminAuth(ListManagementPresenter)

export default CourseListPage;
