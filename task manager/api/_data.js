// Shared in-memory task storage
let tasks = [
  {
    id: 1,
    title: 'Design new landing page',
    description: 'Create a modern landing page for the new product',
    status: 'in-progress',
    dueDate: '2026-03-15'
  },
  {
    id: 2,
    title: 'Fix login bugs',
    description: 'Address issues reported in the login flow',
    status: 'pending',
    dueDate: '2026-03-12'
  },
  {
    id: 3,
    title: 'Write documentation',
    description: 'Complete the API documentation',
    status: 'completed',
    dueDate: '2026-03-10'
  },
];

let nextId = 4;

export { tasks, nextId };
