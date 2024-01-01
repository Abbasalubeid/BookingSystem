import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';

const CoursesView = ({ courses = [], onGiveFeedback, setCourseId, isAdmin  }) => {
  const onGiveFeedbackClick = (courseId) => {
    setCourseId(courseId);
    onGiveFeedback();
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      {isAdmin ?<h1 className="text-3xl font-bold mb-5">All Courses</h1>    :   <h1 className="text-3xl font-bold mb-5">Your Courses</h1>}

      {courses.length > 0 ? courses.map(course => (
        <div key={course.id} className="mb-4 w-full md:max-w-xl">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-150 ease-in-out">
          <Link href={isAdmin ? `/admin/course/${course.id}` : `/course/${course.id}`} passHref>
                <h2 className="text-xl font-semibold">{course.title}</h2>
            </Link>
            <button 
              onClick={() => onGiveFeedbackClick(course.id)}
              className="ml-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-150 ease-in-out">
              Give Feedback
            </button>
          </div>
        </div>
      ))
      : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">No courses available</CardTitle>
          </CardHeader>
        </Card>
      )}
      <Separator className="my-4" />
    </div>
  );
  
};

export default CoursesView;
