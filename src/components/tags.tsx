import Image from 'next/image';
import {folder} from '@/assets/images';

export default function Tags() {
  return (
    <section className="mt-6 flex items-center gap-2">
      <button className="text-sm text-white px-2 py-1 bg-primary rounded-lg">
        All tags
      </button>
      <button className="text-sm text-grey-800 hover:text-white focus:text-white px-2 py-1 rounded-lg">
        Twitter
      </button>
      <button className="text-sm text-grey-800 hover:text-white focus:text-white px-2 py-1 rounded-lg">
        YouTube
      </button>
      <button className="text-sm text-white font-medium px-3 py-2 hover:text-grey-800 rounded-lg flex items-center gap-2">
        <Image alt="" src={folder} width={16} height={16} />
        Manage tags
      </button>
    </section>
  );
}
