import React, { useEffect, useState } from "react";
import "./App.css";
import { ReactDOM } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks);
  }, []);

  function addTasks(name) {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  }

function removeTask(indexToRemove){
  setTasks(prev => {
    return prev.filter((taskObject,index) => {
      return index !== indexToRemove
    })
  })

}

  function updateTaskDone(taskIndex, newDone){
    setTasks( prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    })

  }
  function getMessage(){
    const percentage = numberComplete/numberTotal * 100;
    if(percentage === 0){
      return 'Try to do at least one! ';
    }
    if (percentage === 100){
      return 'Nice Job for today!';
    }
    return 'Keep it going';

  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;
  

  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTasks} />
      {tasks.map((task, index) => (
        <Task {...task} 
        onTrash={() => removeTask(index)}
        onToggle ={done => updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;
