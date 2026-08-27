import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  try {
    const userProfile = {
      goal: 'Placement',
      experienceLevel: 'Beginner',
      programmingLanguage: 'Java',
      targetRole: 'Software Developer',
      hoursPerDay: 2,
      subjects: ['DSA', 'Web Development'],
    };

    const prompt = `
You are an expert technical interview preparation roadmap generator.

Create a COMPLETE and DETAILED learning roadmap based on the following user profile:

${JSON.stringify(userProfile, null, 2)}

IMPORTANT REQUIREMENTS:

1. Generate the roadmap specifically for this user's goal, experience level,
   programming language, target role, available study time, and selected subjects.

2. Do NOT give only high-level topics.

3. For every major topic, provide detailed subtopics.

4. For DSA, include the important topics and their individual concepts,
   techniques, and commonly asked interview patterns.

   Example:
   Arrays
   - Array Traversal
   - Searching
   - Sorting
   - Two Pointer
   - Sliding Window
   - Prefix Sum
   - Kadane's Algorithm
   - Binary Search
   etc.

5. For Linked Lists, include individual concepts such as:
   - Singly Linked List
   - Doubly Linked List
   - Circular Linked List
   - Traversal
   - Insertion
   - Deletion
   - Reverse Linked List
   - Find Middle
   - Detect Cycle
   - Merge Linked Lists
   - Intersection
   - LRU Cache
   etc.

6. For Web Development, go into individual concepts.

   HTML:
   - Semantic HTML
   - Forms
   - Tables
   - Multimedia
   - Accessibility
   etc.

   CSS:
   - Selectors
   - Box Model
   - Flexbox
   - Grid
   - Responsive Design
   - Positioning
   - Animations
   etc.

   JavaScript:
   - Variables
   - Data Types
   - Functions
   - Arrays
   - Objects
   - DOM
   - Events
   - ES6+
   - Promises
   - Async/Await
   - Fetch API
   etc.

7. Since the target role is Software Developer, include topics that are
   commonly useful for software developer interviews.

8. Organize everything hierarchically:
   Subject → Topic → Subtopic.

9. Do not include explanations, tutorials, or paragraphs.
   Return ONLY valid JSON.

10. Every subtopic must have:
    - id
    - name
    - completed

11. The completed value must initially be false.

12. Do not duplicate topics.

13. Make the roadmap comprehensive enough for interview preparation.

Use exactly this JSON structure:

{
  "roadmap": [
    {
      "subject": "DSA",
      "topics": [
        {
          "id": "dsa-arrays",
          "name": "Arrays",
          "completed": false,
          "subtopics": [
            {
              "id": "dsa-arrays-traversal",
              "name": "Array Traversal",
              "completed": false
            }
          ]
        }
      ]
    }
  ]
}
`;

    const interaction = await ai.interactions.create({
      model: 'gemini-3.6-flash',
      input: prompt,
    });

    console.log('\nGemini response:\n');

    console.log(interaction.output_text);

  } catch (error) {
    console.error('\nGemini API error:\n');
    console.error(error);
  }
}

testGemini();