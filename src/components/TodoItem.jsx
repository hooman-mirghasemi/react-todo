import { useContext, useState } from "react";
import Delete from "./icons/Delete";
import Edit from "./icons/Edit";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import { TodoContext } from "../contexts/TodoContext";
import { Link } from "react-router";

export default function TodoItem({todo}) {

    const {todoDispatcher} = useContext(TodoContext);

    const [editMode, setEditMode] = useState(false);

    let user = useContext(UserContext);

    console.log(user);

    const editTodoHandler = (event) => {
      if (event.key === 'Enter') {
        editTodoTitle(todo, event.target.value)
        setEditMode(false)
      }
    };

    const handelDelete = async (todo) => {
        try {
            let res = await fetch(`https://67d066e7825945773eb0c652.mockapi.io/api/v1/todos/${todo.id}`, {
            method: 'delete',
            headers: {'content-type':'application/json'}
            });

            todoDispatcher({
                type: 'delete',
                id: todo.id,
            });
            
            toast.success('Todo deleted!', {
                position: "top-center",
            });
        } catch (error) {
            toast.error(error, {
                position: "top-center",
            });
        }      
    };
      
    const toggleStatus = async (todo) => {
        try {
          let res = await fetch(`https://67d066e7825945773eb0c652.mockapi.io/api/v1/todos/${todo.id}`, {
            method: 'put',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
              status: !todo.status
            })
          });
  
          todoDispatcher({
            type: 'toggle-status',
            id: todo.id
          })
          toast.success('Todo status updated!', {
            position: "top-center",
          });
        } catch (error) {
          toast.error(error, {
            position: "top-center",
          });
        }
    }
    
    const editTodoTitle = async (todo, newTodoTitleValue) => {
      try {
          let res = await fetch(`https://67d066e7825945773eb0c652.mockapi.io/api/v1/todos/${todo.id}`, {
              method: 'put',
              headers: {'content-type':'application/json'},
              body: JSON.stringify({
                  title: newTodoTitleValue
              })
          });

          todoDispatcher({
              type: 'edit-title',
              id: todo.id,
              newTodoTitle: newTodoTitleValue
          });

          toast.success('Todo updated!', {
              position: "top-center",
          });
      } catch (error) {
          toast.error(error, {
              position: "top-center",
          });
      }
    }

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
              <Link to={`/todos/${todo.id}`}>
                <p className={`inline-block mt-1 ml-2 text-gray-600 ${todo?.status ? 'line-through' : ''}`}>{todo?.title}</p>
              </Link>
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