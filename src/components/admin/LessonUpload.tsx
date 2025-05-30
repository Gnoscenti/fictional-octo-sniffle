// src/components/admin/LessonUpload.tsx
import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, Timestamp, query, orderBy } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const LessonUpload: React.FC = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [courses, setCourses] = useState<any[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const isAdmin = currentUser?.email === 'admin@yourdomain.com'; // Replace with real admin check

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'courses'));
        const courseList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(courseList);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchModules = async () => {
      if (!selectedCourseId) return;
      try {
        const snapshot = await getDocs(collection(db, `courses/${selectedCourseId}/modules`));
        const moduleList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setModules(moduleList);
      } catch (error) {
        console.error('Failed to fetch modules:', error);
        setModules([]);
      }
    };
    fetchModules();
  }, [selectedCourseId]);

  useEffect(() => {
    const autoDetectOrder = async () => {
      if (!selectedCourseId || !selectedModuleId) return;
      try {
        const lessonsRef = collection(db, `courses/${selectedCourseId}/modules/${selectedModuleId}/lessons`);
        const q = query(lessonsRef, orderBy('order', 'desc'));
        const snapshot = await getDocs(q);
        const highestOrder = snapshot.docs.length > 0 ? snapshot.docs[0].data().order || 0 : 0;
        setOrder(highestOrder + 1);
      } catch (err) {
        console.warn('Could not auto-set order:', err);
      }
    };
    autoDetectOrder();
  }, [selectedModuleId, selectedCourseId]);

  const handleUpload = async () => {
    if (!file || !currentUser || !isAdmin || !selectedModuleId || !selectedCourseId) {
      setStatus('You must be an admin and select all fields including a file, course, and module.');
      return;
    }

    try {
      const storagePath = `lessons/${selectedModuleId}/${file.name}`;
      const fileRef = ref(storage, storagePath);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, `courses/${selectedCourseId}/modules/${selectedModuleId}/lessons`), {
        title,
        order,
        storagePath,
        videoUrl,
        isFree: true,
        createdAt: Timestamp.now(),
      });

      setStatus('Upload and save successful!');
      setTitle('');
      setOrder(0);
      setVideoUrl('');
      setSelectedModuleId('');
      setFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      setStatus('Upload failed. Check console.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Upload a New Lesson</h2>
      {!isAdmin ? (
        <p className="text-red-500">Access Denied: You must be an admin to upload lessons.</p>
      ) : (
        <>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title || course.id}
              </option>
            ))}
          </select>
          <select
            value={selectedModuleId}
            onChange={(e) => setSelectedModuleId(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          >
            <option value="">Select Module</option>
            {modules.map(module => (
              <option key={module.id} value={module.id}>
                {module.title || module.id}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Lesson Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />
          <input
            type="text"
            placeholder="Optional Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile) setFile(droppedFile);
            }}
            className={`w-full border-2 border-dashed rounded mb-4 p-6 text-center ${dragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
          >
            {file ? (
              <span className="text-gray-800">Selected File: {file.name}</span>
            ) : (
              <span className="text-gray-500">Drag & drop a .md file here or click below</span>
            )}
          </div>
          <input
            type="file"
            accept=".md"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full mb-4"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload Lesson
          </button>
          {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
        </>
      )}
    </div>
  );
};

export default LessonUpload;
