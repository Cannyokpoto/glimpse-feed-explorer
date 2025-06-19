

import { FiClock } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";




const PostDetails = ({ post }) => {

  //To calculate time an article was posted
const timeAgo = (timestamp) => {
  const now = new Date();
  const postTime = new Date(timestamp);
  const secondsAgo = Math.floor((now - postTime) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  }

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  }

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) {
    return `${daysAgo} days ago`;
  }

  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) {
    return `${monthsAgo} months ago`;
  }

  const yearsAgo = Math.floor(monthsAgo / 12);
  return `${yearsAgo} years ago`;
}

    return ( 
        <main className="large:w-100 small:w-100 flex flex-col items-start text-start gap-2 border rounded shadow-lg p-2 dark:border-gray-600">

          <h1 className="font-bold large:text-25px small:text-20px dark:text-white">{post && post.title}</h1>
            
          <div className="large:w-60 small:w-100 dark:text-white">
            <p>{post.description}</p>
          </div>
           
           
           <div className="large:mt-3 flex justify-start large:gap-5 w-100 text-gray-400 small:flex-col large:flex-row small:gap-1 small:mt-2">
            <p className="flex items-center gap-1"><FaRegUser className="text-20px"/> <span>{post.author}</span></p>

            <p className="flex items-center gap-1"><FiClock className="text-20px" /> {timeAgo(post.createdAt)}</p>

             <p>Category: <span>{post.category[0].toUpperCase() + post.category.slice(1)}</span></p>
           </div>
        </main>
     )
}
 
export default PostDetails;