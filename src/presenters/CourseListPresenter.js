import React, { useState, useEffect, Suspense } from "react";
import List from "../models/List";
import CourseListView from "@/views/CourseListView";
import ReservationDialogView from "@/views/ReservationDialogView";

const CourseListPresenter = ({ id }) => {
  const [listData, setListData] = useState([]);
  const [listModelsMap, setListModelsMap] = useState({});
  const [error, setError] = useState(null);
  const [loadingListId, setLoadingListId] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [nextAvailableTime, setNextAvailableTime] = useState(null);

  useEffect(() => {
    fetchLists();
  }, [id]);

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

        setListData(newProcessedData);
        setListModelsMap(newModelsMap);
      } else {
        setError("Failed to load course lists");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBadgeClick = async (listId) => {
    setLoadingListId(listId);
    const listModel = listModelsMap[listId];

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
  };

  return (
    <Suspense>
      <>
        <CourseListView
          listData={listData}
          error={error}
          onBadgeClick={handleBadgeClick}
          loadingListId={loadingListId}
          showDialog={showDialog}
          nextAvailableTime={nextAvailableTime}
          onCloseDialog={handleCloseDialog}
        />
        <ReservationDialogView 
                        showDialog={showDialog} 
                        onCloseDialog={handleCloseDialog} 
                        nextAvailableTime={nextAvailableTime}>
        
        </ReservationDialogView>
      </>
    </Suspense>
  );
};

export default CourseListPresenter;
