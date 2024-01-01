import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const CreateListDialogView = ({
  showDialog,
  onCloseDialog,
  onCreateList,
  setDescription,
  setLocation,
  setStartTime,
  setSessionLength,
  setTotalSessions,
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={onCloseDialog}>
  <DialogContent className="p-4">
    <DialogHeader className="flex justify-between items-center">
      <DialogTitle>Create New List</DialogTitle>
    </DialogHeader>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input  
          onChange={(e) => setDescription(e.target.value)}
          id="description" 
          type="text" 
          placeholder="e.g. Seminar 1 presentation" 
          required />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input 
          onChange={(e) => setLocation(e.target.value)}
          id="location"
          type="text" 
          placeholder="e.g. Room K-301" 
          required />
      </div>
      <div>
        <Label htmlFor="start-time">Start Time</Label>
        <Input 
          onChange={(e) => setStartTime(e.target.value)}
          id="start-time" 
          type="datetime-local" 
          required />
      </div>
      <div>
        <Label htmlFor="session-length">Session Length (minutes)</Label>
        <Input 
          onChange={(e) => setSessionLength(e.target.value)}
          id="session-length"
          type="number" 
          placeholder="15" 
          required />
      </div>
      <div>
        <Label htmlFor="total-sessions">Total Sessions</Label>
        <Input 
          onChange={(e) => setTotalSessions(e.target.value)}
          id="total-sessions" 
          type="number" 
          placeholder="5" 
          required />
      </div>
      <Button onClick={onCreateList} variant="primary" className="self-end mt-4">
        Add List
      </Button>
  </DialogContent>
</Dialog>

  );
};

export default CreateListDialogView;
