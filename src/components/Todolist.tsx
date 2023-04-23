import {v1} from "uuid";
import {TaskType} from "../App";
import {FC} from "react";

type TodoListType = {
    tasks: Array<TaskType>
}

const Todolist: FC<TodoListType> = (props) => {

    const taskList = props.tasks.map(t => {
        return <li key={t.id}>
            {t.title}
            <input type="checkbox" checked={t.isDone}/>
        </li>}
    )

    return (
        <div>
            {taskList}
        </div>
    );
};

export default Todolist;