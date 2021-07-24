import styled from 'styled-components'


export const Button = styled.button`
    background: ${props => props.primary ? "palevioletred" : "#16d4ae"};
    color: ${props => props.primary ? "black" : "black"};

    width:${props => props.width};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #094338;
    border-radius: 3px;

    &:hover{
        background-color: lightgray
    }
`

export const Input = styled.input`
    font-size:20px;
    padding: 0.5em;
    margin: 0.5em;
    color: black;
    background: #f4f0f0;
    border: 2px solid black;
    border-radius: 3px;

` 

export const Select = styled.select`
    width: ${props => props.width};
    height: 35px;
    background: white;
    color: black;
    padding-left: 5px;
    font-size: 20px;
    border: 2px solid black;
    border-radius:3px;
    margin: 0.5em;

    option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
    }
`