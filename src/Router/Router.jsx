import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Navbar from "../components/Navbar";
import PostJob from "../Pages/PostJob";
import Myjob from "../Pages/Myjob";
import News from "../Pages/News";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import PrivateRoute from "../components/PrivateRoute";
import Landing from "../Pages/Landing";
import MyApplications from "../Pages/MyApplications";
import HomePageNavbar from "../components/HomePageNavbar";
import ResumeAnalyzer from "../Pages/ResumeAnalyzer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HomePageNavbar />
            <Landing />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <HomePageNavbar />
            <Login />
          </>
        ),
      },
      {
        path: "/signup",
        element: (
          <>
            <HomePageNavbar />
            <Signup />
          </>
        ),
      },
      {
        path: "/news",
        element: (
          <>
            <Navbar />
            <News />
          </>
        ),
      },
      
      // Search is accessible to everyone logged in, but often student focused
      {
        path: "/search",
        element: (
          <PrivateRoute>
            <>
              <Navbar />
              <Home />
            </>
          </PrivateRoute>
        ),
      },

      // RECRUITER ONLY ROUTES
      {
        path: "/post-job",
        element: (
          <PrivateRoute requiredRole="recruiter">
            <>
              <Navbar />
              <PostJob />
            </>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-job",
        element: (
          <PrivateRoute requiredRole="recruiter">
            <>
              <Navbar />
              <Myjob />
            </>
          </PrivateRoute>
        ),
      },

      // STUDENT ONLY ROUTES
      {
        path: "/my-applications",
        element: (
          <PrivateRoute requiredRole="student">
            <>
              <Navbar />
              <MyApplications />
            </>
          </PrivateRoute>
        ),
      },
      {
        path: "/resume",
        element: (
          <PrivateRoute requiredRole="student">
            <>
              <Navbar />
              <ResumeAnalyzer />
            </>
          </PrivateRoute>
        ),
      }
    ],
  },
]);

export default router;
