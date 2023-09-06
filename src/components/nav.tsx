import Link from 'next/link';
import {cookies} from 'next/headers';
import NavDropdown from './nav-dropdown';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';

export default async function Nav() {
  const supabase = createServerComponentClient({cookies});

  const {
    data: {user},
  } = await supabase.auth.getUser();

  return (
    <nav className="mt-8 flex items-center justify-between">
      <Link href="/" className="font-medium">
        linksaver<span className="text-primary-800">.app</span>
      </Link>
      <NavDropdown user={user} />
    </nav>
  );
}
