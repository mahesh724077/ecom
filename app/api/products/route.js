import { connectToDB } from '../../../lib/mongodb';
import Product from '../../../models/Product';

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}
