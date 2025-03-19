import { useEffect, useState } from "react"
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";
import { toast } from "react-toastify";

export default function Todos() {
    const [todos, setTodos] = useState([]);

    const getTodosFromApi = async() => {
      try {
        let res = await fetch('https://67d066e7825945773eb0c652.mockapi.io/api/v1/todos', {
          method: 'get',
          headers: {'content-type':'application/json'},
        });
        let todos = await res.json();
        if (res.ok) {
          setTodos(todos);
        }
      } catch(error) {
        console.log(error);
      }
      
    }
    useEffect(() => {
      getTodosFromApi();
    }, []);
    
    useEffect(function() {
      localStorage.setItem('todos_list', JSON.stringify(todos));
    }, [todos]);

 

    const addNewTodo = async (newTodoTitle) => {
      let data = {
        title: newTodoTitle,
        status: false
      }
      try{
        let res = await fetch('https://67d066e7825945773eb0c652.mockapi.io/api/v1/todos', {
          method: 'post',
          headers: {'content-type':'application/json'},
          body: JSON.stringify(data)
        });

        let todoData = await res.json();

        setTodos([...todos, todoData]);
        toast.success('New todo created successfully', {
          position: "top-center",
        });
      } catch(error) {
        toast.error(error, {
          position: "top-center",
        });
      }
      
    };

    const handelDelete = async (todo) => {
      try {
        let res = await fetch(`https://67d066e7825945773eb0c652.mockapi.io/api/v1/todos/${todo.id}`, {
          method: 'delete',
          headers: {'content-type':'application/json'}
        });
  
        let newTodos = todos.filter((todoItem) => {
            return todoItem.id != todo.id;
        });
        setTodos(newTodos);
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

        let newTodos = todos.map((todoItem) => {
          if (todoItem.id == todo.id) {
            todoItem.status = !todoItem.status;
          }
          return todoItem;
        });
        setTodos(newTodos);
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

        let newTodos = todos.map((todoItem) => {
          if (todoItem.id == todo.id) {
            todoItem.title = newTodoTitleValue;
          }
          return todoItem;
        });
        setTodos(newTodos);
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