import { useEffect, useReducer, useState } from "react"
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";
import { toast } from "react-toastify";
import todoReducer from "../reducer/TodoReducer";
import { TodoContext } from "../contexts/TodoContext";

export default function Todos() {
    const [todos, todoDispatcher] = useReducer(todoReducer, []);

    const getTodosFromApi = async() => {
      try {
        let res = await fetch('https://67d066e7825945773eb0c652.mockapi.io/api/v1/todos', {
          method: 'get',
          headers: {'content-type':'application/json'},
        });
        let todos = await res.json();
        if (res.ok) {
          todoDispatcher({
            type: 'initial-todos',
            todos
          })
        }
      } catch(error) {
        console.log(error);
      }
      
    }

    useEffect(() => {
      getTodosFromApi();
    }, []);
    
    // useEffect(function() {
    //   localStorage.setItem('todos_list', JSON.stringify(todos));
    // }, [todos]);

 

    const addNewTodo = async (newTodoTitle) => {
      try{
        let res = await fetch('https://67d066e7825945773eb0c652.mockapi.io/api/v1/todos', {
          method: 'post',
          headers: {'content-type':'application/json'},
          body: JSON.stringify({
            title: newTodoTitle,
            status: false
          })
        });

        let todoData = await res.json();

        todoDispatcher({
          type: "add",
          id: todoData?.id,
          title: todoData?.title,
          status: todoData?.status
        })
        toast.success('New todo created successfully', {
          position: "top-center",
        });
      } catch(error) {
        toast.error(error, {
          position: "top-center",
        });
      }
      
    };

    return (
        <div className="flex items-center justify-center h-screen">
          <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
            <div className="flex items-center mb-6">
              <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
            </div>
            <NewTodoInput addNewTodo={addNewTodo} />
            <TodoContext.Provider value={{todos, todoDispatcher}} >
              <TodoList  />
            </TodoContext.Provider>
          </div>
        </div>
    )
}