import styled from "styled-components";
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 34px;
    background-color: ${(props) => (props.disabled ? "#B4B4B4" : "#F4E041")};
    color: ${(props) =>
        props.disabled ? "rgba(255, 255, 255, 0.87)" : "black"};
    border-radius: 80px;
    outline: none;
    border: none;
    font-size: 1rem;
    cursor: ${(props) => (props.disabled ? "" : "pointer")};
    transition: all 0.3s;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-tap-highlight-color: transparent;
    &:hover {
        transform: ${(props) => (props.disabled ? "" : "scale(1.02)")};
        background-color: ${(props) =>
            props.disabled ? "#B4B4B4" : "#FFE302"};
    }
    &:active {
        transform: scale(0.99);
    }
`;
export default Button;
