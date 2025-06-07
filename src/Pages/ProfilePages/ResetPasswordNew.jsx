import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { publicRequest } from "../../requestMethods";
import Main from "../../Components/Main";
import NavBar from "../../Components/NavBar";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    color: #ea5455;
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

const ResetPasswordNew = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ status: 1, message: "" });
  const token = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const { data } = await publicRequest.patch(
          `/user/resetPassword/${token}`,
          {
            password: password,
            passwordConfirm: confirmPassword,
          }
        );
        setMessage({ status: 0, message: data?.message });
        confirm("Password Reset Successful!");
        setPassword("");
        setConfirmPassword("");
        // navigate("/login");
      } else {
        setMessage({ status: -1, message: "Passwords do not match" });

        setPassword("");
        setConfirmPassword("");
      }
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
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

export default ResetPasswordNew;
