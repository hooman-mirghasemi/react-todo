import { useState } from "react";

export default function NewTodoInput({addNewTodo}) {

    const [newTodoTitle, setNewTodoTitle] = useState("");

    const onChange = (event) => {
      setNewTodoTitle(event.target.value);
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && newTodoTitle !== "") {
        addNewTodo(newTodoTitle);
        setNewTodoTitle("");
      }
    };

    return (
        <div className="relative">
            <input type="text" placeholder="What needs to be done today?"
                className="w-full px-2 py-3 border rounded outline-none border-grey-600"
                value={newTodoTitle}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}