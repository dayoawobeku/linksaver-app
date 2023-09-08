import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import Image from 'next/image';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {search, emptyState} from '@/assets/images';
import LinkEditor from '@/components/link-editor';
import Links from '@/components/links';
import Tags from '@/components/tags';
import {LinkProps} from './types';

export const revalidate = 0;

export default async function Home() {
  const supabase = createServerComponentClient({cookies});

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const {data} = await supabase
    .from('links')
    .select('*')
    .order('created_at', {ascending: false});

  const links = data as LinkProps[];

  return (
    <>
      {links.length === 0 ? (
        <div className="mt-20 flex flex-col items-center justify-center gap-10">
          <Image src={emptyState} alt="" width={684} height={386} />
          <div className="flex flex-col items-center w-full">
            <h2 className="text-md font-medium">
              You don&apos;t have any links yet
            </h2>
            <LinkEditor links={links} />
          </div>
        </div>
      ) : (
        <>
          <section className="mt-20 flex items-start justify-between gap-4 flex-wrap">
            <LinkEditor links={links} />
            <form
              role="search"
              className="relative flex h-[2.125rem] w-full max-w-xs items-center justify-between"
            >
              <div className="absolute left-0 h-4 w-4">
                <Image alt="" src={search} width={16} height={16} />
              </div>
              <input
                id="search"
                name="q"
                className="text-sm font-medium h-[2.125rem] w-full max-w-xs pl-6 pr-4 placeholder:text-grey-800 bg-transparent border-b border-b-grey-800 hover:border-b-primary-900 hover:outline-none hover:ring-primary-900 focus:border-transparent focus:border-b-primary-900 focus:outline-none focus:ring-primary-900 transition-colors duration-300"
                placeholder="Search your notes"
                aria-label="Search your notes"
              />
            </form>
          </section>

          <Tags />

          <Links links={links} />
        </>
      )}
    </>
  );
}
