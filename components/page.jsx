import Link from "next/link";
import connectDB from "@/config/database";
import Property from "@/models/PropertyModel";
import PropertyHeaderImage from "@/components/PropertyHeaderImage/PropertyHeaderImage";
import { BsArrowLeft } from "react-icons/bs";
import PropertyDetails from "@/components/PostDetails/PostDetails";
import PropertyImages from "@/components/PropertyImages/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton/BookmarkButton";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm/PropertyContactForm";
import { convertToSerializableObject } from "@/utils/convertToObject";
import MobilePropertyImages from "@/components/MobilePropertyImages/MobilePropertyImages";



const FeedDetailsPage = async ({ params }) => {
  
  await connectDB();

  //the lean method returns a plain javascript object instead of mongoose document
  const propertyDoc = await Property.findOne({slug: params && params.slug}).lean();

  const property = convertToSerializableObject(propertyDoc)

  
  return (
    <div className="pb-10 mt-8">
      <PropertyHeaderImage image={property && property.images[0]} />

    
        <div className="flex justify-start py-4 m-auto large:px-6 small:px-2">
          <Link
            href="/properties"
            className="flex items-center text-homeLightBlue hover:text-green-400"
          >
            <BsArrowLeft className="mr-1" /> Back to Properties
          </Link>
        </div>
      

      <section className="h-auto py-5 bg-blue-50 w-100vw">
        <div className="w-100">
          <div className="flex h-auto w-100 large:flex-row small:flex-col small:items-center large:items-start small:gap-4 large:gap-0">
            

            <PropertyDetails property={ property && property} />

            <aside className="flex flex-col items-center gap-4 large:w-25 small:w-90vw">
              
              <div className="w-100 small:hidden large:flex">
                <BookmarkButton property={ property && property} />
              </div>
              
               <div className="w-100 small:hidden large:flex">
                <ShareButtons property={ property && property} />
               </div>
              
              
              <PropertyContactForm property={ property && property} />
            </aside>
            
            
          </div>
        </div>
      </section>
      
      
      
      
      <div className="px-2 mt-4 w-100vw small:flex large:hidden">
        {/* <BookmarkButton property={ property && property} /> */}
      </div>
      
       <div className="px-2 mt-4 w-100vw small:flex large:hidden">
        {/* <ShareButtons property={ property && property} /> */}
       </div>
      
      
    </div>
  );
};

export default FeedDetailsPage;
