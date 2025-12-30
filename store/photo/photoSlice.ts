import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUrls,
  uploadToBucket,
  createPhoto,
  fetchRecentPhotosApi,
  getPhotosApi,
} from '@/services/photo.service';

interface UploadPhotoPayload {
  image: File;
  title: string;
  description: string;
}

interface Photo {
  id: number;
  title: string;
  desc: string;
  imageUrl: string;
  createdAt?: string;
}

interface PhotoState {
  recentItems: Photo[];
  images: Photo[];
  lastImageId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PhotoState = {
  recentItems: [],
  images: [],
  lastImageId: null,
  loading: false,
  error: null,
};

export const uploadPhoto = createAsyncThunk(
  'photo/upload',
  async (payload: UploadPhotoPayload, { rejectWithValue }) => {
    try {
      // 1. get signed URL
      const { uploadUrl, fileUrl } = await getUrls(payload.image.type);

      // 2. upload image
      await uploadToBucket(uploadUrl, payload.image, (progress) => {
        console.log('Upload progress:', progress);
      });

      // 3. save metadata
      await createPhoto({
        title: payload.title,
        desc: payload.description,
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

export const fetchRecentPhotos = createAsyncThunk(
  'photos/recent',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchRecentPhotosApi();
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Failed to load photos');
    }
  }
);

export const getPhotos = createAsyncThunk(
  'photos/get',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { photo: PhotoState };
      const cursor = state.photo.lastImageId;

      return await getPhotosApi(cursor);
    } catch {
      return rejectWithValue('Failed to load photos');
    }
  }
);

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // upload
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
      })

      // fetch recent images
      .addCase(fetchRecentPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.recentItems = action.payload;
      })
      .addCase(fetchRecentPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetch recent images
      .addCase(getPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.images = [...state.images, ...action.payload];

        if (action.payload.length > 0) {
          state.lastImageId = action.payload[action.payload.length - 1].id;
        }
      })
      .addCase(getPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default photoSlice.reducer;
