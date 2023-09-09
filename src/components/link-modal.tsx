'use client';

import {useState, useCallback, SetStateAction} from 'react';
import {useRouter} from 'next/navigation';
import ContentEditable from 'react-contenteditable';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {toast} from 'react-hot-toast';
import {LinkProps, TagProps} from '@/app/types';

export default function LinkModal({
  link,
  tags,
}: {
  link: LinkProps;
  tags: TagProps[];
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [url, setUrl] = useState(link.link || '');
  const [description, setDescription] = useState(link.description || '');
  const [selectedTag, setSelectedTag] = useState(link.tag_name || 'default');

  const editLink = () => {
    supabase
      .from('links')
      .update({link: url, description, tag_name: selectedTag})
      .eq('id', link.id)
      .then(() => {
        toast.success('Link updated');
        router.back();
      });

    router.refresh();
  };

  const onUrlBlur = useCallback(
    (e: {currentTarget: {innerHTML: SetStateAction<string>}}) =>
      setUrl(e.currentTarget.innerHTML),
    [],
  );

  const onDescriptionBlur = useCallback(
    (e: {currentTarget: {innerHTML: SetStateAction<string>}}) =>
      setDescription(e.currentTarget.innerHTML),
    [],
  );

  return (
    <div className="p-6 space-y-10 bg-black">
      <div className="space-y-3">
        <ContentEditable
          role="textbox"
          onChange={onUrlBlur}
          html={url}
          className="text-sm font-semibold w-full text-white"
          placeholder="https://example.com"
        />
        <ContentEditable
          role="textbox"
          onChange={onDescriptionBlur}
          html={description}
          className="text-sm text-white"
          placeholder="Short description"
        />
      </div>
      <div className="flex items-center justify-between">
        <select
          name="tag"
          className="appearance-none text-center text-grey-950 text-sm font-medium rounded-lg px-1 py-[2px]
            outline outline-1 outline-grey-900 hover:outline-1 hover:outline-primary-900 hover:outline-offset-2 focus:outline-1 focus:outline-primary-900 focus:outline-offset-2"
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
        >
          <option value="default">default</option>
          {tags?.map((tag: TagProps) => (
            <option key={tag.id} value={tag.tag_name}>
              {tag.tag_name}
            </option>
          ))}
        </select>

        <button
          onClick={editLink}
          className="py-1 px-3 text-sm text-white font-semibold hover:outline hover:outline-1 rounded hover:outline-white focus:outline focus:outline-1 focus:outline-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}
