import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

const FeedbackView = ({ courses, onSelectCourse, selectedCourse, feedbacks }) => {
    console.log(feedbacks);
    const handleSelectChange = (value) => {
    onSelectCourse(value);
    };

    const courseTitle = selectedCourse !== null ? courses[selectedCourse - 1].title : "Course Sessions";

    return (
    <div className="container mx-auto p-4">
        <Select onValueChange={handleSelectChange} className="mb-4">
        <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm">
            <SelectValue placeholder="Select Course" > {courseTitle} </SelectValue>
        </SelectTrigger>
        <SelectContent className="border-gray-300 rounded-md shadow-sm">
            {courses.map(course => (
            <SelectItem key={course.id} value={course.id} className="hover:bg-gray-100">
                {course.title}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>

        <br></br>

        {selectedCourse && (
        <div>
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className="mb-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden border border-gray-200">
                <CardHeader className="bg-gray-100 px-4 py-2">
                    <CardTitle className="text-lg font-bold text-gray-700">Rating: {feedback.rating}</CardTitle>
                </CardHeader>
                <CardContent className="px-4 py-3 text-gray-600">
                    {feedback.comment}
                </CardContent>
                <CardFooter className="px-4 py-2 bg-gray-50 text-gray-500 text-sm">
                    Feedback by: {feedback.username}
                </CardFooter>
            </Card>

          ))}
        </div>
        )}
    </div>
    );
};

export default FeedbackView;
