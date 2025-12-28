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

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { uploadPhoto } from '@/store/photo/photoSlice';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ isOpen, onClose }: ImageModalProps) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.photo);

  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const handleSubmit = async () => {
    // Validation
    setTitleError('');
    setDescriptionError('');

    if (!image) {
      alert('Image is required');
      return;
    }

    if (!title) {
      setTitleError('Title is required');
      return;
    }

    if (!description) {
      setDescriptionError('Description is required');
      return;
    }

    try {
      // Dispatch upload flow
      await dispatch(
        uploadPhoto({
          image,
          title,
          description,
        })
      ).unwrap();

      // Close modal ONLY on success
      onClose();

      // Reset form (optional)
      setImage(null);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.log(err);
      alert('Upload failed');
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        {() => (
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
                error={titleError}
              />

              <TextareaInput
                label="Description"
                placeholder="Photo description"
                value={description}
                onValueChange={setDescription}
                error={descriptionError}
              />

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={onClose} isDisabled={loading}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isLoading={loading}
              >
                Add Photo
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
