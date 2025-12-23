'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { useState } from 'react';
import NormalInput from '../../components/InputFields/NormalInput';
import TextareaInput from '../../components/InputFields/TextareaInput';
import ImageInput from '../../components/InputFields/ImageInput';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    image: File | null;
    title: string;
    description: string;
    posterName: string;
  }) => void;
}

export default function ImageModal({
  isOpen,
  onClose,
  onSubmit,
}: ImageModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterName, setPosterName] = useState('');

  function handleSubmit() {
    if (onSubmit) {
      onSubmit?.({
        image,
        title,
        description,
        posterName,
      });
    }
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add New Photo</ModalHeader>

            <ModalBody className="gap-4">
              <div className="flex flex-col justify-center items-center">
                <ImageInput
                  value={image}
                  onChange={setImage}
                  noImage="Image is required"
                />
                {image && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected file: {image.name}
                  </p>
                )}
              </div>

              <NormalInput
                label="Title"
                value={title}
                placeholder="Photo title"
                onChange={(e) => setTitle(e.target.value)}
                error="Title is required"
              />

              <TextareaInput
                label="Description"
                placeholder="Photo description"
                value={description}
                onValueChange={setDescription}
                error="Description is required"
              />

              <NormalInput
                label="Poster"
                value={posterName}
                placeholder="Poster name"
                onChange={(e) => setPosterName(e.target.value)}
                error="Poster name is required"
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Add Photo
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
