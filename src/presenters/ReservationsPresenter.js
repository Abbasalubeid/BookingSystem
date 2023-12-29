import React, { useState, useEffect } from "react";
import ReservationsView from "@/views/ReservationsView";
import ReservationDetailsDialogView from "@/views/ReservationDetailsDialogView";
import DeleteDialogView from "@/views/DeleteDialogView";
import Reservation from "@/models/Reservation";
import Pusher from 'pusher-js';

const ReservationsPresenter = ({}) => {
  const [reservationsDTO, setReservationsDTO] = useState([]);
  const [error, setError] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [currentReservationDetails, setCurrentReservationDetails] = useState(null);
  const [deletingReservationId, setDeletingReservationId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    fetchReservations();

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: 'eu'
    });

    const channel = pusher.subscribe('reservation-channel');
    channel.bind('reservation-deleted', function(data) {
      const deletedReservationId = parseInt(data.reservationId, 10); 

      setReservationsDTO((prevReservations) =>
        prevReservations.filter(reservation => reservation.id !== deletedReservationId)
      );
    });

    return () => {
        channel.unbind_all();
        channel.unsubscribe();
        pusher.disconnect();
    };
}, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`/api/reservations`);
      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }
      const data = await response.json();
      setReservationsDTO(
        data.map((res) => {
          const reservation = new Reservation(res);
          return {
            ...reservation,
            startTime: reservation.formatTime(
              reservation.getReservationStartTime()
            ),
            endTime: reservation.formatTime(
              reservation.getReservationEndTime()
            ),
            isCoop: reservation.isCooperative(),
          };
        })
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const onDeleteClick = async (reservationId) => {
    setDeletingReservationId(reservationId);
    try {
      const response = await fetch(
        `/api/reservations?reservationId=${reservationId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      setDeleteConfirmation("Reservation deleted successfully");
      setReservationsDTO((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.id !== reservationId
        )
      );
    } catch (err) {
      setDeleteConfirmation(err.message);
      setShowDeleteDialog(true); // Show delete error dialog if deletion is not possible
    }
    setDeletingReservationId(null);
  };

  const onDetailsClick = (reservation) => {
    console.log(reservation);
    setCurrentReservationDetails(reservation);
    setShowDetailsDialog(true);
  };

  const handleCloseDetailsDialog = () => {
    setShowDetailsDialog(false);
    setCurrentReservationDetails(null);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setDeleteConfirmation("");
  };

  return (
    <>
      <ReservationsView
        reservations={reservationsDTO}
        error={error}
        onDetailsClick={onDetailsClick}
        onDeleteClick={onDeleteClick}
        deletingReservationId={deletingReservationId}
      />
      <ReservationDetailsDialogView
        showDialog={showDetailsDialog}
        onCloseDialog={handleCloseDetailsDialog}
        reservationDetails={currentReservationDetails}
      />
      <DeleteDialogView
        showDialog={showDeleteDialog}
        onCloseDialog={handleCloseDeleteDialog}
        deleteConfirmation={deleteConfirmation}
      />
    </>
  );
};

export default ReservationsPresenter;
