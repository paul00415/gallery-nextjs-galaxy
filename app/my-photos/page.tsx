'use client';

import React, { useState } from 'react';
import ImageList from '../../components/ImageList';
import { Button } from '@heroui/react';
import { Plus } from 'lucide-react';
import ImageModal from '../../components/modals/ImageModal';

export default function MyPhotos() {
  // For now we provide no items so the client uses its demo items or you can pass real user photos here.

  const demoItems = [
    {
      id: 1,
      poster: 'Galaxy',
      title: 'Sunset Painting',
      date: '2025.09.18',
      image: '/carousel/1.png',
      desc: 'A beautiful sunset over the mountains.',
    },
    {
      id: 2,
      poster: 'Galaxy',
      title: 'Abstract Lines',
      date: '2025.04.11',
      image: '/carousel/2.png',
      desc: 'An abstract piece with vibrant colors and dynamic lines.',
    },
    {
      id: 3,
      poster: 'Galaxy',
      title: 'Portrait Study',
      date: '2025.08.17',
      image: '/carousel/1.png',
      desc: 'A detailed portrait study capturing human emotion.',
    },
    {
      id: 4,
      poster: 'Galaxy',
      title: 'Modern Landscape',
      date: '2025.01.23',
      image: '/carousel/2.png',
      desc: 'A modern take on traditional landscape painting.',
    },
    {
      id: 5,
      poster: 'Galaxy',
      title: 'Minimal Print',
      date: '2025.07.18',
      image: '/carousel/1.png',
      desc: 'A minimalist print focusing on form and color.',
    },
    {
      id: 6,
      poster: 'Galaxy',
      title: 'Ocean View',
      date: '2025.03.15',
      image: '/carousel/2.png',
      desc: 'A calming view of the ocean at dawn.',
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex md:flex-row flex-col items-center justify-between mb-4 gap-3">
          <div>
            <h1 className="text-3xl font-bold">My Photos</h1>
            <p className="text-muted mt-1">
              A place to manage and view your uploaded photos.
            </p>
          </div>

          <Button
            color="primary"
            startContent={<Plus size={18} />}
            onPress={() => setOpen(true)}
          >
            Add Photo
          </Button>
        </div>

        <ImageList items={demoItems} />
      </div>

      <ImageModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    </div>
  );
}
