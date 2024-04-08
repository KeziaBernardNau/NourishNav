import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import HeroSection from "./pages/home";
import Contact from "./pages/contact";
import { Demo } from "./pages/demo";
import Login from "./pages/login";
import Private from "./pages/profile";
import Recipe from "./pages/Recipe.jsx";
import UpdatePassword from "./component/UpdatePassword";
import ForgotPassword from "./component/ForgotPassword.js";
import Signup from "./component/signup";

import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
// import HeroSection from "./component/HeroSection.jsx";

import AboutUs from "./component/AboutUs.jsx";

import MacroTracker from "./component/MacroTracker.js";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<HeroSection />} path="/" />
            {/* <Route element={<HeroSection />} path="/home" /> Use HeroSection here */}
            <Route element={<Demo />} path="/demo" />
            <Route element={<MacroTracker />} path="/macro" />
            <Route element={<Recipe />} path="/recipe" />
            <Route element={<Contact />} path="/" />
            <Route element={<Recipe recipes={Recipe} />} path="/recipe" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Private />} path="/profile" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<AboutUs />} path="/about_us" />
            <Route element={<ForgotPassword />} path="/forgotpassword" />
            <Route element={<UpdatePassword />} path="/update-password" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);




// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ScrollToTop from "./component/scrollToTop";
// import { BackendURL } from "./component/backendURL";

// import { Home } from "./pages/home";
// import Contact from "./pages/contact";
// import { Demo } from "./pages/demo";
// import Login from "./pages/login";
// import Private from "./pages/profile";
// import Signup from "./pages/signup";

// import { Single } from "./pages/single";
// import injectContext from "./store/appContext";

// import { Navbar } from "./component/navbar";
// import { Footer } from "./component/footer";
// import Recipe from "../../components/recipe/Recipe.jsx";

// //create your first component
// const Layout = () => {
//   //the basename is used when your project is published in a subdirectory and not in the root of the domain
//   // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
//   const basename = process.env.BASENAME || "";

//   if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
//     return <BackendURL />;

//   return (
//     <div>
//       <BrowserRouter basename={basename}>
//         <ScrollToTop>
//           <Navbar />
//           <Routes>
//             <Route element={<Home />} path="/" />
//             <Route element={<Demo />} path="/demo" />
// //             <Route element={<Contact />} path="/" />
//             <Route element={<Recipe recipes={Recipe} />} path="/recipe" />
//             <Route element={<Single />} path="/single/:theid" />
//             <Route element={<Private />} path="/profile" />
//             <Route element={<Signup />} path="/signup" />
//             <Route element={<Login />} path="/login" />
//             <Route element={<h1>Not found!</h1>} />
//           </Routes>
//           <Footer />
//         </ScrollToTop>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default injectContext(Layout);
