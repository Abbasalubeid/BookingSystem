import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"

const CourseAccessView = ({ users, courses, roles, onUserChange, onCourseChange, onRoleChange, onSubmit, onGiveAccess }) => {
  const [user, setUser] = React.useState(1)
  const [course, setCourse] = React.useState(1)
  const [role, setRole] = React.useState(0)

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onGiveAccess(user, course, role);
  };

  return (
<div className="flex justify-center items-center">
<Card className="w-[650px]">
  <CardHeader className="space-y-1">
    <CardTitle className="text-2xl">Add a student to a course</CardTitle>
  </CardHeader>
  <form onSubmit={handleFormSubmit}>
    <CardContent className="grid grid-cols-3 gap-4">
    <Select onValueChange={setUser} className="mb-4">
  <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm">
    <SelectValue placeholder="Select User" />
  </SelectTrigger>
  <SelectContent className="border-gray-300 rounded-md shadow-sm">
    {users.map(user => (
      <SelectItem key={user.id} value={user.id} className="hover:bg-gray-100">
        {user.username}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

<Select onValueChange={setCourse} className="mb-4">
  <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm">
    <SelectValue placeholder="Select Course" />
  </SelectTrigger>
  <SelectContent className="border-gray-300 rounded-md shadow-sm">
    {courses.map(course => (
      <SelectItem key={course.id} value={course.id} className="hover:bg-gray-100">
        {course.title}
      </SelectItem>
    ))}
  </SelectContent>
</Select>


<Select onValueChange={setRole} className="mb-4">
  <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm">
    <SelectValue placeholder="Select Role" />
  </SelectTrigger>
  <SelectContent className="border-gray-300 rounded-md shadow-sm">
    {roles.map((role, index) => (
      <SelectItem key={index} value={index} className="hover:bg-gray-100">
        {role}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

    </CardContent>
    <CardFooter className="flex justify-center">
      <Button type="submit" className="w-1/2">
        Add Student
      </Button>
    </CardFooter>
  </form>
</Card>
</div>
  );
};

export default CourseAccessView;