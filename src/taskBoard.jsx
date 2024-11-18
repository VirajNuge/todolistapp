import React, { useState, useEffect } from 'react';

function TaskBoard() {
    // State variables
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskDes, setTaskDes] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [tasks, setTasks] = useState([]); // Task list state

    // Modal handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Input handlers
    const handleTaskName = (e) => setTaskName(e.target.value);
    const handleTaskDate = (e) => setTaskDate(e.target.value);
    const handleTaskTime = (e) => setTaskTime(e.target.value);
    const handleTaskDes = (e) => setTaskDes(e.target.value);
    const handleTaskPriority = (e) => {
        console.log('Selected Priority:', e.target.value); // Debugging output
        setTaskPriority(e.target.value);
    };

    // Task handlers
    const handleCheckboxChange = (taskIndex) => {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].isCompleted = !updatedTasks[taskIndex].isCompleted;
        setTasks(updatedTasks); // Update the task list state
    };

    const handleDeleteTask = (taskIndex) => {
        console.log('Deleting task at index:', taskIndex); // Debugging line
        const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
        setTasks(updatedTasks); // Update state after task removal
    };

    const addTask = () => {
        if (taskName && taskDate) {
            const newTask = {
                taskName,
                taskDate,
                taskTime,
                taskPriority,
                taskDes,
                isCompleted: false
            };

            // Add new task to the existing tasks array
            setTasks((prevTasks) => [...prevTasks, newTask]);

            // Reset input fields
            setTaskName('');
            setTaskDate('');
            setTaskTime('');
            setTaskPriority('');
            setTaskDes('');
            closeModal();
        } else {
            alert('Task Name and Due Date are required!');
        }
    };

    // Close modal if clicked outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close modal only if clicking outside the modal content
            if (event.target.id === 'taskModal' && !event.target.closest('.modal-content')) {
                closeModal();
            }
        };

        if (isModalOpen) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => window.removeEventListener('click', handleClickOutside);
    }, [isModalOpen]);

    return (
        <>
            {/* Task Board Container */}
            <div className="taskBoardContainer">
                <h1>Task Board 📌</h1>
                <button onClick={openModal}>Add Task 🤙</button>
            </div>

            {/* Modal for adding tasks */}
            {isModalOpen && (
                <div id="taskModal" className="modal">
                    <div className="modal-content">
                        <span className="closebutton" onClick={closeModal}>
                            &times;
                        </span>
                        <h1 className="taskpopuptitle">Add Task</h1>

                        <div>
                            <div className="tasknamecss">
                                <p className="tasklabel">Task Name:</p>
                                <input value={taskName} onChange={handleTaskName} type="text" />
                            </div>
                            <div className="taskdatecss">
                                <p className="tasklabel">Due Date:</p>
                                <input value={taskDate} onChange={handleTaskDate} type="date" />
                            </div>
                            <div className="tasktimecss">
                                <p className="tasklabel">Time Allocated:</p>
                                <input value={taskTime} onChange={handleTaskTime} type="number" />
                            </div>
                            <div className="taskpriorcss">
                                <p className="tasklabel">Priority Level:</p>
                                <select value={taskPriority} onChange={handleTaskPriority}>
                                    <option value="">Select Level</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div className="taskdescss">
                                <p className="tasklabel">Task Description:</p>
                                <textarea value={taskDes} onChange={handleTaskDes}></textarea>
                            </div>
                        </div>

                        <center>
                            <button onClick={addTask} className="submittaskbutton">
                                Add Task
                            </button>
                        </center>
                    </div>
                </div>
            )}

            {/* View tasks section */}
            <div className="alltaskscontainerinside">
                <div className="titleheadline">
                    <center><h1>VIEW TASKS HERE</h1></center>
                </div>
            </div>

            {/* Tasks display */}
            <div className="alltasktoview">
                {tasks.length === 0 ? (
                    <p>No tasks available. Add some tasks to get started!</p>
                ) : (
                    <ol>
                        {tasks.map((task, index) => (
                            <li key={index}>
                                <div className={`taskcontainer ${task.isCompleted ? 'completed' : ''}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={task.isCompleted || false}
                                        onChange={() => handleCheckboxChange(index)} 
                                    />
                                    <div className="includetext">
                                        <p>Task Name: {task.taskName}</p>
                                        <p>Due Date: {task.taskDate}</p>
                                        <p>Time Allocated: {task.taskTime || "Not specified"}</p>
                                        <p>Priority Level: {task.taskPriority || "Not specified"}</p>
                                        <p>Description: {task.taskDes || "No description"}</p>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDeleteTask(index)} // Delete on click
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </>
    );
}

export default TaskBoard;
