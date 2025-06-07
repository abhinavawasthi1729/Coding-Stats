/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styled from "styled-components";
import profile from "../assets/image.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCloudMoon,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import logoLight from "../assets/logo-light.png";
import { useDispatch, useSelector } from "react-redux";
import { changeUserTheme } from "../redux/userSlice";

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${(props) => props.theme.backgroundColor};
  width: 100%;
  //background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  border: 1px solid rgba(255, 255, 255, 0.1);

  > div {
    width: 100%;
    max-width: 1400px;
    display: flex;
    justify-content: space-between;
  }
`;

const Navs = styled.div`
  //padding-left: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    height: 50px;
    transition: all 0.25s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  //background-color: blue;
  align-content: center;
`;

const Theme = styled.div`
  //height: 60px;
  width: 60px;
  //margin-right: 60px;
  //border-radius: 50%;
  //box-shadow: inset 1px 1px 5px #00573d;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  transition: all 0.25s ease-in-out;
  color: ${(props) => props.theme.text};

  &:active {
    transform: rotate(${(props) => (props.theme.dark ? "-20deg" : "20deg")});
  }

  &:hover {
    svg {
      transform: scale(1.2);
    }
  }

  svg {
    height: 25px;
    width: 25px;
    transition: all 0.25s ease-in-out;
  }
`;
const Profile = styled.div`
  background-color: white;
  border-radius: 100%;

  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid black;
  padding: 5px;
  box-sizing: border-box;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 50%;
    transition: all 0.25s ease-in-out;

    &:hover {
      transform: scale(1.15);
    }
  }
`;

const NavBar = () => {
  const themeDark = useSelector((state) => state?.user?.dark);
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state?.user?.currentUser?.data?.user?.username
  );
  return (
    <Container>
      <div>
        <Navs>
          <Link to={"/"}>
            <img src={themeDark ? logo : logoLight} alt="Coding Stats" />
          </Link>
        </Navs>

        <Buttons>
          <Theme onClick={() => dispatch(changeUserTheme(!themeDark))}>
            <FontAwesomeIcon icon={themeDark ? faCloudMoon : faCloudSun} />
          </Theme>

          <Link to={"/notifications"}>
            <Theme>
              <FontAwesomeIcon icon={faBell} />
            </Theme>
          </Link>

          <Profile>
            <Link
              to={currentUser ? `/profile/${currentUser}` : "/login"}
              style={{ display: "flex" }}
            >
              <img src={profile} alt="profile" />
            </Link>
          </Profile>
        </Buttons>
      </div>
    </Container>
  );
};

export default NavBar;
