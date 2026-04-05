// API Test Suite for TaskFlow Backend
// Run this file using: node api-test.js
// Make sure your dev server is running: npm run dev

const API_BASE = 'http://localhost:3000/api';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.cyan}${'='.repeat(50)}\n${msg}\n${'='.repeat(50)}${colors.reset}\n`)
};

async function testGetAllTasks() {
  log.header('TEST 1: GET All Tasks');
  try {
    const response = await fetch(`${API_BASE}/tasks`);
    const data = await response.json();
    
    if (response.status === 200 && data.success) {
      log.success(`Retrieved ${data.count} tasks`);
      console.log(JSON.stringify(data.data, null, 2));
      return { success: true, data };
    } else {
      log.error(`Failed to get tasks: ${data.error}`);
      return { success: false };
    }
  } catch (error) {
    log.error(`Request failed: ${error.message}`);
    return { success: false };
  }
}

async function testCreateTask() {
  log.header('TEST 2: Create New Task');
  const taskData = {
    title: 'Test Task from API',
    description: 'This is a test task created via API',
    status: 'pending',
    dueDate: '2026-04-20'
  };
  
  try {
    const response = await fetch(`${API_BASE}/tasks/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData)
    });
    
    const data = await response.json();
    
    if (response.status === 201 && data.success) {
      log.success('Task created successfully');
      console.log(`New Task ID: ${data.data.id}`);
      console.log(JSON.stringify(data.data, null, 2));
      return { success: true, taskId: data.data.id };
    } else {
      log.error(`Failed to create task: ${data.error}`);
      return { success: false };
    }
  } catch (error) {
    log.error(`Request failed: ${error.message}`);
    return { success: false };
  }
}

async function testUpdateTask(taskId) {
  log.header('TEST 3: Update Task');
  const updateData = {
    id: taskId,
    status: 'in-progress',
    description: 'Updated description via API'
  };
  
  try {
    const response = await fetch(`${API_BASE}/tasks/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    
    const data = await response.json();
    
    if (response.status === 200 && data.success) {
      log.success('Task updated successfully');
      console.log(JSON.stringify(data.data, null, 2));
      return { success: true };
    } else {
      log.error(`Failed to update task: ${data.error || data.message}`);
      return { success: false };
    }
  } catch (error) {
    log.error(`Request failed: ${error.message}`);
    return { success: false };
  }
}

async function testDeleteTask(taskId) {
  log.header('TEST 4: Delete Task');
  try {
    const response = await fetch(`${API_BASE}/tasks/delete?id=${taskId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (response.status === 200 && data.success) {
      log.success(`Task ${taskId} deleted successfully`);
      console.log(JSON.stringify(data.data, null, 2));
      return { success: true };
    } else {
      log.error(`Failed to delete task: ${data.error}`);
      return { success: false };
    }
  } catch (error) {
    log.error(`Request failed: ${error.message}`);
    return { success: false };
  }
}

async function testErrorHandling() {
  log.header('TEST 5: Error Handling');
  
  try {
    // Test: Create task without title
    log.info('Testing: Create task without title');
    const response = await fetch(`${API_BASE}/tasks/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: 'No title' })
    });
    
    const data = await response.json();
    if (response.status === 400) {
      log.success('Correctly rejected empty title');
    } else {
      log.error('Should have rejected empty title');
    }
  } catch (error) {
    log.error(`Request failed: ${error.message}`);
  }
}

async function runAllTests() {
  log.header('TaskFlow API Test Suite');
  log.info(`Base URL: ${API_BASE}`);
  log.info('Make sure your dev server is running: npm run dev');
  
  // Test 1: Get all tasks
  const tasksResult = await testGetAllTasks();
  
  // Test 2: Create task
  const createResult = await testCreateTask();
  
  // Test 3: Update task (if creation was successful)
  if (createResult.success) {
    await testUpdateTask(createResult.taskId);
  } else {
    log.warn('Skipping update test as task creation failed');
  }
  
  // Test 4: Delete task
  if (createResult.success) {
    await testDeleteTask(createResult.taskId);
  } else {
    log.warn('Skipping delete test as task creation failed');
  }
  
  // Test 5: Error handling
  await testErrorHandling();
  
  log.header('Tests Complete');
  log.success('All tests finished');
}

// Run tests
runAllTests();
