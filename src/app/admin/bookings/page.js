"use client"
import ReservationsPresenter from '@/presenters/ReservationsPresenter';
import withAdminAuth from '../withAdminAuth';

const AdminReservationsPresenter = withAdminAuth(ReservationsPresenter);

export default AdminReservationsPresenter;
