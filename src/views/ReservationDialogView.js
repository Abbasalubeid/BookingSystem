import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClockIcon } from "@radix-ui/react-icons";

const ReservationDialogView = ({ showDialog, onCloseDialog, nextAvailableTime, onBook, isBooking, bookingConfirmation, setTeammateUsername }) => {
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
                <DialogFooter>
                    
                    {!bookingConfirmation ? (
                    <>
                    <input
                            type="text"
                            placeholder="Teammate's username"
                            onChange={(e) => setTeammateUsername(e.target.value)}
                            disabled={isBooking}
                        />
                        <Button 
                            variant="primary"
                            className={`bg-green-500 items-center flex justify-center ${isBooking ? 'loading' : ''}`}
                            onClick={onBook}
                            disabled={isBooking}
                        >
                            {isBooking ? 'Booking...' : 'Book'}
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
