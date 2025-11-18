import React, { useEffect, useRef } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import study from "./images/studying.jpg";
import tech from "./images/techimg.jpg";
import marketing from "./images/marketing.jpg";
import finance from "./images/finance.jpg";
import writing from "./images/writing.jpg";
import sales from "./images/sales.jpg";
import design from "./images/design.jpg";
import Freelancer from "./images/freelancer.jpg";
import FreelancerNavbar from "./FreelancerNavbar";

export const HomePage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // Auto-scroll cards
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const scrollStep = 1; // pixels per interval
    const interval = 20; // ms

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollAmount = 0; // reset to start
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    }, interval);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div>
      <FreelancerNavbar />
      {/* Hero Section */}
      <div className="text-white bg-black min-h-screen flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-16 mt-10 lg:px-24 py-10">
        <div className="flex flex-col md:max-w-lg lg:max-w-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-snug">
            Connect.<br />
            Collaborate.<br />
            Get Hired.
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-6 leading-relaxed">
            Join a thriving freelance community.<br />
            Sign up or log in to discover top projects,<br />
            connect with clients, and get the support<br />
            when you need to succeed.
          </p>
          <button
            className="px-5 py-2 sm:px-6 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg 
            hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition w-max"
            onClick={() => navigate("/job")}
          >
            Find a Job
          </button>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8 lg:ml-12 xl:ml-16 flex-shrink-0">
          <img
            src={study}
            alt="Studying"
            className="rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          />
        </div>
      </div>

      {/* Auto-Scrolling Cards Section */}
      <div className="bg-white">
        <p className="text-black text-sm mt-15 text-center sm:text-base md:text-lg lg:text-xl mb-6 leading-relaxed">
          Discover top freelance talent on demand.
        </p>
        <h3 className="text-center -mt-3">
          Browse top industries and connect with trusted professionals
          who are ready to support your next project.
        </h3>
        <div className="bg-white text-white px-4 sm:px-6 md:px-16 lg:px-24 py-10">
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Firefox & IE
          >
            {[tech, marketing, finance, writing, sales, design].map((imgSrc, index) => {
              const titles = ["Technical", "Marketing", "Finance", "Content-Writing", "Sales", "Designing"];
              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg overflow-hidden text-center p-4 min-w-[250px] hover:bg-gray-700 transition"
                >
                  <img src={imgSrc} alt={titles[index]} className="w-full h-40 object-cover rounded-lg mb-3" />
                  <h3 className="text-xl font-semibold">{titles[index]}</h3>
                </div>
              );
            })}
          </div>
        </div>



        <div className="w-full flex justify-center mt-0">
          <button
            className="px-4 py-2 -mt-1 mb-6 text-orange-500 sm:px-5 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4
               text-sm sm:text-base md:text-lg lg:text-xl
               bg-white text-black font-semibold rounded-lg
               border-2 border-red-500
               hover:bg-orange-500 hover:text-white
               focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            onClick={() => navigate("/job")}
          >
            Browse Jobs
          </button>
        </div>
      </div>

      {/* Rest of your page content remains the same... */}
      {/* Freelancer features, footer, etc. */}
      {/* Copy the remaining JSX from your existing code here */}


      <section className="py-12 px-6 bg-gray-100 text-black">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
          Features for Every Freelancer
        </h2>

        <div className="max-w-6xl mx-auto bg-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center">

          <div className="w-full md:w-1/2">
            <img
              src={Freelancer}
              alt="Freelancer"
              className="w-full h-64 md:h-full object-cover border border-white"
            />
          </div>

          <div className="w-full md:w-1/2 p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              Join Free in Minutes
            </h3>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Create your account to access hundreds of job listings
              and Connect seamlessly with other freelancers and clients to expand your network.
              Start your freelance journey today and
              unlock opportunities to grow your skills and income.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 mt-4 bg-orange-600 text-white text-lg font-semibold 
            rounded-xl shadow-md hover:bg-orange-700 transition"
            >
              Join Now
            </button>
          </div>
        </div>
      </section>

      <div>
        <h1 className="text-center text-gray-600 mt-40">KEY FEATURES</h1>
        <h1 className="text-center font-bold mb-50 
      text-3xl sm:text-4xl md:text-6xl lg:text-7xl 
      text-black mt-10">
          Collaborate. Create. <br />
          Get paid.
        </h1>
      </div>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 lg:p-16 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Fast solutions to your questions
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6">
            Helping freelancers connect with clients
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                For Freelancers
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Learn how to find projects, manage clients, and grow your
                freelance career.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                For Clients
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Get guidance on posting jobs, hiring the right freelancers, and
                managing projects.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={() => navigate("/support")}
              className="px-6 py-3 bg-orange-600 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-orange-700 transition"
            >
              Help & Support
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-black text-gray-300 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">

          <div>
            <h3 className="text-lg font-semibold text-white">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">About</a></li>
              <li><a href="#" className="hover:text-orange-500">Support</a></li>
              <li><a href="#" className="hover:text-orange-500">Categories</a></li>
              <li><a href="#" className="hover:text-orange-500">Freelancers</a></li>
              <li><a href="#" className="hover:text-orange-500">Projects</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Jobs</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">Find Jobs</a></li>
              <li><a href="#" className="hover:text-orange-500">Post a Job</a></li>
              <li><a href="#" className="hover:text-orange-500">How It Works</a></li>
              <li><a href="#" className="hover:text-orange-500">Apply for Job</a></li>
              <li><a href="#" className="hover:text-orange-500">Browse Job</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">Policy</a></li>
              <li><a href="#" className="hover:text-orange-500">Guides</a></li>
              <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-500">FAQ</a></li>
              <li><a href="#" className="hover:text-orange-500">Terms</a></li>
            </ul>
          </div>

        </div>

        <div className="text-center px-4 sm:px-6 md:px-12 lg:px-20">
          <p className="mt-10 sm:mt-16 md:mt-20 text-base sm:text-lg md:text-xl lg:text-2xl">
            Stay Informed
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-2">
            Get the latest updates and tips.
          </h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 md:w-96 lg:w-[28rem] h-10 sm:h-12 mt-6 text-black 
          bg-white px-4 py-2 mb-4 border rounded-md 
          focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>


        <div className="w-full flex justify-center mt-6">
          <button className="px-4 py-2 -mt-2 sm:px-5 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 
          text-sm sm:text-base md:text-lg lg:text-xl 
          bg-orange-500 text-white font-semibold rounded-lg 
          hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition">
            Subscribe
          </button>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} GigConnect. All rights reserved.
        </div>

        <div className="flex justify-center space-x-6 text-2xl pb-1 pt-4">
          <a href="https://facebook.com" className="hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" className="hover:text-pink-500">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" className="hover:text-blue-400">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" className="hover:text-sky-400">
            <FaTwitter />
          </a>
          <a href="https://youtube.com" className="hover:text-red-500">
            <FaYoutube />
          </a>
        </div>


      </footer>

    </div>
  );
};
