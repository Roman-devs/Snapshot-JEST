import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getTodo} from "../services/todoApi";
import Todo from "./Todo";

export default function HelloThere(){
    let { id } = useParams();
    const [todo, setTodo] = useState(null);

    useEffect(()=>{
        getTodo(id).then(setTodo)
    },[])

    return <>{todo && <Todo todo={todo} detailView />}</>
}
