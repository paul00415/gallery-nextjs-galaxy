'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from '@heroui/react';
import { useState } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    file: File | null;
    title: string;
    description: string;
  }) => void;
}

export default function ImageModal({
  isOpen,
  onClose,
  onSubmit,
}: ImageModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterName, setPosterName] = useState('');

  function handleSubmit() {
    if (onSubmit) {
      onSubmit({ file, title, description });
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
              <Input
                type="file"
                label="Image File"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />

              <Input
                label="Title"
                placeholder="Photo title"
                value={title}
                onValueChange={setTitle}
              />

              <Textarea
                label="Description"
                placeholder="Photo description"
                value={description}
                onValueChange={setDescription}
              />

              <Input
                label="Poster"
                placeholder="Poster name"
                value={posterName}
                onValueChange={setPosterName}
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
