import { useState, useEffect } from 'react';
import  Check  from './assets/check_circle.svg';

const TaskApp = () => {
  // State to store tasks 
  let [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(null); // For editing mode
  const [editTask, setEditTask] = useState(""); // For the task being edited
  const [filter, setFilter] = useState("all"); // For filtering the tasks

  // Load tasks from localStorage on initial load
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
    }
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
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
    document.querySelector(`#id-${index}`).classList.toggle('img-container-completed');
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
    let updatedTasks = tasks.filter((task, i) => i !== index);
    if( tasks[1]=== undefined && index === 0){
      localStorage.setItem('tasks',[])
    }
    setTasks(updatedTasks);
  };

  // Start editing a task
  const startEditing = (index, currentText) => {
    setIsEditing(index);
    setEditTask(currentText);
  };

  // Save the edited task
  const saveTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, text: editTask };
      }
      return task;
    });
    setTasks(updatedTasks);
    setIsEditing(null);
  };

  // Get the number of completed tasks
  const completedCount = tasks.filter(task => task.completed).length;


  // Filter tasks based on the filter state (all, completed, or incomplete)
  const filterTask = (task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return(task.completed);
    } else {
      return(!task.completed);
    }
  };

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
        <button className='btn-save' onClick={addTask}>Add Task</button>
      </div>

      <div className='task-filters'>
        <h2>Filter</h2>
        <label htmlFor="all">All</label>
        <input 
          type="radio" 
          name="task_filter" 
          id="all" 
          value="all" 
          onChange={() => setFilter('all')}
          checked={filter === 'all'}
        />
        
        <label htmlFor="complete">Completed</label>
        <input 
          type="radio" 
          name="task_filter" 
          id="complete" 
          value="complete"
          onChange={() => setFilter('completed')}
          checked={filter === 'completed'}
        />
        
        <label htmlFor="incomplete">Incomplete</label>
        <input 
          type="radio" 
          name="task_filter" 
          id="incomplete" 
          value="incomplete"
          onChange={() => setFilter('incomplete')}
          checked={filter === 'incomplete'}
        />
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          filterTask(task)) && (
            <li key={index} className={task.completed ? 'completed' : ''}>
            {isEditing === index ? (
              <>
                <input
                  className='edit-text-input'
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button className='btn-save' onClick={() => saveTask(index)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleCompletion(index)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
                <label id={`id-${index}`} htmlFor={`check-${index}`} className={task.completed ? 'img-container-completed' : 'img-container'}>
                  <img src={Check} alt="check"/>
                </label>
                <input
                  type="checkbox"
                  className='input-check'
                  id={`check-${index}`}
                  checked={task.completed}
                  onChange={() =>toggleCompletion(index)}
                />
                <button className='btn-save' onClick={() => startEditing(index, task.text)}>Edit</button>
                <button className='btn-delete' onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>)
        )}
      </ul>
    </div>
  );
};

export default TaskApp;
