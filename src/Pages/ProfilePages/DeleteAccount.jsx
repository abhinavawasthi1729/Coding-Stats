import { useState } from "react";
import { useNavigate } from "react-router";
import { deleteUser } from "../../redux/apiCalls/apiCalls";
import styled from "styled-components";
import NavBar from "../../Components/NavBar";
import Main from "../../Components/Main";
import { useDispatch } from "react-redux";

const Form = styled.form`
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  overflow: scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  h1 {
    font-family: "Expletus Sans", sans-serif;
    font-size: 60px;
    color: ${(props) => props.theme.accent};
    margin-bottom: 40px;

    @media (max-width: 800px) {
      font-size: 45px;
    }
    @media (max-width: 430px) {
      font-size: 38px;
      font-weight: lighter;
      margin: 0;
    }
  }
  span {
    margin: 10px;
  }
`;
const Input = styled.input`
  width: 600px;
  padding: 15px 30px;
  font-size: 20px;
  margin: 15px;
  background-color: rgba(${(props) => props.theme.bodyRgba}, 0.1);
  color: ${(props) => props.theme.accent};
  outline: none;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
  font-size: 15px;
  &:focus {
    color: ${(props) => props.theme.text};
    width: 620px;
    border: 1px solid ${(props) => props.theme.accent};
    background-color: transparent;
  }
`;
const Button = styled.button`
  margin: 20px;
  padding: 14px 0px;
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 5px;
  width: 200px;
  text-align: center;
  text-decoration: none;
  font-size: small;
  transition: all 0.25s ease;
  overflow: hidden;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  background-color: transparent;

  &:hover {
    letter-spacing: 1.2px;
    color: ${(props) => props.theme.accent};
    border: 1px solid ${(props) => props.theme.text};
  }

  @media screen and (max-width: 1000px) {
    margin: 0;
  }
`;

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteUser(dispatch, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar />
      <Main>
        <Form action="" onSubmit={(e) => handleSubmit(e)}>
          <h1>Delete Account</h1>

          <Input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <Button type="submit">Delete Account</Button>
        </Form>
      </Main>
    </>
  );
};

export default DeleteAccount;
