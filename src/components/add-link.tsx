'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

interface AddLinkProps {
  isUserEditing: boolean;
  url: string;
  description: string;
  setShowEditField: React.Dispatch<React.SetStateAction<boolean>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddLink({
  isUserEditing,
  setShowEditField,
  url,
  description,
  setUrl,
  setDescription,
}: AddLinkProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  async function handleSave() {
    if (!url || !url.startsWith('http')) {
      alert('Please enter a valid URL');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/add-link', {
        method: 'POST',
        body: JSON.stringify({link: url, description, tag_name: 'default'}),
      });

      if (response.ok) {
        setIsSaved(true);
        setShowEditField(false);
        setUrl('');
        setDescription('');
        router.refresh();

        setTimeout(() => {
          setIsSaved(false);
        }, 2000);
      } else {
        alert('Failed to save the link.');
      }
    } catch (error) {
      alert('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleDiscard() {
    setShowEditField(false);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className={`py-1 px-3 text-sm font-semibold hover:outline hover:outline-1 rounded ${
          isUserEditing
            ? 'hover:outline-white text-white'
            : 'hover:outline-grey-900 text-grey-900'
        }`}
        onClick={handleSave}
        disabled={isLoading || isSaved}
      >
        {isLoading ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
      </button>
      <button
        className="text-really-sm text-grey-900 hover:underline"
        onClick={handleDiscard}
      >
        Discard
      </button>
    </div>
  );
}
