import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ClockIcon } from "@radix-ui/react-icons";

const ReservationDialogView = ({
  showDialog,
  onCloseDialog,
  nextAvailableTime,
  onBook,
  isBooking,
  bookingConfirmation,
  setTeammateUsername,
  teammateError,
  userOne,
  userTwo,
  setUserOne,
  setUserTwo,
  isAdmin,
  adminBookingError,
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={onCloseDialog}>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Next Available Slot</DialogTitle>
          <DialogDescription className="flex justify-center items-center">
            <ClockIcon />
            <span className="text-md font-bold">{nextAvailableTime}</span>
          </DialogDescription>
        </DialogHeader>
        {isAdmin ? (
          <>
            <Input
              type="text"
              placeholder="Username 1"
              value={userOne}
              onChange={(e) => setUserOne(e.target.value)}
              disabled={isBooking}
              className={adminBookingError ? "border-red-500" : ""}
            />
            <Input
              type="text"
              placeholder="Username 2"
              value={userTwo}
              onChange={(e) => setUserTwo(e.target.value)}
              disabled={isBooking}
              className={adminBookingError ? "border-red-500" : ""}
            />
            {!adminBookingError && (
              <Label className="text-sm text-gray-600">
                Note: For two users, User 1 will be the primary user. User 2 can
                view but not delete the booking.
              </Label>
            )}

            {adminBookingError && (
              <span className="text-sm text-red-500 mt-1">
                {adminBookingError}
              </span>
            )}
          </>
        ) : (
          <>
            <div className="flex gap-1">
              <Input
                type="text"
                placeholder="Teammate's username"
                onChange={(e) => setTeammateUsername(e.target.value)}
                disabled={isBooking}
                className={`w-full ${teammateError ? "border-red-500" : ""}`}
              />
              {teammateError && (
                <span className="text-sm text-red-500 mt-1">
                  {teammateError}
                </span>
              )}
            </div>
          </>
        )}

        <DialogFooter>
          {!bookingConfirmation ? (
            <Button
              onClick={onBook}
              disabled={isBooking}
              className={`bg-green-500 flex justify-center ${
                isBooking ? "loading" : ""
              }`}
            >
              {isBooking ? "Booking..." : "Book"}
            </Button>
          ) : (
            <span>{bookingConfirmation}</span>
          )}
          <Button onClick={onCloseDialog}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialogView;
