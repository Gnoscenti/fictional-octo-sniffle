const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json'); // Path to your service account key

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Course data (using your existing course data)
const courseData = {
  title: "The AI Integration Course",
  description: "Mastering AI from fundamentals to advanced applications.",
  order: 1,
  imageUrl: "path/to/your/course_image.jpg"
};

// Module data
const modulesData = [
  {
    title: "Introduction to AI",
    description: "Fundamentals of artificial intelligence and its applications",
    order: 1,
    lessonIds: [1, 11, 12, 13, 14, 15] // Assign these lesson IDs to Module 1
  },
  {
    title: "Machine Learning Basics",
    description: "Core concepts of machine learning and practical implementations",
    order: 2,
    lessonIds: [16, 17, 18, 19, 2, 20, 21] // Assign these lesson IDs to Module 2
  },
  {
    title: "Advanced AI Concepts",
    description: "Deep learning, neural networks, and advanced applications",
    order: 3,
    lessonIds: [22, 23, 24, 25, 26, 27, 28, 29, 3, 30, 32] // Assign these lesson IDs to Module 3
  }
];

async function migrateFirestoreStructure() {
  try {
    console.log('Starting Firestore structure migration...');
    
    // 1. Create or update course document
    const courseRef = db.collection('courses').doc('course_01_id');
    await courseRef.set(courseData);
    console.log('Course document created/updated');
    
    // 2. Create modules for the course
    for (let i = 0; i < modulesData.length; i++) {
      const moduleId = `module_${(i + 1).toString().padStart(2, '0')}_id`;
      const moduleRef = courseRef.collection('modules').doc(moduleId);
      
      // Store module data without the lessonIds field
      const moduleDataToStore = {...modulesData[i]};
      delete moduleDataToStore.lessonIds;
      await moduleRef.set(moduleDataToStore);
      console.log(`Module ${i + 1} created`);
      
      // 3. Migrate lessons for each module
      const lessonIds = modulesData[i].lessonIds;
      for (const lessonId of lessonIds) {
        // Get the lesson from the top-level collection
        const oldLessonRef = db.collection('lessons').doc(lessonId.toString());
        const oldLessonDoc = await oldLessonRef.get();
        
        if (oldLessonDoc.exists) {
          const lessonData = oldLessonDoc.data();
          
          // Add any missing required fields
          const enhancedLessonData = {
            ...lessonData,
            title: lessonData.title || `Lesson ${lessonId}`,
            order: lessonData.order || parseInt(lessonId),
            durationMinutes: lessonData.durationMinutes || 15,
            isFree: lessonData.isFree !== undefined ? lessonData.isFree : (i === 0), // First module lessons are free
            videoUrl: lessonData.videoUrl || "",
            markdownContentPath: lessonData.markdownContentPath || `courses/course_01_id/modules/${moduleId}/lessons/lesson_${lessonId}.md`
          };
          
          // Create the lesson in the proper subcollection
          const newLessonRef = moduleRef.collection('lessons').doc(`lesson_${lessonId}`);
          await newLessonRef.set(enhancedLessonData);
          console.log(`Lesson ${lessonId} migrated to Module ${i + 1}`);
        } else {
          console.log(`Lesson ${lessonId} not found in top-level collection, skipping`);
        }
      }
    }
    
    console.log('Firestore structure migration completed successfully!');
    console.log('NOTE: The original top-level lessons collection was preserved. You can delete it manually after verifying the migration.');
    
  } catch (error) {
    console.error('Error migrating Firestore structure:', error);
  }
}

// Run the migration
migrateFirestoreStructure();
