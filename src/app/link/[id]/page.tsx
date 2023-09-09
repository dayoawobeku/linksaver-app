import Modal from '@/components/modal';
import LinkModal from '@/components/link-modal';
import Links from '@/components/links';
import LinkEditor from '@/components/link-editor';
import Tags from '@/components/tags';
import {LinkProps, TagProps} from '@/app/types';
import {createServerClient} from '@/helpers/server-client';

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

  const {data: tags} = await supabase.from('tags').select('*');

  return (
    <>
      <div className="mt-20">
        <LinkEditor links={links} tags={tags as TagProps[]} />
      </div>
      <Tags />
      <Links links={links} />
      <Modal className="outline outline-brown outline-2 rounded-lg">
        <LinkModal link={link?.[0]} tags={tags as TagProps[]} />
      </Modal>
    </>
  );
}
