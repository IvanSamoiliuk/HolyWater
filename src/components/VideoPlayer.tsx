import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// Third-party libraries
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
// State
import {useDispatch, useSelector} from 'react-redux';
import {saveWatchedContent} from '../store/slices/contentSlice';
import {selectWatchedContent} from '../store/selectors/selectors';
// Utils
import {WINDOW_HEIGHT, WINDOW_WIDTH, formatTime} from '../utils/utils';
import {useMyNavigation} from '../navigation/utils/myUseNavigation';

const thumb = require('../assets/images/thumb.png');

interface VideoData {
  title: string;
  url: string;
}

interface VideoPlayerProps {
  data: VideoData;
  isActive: boolean;
  contentId: string;
  currentIndex: number;
  lastTime: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  data,
  isActive,
  contentId,
  currentIndex,
  lastTime,
}) => {
  const navigation = useMyNavigation();
  const dispatch = useDispatch();

  const isDarkMode = useColorScheme() === 'dark';
  const statusBarHeight = StatusBar.currentHeight || 0;

  const videoPlayerRef: React.MutableRefObject<any> = useRef(null);

  const watchedVideo = useSelector(selectWatchedContent);

  const {title, url} = data;
  const [paused, setPaused] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(lastTime || 0);
  const [duration, setDuration] = useState<number>(0);
  const [isGradientVisible, setIsGradientVisible] = useState<boolean>(true);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const onProgress = (data: {currentTime: number}) => {
    if (!isSeeking) {
      setCurrentTime(data.currentTime);
    }
  };

  const handlePress = () => {
    setIsGradientVisible(true);
    setTimeout(() => {
      setIsGradientVisible(false);
    }, 15000);
  };

  const onClose = () => {
    setPaused(!paused);
    dispatch(
      saveWatchedContent({contentId, lastTime: currentTime, currentIndex}),
    );
    navigation.navigate('Home');
  };

  const onLoad = (datas: {duration: number}) => {
    setDuration(datas.duration);
    if (isActive && lastTime > 0) {
      videoPlayerRef.current.seek(lastTime);
    }
  };

  const seekVideo = (value: number) => {
    setIsSeeking(true);
    setCurrentTime(value);
    videoPlayerRef.current.seek(value);
  };

  useEffect(() => {
    if (watchedVideo && url === watchedVideo.url && isActive) {
      videoPlayerRef.current.seek(watchedVideo.lastTime);
    }
  }, [url, isActive, watchedVideo]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <View
      style={[styles.container, {height: WINDOW_HEIGHT - statusBarHeight}]}
      onTouchStart={handlePress}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Video
        ref={videoPlayerRef}
        source={{
          uri: url,
        }}
        style={styles.video}
        resizeMode="cover"
        paused={paused || !isActive}
        onProgress={onProgress}
        onLoad={onLoad}
      />

      {isGradientVisible && (
        <>
          <LinearGradient
            colors={['transparent', 'black']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            locations={[0, 1]}
            style={styles.topLinearGradient}
          />

          <TouchableOpacity style={[styles.close]} onPress={onClose}>
            <Icon name={'close'} size={30} color="#FFF" />
          </TouchableOpacity>
          <Text style={[styles.title]}>{title}</Text>

          <View style={styles.controls}>
            <LinearGradient
              colors={['transparent', 'black']}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              locations={[0, 1]}
              style={styles.bottomLinearGradient}
            />

            <TouchableOpacity
              style={[styles.bottomRightSection]}
              onPress={() => {
                setPaused(!paused);
                dispatch(
                  saveWatchedContent({
                    contentId,
                    lastTime: currentTime,
                    currentIndex,
                  }),
                );
              }}>
              <Icon
                name={paused ? 'play-arrow' : 'pause'}
                size={30}
                color="#FFF"
              />
            </TouchableOpacity>

            <View style={styles.sliderContainer}>
              <Slider
                style={[styles.slider]}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onValueChange={seekVideo}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#A9A9A9"
                thumbImage={thumb}
                onSlidingComplete={() => {
                  setIsSeeking(false);
                }}
              />

              <View style={styles.time}>
                <Text style={styles.icon}>{formatTime(currentTime)}</Text>
                <Text style={styles.icon}>{formatTime(duration)}</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  bottomRightSection: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
  },
  time: {
    position: 'absolute',
    bottom: -20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  sliderContainer: {
    flex: 1,
  },
  close: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    position: 'absolute',
    top: 42,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontFamily: 'Nunito Sans',
  },
  bottomLinearGradient: {
    position: 'absolute',
    bottom: -30,
    left: 0,
    right: 0,
    height: 80,
  },
  topLinearGradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  icon: {
    color: 'white',
  },
});
