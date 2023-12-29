import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const ReservationsView = ({ reservations, error, onDetailsClick, onDeleteClick, deletingReservationId }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (reservations.length === 0) {
    return <div>No reservations found.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Course</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          {/* <TableHead>Location</TableHead> */}
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{reservation.courseTitle}</TableCell>
            <TableCell>{reservation.description}</TableCell>
            <TableCell>{reservation.startTime}</TableCell>
            <TableCell>{reservation.endTime}</TableCell>
            {/* <TableCell>{reservation.location}</TableCell> */}
            <TableCell>
              <Button onClick={() => onDetailsClick(reservation)}>Details</Button>
            </TableCell>
            <TableCell>
              {deletingReservationId === reservation.id ? 
                <span>Deleting...</span> : 
                <Button onClick={() => onDeleteClick(reservation.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 md:w-auto w-20">Delete</Button>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReservationsView;
