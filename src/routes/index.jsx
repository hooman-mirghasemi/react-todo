import { createBrowserRouter } from "react-router";
import Home from "./Home";
import About from "./About";
import Todo from "./Todo";
import Root from "./Root";
import SingleToDo from "./Todo/SingleTodo";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/todos",
        element: <Todo />
      },
      {
        path: "/todos/:todoId",
        element: <SingleToDo />
      },
    ],
  }
]);

export default router;
