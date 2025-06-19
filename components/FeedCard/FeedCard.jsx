import images from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";



const FeedCard = ({feed}) => {
  
  const formatDate = (dateString)=> {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getFullYear();

    const getOrdinalSuffix = (n) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    
  };

  
  
  return (
    <Link href={`/feed/${feed._id}`} className="h-auto hover:shadow-md rounded-xl small:w-85vw large:w-300px cursor-pointer border dark:border-gray-500">
      
      <div>
        <Image
          src={images.feed}
          alt="product image"
          className="w-full h-auto rounded-t-xl"
          width={100}
          height={0}
        />
      </div>

      <div className="flex flex-col gap-2 px-1 py-2 w-100">

        <div className="text-left md:text-center lg:text-left">
          <h3 className="font-bold text-18px dark:text-white">{feed.title}</h3>

          <p className="text-gray-600 mt-2 dark:text-gray-400">{feed.description.slice(0, 80)}...</p>
        </div>

        <div className="flex text-13px w-100 justify-between items-center">
          <div className="flex items-center gap-0.5 text-homeGold font-semibold"><FaRegUser className="text-homeGold" /> {feed.author}</div>

          <div className="text-gray-400">{formatDate(feed.date)}</div>
        </div>

        {/* <p>{feed.category}</p> */}
      </div>
    </Link>
  );
};

export default FeedCard;
