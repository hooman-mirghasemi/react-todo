import { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodoContext } from "../contexts/TodoContext";
import { toast } from "react-toastify";

export default function TodoList() {

    const {todos} = useContext(TodoContext);

    return (
        <ul className="list-reset">
            { todos.map((item, index) => 
                <TodoItem 
                    key={index} 
                    todo={item} />) }
        </ul>
    )
}