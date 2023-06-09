import styled from "styled-components"

const HiddenList = ({ hiddenElements, position, handleClick }) => {
    return (
        <Div style={
            {
                "position": "absolute",
                "top": position.y + 10,
                "left": position.x + 10,
            }
        } >
            {hiddenElements.map((el) => {
                if (el.isFound) {
                    return <FoundItem data-level={el.level} data-title={el.title}
                        key={el.id}><Img src={el.src} alt={el.alt} />
                        <H4 > {el.title}</H4>
                    </FoundItem>
                } else
                    return <Item onClick={handleClick} data-level={el.level} data-title={el.title}
                        key={el.id}><Img src={el.src} alt={el.alt} />
                        <H4 > {el.title}</H4>
                    </Item>
            })}
        </Div >
    )
}

const H4 = styled.h4`
width: 3rem;
margin:0;
padding:0;
box-sizing: border-box;
`
const Div = styled.div`
position: absolute;
display: flex;
flex-direction: column;
background-color: #555;
gap: .5rem;
padding: .3rem;
border-radius: .2rem;
z-index: 100;
`
const Img = styled.img`
width: 1.5rem;
height: 1.5rem;
border-radius: 50%;

@media (max-width:768px){
    width:1rem;
    height:1rem;
}
`
const Item = styled.div`
margin:0;
color: #ddd;
padding:.2rem;
box-sizing: border-box;
display: flex;
flex-direction: row;
gap: .5rem;
align-items center;
justify-content: center;
& :hover{
border: 1px solid white;
}

@media (max-width:768px){
    gap:.2rem;
    padding: .15rem;
    font-size: .9rem;
}
`;
const FoundItem = styled.div`
margin:0;
color: #ddd;
text-decoration: line-through;
padding:.2rem;
box-sizing: border-box;
display: flex;
flex-direction: row;
gap: .5rem;
align-items center;
justify-content: center;

@media (max-width:768px){
    gap:.2rem;
    padding: .1rem;
    font-size: .9rem;
}
`

export default HiddenList;