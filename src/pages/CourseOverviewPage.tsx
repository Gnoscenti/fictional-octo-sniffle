import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockCourseData } from '../mockCourseData'; // Import mock data
import { Course, Module, Lesson } from '../types/course'; // Import types
import { useAuth } from '../context/AuthContext'; // For gating logic

const CourseOverviewPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const course: Course | undefined = mockCourseData[0]; // Assuming one main course for now

  if (!course) {
    return <p className="text-center text-red-500">Course data not found.</p>;
  }

  const handleLessonClick = (lesson: Lesson, moduleId: string) => {
    if (!lesson.isFree && !currentUser) {
      // For paid lessons, if user is not logged in, redirect to login/signup
      // Or show a modal prompting to login/subscribe
      alert("This is a premium lesson. Please sign up or log in to access.");
      navigate('/signup'); // Or '/login'
      return;
    }
    // Navigate to the lesson page
    // The lessonId in the route could be a combination of moduleId and lessonId for uniqueness if needed
    navigate(`/courses/${course.id}/modules/${moduleId}/lessons/${lesson.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{course.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{course.description}</p>

        {course.modules.map((module: Module) => (
          <div key={module.id} className="mb-10 p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">{module.title}</h2>
            <p className="text-gray-600 mb-5 text-sm">{module.description}</p>
            <ul className="space-y-3">
              {module.lessons.map((lesson: Lesson) => (
                <li 
                  key={lesson.id} 
                  onClick={() => handleLessonClick(lesson, module.id)}
                  className={`flex justify-between items-center p-4 rounded-md transition-all duration-200 ease-in-out cursor-pointer 
                              ${(!lesson.isFree && !currentUser) 
                                ? 'bg-gray-100 text-gray-400 hover:bg-gray-200' 
                                : 'bg-blue-50 hover:bg-blue-100 text-gray-700'}
                              ${lesson.isFree ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'}
                            `}
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-blue-500">
                      {/* Simple icon placeholder - replace with actual icons later */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="font-medium">{lesson.title} (Order: {lesson.order})</span>
                  </div>
                  <div className="flex items-center">
                    {lesson.isFree && (
                      <span className="text-xs bg-green-200 text-green-700 px-2 py-1 rounded-full mr-2">Free</span>
                    )}
                    {(!lesson.isFree && !currentUser) && (
                      <span className="text-xs bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full mr-2">Premium</span>
                    )}
                    <span className="text-gray-400 text-sm">
                      {(!lesson.isFree && !currentUser) ? 'Login to access' : 'View Lesson'}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseOverviewPage;

