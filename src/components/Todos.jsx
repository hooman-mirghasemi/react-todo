import { useState } from "react"
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

export default function Todos() {
    const [todos, setTodos] = useState([
        {
          id: uuidv4(),
          title: "my first work",
          status: true,
        },
        {
          id: uuidv4(),
          title: "my secound work",
          status: false,
        }
      ]);

    const [newTodoTitle, setNewTodoTitle] = useState("");

    const onChange = (event) => {
      setNewTodoTitle(event.target.value);
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && newTodoTitle !== "") {
        setTodos([...todos, {
            id: uuidv4(),
            title: event.target.value,
            status: false
          }]);
        setNewTodoTitle("");
      }
    };

    const handelDelete = (todo) => {
      let newTodos = todos.filter((todoItem) => {
          return todoItem.id != todo.id;
      });
      setTodos(newTodos);
    };

    const toggleStatus = (todo) => {
      let newTodos = todos.map((todoItem) => {
        if (todoItem.id == todo.id) {
          todoItem.status = !todoItem.status;
        }
        return todoItem;
      });
      setTodos(newTodos);
    }

    const editTodoTitle = (todo, newTodoTitleValue) => {
      let newTodos = todos.map((todoItem) => {
        if (todoItem.id == todo.id) {
          todoItem.title = newTodoTitleValue;
        }
        return todoItem;
      });
      setTodos(newTodos);
    }

    return (
        <div className="flex items-center justify-center h-screen">
          <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
            <div className="flex items-center mb-6">
                <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
            </div>
            <div className="relative">
                <input type="text" placeholder="What needs to be done today?"
                  className="w-full px-2 py-3 border rounded outline-none border-grey-600"
                  value={newTodoTitle}
                  onChange={onChange}
                  onKeyDown={handleKeyDown}
                />
            </div>
            <TodoList 
              todos={todos} 
              handelDelete={handelDelete} 
              toggleStatus={toggleStatus} 
              editTodoTitle={editTodoTitle} />
          </div>
        </div>
    )
}