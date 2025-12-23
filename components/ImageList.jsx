'use client';

import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import ImagePreviewModal from '../components/modals/ImageReviewModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';
import { Image } from '@heroui/react';

export default function ImageList({ items }) {
  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function closePreview() {
    setSelected(null);
  }

  function closeDeleteModal() {
    setDeleteTarget(null);
  }

  function confirmDelete() {
    console.log('Delete confirmed:', deleteTarget.id);
    // 🔴 call API or mutation here
    closeDeleteModal();
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        closePreview();
        closeDeleteModal();
      }
    }

    if (selected || deleteTarget) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected, deleteTarget]);

  if (!items || items.length === 0) {
    return (
      <div className="w-full py-12 text-center text-muted">No photos found</div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="group bg-white dark:bg-base-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative">
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                className="block w-full h-auto"
                onClick={() => setSelected(item)}
              />

              {/* Action buttons */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(item);
                  }}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 hover:bg-white text-black shadow cursor-pointer"
                >
                  <Eye size={16} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Edit', item.id);
                  }}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 text-white shadow cursor-pointer"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(item);
                  }}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 text-white shadow cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-medium truncate">
                Title: {item.title}
              </h3>
              <p className="text-xs text-muted">Desc: {item.desc}</p>
              <div className="flex justify-between text-xs text-muted">
                <span>{item.poster}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 🔍 Image Preview Modal */}
      <ImagePreviewModal
        selected={selected}
        onClose={() => setSelected(null)}
      />

      {/* 🗑️ Delete Confirm Modal */}
      <DeleteConfirmModal
        target={deleteTarget}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
