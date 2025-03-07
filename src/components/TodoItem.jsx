import { useState } from "react";
import Delete from "./icons/Delete";
import Edit from "./icons/Edit";

export default function TodoItem({todo, handelDelete, toggleStatus, editTodoTitle}) {

    const [editMode, setEditMode] = useState(false);

    const editTodoHandler = (event) => {
      if (event.key === 'Enter') {
        editTodoTitle(todo, event.target.value)
        setEditMode(false)
      }
    };

    return (
      <li className="relative flex items-center justify-between px-2 py-6 border-b">
        {
          editMode ? 
          <div className="w-full flex items-center">
            <input 
              type="text" 
              defaultValue={todo?.title} 
              className="w-full p-2 border border-gray-300 text-black rounded"
              onKeyDown={editTodoHandler} />
            <Delete className="ml-2" onClick={() => setEditMode(false)} />
          </div>
          :
          <div className="flex items-center">
            <div>
              <input type="checkbox" className="" onChange={() => toggleStatus(todo)}  checked={todo?.status} />
              <p className={`inline-block mt-1 ml-2 text-gray-600 ${todo?.status ? 'line-through' : ''}`}>{todo?.title}</p>
            </div>
            <button type="button" className="absolute right-0 flex items-center space-x-1">
              <Edit onClick={() => setEditMode(true)} />
              <Delete onClick={() => handelDelete(todo)} />
            </button>
          </div>
        }
      </li>
    );
}