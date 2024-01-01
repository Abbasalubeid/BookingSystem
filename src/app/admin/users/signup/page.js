"use client"
import SignupPresenter from '@/presenters/SignupPresenter';
import withAdminAuth from '../../withAdminAuth';

 const AdminUserManagementPage = withAdminAuth(SignupPresenter);

export default AdminUserManagementPage;
