import { useEffect, useState } from "react"
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";

export default function Todos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      setTodos(JSON.parse(localStorage.getItem('todos_list')) ?? [])
    }, []);
    
    useEffect(function() {
      localStorage.setItem('todos_list', JSON.stringify(todos));
    }, [todos]);

 

    const addNewTodo = (newTodoTitle) => {
      if (event.key === 'Enter' && newTodoTitle !== "") {
        setTodos([...todos, {
            id: uuidv4(),
            title: newTodoTitle,
            status: false
          }]);
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
            <NewTodoInput addNewTodo={addNewTodo} />
            <TodoList 
              todos={todos} 
              handelDelete={handelDelete} 
              toggleStatus={toggleStatus} 
              editTodoTitle={editTodoTitle} />
          </div>
        </div>
    )
}