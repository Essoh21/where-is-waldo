import Header from "../HeaderCompoents/Header";
import styled from "styled-components";
import FeedBack from "../BodyComponents/FeedBack";
import Pointer from "../BodyComponents/Pointer";
import { useState } from "react";
import HiddenList from "../BodyComponents/HiddenList";

const Page = ({ levelImage, hiddenElements, Timer, hiddenElementsArray }) => {
    const [position, setPosition] = useState({ "x": 0, "y": 0 });
    const [isClicked, setIsClicked] = useState(false);
    const handleMouseMove = (e) => {
        if (!isClicked) {
            setPosition({ "x": e.clientX, "y": e.clientY });
        }
    }

    return (
        <>
            <Header Timer={Timer} Hiddens={hiddenElements} page="Go home" pageTitle="/" />
            <FeedBack isWin={false} />
            <Img src={levelImage} onMouseMove={handleMouseMove} onClick={() => setIsClicked(!isClicked)} />
            {(!isClicked) && <Pointer position={position} />}
            {(isClicked) && <HiddenList position={position} hiddenElements={hiddenElementsArray} handleClick={(e) => {
                setIsClicked(!isClicked);
                alert(e.target.parentNode.id)

            }

            } />}

        </>
    )
}
const Img = styled.img`
max-height: 100%;
max-width: 100%;
position: relative;
grid-area: body;

`
export default Page;