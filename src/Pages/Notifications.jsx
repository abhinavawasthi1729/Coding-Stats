import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { publicRequest } from "../requestMethods";
import MainCenter from "../Components/MainCenter";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

// Styled components for styling
const Container = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    margin-bottom: 50px;
    color: ${(props)=>props.theme.accent};
  }
`;
const Platforms = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 20px;

`;
const Platform = styled.div`
  width: 400px;
  padding: 20px;
  height: max-content;
  background:${(props)=>props.theme.backgroundGradient} ;
  border-radius: 5px;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 30px;
    border-bottom: 1px solid grey;
  }

`;

const Notification = styled.div``;

// Notifications component definition
const Notifications = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state?.user?.currentUser?.data?.user?.username
  );
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [platforms, setPlatforms] = useState({});

  // Function to fetch notifications from the server
  const apiCall = async () => {
    toast("Fetching Notifications");
    setIsFetching(true);
    try {
      const { error, ...res } = (await publicRequest.get("/notifications")).data
        .data;
      setPlatforms(res);
      console.log(platforms);
      setIsError(false);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
      setIsError(true);
      toast(`Something went wrong!`);
      console.log(error);
    }
  };

  // useEffect hook to ensure user is logged in and fetch notifications on component mount
  useEffect(() => {
    apiCall();
  }, []);
  // useEffect hook to log platforms whenever platforms state changes
  useEffect(() => {
    console.log(Object.entries(platforms));
  }, [platforms]);

  return (
    <>
      <NavBar />
      {isFetching && (
        <MainCenter>
          <Loader />
        </MainCenter>
      )}
      {!isFetching && (
        <>
          {isError && (
            <MainCenter>
              <h2>Something went wrong</h2>
              <button onClick={() => navigate("/")}>Go Back</button>
            </MainCenter>
          )}
          {!isError && (
            <Main>
              <Container>
                <h1>Contest Notifications</h1>
                <Platforms>
                  {Object.entries(platforms)?.map((platform) => (
                    <Platform key={platform[0]}>
                      <h2>{platform[0]}</h2>
                      {platform[1]?.map((noti) => (
                        <Notification key={noti?.title}>
                          <h4>{noti?.title}</h4>
                          <p>{noti?.start}</p>
                          <p>
                            <a href={noti?.link}>Visit</a>
                          </p>
                        </Notification>
                      ))}
                    </Platform>
                  ))}
                </Platforms>
              </Container>
            </Main>
          )}
        </>
      )}
    </>
  );
};

export default Notifications;
