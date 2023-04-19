import Header from "../HeaderCompoents/Header";
import styled from "styled-components";
import FeedBack from "../BodyComponents/FeedBack";
import Pointer from "../BodyComponents/Pointer";
import { useState } from "react";
import HiddenList from "../BodyComponents/HiddenList";
import HiddensPositions from "../Firebase/BackenD/HiddensPositions";
import isBoundedBy from "../GeneralFunctions/isBoundedBy";
import { useEffect } from "react";
import Chrono from "../HeaderCompoents/Chrono";
import Congratulations from "../BodyComponents/Congratulations";

const Page = ({ levelImage, hiddenElements, displayTimer, hiddenElementsArray }) => {
    const [position, setPosition] = useState({ "x": 0, "y": 0 });
    const [positionRatios, setPositionRatios] = useState({ x: 0, y: 0 });
    const [HiddenElPositions, setHiddenElPositions] = useState(HiddensPositions);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [feedBack, setFeedBack] = useState(false);
    const [levelHiddens, setLevelHiddens] = useState(hiddenElementsArray);
    const [gameOver, setGameOver] = useState(false);
    const [isRunning, setIsRunning] = useState(true);
    const [time, setTime] = useState(0);
    const [playerInfo, setPlayerInfo] = useState({ name: '', score: '', currentDTime: "" });

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 10);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, [isVisible]);

    const handleMouseMove = (e) => {
        if (!isClicked) {
            setPosition({ "x": e.nativeEvent.offsetX, "y": e.nativeEvent.offsetY });
        }

    }
    const handleLevelImageClick = (e) => {
        setIsClicked(!isClicked);
        setPositionRatios({ x: position.x / e.target.clientWidth, y: position.y / e.target.clientHeight })

    }

    const handleOnCongratClose = ({ name, score, currentDTime }) => {
        console.log(`before ${playerInfo}`)
        setPlayerInfo(() => {
            const info = { name, score, currentDTime }
            console.log(playerInfo);
            return info;
        });
        setGameOver(false);
        setIsClicked(false);
        window.location.href = "/Scores";


    }

    const handleHiddenListClick = (e) => {
        const level = e.target.dataset.level ?
            e.target.dataset.level : e.target.parentNode.dataset.level;
        const title = e.target.dataset.title ?
            e.target.dataset.title : e.target.parentNode.dataset.title;
        const updatedHiddenElPosition = HiddenElPositions.filter((el) => {
            return (el.level === level);
        })
        setHiddenElPositions(() => updatedHiddenElPosition);
        if (isFound(title, positionRatios, HiddenElPositions)) {
            setFeedBack(true);

            setLevelHiddens(() => {
                const updatedLevelHiddens = levelHiddens.map((hidden) => {
                    if (hidden.title === title) {
                        return { ...hidden, isFound: true }
                    }
                    return hidden;
                });
                if ((updatedLevelHiddens.find((hidden) => hidden.isFound === false)) === undefined) {
                    setGameOver(true);
                    setIsRunning(false);
                }
                return updatedLevelHiddens;
            });
        } else {
            setFeedBack(false);
        }
        setIsVisible(true);
        setIsClicked(!isClicked);
    }

    return (
        <>
            <Header Timer={displayTimer && <Chrono time={time} />} Hiddens={hiddenElements} page="Go home" pageLink="/" />
            <FeedBack isWin={feedBack} isVisible={isVisible} />
            {gameOver && <Congratulations onClose={handleOnCongratClose} score={time} />}
            <Img src={levelImage} onMouseMove={handleMouseMove} onClick={handleLevelImageClick} />
            {(!isClicked) && <Pointer position={position} />}
            {(isClicked) && <HiddenList position={position} hiddenElements={levelHiddens}
                handleClick={handleHiddenListClick} />}

        </>
    )
}
const Img = styled.img`
width: 100%;
overflow-clip-margin:content-box;
overflow: clip;
grid-area: body;
`
const isFound = (elementTitle, clickPositionRatios, HiddenRatios) => {
    let result = false;
    HiddenRatios.forEach((el) => {
        if ((el.title === elementTitle)) {
            if (isBoundedBy(clickPositionRatios.x, el.minXRatio, el.maxXRatio)
                && isBoundedBy(clickPositionRatios.y, el.minYRatio, el.maxYRatio)) {
                result = true;
            }
        }

    })
    return result;
}


export default Page;