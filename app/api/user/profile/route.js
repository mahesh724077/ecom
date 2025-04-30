import { connectToDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email is required' }), {
        status: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    const user = await User.findOne({ email }).select('-password'); // remove password field

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });

  } catch (error) {
    console.error('User profile error:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}
