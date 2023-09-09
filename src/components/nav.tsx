import Link from 'next/link';
import NavDropdown from './nav-dropdown';
import {User} from '@supabase/auth-helpers-nextjs';
import {createServerClient} from '@/helpers/server-client';

export default async function Nav() {
  const supabase = createServerClient();

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
