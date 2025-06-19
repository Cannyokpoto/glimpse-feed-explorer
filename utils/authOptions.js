import connectDB from '@/config/database';
import User from '@/models/UserModel';
import GoogleProvider from 'next-auth/providers/google';




export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                }
            }
        })
    ],

    //callbacks
    callbacks: {
        //invoked on successful sign in
        async signIn({ profile }){
            // connect to database
            await connectDB();

            console.log("User Profile from google:", profile);

            // check if user exists
            const user = await User.findOne({email: profile.email});

            // if not, create user
            if(!user){
                //truncate username if too long
                const userName = profile.name;

                const names = userName.split(' ');
                const firstName = names[0];
                const lastName = names[1];

              const newUser = new User({
                    email: profile.email,
                    firstName: firstName,
                    lastName: lastName,
                    image: profile.picture,
                    activeEmail: true,
                    isOAuth: true,
                })

                await newUser.save();
            }

            // Return true to allow sign in
            return true;
        },

        //Session callback function that modifies the session object
        async session({ session }){
            // get user from db
             const user = await User.findOne({email: session.user.email});

            // assign user id from session
            session.user.id = user._id.toString();

            // return session
            return session;
        },


        async redirect({ url, baseUrl }) {
        // redirect to home page after login
        return baseUrl;
        },
    }
}


