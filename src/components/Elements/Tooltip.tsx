import React, { FC, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

interface Props {
    isDisplay?: boolean;
    transition?: number;
}

const delay = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;
const Container = styled.p`
    margin: 0;
    cursor: pointer;
`;
const Badge = styled.div`
    height: fit-content;
    width: fit-content;
    padding: 3px 16px;
    background: rgba(0, 0, 0, 0.87);
    color: white;
    border-radius: 4px;
    animation: ${delay} ${(props: Props) => props.transition + "ms"} ease-out;
    ${(props: Props) => (props.isDisplay ? `display: block` : `display: none`)};
    position: absolute;
    z-index: 240;
    white-space: nowrap;
    overflow: auto;
    box-sizing: border-box;
    &:hover {
        display: block;
    }
`;

const Tooltip: FC<{
    delay?: number;
    transition?: number;
    children: string;
}> = ({ delay = 600, transition = 300, children }) => {
    const [display, setDisplay] = useState<boolean>(false);
    const dataRef = useRef<HTMLParagraphElement>(null);
    const tooltip = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dataRef.current?.style.textAlign) {
            dataRef.current.style.textAlign = "center";
        }
        let removeLink: string | number | NodeJS.Timeout | undefined;
        dataRef.current?.addEventListener("mouseover", () => {
            removeLink = setTimeout(setDisplay, delay, true);
        });
        dataRef.current?.addEventListener("mouseleave", () => {
            setTimeout(setDisplay, transition, false);
            clearTimeout(removeLink);
        });

        let corrector;
        let toolWidth = tooltip.current?.clientWidth;
        let windowWidth = document.body.clientWidth;

        window.addEventListener("resize", () => {
            toolWidth = tooltip.current?.clientWidth;
            windowWidth = document.body.clientWidth;
        });

        dataRef.current?.addEventListener("mousemove", (e) => {
            if (tooltip.current) {
                let newCorrector: () => number | undefined = function () {
                    if (tooltip.current && toolWidth) {
                        const corrector =
                            toolWidth +
                            tooltip.current?.offsetLeft -
                            windowWidth;
                        return corrector;
                    }
                };
                corrector = newCorrector();
                tooltip.current.style.top = e.pageY - 40 + "px";
                tooltip.current.style.left =
                    corrector && corrector > 0
                        ? e.pageX - 30 - corrector + "px"
                        : e.pageX - 30 + "px";
            }
        });
    });

    return (
        <>
            <Badge ref={tooltip} transition={transition} isDisplay={display}>
                {children}
            </Badge>
            <Container ref={dataRef}>{children}</Container>
        </>
    );
};

export default Tooltip;
