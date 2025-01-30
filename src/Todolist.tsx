import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValueType } from "./App"

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
}

export function Todolist(props: PropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState("")

  const onNewTitleCHangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value) /*currentTarget - some event happend to currentTarget. so input will have the value from the input - event - user typing - typing some value - cuttentTarget */
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }
  const onCLickHandler = () => {
    props.addTask(newTaskTitle) 
          setNewTaskTitle("")
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
        />
        <button onClick={onCLickHandler}>+</button>
      </div>

      <ul>
        {
          props.tasks.map( (t) => {

            const onRemoveHandler = () => {props.removeTask(t.id)}

            return (
              <li key={t.id}> 
                <input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
                <button onClick={onRemoveHandler}>X</button>
              </li>
            )
          })
        }
      </ul>

      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
} 