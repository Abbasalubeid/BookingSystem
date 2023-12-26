import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClockIcon } from "@radix-ui/react-icons";

const ReservationDialogView = ({ showDialog, onCloseDialog, nextAvailableTime }) => {
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
                    <Button 
                        variant="primary"
                        className="bg-green-500 items-center flex justify-center"
                        onClick={onCloseDialog}
                    >
                        Book
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReservationDialogView;
