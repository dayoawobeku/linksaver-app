import Link from 'next/link';
import {cookies} from 'next/headers';
import NavDropdown from './nav-dropdown';
import {User, createServerComponentClient} from '@supabase/auth-helpers-nextjs';

export default async function Nav() {
  const supabase = createServerComponentClient({cookies});

  const {data} = await supabase.auth.getUser();

  const user = data?.user as User;

  return (
    <nav className="mt-8 flex items-center justify-between">
      <Link href="/" className="font-medium">
        linksaver<span className="text-primary-800">.app</span>
      </Link>
      <NavDropdown user={user} />
    </nav>
  );
}
