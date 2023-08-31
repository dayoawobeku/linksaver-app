import Image from 'next/image';
import Link from 'next/link';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {search, plus, folder, menuDot} from '@/assets/images';

export const revalidate = 0;

export default async function Home() {
  const supabase = createServerComponentClient({cookies});

  console.log(supabase, 'supabase');

  const {
    data: {user},
  } = await supabase.auth.getUser();

  console.log(user, 'user');

  if (!user) {
    redirect('/login');
  }

  const {data: links, error} = await supabase.from('links').select('*');
  return (
    <>
      <p>{JSON.stringify(links, null, 2)}</p>
      <section className="mt-20 flex items-center justify-between">
        <button className="text-sm font-medium px-3 py-2 flex items-center gap-2 outline outline-1 outline-white rounded hover:outline-2 hover:outline-primary-900 hover:outline-offset-2 focus:outline-2 focus:outline-primary-900 focus:outline-offset-2">
          <Image alt="" src={plus} width={16} height={16} />
          <span>New link</span>
        </button>
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

      <section className="mt-6 flex items-center gap-2">
        <button className="text-sm text-white px-2 py-1 bg-primary rounded-lg">
          All tags
        </button>
        <button className="text-sm text-grey-800 hover:underline hover:text-white px-2 py-1 rounded-lg">
          Twitter
        </button>
        <button className="text-sm text-grey-800 hover:underline hover:text-white px-2 py-1 rounded-lg">
          YouTube
        </button>
        <button className="text-sm text-white font-medium hover:underline px-3 py-2 rounded-lg flex items-center gap-2">
          <Image alt="" src={folder} width={16} height={16} />
          Manage tags
        </button>
      </section>

      <section className="mt-6 columns-2 text-semi-sm">
        <div className="p-4 rounded-lg flex flex-col gap-2 outline outline-1 outline-brown hover:outline-2 break-inside-avoid">
          <div className="flex items-center justify-between">
            <div className="px-2 py-1 text-white text-really-sm rounded-full bg-brown">
              youtube
            </div>
            <button
              className="w-6 h-6 p-1 rounded hover:outline hover:outline-1 hover:outline-brown"
              title="Menu"
            >
              <Image src={menuDot} alt="" width={16} height={16} />
            </button>
          </div>
          <Link
            className="font-medium truncated-title"
            href="https://www.youtube.com/watch?v=LyDL9EUIdy0&t=1s"
          >
            https://www.youtube.com/watch?v=LyDL9EUIdy0&t=1s
          </Link>
          <p className="text-grey-800 truncated-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
        </div>
        <div className="p-4 rounded-lg flex flex-col gap-2 outline outline-1 outline-green hover:outline-2 break-inside-avoid mt-4">
          <div className="flex items-center justify-between">
            <div className="px-2 py-1 text-white text-really-sm rounded-full bg-green">
              twitter
            </div>
            <button
              className="w-6 h-6 p-1 rounded hover:outline hover:outline-1 hover:outline-green"
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
        </div>
        <div className="p-4 rounded-lg flex flex-col gap-2 outline outline-1 outline-green hover:outline-2 break-inside-avoid mt-4">
          <div className="flex items-center justify-between">
            <div className="px-2 py-1 text-white text-really-sm rounded-full bg-green">
              twitter
            </div>
            <button
              className="w-6 h-6 p-1 rounded hover:outline hover:outline-1 hover:outline-green"
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
        </div>
        <div className="p-4 rounded-lg flex flex-col gap-2 outline outline-1 outline-brown hover:outline-2 break-inside-avoid mt-4">
          <div className="flex items-center justify-between">
            <div className="px-2 py-1 text-white text-really-sm rounded-full bg-brown">
              youtube
            </div>
            <button
              className="w-6 h-6 p-1 rounded hover:outline hover:outline-1 hover:outline-brown"
              title="Menu"
            >
              <Image src={menuDot} alt="" width={16} height={16} />
            </button>
          </div>
          <Link
            className="font-medium truncated-title"
            href="https://www.youtube.com/watch?v=LyDL9EUIdy0&t=1s"
          >
            https://www.youtube.com/watch?v=LyDL9EUIdy0&t=1s
          </Link>
          <p className="text-grey-800 truncated-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
        </div>
      </section>
    </>
  );
}
