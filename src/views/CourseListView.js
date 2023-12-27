import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import {
  ReloadIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CourseListView = ({
  listData,
  error,
  onBadgeClick,
  loadingListId,
}) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (listData.length === 0) {
    return (
      <div className="text-center p-2">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>No Lists Available</AlertTitle>
          <AlertDescription>This course has no lists yet.</AlertDescription>
        </Alert>
        <Link href="/courses">
          <Button variant="destructive" className="mt-4">
            <ArrowLeftIcon />
            Back to Courses
          </Button>
        </Link>
      </div>
    );
  }

  const courseTitle =
    listData.length > 0 ? listData[0].courseTitle : "Course Sessions";

  return (
      <Table>
        <TableCaption>{courseTitle}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Duration (min)</TableHead>
            <TableHead>Reservation slots</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listData.map((list) => (
            <TableRow key={list.id}>
              <TableCell>{list.description}</TableCell>
              <TableCell>{list.location}</TableCell>
              <TableCell>{list.startTime}</TableCell>
              <TableCell>{list.duration}</TableCell>
              <TableCell className="relative">
                <p className="hidden md:inline md:w-1/2">{list.maxSlots}</p>
                <div className="absolute bottom-1 right-3">
                  <Button
                    onClick={() => !list.isFull && onBadgeClick(list)}
                    disabled={list.isFull || loadingListId !== null} // Disable all buttons if any list is loading
                    variant={list.isFull ? "destructive" : "primary"}
                    className={
                      loadingListId !== list.id && !list.isFull
                        ? "bg-green-500"
                        : ""
                    }
                  >
                    {loadingListId === list.id ? (
                      <>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Loading
                      </>
                    ) : (
                      `${
                        list.isFull
                          ? "Full"
                          : list.availableSlots + " Available"
                      }`
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};

export default CourseListView;
