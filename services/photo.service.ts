import { api } from '@/lib/axios';
import axios from 'axios';

export async function getUrls(mimeType: string) {
  const res = await api.post('/photos/signed-upload', {
    mimeType,
  });

  return res.data as {
    uploadUrl: string;
    fileUrl: string;
  };
}

export async function uploadToBucket(
  uploadUrl: string,
  file: File,
  onProgress?: (percent: number) => void
) {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
    onDownloadProgress: (e) => {
      if (!e.total || !onProgress) return;
      onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });
}

export async function createPhoto(data: {
  title: string;
  desc: string;
  imageUrl: string;
}) {
  return await api.post('/photos', data);
}
