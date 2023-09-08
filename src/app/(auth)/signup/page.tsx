import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Signup} from '@/components/auth';
import {cache} from 'react';

const createServerClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient({
    cookies: () => cookieStore,
  });
});

export default async function SignUpPage() {
  const supabase = createServerClient();
  const {data} = await supabase.auth.getSession();

  if (data?.session) {
    redirect('/');
  }

  return <Signup />;
}
