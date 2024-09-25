import { useState, useEffect } from 'react';
import  Check  from './assets/check_circle.svg';
const TaskApp = () => {
  // State to store the tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from localStorage on initial load
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask(''); // Clear input
    }
  };

  // Toggle task completion
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Get the number of completed tasks
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="task-info">
        Completed {completedCount} out of {tasks.length} tasks
      </div>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input type='text' value={task.text}></input>
            <button onClick={() => deleteTask(index)}>edit</button>
            <label htmlFor={`check-${index}`}>
              <img src='/assets/check_circle.svg' alt="check" width="50" height="50" />
            </label>
            <input
              id={`check-${index}`}
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(index)}/>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskApp;