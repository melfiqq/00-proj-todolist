import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';

const tasks1: Array<TaskType> = [
  {id: 1, title: "CSS&HTML", isDone: true},
  {id: 2, title: "React", isDone: true},
  {id: 3, title: "PHP", isDone: false}
]

const tasks2: Array<TaskType> = [
  {id: 1, title: "Harry Potter.", isDone: false},
  {id: 2, title: "SashkaKakashka", isDone: true},
  {id: 3, title: "Eat. Pray. Love.", isDone: false}
]

function App() {
  return (
    <div className="App">
      <Todolist title="What to learn: " tasks={tasks1} />
      <Todolist title="What to watch: " tasks={tasks2}/>
    </div>
  );
}

export default App;