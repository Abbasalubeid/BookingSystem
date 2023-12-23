import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CoursesView = ({ courses = [] }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <h1 className="text-3xl font-bold mb-5">Your Courses</h1>
      {courses.length > 0 ? courses.map(course => (
        <Card key={course.id} className="mb-4 w-full md:max-w-xl transition duration-150 ease-in-out transform hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
          </CardHeader>
        </Card>
      )) : (
        <Card>
          <CardContent>
            <p>No courses available.</p>
          </CardContent>
        </Card>
      )}
      <Separator className="my-4" />
    </div>
  );
};

export default CoursesView;
