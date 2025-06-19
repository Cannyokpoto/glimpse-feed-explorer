"use client";
import Image from "next/image";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { SiGoogle } from "react-icons/si";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import images from "@/utils/images";
import ThemeToggle from "../ThemeToggle/ThemeToggle";




const NavBar = () => {



  //get session
  const { data: session } = useSession();

  const profileImage = session?.user?.image;

  const [providers, setProviders] = useState(null);

  

  //get providers
  useEffect(()=>{
    const setAuthProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    }

    setAuthProviders();
  }, []);



  
    
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = ()=>{
        setNavOpen(!navOpen);
    }

    const [userProfileDD, setUserProfileDD] = useState(false);

    const toggleUserProfileDD = ()=>{
        setUserProfileDD(!userProfileDD);
    }

    const pathname = usePathname();


      //Click outside to close drop down
      let dropdownRef = useRef()
    
      useEffect(() =>{
        let handler = (event) =>{
          if(!dropdownRef.current?.contains(event.target)){
            setUserProfileDD(false);
          }
        }
    
        document.addEventListener("mousedown", handler);
    
        return ()=>{
          document.removeEventListener("mousedown", handler);
        }
    
      });



      //mobile profile dropdown
          const [mobileProfileDD, setMobileProfileDD] = useState(false);

          let mobileDropdownRef = useRef()

    const toggleMobileProfileDD = ()=>{
        setMobileProfileDD(!mobileProfileDD);
    }

     useEffect(() =>{
        let handler = (event) =>{
          if(!mobileDropdownRef.current?.contains(event.target)){
            setMobileProfileDD(false);
          }
        }
    
        document.addEventListener("mousedown", handler);
    
        return ()=>{
          document.removeEventListener("mousedown", handler);
        }
    
      });
    
    
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-around bg-white dark:bg-crossBlue large:w-100vw large:h-80px small:h-auto small:px-2 large:px-0 small:py-2 large:py-0 large:flex-row small:flex-col border-b">
        
        
      <div className="flex flex-row items-center small:gap-3 large:w-50 h-100 small:w-100 large:gap-10">
        
        <div className="flex flex-row items-center h-auto gap-1 large:w-auto small:w-100 small:justify-between">
            
          <HiOutlineMenuAlt2 className="text-crossBlue dark:text-white cursor-pointer text-30px small:flex large:hidden" onClick={toggleNav} />
          
         <Link href="/" className="">
            <Image src={images.logo} alt="logo" 
            width={120}
            height={100}
            />
         </Link>


           {/* mobile profile & theme button */}
          <div className="flex-row items-center w-auto gap-2 small:flex h-100 large:hidden">

            {/* mobile profile */}
            <div className="relative flex items-center justify-center h-100 gap-1" ref={mobileDropdownRef}>
               <ThemeToggle />

                 {session &&
                <Image
                src={profileImage || images.profileDefault}
                alt="profile image"
                className="h-auto rounded-full cursor-pointer w-40px"
                onClick={toggleMobileProfileDD}
                width={40}
                height={40}
                />}

                {mobileProfileDD &&
                <div className="absolute flex flex-col items-center h-auto gap-1 px-1 py-1 bg-white shadow-lg w-150px text-crossTextGray -bottom-6 rounded-5 right-1 border">
                    
                  
                    <button
                     className="text-red-500"
                     onClick={()=>{
                        toggleMobileProfileDD();
                        signOut();
                      }}
                    >Log out</button>
                </div>}
                
            </div>
          </div>
        </div>

        
      </div>

          {/* desktop login btn */}
      <div className="flex-row items-center w-auto gap-2 large:flex h-100 small:hidden">
        <ThemeToggle />
         {!session &&
       <div>
         <button className="flex flex-row items-center w-auto gap-1 px-2 text-white rounded bg-homeGold h-40px"
          onClick={() => signIn(providers.google.id)}
          >
            Login
          </button>
          
        </div>}


        {/* desktop profile */}
       <div className="relative flex items-center justify-center h-100" ref={dropdownRef}>
         
          {session &&
         <Image
          src={profileImage || images.profileDefault}
          alt="profile image"
          className="h-auto rounded-full cursor-pointer w-40px"
          onClick={toggleUserProfileDD}
           width={40}
          height={40}
        />}

        {userProfileDD &&
        <div className="absolute flex flex-col items-start h-auto px-2 py-2 text-black bg-white shadow-lg -left-3 w-200px -bottom-7 rounded-5 border">
           
          <button
          className="text-red-500 font-semibold"
          onClick={()=>{
            toggleUserProfileDD();
            signOut();
          }}
          >Log out</button>
        </div>}
        
       </div>
      </div>



        {/* mobile navbar */}
        {navOpen &&
      <div className="flex flex-col items-start h-auto gap-2 mt-2 bg-crossBlue w-100 text-white px-1 py-2 dark:bg-white dark:text-crossBlue">
          <Link href="/" className={`pl-1 w-100 h-30px ${pathname ==='/' ? 'border-b dark:border-crossBlue dark:border-b' : ''}`}
          onClick={toggleNav}
          >Home</Link>
           {!session &&
          <button
            className="flex flex-row items-center w-auto h-auto gap-1 p-1 bg-gray-600 rounded text-white"
            onClick={()=>{
              toggleNav();
              signIn(providers.google.id)
            }}
            >
              Login
          </button>}
        
        </div>}
    
    </nav>
  );
};

export default NavBar;
