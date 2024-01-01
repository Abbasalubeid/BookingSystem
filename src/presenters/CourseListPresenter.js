import React, { useState, useEffect, Suspense } from "react";
import List from "@/models/List";
import CourseListView from "@/views/CourseListView";
import ReservationDialogView from "@/views/ReservationDialogView";
import Pusher from "pusher-js";

const CourseListPresenter = ({ courseId, isAdmin }) => {
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

  // Admin specific states
  const [userOne, setUserOne] = useState("");
  const [userTwo, setUserTwo] = useState("");
  const [adminBookingError, setAdminBookingError] = useState("");

  useEffect(() => {
    fetchLists();
  }, [courseId]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: "eu",
    });

    const reservationsChannel = pusher.subscribe("reservation-channel");
    reservationsChannel.bind("reservation-deleted", function () {
      fetchLists();
    });

    const bookingChannel = pusher.subscribe("booking-channel");

    bookingChannel.bind("booking-event", () => {
      fetchLists();
    });

    // Clean up
    return () => {
      bookingChannel.unbind_all();
      bookingChannel.unsubscribe();
      reservationsChannel.unbind_all();
      reservationsChannel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  const getUserByUsername = async (username) => {
    const response = await fetch(`/api/user?username=${username}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      // console.error("Failed to fetch user data");
      return null;
    }

    const data = await response.json();
    return data;
  };

  const fetchUser = async () => {
    // middleware forces users to log in before this stage
    const response = await fetch("/api/user", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  };

  const isUserRegisteredInCourse = async (userId, courseId) => {
    const response = await fetch(
      `/api/access?userId=${userId}&courseId=${courseId}`
    );

    if (!response.ok) {
      console.error("Failed to check course access");
      return false;
    }

    const data = await response.json();
    return data.isRegistered;
  };

  const fetchLists = async () => {
    try {
      const response = await fetch(`/api/course?id=${courseId}`);

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
    const user = await fetchUser(); // Fetch the logged-in user
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

    let coop = null;
    let coopId = null;
    if (teammateUsername.trim()) {
      coop = await getUserByUsername(teammateUsername);
      if (!coop) {
        setTeammateError(`${teammateUsername} was not found`);
        setIsBooking(false);
        return;
      }

      coopId = coop.id;
      const isRegistered = await isUserRegisteredInCourse(coop.id, courseId);
      if (!isRegistered) {
        setTeammateError(
          `${teammateUsername} is not registered in this course`
        );
        setIsBooking(false);
        return;
      }
      setTeammateError("");

      // Check if the teammate already has a booking
      existingBookingTime = listModel.userHasBooking(coop.id);
      if (existingBookingTime) {
        setBookingConfirmation(
          `${coop.username} already has a booking at ${existingBookingTime}`
        );
        setIsBooking(false);
        return;
      }
    }

    const sequence = listModel.getNextSequence();

    try {
      await bookSlot(listModel.id, user.id, sequence, coopId);
      const bookingMessage = coopId
        ? `Booking confirmed for ${user.username} and ${teammateUsername} at ${nextAvailableTime}`
        : `Booking confirmed for ${user.username} at ${nextAvailableTime}`;
      setBookingConfirmation(bookingMessage);
      fetchLists(); // Refresh the list data
    } catch (error) {
      setBookingConfirmation("Failed to book the slot");
    }

    setIsBooking(false);
    setTeammateUsername("");
  };

  const bookSlot = async (listId, userId, sequence, coopId = null) => {
    await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listId, userId, sequence, coopId }),
      credentials: "include",
    });
  };

  const handleAdminBook = async () => {
    setIsBooking(true);
    setAdminBookingError("");

    if (userOne && userTwo && userOne === userTwo) {
      setAdminBookingError("Error: Fill only field user when booking for one user");
      setIsBooking(false);
      return;
    }

    const listModel = listModelsMap[currentList.id];
    if (!listModel) {
      setAdminBookingError("Error: Invalid list selected.");
      setIsBooking(false);
      return;
    }

    // Determine the primary and secondary users
    let primaryUser = userOne || userTwo;
    let secondaryUser = userOne && userTwo ? userTwo : null;

    // Check if at least one user is provided
    if (!primaryUser) {
      setAdminBookingError(
        "Error: Please provide at least one user for booking."
      );
      setIsBooking(false);
      return;
    }

    // Fetch user data for the primary and secondary users
    const primaryUserData = await getUserByUsername(primaryUser);
    let secondaryUserData = null;
    if (secondaryUser) {
      secondaryUserData = await getUserByUsername(secondaryUser);
    }

    // Check if primary user is found
    if (!primaryUserData) {
      setAdminBookingError(`Error: User '${primaryUser}' not found.`);
      setIsBooking(false);
      return;
    }

    // If secondary user is provided but not found
    if (secondaryUser && !secondaryUserData) {
      setAdminBookingError(`Error: User '${secondaryUser}' not found.`);
      setIsBooking(false);
      return;
    }

    // Check if primary and secondary users are registered in the course
    const isPrimaryUserRegistered = await isUserRegisteredInCourse(
      primaryUserData.id,
      courseId
    );
    if (!isPrimaryUserRegistered) {
      setAdminBookingError(
        `Error: '${primaryUser}' is not registered in this course.`
      );
      setIsBooking(false);
      return;
    }

    let isSecondaryUserRegistered = true;
    if (secondaryUserData) {
      isSecondaryUserRegistered = await isUserRegisteredInCourse(
        secondaryUserData.id,
        courseId
      );
      if (!isSecondaryUserRegistered) {
        setAdminBookingError(
          `Error: '${secondaryUser}' is not registered in this course.`
        );
        setIsBooking(false);
        return;
      }
    }

    // Check for existing bookings for both users
    const existingBookingPrimary = listModel.userHasBooking(primaryUserData.id);
    if (existingBookingPrimary) {
      setAdminBookingError(
        `Error: '${primaryUser}' already has a booking at ${existingBookingPrimary}.`
      );
      setIsBooking(false);
      return;
    }

    let existingBookingSecondary = null;
    if (secondaryUserData) {
      existingBookingSecondary = listModel.userHasBooking(secondaryUserData.id);
      if (existingBookingSecondary) {
        setAdminBookingError(
          `Error: '${secondaryUser}' already has a booking at ${existingBookingSecondary}.`
        );
        setIsBooking(false);
        return;
      }
    }

    const sequence = listModel.getNextSequence();
    try {
      console.log(primaryUserData);
      await bookSlot(
        listModel.id,
        primaryUserData.id,
        sequence,
        secondaryUserData ? secondaryUserData.id : null
      );
      const bookingMessage = secondaryUserData
        ? `Booking confirmed for ${primaryUser} and ${secondaryUser}`
        : `Booking confirmed for ${primaryUser}`;
      setBookingConfirmation(bookingMessage);
      fetchLists();
    } catch (error) {
      setAdminBookingError("Failed to book the slot: " + error.message);
    }

    setIsBooking(false);
    setUserOne("");
    setUserTwo("");
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
    setUserOne("");
    setUserTwo("");
    setAdminBookingError("");
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
        isBooking={isBooking}
        bookingConfirmation={bookingConfirmation}
        setTeammateUsername={setTeammateUsername}
        teammateError={teammateError}
        onBook={isAdmin ? handleAdminBook : handleBook}
        isAdmin={isAdmin}
        userOne={userOne}
        setUserOne={setUserOne}
        userTwo={userTwo}
        setUserTwo={setUserTwo}
        adminBookingError={adminBookingError}
      ></ReservationDialogView>
    </>
  );
};

export default CourseListPresenter;
