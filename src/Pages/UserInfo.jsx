import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import image from "../assets/image.svg";
import styled from "styled-components";

import { Link, useLocation, useNavigate } from "react-router-dom";
import MiniStat from "../Components/MiniStat";
import gfgLogo from "../assets/gfg.png";
import leetcodeLogo from "../assets/leetcode.png";
import codeforcesLogo from "../assets/codeforces.png";
import { useEffect } from "react";
import {
  getSearchedHeatmaps,
  getSearchedPlatforms,
  getSearchedProfile,
} from "../redux/apiCalls/searchApiCalls";
import { useDispatch, useSelector } from "react-redux";
import CumulativeHeatMap from "../Components/CumulativeHeatMap";
import Loader from "../Components/Loader";
import MainCenter from "../Components/MainCenter";
import { toast } from "react-toastify";
import { clearsearch } from "../redux/searchSlice";

// Styled components for styling
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  order: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 20%;
  height: max-content;
  padding-bottom: 20px;
  //overflow: hidden;
  margin-bottom: 40px;

  @media screen and (max-width: 1000px) {
    order: 1;
    width: 100%;
    padding: 10px;
    flex-direction: row;
    justify-content: space-evenly;

    > div {
      max-width: 500px;
    }
  }

  @media screen and (max-width: 570px) {
    flex-direction: column;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //width: 100%;
    height: 100%;

    @media screen and (max-width: 1330px) {
      flex-direction: column-reverse;
    }
  }

  .info-section {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1330px) {
      align-items: center;
    }

    h3 {
      color: ${(props) => props.theme.accent};
    }
  }

  .img {
    height: 100px;
    background-color: white;
    padding: 5px;
    border: 3px solid ${(props) => props.theme.backgroundColor};
    border-radius: 50%;
    box-shadow: ${(props) => props.theme.body} 0px 0px 2px;

    @media screen and (max-width: 1330px) {
      margin-bottom: 10px;
    }
  }

  img {
    height: 100%;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    @media screen and (max-width: 1000px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 20px;
    }

    a {
      margin: 20px;
      padding: 14px 0px;
      border: 1px solid ${(props) => props.theme.accent};
      border-radius: 5px;
      width: 100%;
      text-align: center;
      text-decoration: none;
      font-size: small;
      transition: all 0.25s ease;
      overflow: hidden;
      cursor: pointer;
      color: ${(props) => props.theme.text};

      &:hover {
        letter-spacing: 1.2px;
        color: ${(props) => props.theme.accent};
        border: 1px solid ${(props) => props.theme.text};
      }

      @media screen and (max-width: 1000px) {
        margin: 0;
      }
    }
  }
`;

const Data = styled.div`
  width: 80%;
  @media screen and (max-width: 1000px) {
    order: 2;
    width: 100%;
  }
`;

const Individuals = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  //height: max-content;

  h2 {
    margin-bottom: 10px;
  }

  a {
    width: 100%;
  }
`;
const Cumulative = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: max-content;
`;

// UserInfo component definition
const UserInfo = () => {
  const pathname = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state?.user?.currentUser?.data?.user?.username
  );
  const profile = useSelector((state) => state?.search);
  const isFetching = useSelector((state) => state?.search?.isFetching);
  const platformList = useSelector(
    (state) => state?.search?.user?.codingPlatforms
  );

  // Function to fetch profile data based on username
  const fetchProfile = async (pathname) => {
    const res = await getSearchedProfile(dispatch, pathname, navigate);
    console.log("res.data", res?.data?.data?.user?.codingPlatforms);
    console.log("buriburi", pathname);
    if (profile?.user?.username && currentUser !== pathname) {
      await getSearchedPlatforms(
        dispatch,
        res?.data?.data?.user?.codingPlatforms
      );
      await getSearchedHeatmaps(
        dispatch,
        res?.data?.data?.user?.codingPlatforms
      );
    }
  };

  // Function to fetch profile data for each platform
  const fetchProfileData = async () => {
    // if (profile?.user?.username && currentUser !== pathname) {
    //   await getSearchedPlatforms(dispatch, profile?.user?.codingPlatforms);
    //   await getSearchedHeatmaps(dispatch, profile?.user?.codingPlatforms);
    // }
  };

  // Effect to fetch profile data when component mounts or username changes
  useEffect(() => {
    if (currentUser && currentUser === pathname)
      navigate(`/profile/${pathname}`);
    else fetchProfile(pathname);
  }, [pathname]);

  // Effect to fetch platform and heatmap data when profile data is available
  useEffect(() => {
    console.log(profile?.user);
    if (profile?.user?.codingPlatforms?.length > 0) {
      fetchProfileData();
    }
  }, [profile?.user?.codingPlatforms]);

  // Function to get platform logo based on platform name
  const getLogo = (name) => {
    if (name == "gfg") return gfgLogo;
    if (name == "leetcode") return leetcodeLogo;
    if (name == "codeforces") return codeforcesLogo;
  };

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
          {!profile?.user?.username && (
            <MainCenter>
              <h2>{`Username: '${pathname}' not found!`}</h2>
              <br />
              <button
                onClick={() => {
                  dispatch(clearsearch());
                  navigate("/");
                }}
              >
                Go Back
              </button>
            </MainCenter>
          )}
          {profile?.user?.username && (
            <Main>
              <Container>
                <Info>
                  <div className="info">
                    <div className="info-section">
                      <h1>{profile?.user?.name}</h1>
                      <h3>{`@${profile?.user?.username}`}</h3>
                      <p>{profile?.user?.email}</p>
                    </div>
                    <div className="img">
                      <img src={image} alt="profile pic" />
                    </div>
                  </div>
                </Info>

                <Data>
                  {!profile?.user?.codingPlatforms?.length && (
                    <Individuals>
                      <h2>No Coding Platforms Submitted</h2>
                    </Individuals>
                  )}
                  {profile?.user?.codingPlatforms?.length !== 0 && (
                    <>
                      <Individuals>
                        <h2>Individual Progress</h2>
                        {profile?.user?.codingPlatforms?.map((platform) => (
                          <MiniStat
                            key={platform?._id}
                            platform={
                              profile?.platforms?.filter(
                                (p) =>
                                  p?.platformName === platform?.platformName
                              )[0]
                            }
                            heatmap={
                              profile?.heatmaps?.filter(
                                (f) =>
                                  f?.platformName === platform?.platformName
                              )[0]
                            }
                            siteLogo={getLogo(
                              platform?.platformName.toLowerCase()
                            )}
                          />
                        ))}
                      </Individuals>
                      <Cumulative>
                        <h2>Cumulative Progress</h2>

                        <CumulativeHeatMap
                          data={profile?.heatmaps?.map(
                            (heatmap) => heatmap.heatmapData
                          )}
                        />
                      </Cumulative>
                    </>
                  )}
                </Data>
              </Container>
            </Main>
          )}
        </>
      )}
    </>
  );
};

export default UserInfo;
