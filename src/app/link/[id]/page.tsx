import {cookies} from 'next/headers';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import Modal from '@/components/modal';
import LinkModal from '@/components/link-modal';
import Links from '@/components/links';
import LinkEditor from '@/components/link-editor';
import Tags from '@/components/tags';
import {LinkProps} from '@/app/types';
import {cache} from 'react';

const createServerClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient({
    cookies: () => cookieStore,
  });
});

export default async function Link({params}: {params: {id: string}}) {
  const supabase = createServerClient();
  const {data} = await supabase
    .from('links')
    .select('*')
    .order('created_at', {ascending: false});

  const links = data as LinkProps[];

  const {data: link} = await supabase
    .from('links')
    .select('*')
    .eq('id', params.id);

  return (
    <>
      <div className="mt-20">
        <LinkEditor links={links} />
      </div>
      <Tags />
      <Links links={links} />
      <Modal className="outline outline-brown outline-2 rounded-lg">
        <LinkModal link={link?.[0]} />
      </Modal>
    </>
  );
}
