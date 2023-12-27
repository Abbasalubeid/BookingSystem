import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  console.log(users);

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
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Select User</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Users</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={user} onValueChange={setUser}>
          {users.map(user => (
          <DropdownMenuRadioItem key={user.id} value={user.id}>{user.username}</DropdownMenuRadioItem>
          ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Course</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Courses</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={course} onValueChange={setCourse}>
        {courses.map(course => (
          <DropdownMenuRadioItem key={course.id} value={course.id}>{course.title}</DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Role</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
          {roles.map((role, index) => (
          <DropdownMenuRadioItem key={index} value={index}>{role}</DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
      </DropdownMenu>
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