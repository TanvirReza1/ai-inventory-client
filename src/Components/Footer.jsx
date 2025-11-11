import React from "react";
import logo from "../assets/logo.jpg";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  const repos = [
    {
      name: "Client",
      url: "https://github.com/TanvirReza1/ai-inventory-client",
    },
    {
      name: "Server",
      url: "https://github.com/TanvirReza1/ai-inventory-server",
    },
  ];

  // ✅ Fixed socials array — removed the stray <path> outside object
  const socials = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/Tanvirhossain.reza/",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
          <path d="M9 8H6v4h3v12h5V12h3.642l.358-4h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"></path>
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/reza_tanvi18747",
      svg: <FaSquareXTwitter size={24} />, // ✅ clean new X icon
    },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="w-full footer p-6 md:p-10  border-t bg-gray-900 text-gray-300 py-6 mt-10 text-center">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Left: Logo and project title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden shadow-md">
            <img
              src={logo}
              alt="AI Inventory Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-lg">AI Inventory Manager</div>
            <div className="text-sm opacity-70">Manage & Explore AI Models</div>
          </div>
        </div>

        {/* Middle: GitHub Repositories */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-2 font-medium">GitHub Repositories</div>
          <div className="flex gap-3 flex-wrap justify-center">
            {repos.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded transition hover:text-blue-400 hover:bg-gray-800"
                aria-label={`Open ${r.name} repository`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.402 7.868 10.925.575.106.785-.25.785-.556 0-.274-.01-1-.015-1.96-3.201.696-3.876-1.542-3.876-1.542-.523-1.33-1.276-1.684-1.276-1.684-1.043-.713.08-.699.08-.699 1.154.08 1.761 1.185 1.761 1.185 1.025 1.756 2.689 1.249 3.345.955.104-.744.401-1.249.729-1.536-2.554-.29-5.242-1.277-5.242-5.683 0-1.255.448-2.282 1.183-3.087-.119-.29-.512-1.456.112-3.037 0 0 .964-.309 3.16 1.18.917-.255 1.9-.383 2.876-.387.975.004 1.959.132 2.878.387 2.194-1.49 3.156-1.18 3.156-1.18.626 1.581.233 2.747.114 3.037.737.805 1.182 1.832 1.182 3.087 0 4.418-2.694 5.389-5.26 5.673.412.355.78 1.055.78 2.128 0 1.536-.014 2.774-.014 3.151 0 .31.208.668.792.554C20.71 21.398 24 17.08 24 12c0-6.352-5.148-11.5-12-11.5z"
                  />
                </svg>
                <span className="hidden sm:inline">{r.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Social Links & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="hover:text-primary transition"
              >
                {s.svg}
              </a>
            ))}
          </div>
          <div className="text-sm opacity-80 text-center md:text-right">
            <div>© {year} AI Inventory Manager</div>
            <div className="mt-1">Made with ❤️ by Tanvir Reza</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
