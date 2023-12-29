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
import { ReaderIcon, TrashIcon, ReloadIcon } from "@radix-ui/react-icons";

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
          <TableHead>Start</TableHead>
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
            <TableCell>
              <Button onClick={() => onDetailsClick(reservation)} className="rounded-full p-2">
                <ReaderIcon />
              </Button>
            </TableCell>
            <TableCell>
              {deletingReservationId === reservation.id ? 
                <ReloadIcon className="animate-spin" /> :
                <Button onClick={() => onDeleteClick(reservation.id)} className="rounded-full bg-red-500 hover:bg-red-700 text-white p-2">
                  <TrashIcon /> 
                </Button>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReservationsView;
