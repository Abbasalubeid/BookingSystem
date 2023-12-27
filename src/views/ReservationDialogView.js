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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
        <DialogFooter className="flex flex-col gap-2">
          {!bookingConfirmation ? (
            <>
              <div className="flex gap-1">
                <Label htmlFor="teammate">Teammate's username</Label>
                <Input
                  type="text"
                  placeholder="Only fill if adding a teammate"
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
              <Button
                variant="primary"
                className={`bg-green-500 flex justify-center ${
                  isBooking ? "loading" : ""
                }`}
                onClick={onBook}
                disabled={isBooking}
              >
                {isBooking ? "Booking..." : "Book"}
              </Button>
            </>
          ) : (
            <span>{bookingConfirmation}</span>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialogView;
