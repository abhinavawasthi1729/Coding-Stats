// Import global CSS styles for the app
import "./App.css";

// Import routing utilities from react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import all the page components for different routes
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Notifications from "./Pages/Notifications";
import Settings from "./Pages/Settings";
import GlobalStyle from "./globalStyles";

// Import styled-components for theming and styled elements
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Components/Themes";

// Import authentication and user-related pages
import Login from "./Pages/Login";
import Register from "./Pages/Register";

// Redux hooks for dispatching actions and selecting state
import { useDispatch, useSelector } from "react-redux";

// Axios instance for authenticated requests
import { userRequest } from "./requestMethods";

// Additional user and profile-related pages
import UserInfo from "./Pages/UserInfo";
import DeleteAccount from "./Pages/ProfilePages/DeleteAccount";
import ChangePassword from "./Pages/ProfilePages/ChangePassword";
import ResetPassword from "./Pages/ProfilePages/ResetPassword";
import ResetPasswordNew from "./Pages/ProfilePages/ResetPasswordNew";

// Toast notification components and styles
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux action to change user theme preference
import { changeUserTheme } from "./redux/userSlice";

// Platform selection and update pages
import SetPlatforms from "./Pages/SetPlatforms";
import UpdatePlatforms from "./Pages/UpdatePlatforms";

// 404 Not Found page
import FourOFour from "./Pages/FourOFour";

// Styled-component for the main app body, uses theme for background color
const Body = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  // background: ${(props) => props.theme.text};
  // min-height: 100vh;
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
  // Get the Redux dispatch function
  const dispatch = useDispatch();

  // Get the current user object and theme preference from Redux store
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const themeDark = useSelector((state) => state?.user?.dark);

  // Set the default Authorization header for authenticated requests
  userRequest.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${currentUser?.token}`;

  // Function to dispatch theme change action
  const changeTheme = (val) => {
    dispatch(changeUserTheme(val));
  };

  // Define the application's routes using react-router
  const router = createBrowserRouter([
    // Home page
    {
      path: "/",
      element: <Home />,
    },
    // Profile page (dynamic user ID)
    {
      path: "/profile/:id",
      element: <Profile />,
    },
    // Change password
    {
      path: "/profile/changepassword",
      element: <ChangePassword />,
    },
    // Delete account
    {
      path: "/profile/deleteaccount",
      element: <DeleteAccount />,
    },
    // View another user's public info
    {
      path: "/user/:id",
      element: <UserInfo />,
    },
    // Notifications
    {
      path: "/notifications",
      element: <Notifications />,
    },
    // Settings
    {
      path: "/settings",
      element: <Settings />,
    },
    // Login
    {
      path: "/login",
      element: <Login />,
    },
    // Start password reset
    {
      path: "/resetpassword",
      element: <ResetPassword />,
    },
    // Complete password reset (with token/id)
    {
      path: "/resetpassword/:id",
      element: <ResetPasswordNew />,
    },
    // Set platforms (initial setup)
    {
      path: "/setPlatforms",
      element: <SetPlatforms />,
    },
    // Update platforms (after setup)
    {
      path: "/updatePlatforms",
      element: <UpdatePlatforms />,
    },
    // Register new user
    {
      path: "/register",
      element: <Register />,
    },
    // 404 Not Found fallback route
    {
      path: "*",
      element: <FourOFour />,
    },
  ]);

  // Main render block
  return (
    <>
      {/* Global CSS reset and base styles */}
      <GlobalStyle />

      {/* ThemeProvider applies dark or light theme based on Redux state */}
      <ThemeProvider theme={themeDark ? darkTheme : lightTheme}>
        {/* Toast notifications configuration */}
        <ToastContainer
          theme={themeDark ? "dark" : "light"}
          position="bottom-right"
          autoClose="1000"
          closeOnClick="true"
          transition={Flip}
          draggable="true"
        />
        {/* Main application body and routing */}
        <Body>
          <RouterProvider router={router} />
        </Body>
      </ThemeProvider>
    </>
  );
}

export default App;
