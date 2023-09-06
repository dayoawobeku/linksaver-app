import {NextResponse} from 'next/server';
import {cookies, headers} from 'next/headers';
import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';

export async function GET(request: Request) {
  const supabase = createRouteHandlerClient({cookies});

  const {data, error} = await supabase.from('links').select('*');

  if (error) {
    return NextResponse.json({error: error.message}, {status: 500});
  }

  return NextResponse.json(data);
}
