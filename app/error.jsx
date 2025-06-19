'use client';

import Link from "next/link";
import { FaCircleExclamation } from "react-icons/fa6";



const ErrorPage = () => {
  return (
    <section className="flex-grow h-auto mt-5 large:w-100vw small:w-100vw bg-blue-50">
      
      <div className="py-8 m-auto w-100">
        <div className="py-3 m-4 mb-4 bg-white border rounded-md shadow-md small:px-1 large:px-3 md:m-0">
          <div className="flex justify-center">
            <FaCircleExclamation className="text-yellow-400 fas fa-exclamation-triangle fa-5x text-8xl" />
          </div>
          
          <div className="flex flex-col items-center h-auto gap-3 text-center">
            
            <h1 className="font-bold small:text-20px large:text-30px">Something went wrong</h1>
            <p className="text-gray-500 text-15px">
              The resource you are looking for does not exist.
            </p>
            
            <Link
              href="/"
              className="flex items-center justify-center px-2 font-bold text-white bg-crossBlue rounded w-150px h-40px"
            >
              Back To Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
    </section>
  );
};

export default ErrorPage;
