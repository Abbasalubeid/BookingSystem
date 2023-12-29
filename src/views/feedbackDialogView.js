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

const FeedbackDialogView = ({
  showDialog,
  onCloseDialog,
  onSubmitFeedback,
  setComment,
  setRating,
  isSubmitting
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={onCloseDialog}>
  <DialogContent className="p-4">
    <DialogHeader className="flex justify-between items-center">
      <DialogTitle>Give feedback on course</DialogTitle>
    </DialogHeader>
      <div>
        <Label htmlFor="comment">Comment</Label>
        <Input  
          onChange={(e) => setComment(e.target.value)}
          id="comment" 
          type="text" 
          placeholder="Enter any concerns/feedback on the course here." 
          required />
      </div>
      <div>
        <Label htmlFor="rating">Rate the course</Label>
            <Input 
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            id="location"
            type="number" 
            placeholder="1-5" 
            required />
      </div>
      <Button onClick={onSubmitFeedback} variant="primary" className="self-end mt-4">
      {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </Button>
  </DialogContent>
</Dialog>

  );
};

export default FeedbackDialogView;
