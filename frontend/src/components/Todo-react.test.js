import {getByRole, getByText, render, screen} from '@testing-library/react'
import Board from "./Board";
import Todo from "./Todo";

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
    const toDoData = {description: "Hello There!", status: "OPEN"};
    const renderedObject = render(<Todo todo={toDoData} onAdvance={() => console.log("Hi1")}
                                        onDelete={() => console.log("Whoohoo")}/>)
    const actual = renderedObject.getByText("Hello There!" , {exact:true})
    expect(actual).toBeInTheDocument();

})

test("Should find header level 2 element in Board", ()=> {
    const todosTest = [{status: "23", description: "buy milk"}, {status: "21", description: "buy food"}];
    const {getByRole} = render(<Board todos={todosTest} title={"TestTitle"} onDelete={() => console.log("Hello")}
                                      onAdvance={() => console.log("Hellooo")}/>);
    const actual = getByRole('heading',{level: 2});
    expect(actual).toBeInTheDocument()

})

test("Button Function Jest")