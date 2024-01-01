"use client"
import ReservationsPresenter from '@/presenters/ReservationsPresenter';
import withAdminAuth from '../withAdminAuth';

const AdminReservationsPage = withAdminAuth(ReservationsPresenter);

export default AdminReservationsPage;
