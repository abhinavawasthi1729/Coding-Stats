/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { clearProfile } from "../redux/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls/apiCalls";
import MainCenter from "../Components/MainCenter";
import Loader from "../Components/Loader";
import logo from "../assets/logo.png";
import logoLight from "../assets/logo-light.png";

// Styling for the login form
const Form = styled.form`
  //height: 80%;
  //width: max-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-family: "Expletus Sans", sans-serif;
    font-size: 80px;
    color: ${(props) => props.theme.accent};
    margin-bottom: 40px;
  }
  span {
    margin: 10px 0;
  }

  a {
    color: ${(props) => props.theme.text};
  }

  @media (max-width: 1030px) {
    transform: scale(0.9);
  }
  @media (max-width: 726px) {
    transform: scale(0.8);
    width: 95%;
  }
  @media (max-width: 726px) {
    transform: scale(0.8);
  }
  @media (max-width: 660px) {
    transform: scale(0.7);
  }
  @media (max-width: 450px) {
    transform: scale(0.6);
  }
  @media (max-width: 380px) {
    transform: scale(0.5);
    h1 {
      font-size: 120px;
    }
  }

  label {
    font-size: 1.2rem;
  }
`;
// Styling for the input fields
const Input = styled.input`
  width: 100%;
  padding: 15px 30px;
  font-size: 20px;
  margin: 15px 0;
  background-color: rgba(${(props) => props.theme.bodyRgba}, 0.1);
  color: ${(props) => props.theme.accent};
  outline: none;
  border: 1px solid ${(props) => props.theme.text};
  border-radius: 5px;
  font-size: 15px;
  &:focus {
    color: ${(props) => props.theme.text};
    width: calc(100% + 10px);
    border: 1px solid ${(props) => props.theme.accent};
    background-color: transparent;
  }
`;
// Styling for the submit button
const Button = styled.button`
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
  margin: 10px 0;
  &:hover {
    letter-spacing: 1.2px;
    color: ${(props) => props.theme.accent};
    border: 1px solid ${(props) => props.theme.text};
  }

  @media screen and (max-width: 1000px) {
    margin: 0;
  }
`;

const F2C = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  align-self: center;
  align-items: center;

  //background-color: red;

  img {
    width: 70%;
  }
`;

// Styling for flex container
const DF = styled.div`
  display: flex;
  justify-content: center;
`;

// Login component definition
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state?.user?.currentUser?.data?.user?.username
  );
  const themeDark = useSelector((state) => state?.user?.dark);
  const isFetching = useSelector((state) => state?.user?.isFetching);
  const [userData, setUserData] = useState({});

  // Function to handle changes in input fields
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearProfile());
    await login(dispatch, userData);
  };

  useEffect(() => {
    if (currentUser) navigate(`/profile/${currentUser}`);
  }, [currentUser]);

  return (
    <>
      <NavBar />
      {isFetching && (
        <MainCenter>
          <Loader />
        </MainCenter>
      )}
      {!isFetching && (
        <MainCenter>
          <DF>
            <F2C>
              <div>
                <img src={themeDark ? logo : logoLight} alt="Coding Stats" />
              </div>
              <Form className="login" onSubmit={(e) => handleSubmit(e)}>
                <h1>Login</h1>
                <label>Username</label>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  required
                  name="username"
                  // placeholder="Username"
                />
                <label>Password</label>
                <Input
                  onChange={(e) => handleChange(e)}
                  type="password"
                  required
                  name="password"
                  // placeholder="Password"
                />
                <Button type="submit">Login</Button>
                <span>
                  <Link to={"/resetpassword"}>Forgot Password?</Link>
                </span>
                <span>
                  <Link to={"/register"}>Create a new Account</Link>
                </span>
              </Form>
            </F2C>
          </DF>
        </MainCenter>
      )}
    </>
  );
};

export default Login;
