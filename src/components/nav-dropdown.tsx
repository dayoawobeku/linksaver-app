'use client';

import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import Dropdown from './dropdown';

interface UserProps {
  user_metadata: {
    avatar_url: string;
  };
}

export default function NavDropdown({user}: {user: UserProps}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const logOut = () => {
    supabase.auth.signOut();
    router.refresh();
  };

  const options = [
    {label: 'Profile', isLink: true, href: 'profile'},
    {label: 'Log out', isLink: false, onClick: logOut},
  ];

  return (
    <Dropdown
      btnClassName="rounded-full w-10 h-10 hover:outline hover:outline-2 hover:outline-grey-900 hover:outline-offset-2 focus:outline focus:outline-2 focus:outline-grey-900 focus:outline-offset-2"
      btn={
        user?.user_metadata?.avatar_url ? (
          <Image
            src={user.user_metadata.avatar_url}
            alt="avatar"
            className="rounded-full w-10 h-10"
            width={40}
            height={40}
          />
        ) : (
          <div className="rounded-full w-10 h-10 bg-grey-900 hover:outline hover:outline-2 hover:outline-primary-900 hover:outline-offset-2 focus:outline focus:outline-2 focus:outline-primary-900 focus:outline-offset-2" />
        )
      }
      options={options}
    />
  );
}
