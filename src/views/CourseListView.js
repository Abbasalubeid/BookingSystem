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
import { Badge } from "@/components/ui/badge";

const CourseListView = ({ listData, error }) => {
  if (error) {
    return <div className="text-red-600 font-bold p-3">Error: {error}</div>;
  }

  const courseTitle = listData.length > 0 ? listData[0].courseTitle : 'Course Sessions';

  return (
    <>
    <Table>
      
      <TableCaption>{courseTitle}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>Duration (min)</TableHead>
          <TableHead>Reservation slots</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listData.map(list => (
          <TableRow key={list.id}>
            <TableCell>{list.description}</TableCell>
            <TableCell>{list.location}</TableCell>
            <TableCell>{list.startTime}</TableCell>
            <TableCell>{list.duration}</TableCell>
            <TableCell className="relative">
            <p className="hidden md:inline md:w-1/2">{list.maxSlots}</p>
                            <div className="absolute bottom-1 right-3">
                                <Badge variant={list.isFull ? "destructive" : "available"}  
                                size="sm:small md:normal">
                                    {list.isFull ? "Full" : `${list.availableSlots} Available `}
                                </Badge>
                            </div>
                        </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
};

export default CourseListView;
