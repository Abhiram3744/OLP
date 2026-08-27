import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post('/generate', async (req, res) => {
  try {
    const userProfile = req.body;

    console.log('Received user profile:');
    console.log(userProfile);

    const prompt = `
You are an expert technical interview preparation roadmap generator.

Your task is to create a VERY DETAILED, comprehensive and personalized
learning roadmap based on the user's profile below.

USER PROFILE:
${JSON.stringify(userProfile, null, 2)}

IMPORTANT INSTRUCTIONS:

1. PERSONALIZATION
Create the roadmap specifically for this user based on:
- current status
- degree and branch
- current year
- coding experience
- target role
- preparation goal
- programming languages
- skill levels for each subject
- daily study time
- study days per week
- target timeline
- selected focus areas

2. ONLY SELECTED FOCUS AREAS
The user's selected focus areas are extremely important.

If the user selected DSA, generate a complete DSA roadmap.

If the user selected Web Development / Development, generate the
relevant development roadmap.

If the user selected Projects, generate project-related topics.

If the user selected Aptitude, generate aptitude topics.

Do not add unrelated subjects that the user did not select.

However, include fundamental concepts that are necessary prerequisites
for a selected subject.

3. DO NOT GIVE ONLY HIGH-LEVEL TOPICS

The roadmap must go several levels deep.

For example, DO NOT simply return:

DSA
- Arrays
- Linked List
- Trees
- Graphs

Instead, return detailed topics and subtopics.

Example:

DSA
  Arrays
    - Array Traversal
    - Insertion and Deletion
    - Searching
    - Sorting
    - Prefix Sum
    - Difference Array
    - Two Pointer
    - Sliding Window
    - Kadane's Algorithm
    - Majority Element
    - Dutch National Flag
    - Subarray Problems
    - Matrix Problems
    - Merge Intervals
    - Binary Search on Arrays

  Linked List
    - Singly Linked List
    - Doubly Linked List
    - Circular Linked List
    - Traversal
    - Insertion
    - Deletion
    - Reverse Linked List
    - Find Middle Node
    - Fast and Slow Pointer
    - Cycle Detection
    - Cycle Removal
    - Merge Two Sorted Lists
    - Intersection of Linked Lists
    - Palindrome Linked List
    - LRU Cache
    - Linked List Sorting

  Stack
    - Stack implementation
    - Array implementation
    - Linked List implementation
    - Valid Parentheses
    - Min Stack
    - Next Greater Element
    - Previous Greater Element
    - Monotonic Stack
    - Infix / Prefix / Postfix
    - Expression Evaluation

  Queue
    - Queue implementation
    - Circular Queue
    - Deque
    - Priority Queue
    - Sliding Window Maximum

  Trees
    - Binary Tree
    - Tree Traversal
    - Preorder
    - Inorder
    - Postorder
    - Level Order
    - Height of Tree
    - Diameter
    - Balanced Binary Tree
    - Binary Search Tree
    - BST Search
    - BST Insertion
    - BST Deletion
    - Lowest Common Ancestor
    - Tree Views
    - Heap
    - Trie

  Graphs
    - Graph representation
    - Adjacency Matrix
    - Adjacency List
    - BFS
    - DFS
    - Connected Components
    - Cycle Detection
    - Topological Sort
    - Shortest Path
    - Dijkstra's Algorithm
    - Bellman-Ford
    - Floyd-Warshall
    - Minimum Spanning Tree
    - Prim's Algorithm
    - Kruskal's Algorithm
    - Disjoint Set Union

Do this level of detail for EVERY selected subject.

4. WEB DEVELOPMENT

If Web Development is selected, cover the complete relevant stack.

For example:

HTML
  - HTML structure
  - Semantic HTML
  - Headings
  - Paragraphs
  - Links
  - Images
  - Forms
  - Tables
  - Lists
  - Accessibility
  - SEO basics

CSS
  - Selectors
  - Box Model
  - Display
  - Positioning
  - Flexbox
  - Grid
  - Responsive Design
  - Media Queries
  - Animations
  - Transitions
  - CSS specificity

JavaScript
  - Variables
  - Data Types
  - Functions
  - Scope
  - Hoisting
  - Arrays
  - Objects
  - Destructuring
  - Spread / Rest
  - DOM
  - Events
  - Event Delegation
  - Promises
  - Async / Await
  - Fetch API
  - Error Handling
  - Closures
  - Callbacks
  - Modules
  - ES6+
  - Local Storage

React
  - Components
  - JSX
  - Props
  - State
  - Events
  - Conditional Rendering
  - Lists
  - Forms
  - useState
  - useEffect
  - useContext
  - useRef
  - Custom Hooks
  - React Router
  - API Integration
  - Authentication
  - Protected Routes

Node.js
  - Node fundamentals
  - Modules
  - npm
  - File System
  - Environment Variables
  - HTTP
  - Async Programming
  - Error Handling

Express.js
  - Express setup
  - Routes
  - GET
  - POST
  - PUT
  - PATCH
  - DELETE
  - Middleware
  - Request
  - Response
  - REST APIs
  - Error Handling
  - Authentication
  - Authorization
  - API security

Do the same for all other selected areas.

5. PROGRAMMING LANGUAGE

Use the programming language selected by the user to personalize
examples and topics.

For example, if Java is selected, include relevant Java concepts.

If Python is selected, include relevant Python concepts.

Do not generate complete programming courses unrelated to the user's
selected preparation areas.

6. EXPERIENCE LEVEL

Adjust the starting point based on the user's skill levels.

For subjects marked "Never Learned":
start from fundamentals.

For "Beginner":
include fundamentals and gradually move to interview-level concepts.

For "Intermediate":
avoid spending too much time on basic concepts and move toward
intermediate and advanced interview topics.

For "Strong":
focus mainly on advanced concepts, patterns, problem solving and
interview preparation.

7. INTERVIEW FOCUS

Include concepts that are commonly useful for technical interviews,
such as:
- patterns
- algorithms
- data structures
- problem-solving techniques
- complexity analysis
- practical development concepts
- debugging
- API concepts
- system/design fundamentals when appropriate

8. COMPLETENESS

Be comprehensive.

Do not stop after 5 or 10 topics.

For every selected subject, include the important topics and
interview-relevant subtopics that a beginner/intermediate candidate
would reasonably need for the selected target role.

9. NO DUPLICATES

Do not duplicate the same topic or subtopic within a subject.

10. COMPLETION STATUS

Every subject, topic and subtopic must initially have:

"completed": false

11. IDS

Every subject, topic and subtopic must have a unique stable ID.

Use lowercase kebab-case IDs.

Examples:

"dsa"
"dsa-arrays"
"dsa-arrays-two-pointer"

12. OUTPUT FORMAT

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT use code fences.

Do NOT write explanations before or after the JSON.

Use exactly this structure:

{
  "roadmap": [
    {
      "id": "dsa",
      "subject": "DSA",
      "completed": false,
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
            },
            {
              "id": "dsa-arrays-two-pointer",
              "name": "Two Pointer",
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

    let text = interaction.output_text.trim();

    console.log('Gemini raw response:');
    console.log(text);

    // Remove markdown code fences if Gemini adds them
    text = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    // Convert JSON string into actual JavaScript object
    const parsedRoadmap = JSON.parse(text);

    console.log('Parsed roadmap successfully.');

    res.json({
      success: true,
      roadmap: parsedRoadmap.roadmap,
    });

  } catch (error) {
    console.error('Roadmap generation error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to generate roadmap',
      error: error.message,
    });
  }
});

export default router;