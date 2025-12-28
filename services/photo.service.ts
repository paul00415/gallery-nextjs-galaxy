import { api } from '@/lib/axios';
import axios from 'axios';

export async function getSignedUploadUrl(mimeType: string) {
  const res = await api.post('/photos/signed-url', {
    mimeType,
  });

  return res.data as {
    uploadUrl: string;
    fileUrl: string;
  };
}

export async function uploadToBucket(uploadUrl: string, file: File) {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
}

export async function createPhoto(data: {
  title: string;
  description: string;
  imageUrl: string;
}) {
  const res = await api.post('/photos', data);
  return res.data;
}
