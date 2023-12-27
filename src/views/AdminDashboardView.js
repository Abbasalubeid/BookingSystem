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

      {/* Användare kan endast skapas av admin 
        KLAR
      */}


      <Link className="mb-4 w-80 md:max-w-xl transition duration-150 ease-in-out transform hover:shadow-lg hover:-translate-y-1" href="/admin/courseAccessManagement" passHref>
        <Card>
          <CardHeader>
            <CardTitle>Course Access Management</CardTitle>
          </CardHeader>
        </Card>
      </Link>

      { /* 3 
        Användare ska endast ha rättigheter på kurser som admin bestämmer och därför 
        krävs en tabell access som länkar mellan course_id och user_id. 
      */}

      <Link className="mb-4 w-80 md:max-w-xl transition duration-150 ease-in-out transform hover:shadow-lg hover:-translate-y-1" href="/admin/lists" passHref>
        <Card>
          <CardHeader>
            <CardTitle>List Management</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      {/* 3
        Skapa presentationslistor.
        Visa presentationslistor.
        Ta bort presentationslistor.
      */}
      <Link className="mb-4 w-80 md:max-w-xl transition duration-150 ease-in-out transform hover:shadow-lg hover:-translate-y-1" href="/admin/bookings" passHref>
        <Card>
          <CardHeader>
            <CardTitle>Booking Management</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Separator className="my-4" />
    </div>
  );
};

        /* 4
          Admin kan lägga till bokningar för andra användare
          Admin ta bort bokningar för andra användare
        */

export default AdminDashboardView;
