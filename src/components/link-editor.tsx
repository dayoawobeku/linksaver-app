'use client';

import {useState, useRef, useCallback, useEffect, SetStateAction} from 'react';
import Image from 'next/image';
import ContentEditable from 'react-contenteditable';
import {plus} from '@/assets/images';
import AddLink from './add-link';
import {LinkProps} from '@/app/types';

export default function LinkEditor({links}: {links: LinkProps[]}) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [showEditField, setShowEditField] = useState(false);
  const [isUserEditing, setIsUserEditing] = useState(false);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

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

  useEffect(() => {
    function handleClickOutside(event: {target: any}) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsUserEditing(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleUserEditing() {
    setIsUserEditing(true);
  }

  function handleNewLink() {
    setShowEditField(true);
  }

  return (
    <>
      {links.length === 0 ? (
        <button
          onClick={handleNewLink}
          className={`mt-4 font-medium px-3 py-2 flex items-center gap-2 outline outline-1 outline-white rounded hover:outline-2 hover:outline-primary-900 hover:outline-offset-2 focus:outline-2 focus:outline-primary-900 focus:outline-offset-2 ${
            showEditField ? 'hidden' : 'block'
          }`}
        >
          <Image alt="plus" src={plus} width={16} height={16} />
          <span>Add your first link</span>
        </button>
      ) : (
        <button
          onClick={handleNewLink}
          className={`text-sm font-medium px-3 py-2 flex items-center gap-2 outline outline-1 outline-white rounded hover:outline-2 hover:outline-primary-900 hover:outline-offset-2 focus:outline-2 focus:outline-primary-900 focus:outline-offset-2 ${
            showEditField ? 'hidden' : 'block'
          }`}
        >
          <Image alt="plus" src={plus} width={16} height={16} />
          <span>New link</span>
        </button>
      )}
      <div
        ref={divRef}
        onFocus={handleUserEditing}
        id="note"
        className={`p-4 rounded-lg flex-col border max-w-[573px] ${
          isUserEditing ? 'border-white' : 'border-grey-900'
        } ${showEditField ? 'flex' : 'hidden'}
          ${links.length === 0 ? 'w-full mt-4' : 'w-1/2'}
        `}
      >
        <div className="space-y-3">
          <ContentEditable
            role="textbox"
            onBlur={onUrlBlur}
            onChange={onUrlBlur}
            html={url}
            className={`text-sm font-semibold w-full ${
              isUserEditing ? 'text-white' : 'text-grey-900'
            }`}
            placeholder="Type or paste a URL"
            aria-label="Type or paste a URL"
          />
          <ContentEditable
            role="textbox"
            onBlur={onDescriptionBlur}
            onChange={onDescriptionBlur}
            html={description}
            className={`text-sm ${
              isUserEditing ? 'text-white' : 'text-grey-900'
            }`}
            placeholder="Short description"
            aria-label="Short description"
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="px-2 py-1 text-white text-really-sm rounded-full bg-brown">
            default
          </div>
          <AddLink
            isUserEditing={isUserEditing}
            setShowEditField={setShowEditField}
            url={url}
            description={description}
            setUrl={setUrl}
            setDescription={setDescription}
          />
        </div>
      </div>
    </>
  );
}
