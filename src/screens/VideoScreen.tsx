import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// Components
import {VideoPlayer} from '../components/VideoPlayer';
// Utils
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils/utils';
import {useMyRoute} from '../navigation/utils/useMyRoute';
// State
import {useSelector} from 'react-redux';
// Types
import {Part} from '../typings/types';
import {selectPartsAndWatchedContentById} from '../store/selectors/selectors';

export const VideoScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const statusBarHeight = StatusBar.currentHeight || 0;
  const flatListRef = useRef<FlatList<Part> | null>(null);

  const route = useMyRoute();
  const {itemId, ofset, lastTime} = route.params;

  const {parts, data} = useSelector(state =>
    selectPartsAndWatchedContentById(state, itemId),
  );

  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);

  useEffect(() => {
    if (ofset) {
      const index = data?.currentIndex || 0;
      setActiveVideoIndex(index);
    } else {
      setActiveVideoIndex(0);
    }
    flatListRef.current?.scrollToIndex({
      index: activeVideoIndex,
      animated: false,
    });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <View style={[styles.container, {height: WINDOW_HEIGHT - statusBarHeight}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        ref={flatListRef}
        data={parts}
        pagingEnabled
        initialScrollIndex={activeVideoIndex}
        renderItem={({item, index}) => (
          <VideoPlayer
            data={item}
            contentId={itemId}
            isActive={activeVideoIndex === index}
            currentIndex={index}
            lastTime={activeVideoIndex === index ? lastTime : 0}
          />
        )}
        onScroll={e => {
          const index = Math.round(
            e.nativeEvent.contentOffset.y / WINDOW_HEIGHT,
          );
          if (activeVideoIndex !== index) {
            setActiveVideoIndex(index);
          }
        }}
        getItemLayout={(data, index) => ({
          length: WINDOW_HEIGHT,
          offset: WINDOW_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
  },
});
