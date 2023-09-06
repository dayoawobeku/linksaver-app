import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';

export async function POST(request: Request) {
  const {link, description, tag_name} = await request.json();

  const supabase = createRouteHandlerClient({cookies});

  const {error} = await supabase
    .from('links')
    .insert({link, description, tag_name});

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json({status: 'success'}, {status: 200});
}
