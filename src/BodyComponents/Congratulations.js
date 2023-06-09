import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Congratulations = ({ onClose, score, level, onMouseOver }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const currentDTime = new Date().toLocaleDateString();
    onClose(name, score, currentDTime, level);
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <Overlay onMouseOver={onMouseOver}>
      <Wrapper>
        <Title>Congratulations!</Title>
        <Form onSubmit={handleFormSubmit}>
          <Label htmlFor="name-input">Enter your name to save your score:</Label>
          <Input
            id="name-input"
            type="text"
            value={name}
            onChange={handleNameChange}
            autoFocus
            required
          />
          <ButtonGroup>
            <Button type="submit">Submit</Button>
            <CancelButton type="button" onClick={handleCancelClick}>
              Cancel
            </CancelButton>
          </ButtonGroup>
        </Form>
      </Wrapper>
    </Overlay>
  );
};

const Overlay = styled.div`
box-sizing:border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
box-sizing:border-box;  
background-color: white;
  border-radius: 5px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 2px solid gray;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
`;

export default Congratulations;
