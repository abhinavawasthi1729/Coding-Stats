import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import GlobalStyle from "./globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Components/Themes";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "./requestMethods";
import UserInfo from "./Pages/UserInfo";
import DeleteAccount from "./Pages/ProfilePages/DeleteAccount";
import ChangePassword from "./Pages/ProfilePages/ChangePassword";
import ResetPassword from "./Pages/ProfilePages/ResetPassword";
import ResetPasswordNew from "./Pages/ProfilePages/ResetPasswordNew";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changeUserTheme } from "./redux/userSlice";
import SetPlatforms from "./Pages/SetPlatforms";
import UpdatePlatforms from "./Pages/UpdatePlatforms";
import FourOFour from "./Pages/FourOFour";

const Body = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};

  // background: ${(props) => props.theme.text};
  //min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

function App() {
  // Redux hooks for dispatch and selecting user state
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const themeDark = useSelector((state) => state?.user?.dark);

  // Setting authorization header for user request
  userRequest.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${currentUser?.token}`;

  const changeTheme = (val) => {
    dispatch(changeUserTheme(val));
  };

  // Creating browser router instance with defined routes
 const router = createBrowserRouter([
  // Home page route
  {
    path: "/",
    element: <Home />,
  },

  // User profile page (dynamic user ID)
  {
    path: "/profile/:id",
    element: <Profile />,
  },

  // Change password page (typically accessed from profile/settings)
  {
    path: "/profile/changepassword",
    element: <ChangePassword />,
  },

  // Delete account confirmation or action page
  {
    path: "/profile/deleteaccount",
    element: <DeleteAccount />,
  },

  // View another user's public info (dynamic user ID)
  {
    path: "/user/:id",
    element: <UserInfo />,
  },

  // Notifications page (for alerts/messages)
  {
    path: "/notifications",
    element: <Notifications />,
  },

  // App-wide settings page
  {
    path: "/settings",
    element: <Settings />,
  },

  // Login page
  {
    path: "/login",
    element: <Login />,
  },

  // Start of password reset process (enter email)
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },

  // Reset password form for a specific user/token (dynamic ID)
  {
    path: "/resetpassword/:id",
    element: <ResetPasswordNew />,
  },

  // Set platforms (initial onboarding or preferences)
  {
    path: "/setPlatforms",
    element: <SetPlatforms />,
  },

  // Update platform preferences (already set)
  {
    path: "/updatePlatforms",
    element: <UpdatePlatforms />,
  },

  // User registration page
  {
    path: "/register",
    element: <Register />,
  },

  // Fallback route for undefined paths (404 page)
  {
    path: "*",
    element: <FourOFour />,
  },
]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themeDark ? darkTheme : lightTheme}>
        <ToastContainer
          theme={themeDark ? "dark" : "light"}
          position="bottom-right"
          autoClose="1000"
          closeOnClick="true"
          transition={Flip}
          draggable="true"
        />
        <Body>
          <RouterProvider router={router} />
        </Body>
      </ThemeProvider>
    </>
  );
}

export default App;
