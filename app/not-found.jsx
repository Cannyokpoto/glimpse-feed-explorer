import Link from "next/link";
import { FaTriangleExclamation } from "react-icons/fa6";




const NotFound = () => {
  return (
    <section className="flex-grow h-auto mt-5 large:px-15 large:w-100vw small:w-100vw bg-blue-50 small:px-2">
      
      <div className="py-8 m-auto w-100">
        <div className="py-3 m-4 mb-4 bg-white border rounded-md shadow-md small:px-1 large:px-3 md:m-0">
          <div className="flex justify-center">
            <FaTriangleExclamation className="text-homeGold text-8xl" />
          </div>
          
          <div className="flex flex-col items-center h-auto gap-3 text-center">
            
            <h1 className="font-bold small:text-20px large:text-30px">Page Not Found</h1>
            <p className="text-gray-500 text-15px">
              The page you are looking for does not exist.
            </p>
            
            <Link
              href="/"
              className="flex items-center justify-center px-1 text-white rounded bg-crossBlue w-150px h-40px"
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

export default NotFound;
