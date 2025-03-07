import TodoItem from "./TodoItem";

export default function TodoList({todos, handelDelete, toggleStatus, editTodoTitle}) {
    return (
        <ul className="list-reset">
            { todos.map((item, index) => 
                <TodoItem 
                    key={index} 
                    todo={item} 
                    handelDelete={handelDelete} 
                    toggleStatus={toggleStatus}
                    editTodoTitle={editTodoTitle} />) }
        </ul>
    )
}