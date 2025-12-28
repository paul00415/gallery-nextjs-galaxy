import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSignedUploadUrl,
  uploadToBucket,
  createPhoto,
} from '@/services/photo.service';

interface UploadPhotoPayload {
  image: File;
  title: string;
  description: string;
}

export const uploadPhoto = createAsyncThunk(
  'photo/upload',
  async (payload: UploadPhotoPayload, { rejectWithValue }) => {
    try {
      // 1. get signed URL
      const { uploadUrl, fileUrl } = await getSignedUploadUrl(
        payload.image.type
      );

      // 2. upload image
      await uploadToBucket(uploadUrl, payload.image);

      // 3. save metadata
      await createPhoto({
        title: payload.title,
        description: payload.description,
        imageUrl: fileUrl,
      });

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Upload failed');
    }
  }
);

interface PhotoState {
  loading: boolean;
  error: string | null;
}

const initialState: PhotoState = {
  loading: false,
  error: null,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPhoto.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default photoSlice.reducer;
