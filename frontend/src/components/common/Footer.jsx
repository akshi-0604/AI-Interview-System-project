import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gray-900 text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10">

          <div>

            <h2 className="text-3xl font-bold mb-4">
              AI Interview System
            </h2>

            <p className="text-gray-400 leading-7">
              Practice AI interviews, improve your confidence,
              and prepare for your dream job with intelligent
              resume-based interview simulations.
            </p>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a href="#home" className="hover:text-white">
                  Home
                </a>
              </li>

              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-white">
                  About
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-white">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Contact
            </h3>

            <div className="space-y-4">

              <p className="flex items-center gap-3">
                <FaEnvelope />
                support@aiinterview.com
              </p>

              <p className="flex items-center gap-3">
                <FaGithub />
                GitHub
              </p>

              <p className="flex items-center gap-3">
                <FaLinkedin />
                LinkedIn
              </p>

            </div>

          </div>

        </div>

        <hr className="border-gray-700 my-10" />

        <p className="text-center text-gray-500">
          © 2026 AI Interview System. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;