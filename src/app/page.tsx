import Image from 'next/image';
import {search, plus, folder} from '@/assets/images';

export default function Home() {
  return (
    <>
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
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
      </section>

      <section className="mt-6 flex items-center gap-2">
        <button className="text-sm text-white px-2 py-1 bg-primary rounded-lg">
          All tags
        </button>
        <button className="text-sm text-grey-800 hover:underline hover:text-white px-2 py-1 rounded-lg">
          Link
        </button>
        <button className="text-sm text-grey-800 hover:underline hover:text-white px-2 py-1 rounded-lg">
          Note
        </button>
        <button className="text-sm text-white font-medium hover:underline px-3 py-2 rounded-lg flex items-center gap-2">
          <Image alt="" src={folder} width={16} height={16} />
          Manage tags
        </button>
      </section>
    </>
  );
}
