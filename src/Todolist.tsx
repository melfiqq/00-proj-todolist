import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValueType } from "./App"
import { title } from "process"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle("")
    } else {
      setError("Field is reqired")
    }
  } 

  const onNewTitleCHangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value) /*currentTarget - some event happend to currentTarget. so input will have the value from the input - event - user typing - typing some value - cuttentTarget */
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null) //ошибка у нас - когда мы пытаемся вставить пустое. так что здесь мы при нажатии на любую клавишу, которая не делает null, ошибка будет обнуляться. зануляем стейт. 
    if (e.key === "Enter") {
      addTask()
    }
  }
  const onCLickHandler = () => {
    addTask()
  }
const onAllClickHandler = () => {
  props.changeFilter("all")
}
const onActiveClickHandler = () => {
  props.changeFilter("active")
}
const onCompletedClickHandler = () => {
  props.changeFilter("completed")
}

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input 
          value={newTaskTitle} 
          onChange={onNewTitleCHangeHandler} 
          onKeyDown={onKeyPressHandler}
          className={error ? "error" : ""}
        />
        <button onClick={onCLickHandler}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>

      <ul>
        {
          props.tasks.map( (t) => {

            const onRemoveHandler = () => {props.removeTask(t.id)}
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked)}

            return (
              <li key={t.id} className={t.isDone ? "is-done" : ""}> 
                <input type="checkbox"
                  onChange={onChangeHandler}
                  checked={t.isDone}
                />
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>X</button>
              </li>
            )
          })
        }
      </ul>

      <div>
        <button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
} 