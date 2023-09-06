import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import Modal from '@/components/modal';
import LinkModal from '@/components/link-modal';
import {LinkProps} from '@/app/types';

export default async function Link2({params}: {params: {id: string}}) {
  const supabase = createServerComponentClient({cookies});
  const {data} = await supabase.from('links').select('*').eq('id', params.id);

  const link = data?.[0] as LinkProps;

  return (
    <Modal className="outline outline-brown outline-2 rounded-lg">
      <LinkModal link={link} />
    </Modal>
  );
}
