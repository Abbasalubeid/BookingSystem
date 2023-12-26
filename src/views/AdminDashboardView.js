import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AdminDashboardView = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
      <Link className="mb-4 w-80 md:max-w-xl transition duration-150 ease-in-out transform hover:shadow-lg hover:-translate-y-1" href="/admin/users/signup" passHref>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Link className="mb-4 w-80 md:max-w-xl transition duration-150 ease-in-out transform hover:shadow-lg hover:-translate-y-1" href="/admin/bookings" passHref>
        <Card>
          <CardHeader>
            <CardTitle>Booking Management</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Link className="mb-4 w-80 md:max-w-xl transition duration-150 ease-in-out transform hover:shadow-lg hover:-translate-y-1" href="/admin/lists" passHref>
        <Card>
          <CardHeader>
            <CardTitle>List Management</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Separator className="my-4" />
    </div>
  );
};

export default AdminDashboardView;
