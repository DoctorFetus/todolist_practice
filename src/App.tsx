import {useState} from 'react'
import './App.css'
import {v1} from "uuid";
import Todolist from "./components/Todolist";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = "all" | "active" | "completed"

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "JavaScript", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterType>("all")

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter(t => t.id !== id)
        setTasks(updatedTasks)
    }
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeCheckbox = (id: string) => {
        const updatedTasks = tasks.map(t => t.id === id ? {...t, isDone: !t.isDone} : t)
        setTasks(updatedTasks)
    }

    let renderTask = tasks

    switch (filter) {
        case "active":
            renderTask = tasks.filter(t => !t.isDone)
            break;
        case "completed":
            renderTask = tasks.filter(t => t.isDone)
            break;
    }

    return (
        <div>
            <Todolist
                tasks={renderTask}
                deleteTask={deleteTask}
                setFilter={setFilter}
                addTask={addTask}
                changeCheckbox={changeCheckbox}
            />
        </div>
    )
}

export default App
