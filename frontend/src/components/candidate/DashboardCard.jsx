function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500  dark:text-gray-400 text-sm font-medium">
            {title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {value}
          </p>
        </div>

        <div className={`${color} p-4 rounded-full text-white dark:text-gray-900`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;