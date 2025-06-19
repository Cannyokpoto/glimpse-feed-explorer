import Link from "next/link";
import connectDB from "@/config/database";
import Post from "@/models/PostModel";
import { BsArrowLeft } from "react-icons/bs";
import PostDetails from "@/components/PostDetails/PostDetails";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import { convertToSerializableObject } from "@/utils/convertToObject";
import Image from "next/image";
import images from "@/utils/images";



export async function generateMetadata({ params }) {

 await connectDB();

  const postDoc = await Post.findById(params && params.id).lean();

  const post = convertToSerializableObject(postDoc)

  
  return {
    title: post.title,
    description: post.description.slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.description.slice(0, 150),
      //using a hard-coded image because my posts do not have images
      images: [images.feed],
      type: 'article',
      url: `${process.env.REMOTE_DOMAIN}/feed/${post && post._id}`,
    }
  };
}



const FeedDetailsPage = async ({ params }) => {
  
  await connectDB();

  const postDoc = await Post.findById(params && params.id).lean();

  const post = convertToSerializableObject(postDoc)

  
  return (
    <div className="pb-10 mt-8 flex flex-col w-100vw large:px-8 dark:bg-crossBlue bg-white small:px-2">
      
      <Image 
            src={images.feed}
            alt="article image"
            className="object-cover large:h-[400px] large:w-auto large:rounded-xl small:w-100vw small:h-auto small:rounded"
            width={0}
            height={0}
            sizes="100vw"
        />

    
        <div className="flex justify-start py-4 m-auto w-100">
          <Link
            href="/"
            className="flex items-center text-homeGold hover:text-orange-300 font-semibold"
          >
            <BsArrowLeft className="mr-1" /> Back to News Feed
          </Link>
        </div>
      

      <section className="h-auto w-100 flex flex-col items-start gap-2">
        <PostDetails post={ post && post} />

        <ShareButtons post={ post && post} />
      </section>


      <div className="flex justify-start py-4 m-auto w-100">
          <Link
            href="/"
            className="flex items-center text-homeGold hover:text-orange-300 font-semibold"
          >
            <BsArrowLeft className="mr-1" /> Back to News Feed
          </Link>
      </div>
      
      
      
    </div>
  );
};

export default FeedDetailsPage;

