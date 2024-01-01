import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteDialogView = ({ showDialog, onCloseDialog, deleteConfirmation }) => {
    return (
        <Dialog open={showDialog} onOpenChange={onCloseDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reservation Deletion</DialogTitle>
                </DialogHeader>
                <p>{deleteConfirmation}</p>
                <DialogFooter>
                    <Button onClick={onCloseDialog}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialogView;
