'use client';

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import toast, {Toaster} from 'react-hot-toast';
import {LinkProps} from '@/app/types';
import LinkMenu from './link-menu';
import {useRouter} from 'next/navigation';

export default function Links({links}: {links: LinkProps[]}) {
  const router = useRouter();
  return (
    <section className="mt-6 pb-20 text-semi-sm">
      <Toaster />
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 640: 2}}>
        <Masonry gutter="1rem">
          {links?.map(link => (
            <div
              key={link.id}
              className="p-4 rounded-lg flex flex-col gap-2 outline outline-1 outline-brown hover:outline-2 focus:outline-2 group"
              tabIndex={0}
              aria-label="Link item"
              onClick={() => router.push(`/link/${link.id}`)}
            >
              <div className="flex items-center justify-between">
                <div className="px-2 py-1 text-white text-really-sm rounded-full bg-brown">
                  {link.tag_name}
                </div>
                <LinkMenu link={link} />
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium truncated-title"
                href={link.link}
                onClick={e => e.stopPropagation()}
              >
                {link.link}
              </a>
              <p className="text-grey-800 truncated-body">{link.description}</p>
            </div>
          ))}
          {/* <div className="p-4 rounded-lg flex flex-col gap-2 outline outline-1 outline-green hover:outline-2 break-inside-avoid mt-4 group">
          <div className="flex items-center justify-between">
            <div className="px-2 py-1 text-white text-really-sm rounded-full bg-green">
              twitter
            </div>
            <button
              className="hidden w-6 h-6 p-1 rounded hover:outline hover:outline-1 hover:outline-green group-hover:block"
              title="Menu"
            >
              <Image src={menuDot} alt="" width={16} height={16} />
            </button>
          </div>
          <Link
            className="font-medium truncated-title"
            href="https://twitter.com/soren_iverson/status/1696523452914741424?s=20"
          >
            https://twitter.com/soren_iverson/status/1696523452914741424?s=20
          </Link>
          <p className="text-grey-800 truncated-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            con Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            con
          </p>
        </div> */}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
