import {useEffect, useState} from 'react'
import AddNewTodo from './components/AddNewTodo'
import AppHeader from './components/AppHeader'
import Boards from './components/Boards'
import PageLayout from './components/PageLayout'
import {advanceStatus} from './services/advanceStatus'
import * as todoApi from './services/todoApi'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Todo from "./components/Todo";
import HelloThere from "./components/ToDoDetails";
import {blue, green, orange, purple, red} from "@material-ui/core/colors";


///////
///////
///////
export default function App() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        todoApi.getTodos().then((loadedTodos) => setTodos(loadedTodos))
    }, [])

    const addTodo = (description) => {
        const newTodoDto = {description, status: 'OPEN'}
        todoApi.postTodo(newTodoDto).then((newTodo) => {
            const updatedTodos = [...todos, newTodo]
            setTodos(updatedTodos)
        })
    }

    const deleteTodo = (todoToDelete) => {
        todoApi.deleteTodo(todoToDelete).then(() => {
            const updatedTodos = todos.filter((todo) => todo.id !== todoToDelete.id)
            setTodos(updatedTodos)
        })
    }

    const advanceTodo = (todoToAdvance) => {
        const advancedTodo = {
            ...todoToAdvance,
            status: advanceStatus(todoToAdvance.status),
        }
        todoApi.putTodo(advancedTodo).then((updatedTodo) => {
            const updatedTodos = todos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            )
            setTodos(updatedTodos)
        })
    }

    return (
        <Router>

            <ThemeProvider theme={theme}>

                <PageLayout>
                    <AppHeader/>
                    <Switch>
                        <Route exact path="/">
                            <Boards todos={todos} onDelete={deleteTodo} onAdvance={advanceTodo}/>
                            <AddNewTodo onAdd={addTodo}/>
                        </Route>
                        <Route path="/todo/:id">
                            <HelloThere/>
                        </Route>
                    </Switch>

                </PageLayout>
            </ThemeProvider>

        </Router>
    )
}
//////
//////
//////
const theme = createMuiTheme({
    status: {
        palette: {
            primary: green,
        },
        danger: orange[500],
        primary: {
            // Purple and green play nicely together.
            main: purple[500],
        },
        secondary: {
            // Purple and green play nicely together.
            main: red[500],
        },
    },
});
