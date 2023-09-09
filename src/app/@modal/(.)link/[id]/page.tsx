import Modal from '@/components/modal';
import LinkModal from '@/components/link-modal';
import {LinkProps, TagProps} from '@/app/types';
import {createServerClient} from '@/helpers/server-client';

export default async function DialogLink({params}: {params: {id: string}}) {
  const supabase = createServerClient();
  const {data} = await supabase.from('links').select('*').eq('id', params.id);

  const link = data?.[0] as LinkProps;

  const {data: tags} = await supabase.from('tags').select('*');

  return (
    <Modal className="outline outline-brown outline-2 rounded-lg">
      <LinkModal link={link} tags={tags as TagProps[]} />
    </Modal>
  );
}
