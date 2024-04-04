import {createSelector} from '@reduxjs/toolkit';

const selectContent = state => state.content;
const selectContentData = state => state.content.contentData;

export const selectWatchedContent = createSelector([selectContent], content => {
  return content.watchedContent;
});

export const selectContentDataById = createSelector(
  [selectContentData, (state, itemId) => itemId],
  (contentData, itemId) => {
    const item = contentData.find(item => item.id === itemId);
    return item;
  },
);

export const selectContentUrlById = createSelector(
  [selectContentData, (state, itemId) => itemId],
  (contentData, itemId) => {
    const item = contentData.find(item => item.id === itemId);
    return item ? item.url : undefined;
  },
);

export const selectPartsAndWatchedContentById = createSelector(
  [selectContentData, selectWatchedContent, (state, itemId) => itemId],
  (contentData, watchedContent, itemId) => {
    const item = contentData.find(item => item.id === itemId) || {parts: []};
    return {parts: item.parts, data: watchedContent};
  },
);
