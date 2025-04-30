import { connectToDB } from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectToDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(
      JSON.stringify({ message: 'Login successful', user: { name: user.name, email: user.email } }),
      {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Login failed' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}
