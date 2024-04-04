import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface WatchedContent {
  contentId: string;
  lastTime: number;
  currentIndex: number;
}

interface Part {
  title: string;
  url: string;
}

export interface ContentItem {
  id: string;
  url: string;
  url_vertical: string;
  title: string;
  author: string;
  position: number;
  access: boolean;
  description: string;
  parts: Part[];
}

export interface ContentState {
  watchedContent: WatchedContent | null;
  contentData: ContentItem[];
}

const initialState: ContentState = {
  watchedContent: null,
  contentData: [],
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    saveWatchedContent(state, action: PayloadAction<WatchedContent>) {
      state.watchedContent = action.payload;
    },
    saveContentData(state, action: PayloadAction<ContentItem[]>) {
      state.contentData = action.payload;
    },
  },
});

export const {saveContentData, saveWatchedContent} = contentSlice.actions;

export default contentSlice.reducer;
