import { useParams } from "react-router"

export default function SingleToDo() {
    const {todoId} = useParams();

    return (
        <>
            <h2>Single Todo {todoId}</h2>
        </>
    )
}