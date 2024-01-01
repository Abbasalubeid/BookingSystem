"use client"
import UserManagementPresenter from '@/presenters/UserManagementPresenter';
import withAdminAuth from '../withAdminAuth';

const UserManagementPage = withAdminAuth(UserManagementPresenter)

export default UserManagementPage;