import styled from 'styled-components/macro'
// import Button from './Button'
import {Link} from "react-router-dom";
import {Button, ButtonGroup} from "@material-ui/core";

export default function Todo({todo, onDelete, onAdvance, detailView}) {
    return (
        <Wrapper>
            <Description>{todo.description}</Description>
            {!detailView && (
                <div>
                <Button onClick={() => onDelete(todo)}>Delete</Button>
                <Button primary component={Link} to={`/todo/${todo.id}`}>
                Details
                </Button>
                </div>
                    )}
            {onAdvance && (
                <Button primary onClick={() => onAdvance(todo)}>
                    Advance
                </Button>
            )}


        </Wrapper>
    )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
`

const Description = styled.span`
  grid-column: span 2;
  font-weight: 600;
`
