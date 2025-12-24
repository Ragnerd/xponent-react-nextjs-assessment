export const mockQuizzes = [
  {
    id: "quiz-frontend",
    title: "Frontend Developer Quiz",
    position: "Frontend Developer",
    groups: [
      {
        id: "group-js",
        title: "JavaScript",
        questions: [
          {
            id: "q-js-1",
            type: "mcq",
            question: "Which of the following are JavaScript data types?",
            options: [
              { id: "a", text: "String", correct: true },
              { id: "b", text: "Number", correct: true },
              { id: "c", text: "Float", correct: false },
              { id: "d", text: "Boolean", correct: true },
            ],
            points: 5,
          },
          {
            id: "q-js-2",
            type: "text",
            question: "Explain event delegation in JavaScript.",
            points: 10,
          },
        ],
      },
      {
        id: "group-react",
        title: "React",
        questions: [
          {
            id: "q-react-1",
            type: "mcq",
            question: "What does useEffect run by default?",
            options: [
              { id: "a", text: "On every render", correct: true },
              { id: "b", text: "Only once", correct: false },
              { id: "c", text: "Only on state change", correct: false },
            ],
            points: 5,
          },
        ],
      },
    ],
  },
];
