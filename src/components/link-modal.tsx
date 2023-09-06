'use client';

import {useState, useCallback, SetStateAction} from 'react';
import {useRouter} from 'next/navigation';
import ContentEditable from 'react-contenteditable';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';
import {toast} from 'react-hot-toast';
import {LinkProps} from '@/app/types';

export default function LinkModal({link}: {link: LinkProps}) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [url, setUrl] = useState(link.link || '');
  const [description, setDescription] = useState(link.description || '');

  const editLink = useCallback(() => {
    supabase
      .from('links')
      .update({link: url, description})
      .eq('id', link.id)
      .then(() => {
        toast.success('Link updated');
        router.back();
      });

    router.refresh();
  }, [description, link.id, supabase, url, router]);

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
    <div className="p-6 space-y-10">
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
        <div className="px-2 py-1 text-white text-really-sm rounded-full bg-brown">
          default
        </div>

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
