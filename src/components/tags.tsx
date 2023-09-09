import {createServerClient} from '@/helpers/server-client';
import ManageTags from './manage-tags';
import {TagProps} from '@/app/types';

export default async function Tags() {
  const supabase = createServerClient();

  const {data} = await supabase.from('tags').select('*');

  console.log(data, 'data');

  return (
    <section className="mt-6 flex items-center gap-2">
      <button className="text-sm text-white px-2 py-1 bg-primary rounded-lg">
        All tags
      </button>

      {data?.map((tag: TagProps) => (
        <button
          key={tag.id}
          className="text-sm text-grey-800 hover:text-white focus:text-white px-2 py-1 rounded-lg capitalize"
        >
          {tag.tag_name}
        </button>
      ))}

      <ManageTags />
    </section>
  );
}
