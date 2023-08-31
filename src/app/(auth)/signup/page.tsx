import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {Signup} from '@/components/auth';

export default async function SignUpPage() {
  const supabase = createServerComponentClient({cookies});
  const {data} = await supabase.auth.getSession();

  if (data?.session) {
    redirect('/');
  }

  return <Signup />;
}
