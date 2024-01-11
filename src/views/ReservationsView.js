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
import { ReaderIcon, TrashIcon, ReloadIcon, ExclamationTriangleIcon} from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ReservationsView = ({ reservations, error, onDetailsClick, onDeleteClick, deletingReservationId }) => {

  if (error) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (reservations.length === 0) {
    return (
      <Alert >
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>You have no reservations!</AlertTitle>
      </Alert>
    );
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
