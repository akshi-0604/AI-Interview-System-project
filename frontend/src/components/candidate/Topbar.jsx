import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <div className="bg-white shadow px-4 lg:px-8 py-4">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Left Section */}
        <div className="mt-10 lg:mt-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Candidate Dashboard
          </h2>

          <p className="text-gray-500 text-sm">
            Welcome back! Ready for your interview?
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

          {/* Search */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full sm:w-64">
            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 w-full"
            />
          </div>

          {/* Notification */}
          <Bell
            className="cursor-pointer text-gray-600 hover:text-blue-600"
            size={22}
          />

          {/* Profile */}
          <div className="flex items-center gap-3">

            <img
              src="https://ui-avatars.com/api/?name=Candidate"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="font-semibold">
                Candidate
              </p>

              <p className="text-sm text-gray-500">
                AI Interview
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Topbar;