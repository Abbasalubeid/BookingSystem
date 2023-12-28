import React, { useState, useEffect } from 'react';
import ListManagementView from '@/views/ListManagementView';
import CreateListDialogView from '@/views/CreateListDialogView';
import Course from '../models/Course';
import List from "@/models/List";

const AdminListPresenter = ({}) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lists, setLists] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [description, setDescription] = useState(null)
  const [location, setLocation] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [sessionLength, setSessionLength] = useState(null)
  const [totalSessions, setTotalSessions] = useState(null)

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses', {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        const processedData = data.map(item => {
          const course = new Course(item);
          return {
            id: course.id,
            title: course.title
          };
        });
        setCourses(processedData);
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchLists = async (id) => {
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

        setLists(newProcessedData)
      } else {
        console.error('Error fetching course list:');
      }
    } catch (error) {
        console.error('Access error: ', error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      const response = await fetch('/api/admin/deleteList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listId }),
      });
  
      if (response.ok) {
        setLists(lists.filter(list => list.id !== listId));
      } else {
        alert('List not deleted');
      }
    } catch (error) {
      alert('Access error: presenter', error);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    //setBookingConfirmation(null);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  }

  const handleCreateList = async () => {
    setIsBooking(true);
  
    const newListData = {
      course_id: selectedCourse, 
      admin_id: null, 
      description: description,
      location: location,
      start: formatDate(startTime), 
      interval: sessionLength,
      max_slots: totalSessions
    };

    
  
    try {
      console.log(newListData);
      const response = await fetch('/api/admin/addList', {
        method: 'POST',
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({newListData})
      });
  
      if (response.ok) {
        fetchLists(selectedCourse);
      } else {
      }
    } catch (error) {
      console.error('Error creating new list: ', error);
    }
  
    setIsBooking(false);
    setShowDialog(false);
  };

  const handleSelectCourse = (courseId) => {
    setSelectedCourse(courseId);
    fetchLists(courseId);
  };

  const handleAddListClick = () => {
    setShowDialog(true);
  } 

  return (
    <>
    <ListManagementView
      courses={courses}
      selectedCourse={selectedCourse}
      onSelectCourse={handleSelectCourse}
      lists={lists}
      onDeleteList={handleDeleteList}
      onAddListClick={handleAddListClick}
    />
    <CreateListDialogView
      courseId={selectedCourse}
      showDialog={showDialog}
      onCloseDialog={handleCloseDialog}
      onCreateList={handleCreateList}
      setDescription={setDescription}
      setLocation={setLocation}
      setStartTime={setStartTime}
      setSessionLength={setSessionLength}
      setTotalSessions={setTotalSessions}>
        
    </CreateListDialogView>

    </>
  );
};

export default AdminListPresenter;
