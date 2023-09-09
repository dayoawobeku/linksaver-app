'use client';

import {useRouter} from 'next/navigation';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import {Toaster} from 'react-hot-toast';
import {LinkProps} from '@/app/types';
import LinkMenu from './link-menu';

export default function Links({
  links,
  linkColors,
}: {
  links: LinkProps[];
  linkColors?: string[];
}) {
  const router = useRouter();
  return (
    <section className="mt-6 pb-20 text-semi-sm">
      <Toaster />
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 640: 2}}>
        <Masonry gutter="1rem">
          {links?.map((link, index) => (
            <div
              key={link.id}
              className={`p-4 rounded-lg flex flex-col gap-2 outline outline-1 hover:outline-2 focus:outline-2 group`}
              style={{outlineColor: linkColors?.[index]}}
              tabIndex={0}
              aria-label="Link item"
              onClick={() => router.push(`/link/${link.id}`)}
            >
              <div className="flex items-center justify-between">
                <div
                  className="px-2 py-1 text-white text-really-sm rounded-full"
                  style={{backgroundColor: linkColors?.[index]}}
                >
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
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
}
