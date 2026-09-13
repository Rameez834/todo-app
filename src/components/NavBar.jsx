const NavBar = () => {
  return (
    <div className="p-2 sm:p-3">
      <div className="flex items-center justify-between rounded-xl bg-gray-400 p-3 sm:p-4">

        <div className="mx-1 sm:mx-3 cursor-pointer text-lg sm:text-xl font-bold shrink-0">
          iTask
        </div>

        <div className="mx-2 sm:mx-10 flex gap-2 xs:gap-3 sm:gap-6 text-sm xs:text-base sm:text-xl font-bold">
          <h2 className="cursor-pointer hover:scale-110 transition duration-200 whitespace-nowrap">
            Home
          </h2>

          <h2 className="cursor-pointer hover:scale-110 transition duration-200 whitespace-nowrap">
            Task List
          </h2>
        </div>

      </div>
    </div>
  );
};

export default NavBar;