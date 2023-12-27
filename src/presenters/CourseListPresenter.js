import React, { useState, useEffect, Suspense } from "react";
import List from "@/models/List";
import CourseListView from "@/views/CourseListView";
import ReservationDialogView from "@/views/ReservationDialogView";

const CourseListPresenter = ({ id }) => {
  const [listDTOs, setlistDTOs] = useState([]);
  const [listModelsMap, setListModelsMap] = useState({});
  const [error, setError] = useState(null);
  const [loadingListId, setLoadingListId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [nextAvailableTime, setNextAvailableTime] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [teammateUsername, setTeammateUsername] = useState("");
  const [teammateError, setTeammateError] = useState("");

  useEffect(() => {
    fetchLists();
  }, [id]);

  const getUserIdByUsername = async (username) => {
    const response = await fetch(`/api/user?username=${username}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Failed to fetch user data");
      return null;
    }

    const data = await response.json();
    return data.userId;
  };

  const fetchUserId = async () => {
    // middleware forces users to log in before this stage
    const response = await fetch("/api/user", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  };

  const fetchLists = async () => {
    try {
      const response = await fetch(`/api/course?id=${id}`);

      if (response.ok) {
        const data = await response.json();
        const newProcessedData = [];
        const newModelsMap = {};

        data.forEach((item) => {
          const list = new List(item);
          newProcessedData.push({
            id: list.id,
            description: list.description,
            location: list.location,
            startTime: list.formatStartTime(),
            duration: list.interval,
            maxSlots: list.maxSlots,
            courseTitle: list.courseTitle,
            availableSlots: list.getAvailableSlots(),
            isFull: list.isFull(),
          });
          newModelsMap[list.id] = list;
        });

        setlistDTOs(newProcessedData);
        setListModelsMap(newModelsMap);
      } else {
        setError("Failed to load course lists");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBook = async () => {
    setIsBooking(true);
    const user = await fetchUserId(); // Fetch the logged-in user
    if (!user.id) {
      setBookingConfirmation(`Log in to create a booking!`);
      setIsBooking(false);
      return;
    }

    const listModel = listModelsMap[currentList.id];
    let existingBookingTime = listModel.userHasBooking(user.id);
    if (existingBookingTime) {
      setBookingConfirmation(
        `You already have a booking at ${existingBookingTime}`
      );
      setIsBooking(false);
      return;
    }

    let coopId = null;
    if (teammateUsername) {
      coopId = await getUserIdByUsername(teammateUsername);
      if (!coopId) {
        setTeammateError(`${teammateUsername} was not found`);
        setIsBooking(false);
        return;
      }
      setTeammateError("");

      // Check if the teammate already has a booking
      existingBookingTime = listModel.userHasBooking(coopId);
      if (existingBookingTime) {
        setBookingConfirmation(
          `${teammateUsername} already has a booking at ${existingBookingTime}`
        );
        setIsBooking(false);
        return;
      }
    }

    const sequence = listModel.getNextSequence();

    try {
      // API call to book the slot
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listId: listModel.id, sequence, coopId }),
        credentials: "include",
      });

      if (response.ok) {
        setBookingConfirmation(
          `Booking confirmed for ${user.username}${
            teammateUsername ? ` and ${teammateUsername}` : ""
          } at ${nextAvailableTime}`
        );

        fetchLists(); // Refresh the list data
      } else {
        setBookingConfirmation("Failed to book the slot");
      }
    } catch (error) {
      //TODO error UI
    }

    setIsBooking(false);
    setTeammateUsername("");
  };

  const handleBadgeClick = async (list) => {
    setLoadingListId(list.id);
    setCurrentList(list);
    const listModel = listModelsMap[list.id];

    if (listModel) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const availableTime = listModel.nextAvailableSlot();
      setNextAvailableTime(
        availableTime ? availableTime : "No available slots"
      );
      setShowDialog(true);
    }

    setLoadingListId(null);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setNextAvailableTime(null);
    setBookingConfirmation(null);
    setCurrentList(null);
    setLoadingListId(null);
    setTeammateUsername("");
    setTeammateError("");
  };

  return (
    <>
      <CourseListView
        listData={listDTOs}
        error={error}
        onBadgeClick={handleBadgeClick}
        loadingListId={loadingListId}
        nextAvailableTime={nextAvailableTime}
      />
      <ReservationDialogView
        showDialog={showDialog}
        onCloseDialog={handleCloseDialog}
        nextAvailableTime={nextAvailableTime}
        onBook={handleBook}
        isBooking={isBooking}
        bookingConfirmation={bookingConfirmation}
        setTeammateUsername={setTeammateUsername}
        teammateError={teammateError}
      ></ReservationDialogView>
    </>
  );
};

export default CourseListPresenter;
