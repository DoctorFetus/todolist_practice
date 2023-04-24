import {FilterType, TaskType} from "../App";
import {ChangeEvent, FC, useState, KeyboardEvent} from "react";

type TodoListType = {
    tasks: Array<TaskType>
    deleteTask: (id: string) => void
    setFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeCheckbox: (id: string) => void
}

const Todolist: FC<TodoListType> = (props) => {

    const [value, setValue] = useState("")
    const [error, setError] = useState<boolean>(false)

    const maxLength = 20
    const isMaxlength = value.length > maxLength
    const idButtonDisabled = isMaxlength || !value.length
    const maxLengthAlert = isMaxlength ? "Слишком длинная строка" : null
    const emptyString = error ? "Пустая строка" : null
    const inputClass = isMaxlength || error ? "input_error" : ""

    const addTaskHandler = () => {
        const trimmedValue = value.trim()
        if (trimmedValue && !idButtonDisabled) {
            props.addTask(trimmedValue)
        } else {
            setError(true)
        }
        setValue("")
    }

    const inputText = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value
        setValue(text)
        setError(false)
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === "Enter" && !idButtonDisabled) {
            addTaskHandler()
        }
    }

    const taskList = props.tasks.map(t => {

            const onClickHandler = () => {
                props.deleteTask(t.id)
            }
            const onChangeHandler = () => {
                props.changeCheckbox(t.id)
            }
            return <li key={t.id}>
                <div>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeHandler}
                    />
                    {t.title}
                </div>
                <button onClick={onClickHandler}>X</button>
            </li>
        }
    )

    return (
        <div className={"todolist"}>
            <h3>What to learn</h3>
            <div>
                <div className={"error"}>
                    {maxLengthAlert || emptyString}
                </div>
                <div className={"enter_button"}>
                    <input type="text"
                           placeholder={"Enter the task"}
                           value={value}
                           onChange={inputText}
                           onKeyDown={onKeyHandler}
                           className={inputClass}
                    />
                    <button
                        onClick={addTaskHandler}
                        disabled={idButtonDisabled}
                    >Add
                    </button>
                </div>
            </div>
            <div>
                {taskList}
            </div>
            <div className={"buttons"}>
                <button onClick={() => props.setFilter("all")}>All</button>
                <button onClick={() => props.setFilter("completed")}>Completed</button>
                <button onClick={() => props.setFilter("active")}>Active</button>
            </div>
        </div>
    );
};

export default Todolist;