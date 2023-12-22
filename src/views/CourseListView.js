import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

const CourseListView = ({ lists, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Table>
      <TableCaption>List of Course Sessions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>Duration (min)</TableHead>
          <TableHead>Max Slots</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lists.map(list => (
          <TableRow key={list.id}>
            <TableCell>{list.description}</TableCell>
            <TableCell>{list.location}</TableCell>
            <TableCell>{list.formatStartTime()}</TableCell>
            <TableCell>{list.interval}</TableCell>
            <TableCell>{list.maxSlots}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CourseListView;
