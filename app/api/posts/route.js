
import  connectDB  from '@/config/database';
import Post from '@/models/PostModel';



// export async function GET(req) {
//   await connectDB();

//   const { searchParams } = new URL(req.url);
//   const page = parseInt(searchParams.get('page') || '1');
//   const limit = 6;
//   const skip = (page - 1) * limit;

//   const posts = await Post.find({})
//     .sort({ date: -1 })
//     .skip(skip)
//     .limit(limit)
//     .lean();

//   const total = await Post.countDocuments();
//   const hasMore = skip + posts.length < total;

//   return Response.json({ posts, hasMore });
// }




export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = 6;
  const skip = (page - 1) * limit;

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } }
    ];
  }

  if (category !== 'All') {
    query.category = category;
  }

  const posts = await Post.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Post.countDocuments(query);
  const hasMore = skip + posts.length < total;

  return Response.json({ posts, hasMore });
}
