'use client';

import {useState} from 'react';
import Image from 'next/image';
import HeadlessModal from './dialog';
import {folder} from '@/assets/images';

export default function ManageTags() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  return (
    <>
      <button
        className="text-sm text-white font-medium px-3 py-2 hover:text-grey-800 rounded-lg flex items-center gap-2"
        onClick={openModal}
      >
        <Image alt="" src={folder} width={16} height={16} />
        Manage tags
      </button>

      <HeadlessModal open={open} setOpen={setOpen}>
        <div className="text-sm w-full">
          <p>All Tags</p>
          <div className="mt-4">
            <div className="flex items-center justify-between w-full">
              <div className="grid grid-cols-3 gap-6">
                <p>Twitter</p>
                <p>#3977de</p>
                <p>3 links</p>
              </div>
              <button className="hover:underline">
                Delete <span className="hidden sm:inline">tag</span>
              </button>
            </div>
          </div>

          <div className="mt-10">
            <p>Add new tag</p>
            <div className="flex items-end justify-between w-full">
              <div className="mt-2 grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Tag name"
                  className="border border-grey-900 rounded-lg px-2 py-1 text-grey-950"
                />
                <label htmlFor="color">
                  <input
                    type="color"
                    id="color"
                    name="color"
                    value="#615858"
                    className="border border-grey-900 rounded-lg text-grey-950 h-full w-full"
                  />
                </label>
              </div>
              <button className="hover:underline">Add</button>
            </div>
          </div>
        </div>
      </HeadlessModal>
    </>
  );
}
