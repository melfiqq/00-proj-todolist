import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';

export type FilterValueType = "all" | "completed" | "active"

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "CSS&HTML", isDone: true },
    { id: 2, title: "React", isDone: true },
    { id: 3, title: "PHP", isDone: false },
    { id: 4, title: "Redux", isDone: false }
  ]);
  let [filter, setFilter] = useState<FilterValueType>("all");

  function removeTask(id: number) {
    let resultsTasks = tasks.filter(t => t.id !== id);
    setTasks(resultsTasks);
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true); // Use === instead of =
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false); // Use === instead of =
  }
  
  return (
    <div className="App">
      <Todolist 
        title="What to learn: " 
        tasks={tasksForTodolist} 
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;