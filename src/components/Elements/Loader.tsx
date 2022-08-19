import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
    width: 48px;
    height: 48px;
`

const rotate = keyframes`
    from{
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    }
`;

const dash = keyframes`
    0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -124;
  }
`;


const SVG = styled.svg`
    -webkit-animation: ${rotate} 2s linear infinite;
    animation: ${rotate} 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    -ms-transform-origin: center center;
    transform-origin: center center;
    top: 0;
    left: 0;
    margin: auto;
    width: 48px;
    height: 48px;
`;

const CIRCLE = styled.circle`
    stroke-dasharray: 150, 200;
    stroke-dashoffset: -10;
    -webkit-animation: ${dash} 1.5s ease-in-out infinite;
    animation: ${dash} 1.5s ease-in-out infinite;
    stroke-linecap: round;
`;
const Loader: FC<{}> = () => {
    return (
        <Container>
            <SVG viewBox="25 25 50 50">
            <CIRCLE stroke="#70c542" cx="50" cy="50" r="20" fill="none" strokeWidth="5" />
        </SVG>
        </Container>
        
    );
};

export default Loader;
