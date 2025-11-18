import { BrowserRouter, Routes, Route } from "react-router-dom";
import FreelancerNavbar from "./FreelancerNavbar.jsx";
import { Services } from "./Services.jsx";
import { Jobs } from "./Jobs.jsx";
import { Support } from "./Support.jsx";
import { Login } from "./Login.jsx";
import { Register } from "./Register.jsx";
import { HomePage } from "./HomePage.jsx";
import { FreelancerChat } from "./FreelancerChat.jsx";
import HomeClient from "./ClientPages/HomeClient.jsx";
import PostJob from "./ClientPages/PostJob.jsx";
import Messages from "./ClientPages/Messages.jsx";
import Status from "./ClientPages/Status.jsx";
import ClientLayout from "./ClientLayout.jsx";
import FreelancerProfile from "./FreelancerProfile.jsx";
import ClientProfile from "./ClientPages/ClientProfile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        // Freelancer Dashboard Routes
        <Route element={<FreelancerNavbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/job" element={<Jobs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/freelancerChat/:clientId" element={<FreelancerChat />} />
           //optional fallback
          <Route path="/freelancerChat" element={<FreelancerChat />} />
          <Route path="/Freelancer-profile" element={<FreelancerProfile />} />
        </Route>

        // Client Dashboard Routes
        <Route element={<ClientLayout />} >
          <Route path="/client-home" element={<HomeClient />} />
          <Route path="/post-jobs" element={<PostJob />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages" element={<p>Please select a job to view applicants</p>} />
          <Route path="/status" element={<Status />} />
          <Route path="/Client-profile" element={<ClientProfile />} />
        </Route>

        // Auth Routes
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
