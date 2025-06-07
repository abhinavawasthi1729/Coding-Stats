import { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Main from "../Components/Main";
import styled from "styled-components";
import gfgLogo from "../assets/gfg.png";
import leetcodeLogo from "../assets/leetcode.png";
import codeforcesLogo from "../assets/codeforces.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setPlatform } from "../redux/apiCalls/profileApiCalls";

// Styled components for form elements
const FormContainer = styled.div`
  //height: 80%;
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  .error {
    color: red;
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
    span {
      font-size: 30px;
      width: max-content;
    }
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

  @media screen and (max-width: 730px) {
    width: 100%;
  }

  &.final {
    width: 200px;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;

  background-color: ${(props) => props.theme.backgroundColor};
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-content: center;
  }
  img {
    height: 80px;
    margin-right: 50px;
  }
  @media screen and (max-width: 730px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  width: 400;
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
    border: 1px solid ${(props) => props.theme.accent};
    background-color: transparent;
  }
  @media screen and (max-width: 730px) {
    margin: 0px;
  }
`;

const UpdatePlatforms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(
    (state) => state?.user?.currentUser?.data?.user?.username
  );
  const platformList = useSelector((state) => state?.profile?.platforms);

  const [platformData, setPlatformData] = useState({});

  const handleChange = (name, value) => {
    setPlatformData({ ...platformData, [name]: value.trim() });
  };

  const handleNext = () => {
    navigate(`/profile/${currentUser}`);
  };

  const getPlaceholder = (name) => {
    return platformList.filter((platfrom) => platfrom.platformName === name)[0]
      ?.handler;
  };

  return (
    <>
      <NavBar />
      <Main>
        <h1>Select Platforms</h1>
        <FormContainer action="" className="login">
          <Label>
            <span>
              <img src={gfgLogo} alt="" />
              <Input
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                type="text"
                required
                name="GFG"
                placeholder={
                  getPlaceholder("GFG")
                    ? `${getPlaceholder("GFG")}`
                    : "Enter your GFG Username"
                }
              />
            </span>
            <Button
              onClick={() => {
                setPlatform(
                  dispatch,
                  {
                    platformName: "GFG",
                    platformHandler: platformData["GFG"],
                  },
                  currentUser
                );
              }}
            >
              Submit
            </Button>
          </Label>

          <Label>
            <span>
              <img src={leetcodeLogo} alt="" />
              <Input
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                type="text"
                required
                name="LEETCODE"
                placeholder={
                  getPlaceholder("LEETCODE")
                    ? `${getPlaceholder("LEETCODE")}`
                    : "Enter your LEETCODE Username"
                }
              />
            </span>
            <Button
              onClick={() => {
                setPlatform(
                  dispatch,
                  {
                    platformName: "LEETCODE",
                    platformHandler: platformData["LEETCODE"],
                  },
                  currentUser
                );
              }}
            >
              Submit
            </Button>
          </Label>

          <Label>
            <span>
              <img src={codeforcesLogo} alt="" />
              <Input
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                type="text"
                required
                name="CODEFORCES"
                placeholder={
                  getPlaceholder("CODEFORCES")
                    ? `${getPlaceholder("CODEFORCES")}`
                    : "Enter your CODEFORCES Username"
                }
              />
            </span>
            <Button
              onClick={() => {
                setPlatform(
                  dispatch,
                  {
                    platformName: "CODEFORCES",
                    platformHandler: platformData["CODEFORCES"],
                  },
                  currentUser
                );
              }}
            >
              Submit
            </Button>
          </Label>
          <Button className="final" onClick={() => handleNext()}>
            Go to Profile
          </Button>
        </FormContainer>
      </Main>
    </>
  );
};

export default UpdatePlatforms;
