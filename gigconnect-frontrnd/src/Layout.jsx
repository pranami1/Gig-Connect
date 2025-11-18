import { useState, useEffect } from "react";
import FreelancerNavbar from "./FreelancerNavbar";
import ClientNavbar from "./ClientNavbar";

const Layout = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const handleStorage = () => setRole(localStorage.getItem("role"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (!role) return null; 

  return (
    <div>
      {role === "Freelancer" ? <FreelancerNavbar /> : <ClientNavbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
