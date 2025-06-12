const ProductLoadingGrid = (props) => {
  const items = Array.from({ length: 8 });

  return (
    <>
      {props?.view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-center mb-3 justify-center w-full h-60 bg-gray-300 rounded-lg dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm1.376 10.481a1 1 0 0 1-1.895-1.447l3.5-7A1 1 0 0 1 17.468 6a1 1 0 0 1 .965.513l3.887a1 1 0 0 1-1.618 1.124l-4a1 1 0 0 1 0-.028l1.011Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((_, index) => (
            <div key={index} className="col animate-pulse">
              <div className="flex items-center mb-3 justify-center w-full h-60 bg-gray-300 rounded-lg dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm1.376 10.481a1 1 0 0 1-1.895-1.447l3.5-7A1 1 0 0 1 17.468 6a1 1 0 0 1 .965.513l3.887a1 1 0 0 1-1.618 1.124l-4a1 1 0 0 1 0-.028l1.011Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductLoadingGrid;
