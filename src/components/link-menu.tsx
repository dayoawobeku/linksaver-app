'use client';

import Image from 'next/image';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import Dropdown from './dropdown';
import {menuDot} from '@/assets/images';
import {LinkProps} from '@/app/types';

export default function LinkMenu({link}: {link: LinkProps}) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard');
  };

  const deleteLink = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this link?',
    );

    if (confirm) {
      supabase
        .from('links')
        .delete()
        .eq('id', link.id)
        .then(() => {
          toast.success('Link deleted');
        });
    }

    router.refresh();
  };

  const options = [
    {label: 'Edit', isLink: true, href: `link/${link.id}`},
    {label: 'Copy url', isLink: false, onClick: () => copyLink(link.link)},
    {label: 'Delete', isLink: false, onClick: deleteLink},
  ];

  return (
    <Dropdown
      btnClassName="w-6 h-6 p-1 rounded hover:outline hover:outline-1 hover:outline-brown focus:outline focus:outline-1 focus:outline-brown"
      btn={
        <div className="w-4 h-4" title="Menu">
          <Image src={menuDot} alt="menu" width={16} height={16} />
        </div>
      }
      options={options}
    />
  );
}
