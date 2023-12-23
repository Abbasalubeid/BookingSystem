// views/CoursesView.js

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"

const CoursesView = ({ courses = [] }) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-[650px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Courses</CardTitle>
        </CardHeader>
        <Separator className="my-4" />
        {courses.map(course => (
          <Card key={course.id} className="mb-4">
            <CardHeader>
              {course.title}
            </CardHeader>
          </Card>
        ))}
      </Card>
    </div>
  );
};

export default CoursesView;
