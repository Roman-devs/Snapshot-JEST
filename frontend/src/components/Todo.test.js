import React from "react";
import renderer from 'react-test-renderer';
import Board from "./Board";
import "jest-styled-components"

it('should render correctly', () => {
    const totoTest = [
        {
            id: "12345",
            description: "asodh"
        },
        {
            id: "49102=",
            description: "kjdkdjkd"
        }]

    const kuul = renderer.create(<Board todos={totoTest}
                                        title={"TestKram"}
                                        onDelete={() => console.log("Test1")}
                                        onAdvance={console.log("Test2")} />)
    expect(kuul).toMatchSnapshot();
});