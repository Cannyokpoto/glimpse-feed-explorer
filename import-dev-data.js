import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Post from './models/PostModel.js';



mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connection successful!'));



const filePath = path.join(process.cwd(), 'posts.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const importData = async () => {
  try {
    await Post.insertMany(data);
    console.log('✅ Post data imported successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};



if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
