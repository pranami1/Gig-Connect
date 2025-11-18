
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ClientNavbar from "../ClientNavbar.jsx";
import bgImage from "../images/bg.jpg";
import freelancer from "../images/handslaptop.jpg"

export default function HomeClient() {
  const navigate = useNavigate();

  const recommendedFreelancers = [
    { name: "John Doe", skill: "Web Developer", rate: "$30/hr", img: bgImage },
    { name: "Jane Smith", skill: "Graphic Designer", rate: "$25/hr", img: bgImage },
    { name: "Alex Johnson", skill: "Content Writer", rate: "$20/hr", img: bgImage },
  ];

  return (
    <div>
      <ClientNavbar />

      {/* Hero Section */}
      <div className="text-white bg-black min-h-screen flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-16 mt-10 lg:px-24 py-10">
        <div className="flex flex-col md:max-w-lg lg:max-w-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-snug">
            Post Jobs.<br />
            Hire Fast.<br />
            Deliver Big.
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-6 leading-relaxed">
            Join a network of top freelancers.<br />
            Post your project or job listing,<br />
            connect with skilled professionals,<br />
            and get the support you need to succeed.
          </p>

          <button
            className="px-5 py-2 sm:px-6 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg 
            hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition w-max"
            onClick={() => navigate("/post-jobs")}
          >
            Post a Job
          </button>
        </div>

        <div className="mt-8 md:mt-0 md:ml-8 lg:ml-12 xl:ml-16 flex-shrink-0">
          <img
            src={bgImage}
            alt="Hero"
            className="rounded-lg w-[400px] h-[300px] sm:w-[500px] sm:h-[350px] md:w-[600px] md:h-[400px] object-cover"
          />
        </div>
      </div>
      <div>
        {/* Top Freelancers Section */}
        <section className="bg-white py-16 px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Top Freelancers
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Freelancer Card */}
            {[
              { name: "John Doe", skill: "Web Developer", rate: "$30/hr", rating: "4.9", img: freelancer },
              { name: "Jane Smith", skill: "Graphic Designer", rate: "$25/hr", rating: "4.8", img: freelancer },
              { name: "Alex Johnson", skill: "Content Writer", rate: "$20/hr", rating: "4.7", img: freelancer },
            ].map((freelancer, i) => (
              <div
                key={i}
                className="bg-gray-50 shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition"
              >
                {/* Freelancer Image */}
                <img
                  src={freelancer.img}
                  alt={freelancer.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-orange-500"
                />

                {/* Name + Verified Badge */}
                <div className="flex justify-center items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{freelancer.name}</h3>
                  <span className="text-green-500 text-xl">✔</span>
                </div>

                <p className="text-gray-600">{freelancer.skill}</p>
                <p className="text-orange-500 font-semibold">{freelancer.rate}</p>
                <p className="text-yellow-500 mt-1">⭐ {freelancer.rating}</p>

                <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                  Hire Now
                </button>
              </div>
            ))}
          </div>
        </section>


        <div className="mt-6 text-center">
          <button
            className="px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg border-2 border-red-500 hover:bg-orange-500 hover:text-white transition"
            onClick={() => navigate("/post-jobs")}
          >
            Browse All Freelancers
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-500 text-white text-2xl font-bold rounded-full mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Post a Job</h3>
              <p className="text-gray-600 text-sm">
                Describe your project requirements and publish your job post for free.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-500 text-white text-2xl font-bold rounded-full mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Hire Quickly</h3>
              <p className="text-gray-600 text-sm">
                Browse freelancers, shortlist top talent, and hire the perfect match for your project.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
              <div className="w-16 h-16 flex items-center justify-center bg-orange-500 text-white text-2xl font-bold rounded-full mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Work Done</h3>
              <p className="text-gray-600 text-sm">
                Track progress, collaborate easily, and complete projects with secure payments.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Job Posting Section */}
      <section className="bg-orange-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Post a Job in Minutes
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            What do you want to get done today? Describe your project and connect with the right freelancers quickly.
          </p>

          {/* Quick Form Preview */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="e.g. Build a website, design a logo..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
              Post a Free Job
            </button>
          </div>


          <p className="text-sm text-gray-500">
            It's free to post a job. Only pay when you hire a freelancer.
          </p>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-12 px-6 bg-gray-100 text-gray-900">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Hire Top Freelancers Effortlessly
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Browse Freelancers</h3>
            <p className="text-gray-600">
              Filter by skills, experience, ratings, location, and availability. Quick search bar with suggestions. View profiles with images, skills, hourly rate, and past projects.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Shortlisting & Favorites</h3>
            <p className="text-gray-600">
              Easily save freelancers to shortlist and compare them side-by-side for your projects.
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Recommended Freelancers</h3>
            <p className="text-gray-600 mb-4">
              Get AI-powered suggestions based on your job description and past hires.
            </p>

            <div className="flex justify-center gap-4">
              {recommendedFreelancers.map((freelancer, i) => (
                <div key={i} className="text-center">
                  <img src={freelancer.img} alt={freelancer.name} className="w-16 h-16 rounded-full mx-auto mb-2 object-cover" />
                  <p className="font-semibold">{freelancer.name}</p>
                  <p className="text-sm">{freelancer.skill}</p>
                  <p className="text-sm text-gray-500">{freelancer.rate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
            onClick={() => navigate("/post-jobs")}>
            Post a Job Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">About</a></li>
              <li><a href="#" className="hover:text-orange-500">Support</a></li>
              <li><a href="#" className="hover:text-orange-500">Categories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Jobs</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">Find Jobs</a></li>
              <li><a href="#" className="hover:text-orange-500">Post a Job</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">Policy</a></li>
              <li><a href="#" className="hover:text-orange-500">Guides</a></li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center space-x-6 text-2xl pb-1 pt-4">
          <a href="https://facebook.com" className="hover:text-blue-500"><FaFacebook /></a>
          <a href="https://instagram.com" className="hover:text-pink-500"><FaInstagram /></a>
          <a href="https://linkedin.com" className="hover:text-blue-400"><FaLinkedin /></a>
          <a href="https://twitter.com" className="hover:text-sky-400"><FaTwitter /></a>
          <a href="https://youtube.com" className="hover:text-red-500"><FaYoutube /></a>
        </div>

        <div className="mt-5 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} GigConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
