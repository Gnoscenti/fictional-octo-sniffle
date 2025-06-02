import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player';
import { mockCourseData } from '../mockCourseData'; // Import mock data
import { Course, Module, Lesson as LessonType } from '../types/course'; // Import types
import { useAuth } from '../context/AuthContext'; // For gating logic

const LessonPage: React.FC = () => {
  const { courseId, moduleId, lessonId } = useParams<{ courseId: string; moduleId: string; lessonId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<LessonType | null>(null);
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!courseId || !moduleId || !lessonId) {
      setError("Course, module, or lesson ID missing.");
      setLoading(false);
      return;
    }

    const currentCourse = mockCourseData.find(c => c.id === courseId);
    if (!currentCourse) {
      setError(`Course with ID ${courseId} not found.`);
      setLoading(false);
      return;
    }
    setCourseTitle(currentCourse.title);

    const currentModule = currentCourse.modules.find(m => m.id === moduleId);
    if (!currentModule) {
      setError(`Module with ID ${moduleId} in course ${courseId} not found.`);
      setLoading(false);
      return;
    }
    setModuleTitle(currentModule.title);

    const currentLesson = currentModule.lessons.find(l => l.id === lessonId);
    if (!currentLesson) {
      setError(`Lesson with ID ${lessonId} in module ${moduleId} not found.`);
      setLoading(false);
      return;
    }
    setLesson(currentLesson);

    // Gating Logic
    if (currentLesson.isFree || currentUser) {
      setIsAllowed(true);
      // Fetch markdown content if allowed
      fetch(`/` + currentLesson.contentPath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch lesson content: ${response.statusText}`);
          }
          return response.text();
        })
        .then(text => setMarkdownContent(text))
        .catch(err => {
          console.error("Error fetching markdown:", err);
          setError(`Failed to load lesson content for ${currentLesson.title}.`);
        }) 
        .finally(() => setLoading(false));
    } else {
      setIsAllowed(false);
      setLoading(false);
    }

  }, [courseId, moduleId, lessonId, currentUser]);

  if (loading) return <div className="container mx-auto px-4 py-8 text-center"><p>Loading lesson...</p></div>;
  if (error) return <div className="container mx-auto px-4 py-8 text-center"><p className="text-red-500">{error}</p></div>;
  
  if (!isAllowed) {
    return (
      <div className="container mx-auto px-4 py-8 text-center bg-gray-100 p-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Access Denied</h2>
        <p className="text-gray-700 mb-6">This is a premium lesson. Please <Link to="/signup" className="text-blue-600 hover:underline">sign up</Link> or <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to access.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!lesson) return <div className="container mx-auto px-4 py-8 text-center"><p>Lesson details not found.</p></div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <nav aria-label="breadcrumb" className="mb-6 text-sm text-gray-600">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/courses" className="hover:underline">Courses</Link>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li className="flex items-center">
            {/* Assuming CourseOverviewPage is at /courses or similar that lists modules */}
            <Link to={`/courses`} className="hover:underline">{courseTitle}</Link>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li className="flex items-center">
            <span className="text-gray-500">{moduleTitle}</span>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li className="text-gray-500">
            {lesson.title}
          </li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-6 text-gray-800">{lesson.title}</h1>
      
      {lesson.videoUrl && (
        <div className="mb-8 aspect-video rounded-lg overflow-hidden shadow-md">
          <ReactPlayer url={lesson.videoUrl} width="100%" height="100%" controls />
        </div>
      )}

      <article className="prose lg:prose-xl max-w-none bg-gray-50 p-6 rounded-md">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </article>
      
      {/* TODO: Add navigation to next/previous lesson later */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => navigate(-1)} 
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-6 rounded transition"
        >
          Back to Module
        </button>
      </div>
    </div>
  );
};

export default LessonPage;

