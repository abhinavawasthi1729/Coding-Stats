// Import global styles
import "./App.css";

// React Router for SPA routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Route-based page components
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserInfo from "./Pages/UserInfo";
import DeleteAccount from "./Pages/ProfilePages/DeleteAccount";
import ChangePassword from "./Pages/ProfilePages/ChangePassword";
import ResetPassword from "./Pages/ProfilePages/ResetPassword";
import ResetPasswordNew from "./Pages/ProfilePages/ResetPasswordNew";
import SetPlatforms from "./Pages/SetPlatforms";
import UpdatePlatforms from "./Pages/UpdatePlatforms";
import FourOFour from "./Pages/FourOFour";

// Global style and theming
import GlobalStyle from "./globalStyles";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Components/Themes";

// Redux setup
import { useDispatch, useSelector } from "react-redux";
import { changeUserTheme } from "./redux/userSlice";

// Axios instance for authenticated API requests
import { userRequest } from "./requestMethods";

// Toast notifications
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Main layout wrapper using styled-components and theme props
const Body = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
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
  // Redux hooks
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const themeDark = useSelector((state) => state?.user?.dark);

  // Inject auth token into all outgoing requests (if logged in)
  userRequest.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${currentUser?.token}`;

  // Theme toggle (used somewhere else presumably)
  const changeTheme = (val) => {
    dispatch(changeUserTheme(val));
  };

  // Define all routes of the app
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/profile/:id", element: <Profile /> },
    { path: "/profile/changepassword", element: <ChangePassword /> },
    { path: "/profile/deleteaccount", element: <DeleteAccount /> },
    { path: "/user/:id", element: <UserInfo /> },
    { path: "/notifications", element: <Notifications /> },
    { path: "/settings", element: <Settings /> },
    { path: "/login", element: <Login /> },
    { path: "/resetpassword", element: <ResetPassword /> },
    { path: "/resetpassword/:id", element: <ResetPasswordNew /> },
    { path: "/setPlatforms", element: <SetPlatforms /> },
    { path: "/updatePlatforms", element: <UpdatePlatforms /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <FourOFour /> }, // fallback for undefined routes
  ]);

  return (
    <>
      {/* Global CSS baseline */}
      <GlobalStyle />

      {/* Provide selected theme context (dark/light) */}
      <ThemeProvider theme={themeDark ? darkTheme : lightTheme}>
        {/* Toast for alert messages */}
        <ToastContainer
          theme={themeDark ? "dark" : "light"}
          position="bottom-right"
          autoClose={1000}
          closeOnClick
          transition={Flip}
          draggable
        />

        {/* Core layout container and route renderer */}
        <Body>
          <RouterProvider router={router} />
        </Body>
      </ThemeProvider>
    </>
  );
}

export default App;
