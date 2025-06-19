import { Schema, model, models } from "mongoose";


const UserSchema = new Schema({
    
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },

    firstName: {
        type: String,
        required: [true, 'first is required']
    },

    lastName: {
        type: String,
        required: [true, 'last is required']
    },

    phone: {
        type: String
    },

    password: {
        type: String
    },

    image: {
        type: String,
        default: `https://res.cloudinary.com/dfz0d28qq/image/upload/v1739883216/next_crib_avatar_isn9yq.jpg`
    },


    hasPassword: {
      type: Boolean,
      default: false
    },

     isOAuth: {
      type: Boolean,
      default: false
    },


    isVerified: {
      type: Boolean,
      default: false
    },

    emailVerificationCode: {
      type: String,
      unique: true,
      sparse: true, // This allows multiple `null` values
    },
    
  activeEmail: {
        type: Boolean,
        default: false,
        // select: false
    },

}, {
    timestamps: true
});

const User = models.User || model('User', UserSchema);

export default User;