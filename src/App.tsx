import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';
import { v1 } from 'uuid';

export type FilterValueType = "all" | "completed" | "active"

type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

function App() {

  function removeTask(id: string, todolistId: string) {
    let tasks =  tasksObj[todolistId] //обращаемся к объекту, достаем тудулист той айдишки, которая надо. 
    let resultsTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = resultsTasks
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { 
      id: v1(), 
      title: title, 
      isDone: false 
    }
    let tasks = tasksObj[todolistId] //обращаемся к объекту, достаем тудулист той айдишки, которая надо. 
    let newTasks = [newTask, ...tasks] // и в этот массив добавляем уже таски - новая таска плюс тот массив, который и был. 
    // array destructuring - if write [newTask, tasks] - it will be new array and one more array. if write [newTask, ...tasks] - it is new array + ELEMENTS from the initial array.
    tasksObj[todolistId] = newTasks //
    setTasks({...tasksObj})
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasksObj.find( t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    /* setTasks([...tasks]) - the same */
    let copy = [ ...tasksObj ] //деструктуризация опять тут
    setTasks(copy)
  } 


  function changeFilter(value: FilterValueType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) { //если нашелся тудулист
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>> ([
    {id: todolistId1, title: "what to", filter: "active" },
    {id: todolistId2, title: "whdfft to", filter: "completed" }
  ])

  let [tasksObj, setTasks] = useState({ //у allTasks могло бы быть свойство todolistId1/todolistId2, и вызывалось бы оно как allTasks.todolistId1. но это нам не надо так. нам нужна сама айдишка (ряд). так что мы поставили [] - и свойства у allTasks нет.
    [todolistId1]: [ //оборачиваем в [], потому что тогда мы видем не просто название todolistId1, а айдишку, которая внутри (цифры)
      { id: v1(), title: "CSS&HTML", isDone: true },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "PHP", isDone: false },
      { id: v1(), title: "Redux", isDone: false }],
    [todolistId2]: [
      { id: v1(), title: "SashkaKakashka", isDone: true },
      { id: v1(), title: "mememe", isDone: false }]
  })

  return (
    <div className="App">
      {
        todolists.map((tl) => {

          let tasksForTodolist = tasksObj[tl.id];
  
          if (tl.filter === "completed") { //tasks[tl.id]. ... - то есть мы указываем на тудулист с определенной айдишкой. 
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true); // Use === instead of =
          }
          if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false); // Use === instead of =
          }

          return <Todolist
            key={tl.id}
            id={tl.id} 
            title={tl.title} 
            tasks={tasksForTodolist} 
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
        />
        })
      }
      
    </div>
  );
}

export default App;