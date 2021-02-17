import {fireEvent, getByRole, getByText, render, screen, waitFor} from '@testing-library/react'
import Board from "./Board";
import Todo from "./Todo";
import {setupServer} from 'msw/node'
import {rest} from "msw";
import App from "../App";
// SETUP SERVER TEST WITH MSW
const server = setupServer(
    rest.get("/api/todo", (req, res, ctx) => {
            const body = [
                {
                    id: "123123",
                    description: "Buy Milk!",
                    status: "OPEN"
                },
                {
                    id: "123",
                    description: "Buy Juice!",
                    status: "OPEN"
                }
            ];
            const bodyAsJSON = ctx.json(body);
            return res(bodyAsJSON);
        }
    ))

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

// Server Test
test("Test Get Request with mocked Backend server (MSW)", async () => {
    render(<App/>)

    await waitFor(()=>screen.getByText("Buy Milk!", {exact:false}))
    const actual = screen.getByText("Buy Milk!", {exact:false});
    expect(actual).toBeInTheDocument();
})


//
test("Should show title", () => {
    const todosTest = [{status: "23", description: "buy milk"}, {status: "21", description: "buy food"}];
    // Create JSON Object with <Board>
    const {getByText} = render(<Board todos={todosTest} title={"TestTitle"} onDelete={() => console.log("Hello")}
                                      onAdvance={() => console.log("Hellooo")}/>);
    // get String from rendered object
    const testTitle = getByText("TestTitle");
    // Match actual vs expected
    expect(testTitle).toBeInTheDocument();

})

test("Should show other Title", () => {
    const todosTest = [{status: "23", description: "buy milk"}, {status: "21", description: "buy food"}];
    // Create JSON Object with <Board>
    const renderedObject = render(<Board todos={todosTest} title={"TestTitle"} onDelete={() => console.log("Hello")}
                                         onAdvance={() => console.log("Hellooo")}/>);
    // get String from rendered object
    const testTitle = renderedObject.getByText("estTitl", {exact: false});
    // Match actual vs expected
    expect(testTitle).toBeInTheDocument();

})

test("Should show description", () => {
    const toDoData = {description: "Hello There!", status: "OPEN", id: "123123"};
    const renderedObject = render(<Todo todo={toDoData} onAdvance={() => console.log("Hi1")}
                                        onDelete={() => console.log("Whoohoo")}/>)
    const actual = renderedObject.getByText("Hello There!", {exact: true})
    expect(actual).toBeInTheDocument();
})

test("Should find header level 2 element in Board", () => {
    const todosTest = [{status: "23", description: "buy milk"}, {status: "21", description: "buy food"}];
    const {getByRole} = render(<Board todos={todosTest} title={"TestTitle"} onDelete={() => console.log("Hello")}
                                      onAdvance={() => console.log("Hellooo")}/>);
    const actual = getByRole('heading', {level: 2});
    expect(actual).toBeInTheDocument()

})

test("Button Function Jest", () => {
    const mock = jest.fn()
    //
    const toDoData = {description: "Hello There!", status: "OPEN", id: "123123"};
    const renderedObject = render(<Todo todo={toDoData} onAdvance={() => console.log("Hi1")}
                                        onDelete={mock}/>)
    const deleteButtonElement = renderedObject.getByText("Delete");
    fireEvent.click(deleteButtonElement);
    expect(mock).toHaveBeenCalledTimes(1);
})


