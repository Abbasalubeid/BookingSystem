// app/views/ReservationDetailsDialogView.js

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, ClockIcon, PersonIcon, HomeIcon, ReaderIcon, AvatarIcon  } from "@radix-ui/react-icons";

const ReservationDetailsDialogView = ({
  showDialog,
  onCloseDialog,
  reservationDetails
}) => {
  if (!reservationDetails) return null;

  return (
    <Dialog open={showDialog} onOpenChange={onCloseDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservation Details</DialogTitle>
        </DialogHeader>
        <div className="flex items-center">
          <BookmarkIcon className="mr-2" />
          <p>Course: {reservationDetails.courseTitle}</p>
        </div>
        <div className="flex items-center">
          <ReaderIcon className="mr-2" />
          <p>Description: {reservationDetails.description}</p>
        </div>
        <div className="flex items-center">
          <HomeIcon className="mr-2" />
          <p>Location: {reservationDetails.location}</p>
        </div>
        <div className="flex items-center">
          <ClockIcon className="mr-2" />
          <p>Start Time: {reservationDetails.startTime}</p>
        </div>
        <div className="flex items-center">
          <ClockIcon className="mr-2" />
          <p>End Time: {reservationDetails.endTime}</p>
        </div>
        <div className="flex items-center">
          <AvatarIcon className="mr-2" />
          <p>Booker: {reservationDetails.userUsername}</p>
        </div>
        {reservationDetails.coopUsername && (
          <div className="flex items-center">
            <PersonIcon className="mr-2" />
            <p>Co-op Partner: {reservationDetails.coopUsername}</p>
          </div>
        )}
        <DialogFooter>
          <Button onClick={onCloseDialog}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetailsDialogView;
