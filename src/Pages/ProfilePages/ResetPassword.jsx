import Main from "../../Components/Main";
import NavBar from "../../Components/NavBar";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
      font-size: 30px;
    }
  }

  span {
    margin: 10px;
    color: red;
  }
  a {
    color: ${(props) => props.theme.accent};
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

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ status: 1, message: "" });
  const url = window.location.href.split("/")[2];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await publicRequest.post("/user/forgotPassword", {
        email: email,
        link: url,
      });
      setMessage({ status: 0, message: data?.message });
      setEmail("");
    } catch (error) {
      setMessage({ status: -1, message: error?.response?.data?.message });
    }
  };

  useEffect(() => {
    setMessage({ status: 1, message: "" });
  }, []);

  return (
    <>
      <NavBar />
      <Main>
        <Form action="" onSubmit={(e) => handleSubmit(e)} className="register">
          <h1>Reset Password</h1>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
            placeholder="Email"
          />
          <span>{message?.message}</span>
          <Button type="submit">Submit</Button>
          <span>
            <Link to={"/login"}>Login</Link>
          </span>
          <span>
            <Link to={"/register"}>Create a new Account</Link>
          </span>
        </Form>
      </Main>
    </>
  );
};

export default ResetPassword;
