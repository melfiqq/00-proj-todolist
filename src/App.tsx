import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';
import { v1 } from 'uuid';

export type FilterValueType = "all" | "completed" | "active"

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS&HTML", isDone: true },
    { id: v1(), title: "React", isDone: true },
    { id: v1(), title: "PHP", isDone: false },
    { id: v1(), title: "Redux", isDone: false }
  ]);
  let [filter, setFilter] = useState<FilterValueType>("all");

  function removeTask(id: string) {
    let resultsTasks = tasks.filter(t => t.id !== id);
    setTasks(resultsTasks);
  }

  function addTask(title: string) {
    let newTask = { 
      id: v1(), 
      title: title, 
      isDone: false 
    }
    let newTasks = [newTask, ...tasks] // array destructuring - if write [newTask, tasks] - it will be new array and one more array. if write [newTask, ...tasks] - it is new array + ELEMENTS from the initial array.
    setTasks(newTasks)
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
        addTask={addTask}
      />
    </div>
  );
}

export default App;