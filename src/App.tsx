import {useState} from 'react'
import './App.css'
import {v1} from "uuid";
import Todolist from "./components/Todolist";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: false}
    ])

  return (
    <div>
        <Todolist tasks={tasks}/>
    </div>
  )
}

export default App
