import { auth } from '@clerk/nextjs';

export async function POST(req: Request) {
  const { userId } = auth();
 const body = await req.json();

  if( !userId) {
    return new Response("Unauthirized", { status: 401 })
  }

 console.log("items", body)
 console.log(userId)
 //console.log("payment_intent_id", payment_intent_id)
}

 