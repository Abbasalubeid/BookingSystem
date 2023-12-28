import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const ListManagementView = ({ courses, lists, onSelectCourse, selectedCourse, onDeleteList, onAddListClick }) => {
  const [listId, setListId] = React.useState(null)

  const handleSelectChange = (value) => {
    onSelectCourse(value);
  };

  const handleRemoveClick = (id) => {
    setListId(id);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onDeleteList(listId);
  };

  const courseTitle = lists.length > 0 ? lists[0].courseTitle : "Course Sessions";

  return (
    <form onSubmit={handleFormSubmit} className="container mx-auto p-4">
      <Select onValueChange={handleSelectChange} className="mb-4">
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

      <br></br>

      {selectedCourse && (
        <Table className="min-w-full leading-normal overflow-hidden">
          <TableCaption className="text-lg font-semibold p-2">
            {courseTitle}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>Duration (min)</TableHead>
              <TableHead>Reservation slots</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lists.map((list) => (
              <TableRow key={list.id} className="border-b">
                <TableCell>{list.description}</TableCell>
                <TableCell>{list.location}</TableCell>
                <TableCell>{list.startTime}</TableCell>
                <TableCell>{list.duration}</TableCell>
                <TableCell>{list.maxSlots}</TableCell>
                <TableCell className="flex justify-end p-2">
                  <Button type="submit" onClick={() => handleRemoveClick(list.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4">
                    Remove List
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell className="flex justify-end p-2">
              <Button 
                type="button"
                onClick={onAddListClick} 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                  Add List
              </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </form>
  );
};

export default ListManagementView;
