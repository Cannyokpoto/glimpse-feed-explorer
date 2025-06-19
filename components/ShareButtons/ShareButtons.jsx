'use client';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

const ShareButtons = ({ post }) => {

  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/feed/${post._id}`


  return (

    <div className='flex flex-col items-start h-auto gap-2 py-2 rounded w-100'>

      <h3 className='font-semibold text-center large:text-20px dark:text-gray-400 small:text-15px'>Share This Post:</h3>

      <div className='flex items-center justify-start gap-3 w-100'>
        
        <FacebookShareButton url={shareUrl} quote={post.title} hashtag={`#${post.category.replace(/\s/g, '')}`}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>


         <TwitterShareButton url={shareUrl} title={post.title} hashtags={[`${post.category.replace(/\s/g, '')}`]}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>


         <WhatsappShareButton url={shareUrl} title={post.name} seperator='::'>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>


        <EmailShareButton url={shareUrl} subject={post.title} body={`checkout this article by ${post.author}: ${post.title}`}>
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>

    </div>
  );
};

export default ShareButtons;
