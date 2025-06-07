import { useEffect, useState } from "react";
import styled from "styled-components";
import Main from "../Components/Main";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router";
import searchingPerson from "../assets/searching.jpg";
import photo1 from "../assets/photo 1.png";
import photo2 from "../assets/photo 2.png";
import { toast } from "react-toastify";

const Container = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-image: url("../assets/blob light.svg");
    background-repeat: no-repeat, repeat;
    background-color: #cccccc;
  }

  img {
    max-width: 100%;
  }

  h1,
  h2 {
    margin-top: 15px;
  }

  h3 {
    margin-top: 8px;
  }

  ul {
    list-style-type: none;
  }

  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 30px;
  }

  .accent {
    color: ${(props) => props.theme.accent};
  }

  .header {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header h1 {
    font-size: 3rem;
    font-weight: bold;
    line-height: 1.2;
  }

  .header img {
    max-width: 400px;
  }

  .header .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .button {
    background-color: #04aa6d; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 10px;
  }

  .header2 {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header2 h1 {
    font-size: 3rem;
    font-weight: bold;
    line-height: 1.2;
  }

  .header2 img {
    max-width: 400px;
  }

  .header2 .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .toHide {
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }

  .wid {
    max-width: 50%;
    @media screen and (max-width: 1000px) {
      max-width: initial;
      width: 100%;
    }
  }

  .boxes {
    height: 50%;
  }

  .boxes .container {
    display: flex;
    justify-content: space-between;
  }

  .box {
    flex: 1;

    margin: 20px 10px;

    padding: 15px 20px;
  }

  .boxes h2,
  .boxes p {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
  }
`;

// Styled components for styling the elements
const About = styled.div`
  //background-color: red;
  //text-align: center;

  h1 {
    //font-size: 100px;
    //color: ${(props) => props.theme.accent};
    //margin-bottom: 40px;
    //filter: drop-shadow(4px 4px 4px rgba(${(props) =>
      props.theme.textRgba}, 0.4));
  }

  p {
    margin-bottom: 40px;
    color: ${(props) => props.theme.colorSecondary};
  }
`;

const DF = styled.div`
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  //background-color: green;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    width: 100%;
    padding: 10px 30px;
    border: solid 2px ${(props) => props.theme.text};
    border-radius: 3px;
    margin-bottom: 20px;
    //background: none;
    color: black;
    //box-shadow: 1px 1px 4px ${(props) => props.theme.text};
    font-size: 1.2rem;
  }

  button {
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
  }
`;

// Functional component for Home page
const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const searchFunction = () => {
    navigate(`/user/${username}`);
  };
  useEffect(() => {
    toast(
      "If this is the first time you are opening our site, it might take about 40s for server to boot up."
    );
    toast("Thank you for your patience.");
  }, []);

  return (
    <>
      <NavBar />
      <Main>
        <Container>
          <header className="header">
            <div className="container">
              <div>
                <h1 className="accent" style={{ margin: "20px 0" }}>
                  Centralized Progress Tracking
                </h1>
                <p>
                  Track your progress across multiple coding platforms in one
                  place, saving time and effort.
                </p>
                <p>
                  See upcoming contest details, create friends and showcase your
                  profile, all under one platform.
                </p>

                <div style={{ margin: "20px 0" }}>
                  {/*<About>*/}
                  {/*    <h1>Search your friends!</h1>*/}
                  <p>Insert codestats username to go to their profile</p>
                  {/*</About>*/}
                  <Form style={{ margin: "20px 0" }} onSubmit={searchFunction}>
                    <input
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                    />
                    <button type="submit">Search</button>
                  </Form>
                </div>
              </div>
              <img className="toHide" src={photo1} />
            </div>
          </header>

          <header className="header2">
            <div className="container">
              <div className="wid">
                <h1 className="accent" style={{ display: "block" }}>
                  Upcoming features
                </h1>
                <h2>Mentor Group</h2>
                <p>
                  The group feature allows users to create and manage coding
                  groups, enabling them to add participants, monitor their
                  progress, and foster collaborative learning environments for
                  enhanced skill development and mutual support.
                </p>

                <h2>Track questions</h2>
                <p>
                  Track similar questions solved on different platforms so you
                  know how many different questions are solved.
                </p>
                <p>
                  Track count of questions solved from different coding sheets.
                </p>

                <h2>Badges</h2>
                <p>
                  Get Badges and Achievements for maintaining a streak, solving
                  questions of coding sheets, etc.
                </p>
              </div>
              <img className="toHide" style={{ width: "25%" }} src={photo2} />
            </div>
          </header>

          <section
            style={{
              borderTop: "1px solid grey",
              width: "100%",
              padding: "20px 0 0",
              margin: "40px 0 -40px",
            }}
            className="boxes"
          >
            <h2>Created with ♥ by</h2>
            <div className="container">
              <div className="box">
                <p>Jigyasu Saini</p>
                <p>(2023CA49)</p>
              </div>
              <div className="box">
                <p>Abhishek Singh</p>
                <p>(2023CA07)</p>
              </div>
              <div className="box">
                <p>Abhinav Awasthi</p>
                <p>(2023CA02)</p>
              </div>
            </div>
          </section>
        </Container>
      </Main>
    </>
  );
};

export default Home;
