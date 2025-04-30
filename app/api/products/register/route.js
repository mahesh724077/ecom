import { connectToDB } from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

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
    const { name, desc, price, picture } = await req.json();
    await connectToDB();
     
    const newProduct = new Product({ name, desc, price, picture });
    console.log(newProduct);
    const product =await newProduct.save();
    console.log(product);

    return new Response(JSON.stringify({ message: 'Product added successfully' }), {
      status: 201,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Product registration failed' }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  }
}
