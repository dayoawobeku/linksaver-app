import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Login} from '@/components/auth';
import {cache} from 'react';

const createServerClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient({
    cookies: () => cookieStore,
  });
});

export default async function SignInPage() {
  const supabase = createServerClient();
  const {data} = await supabase.auth.getSession();

  if (data?.session) {
    redirect('/');
  }

  return <Login />;
}
