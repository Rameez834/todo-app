const NavBar = () => {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between rounded-xl bg-gray-400 p-4">
        <div className="mx-3 cursor-pointer text-xl font-bold">
          iTask
        </div>

        <div className="mx-10 flex gap-6 text-xl font-bold">
          <h2 className="cursor-pointer hover:scale-110 transition duration-200">
            Home
          </h2>

          <h2 className="cursor-pointer hover:scale-110 transition duration-200">
            Task List
          </h2>
        </div>
      </div>
    </div>
  );
};

export default NavBar;