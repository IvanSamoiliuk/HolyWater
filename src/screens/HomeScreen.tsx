import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
// Third-party libraries
import RemoteConfig from '@react-native-firebase/remote-config';
// State
import {useDispatch, useSelector} from 'react-redux';
import {ContentItem, saveContentData} from '../store/slices/contentSlice';
import {selectWatchedContent} from '../store/selectors/selectors';
// Components
import {HWCarousel} from '../components/HWCarousel';
import {ContentOneItem} from '../components/ContentOneItem';
import {ContentTwoItem} from '../components/ContentTwoItem';
import {ContinueComponent} from '../components/ContinueComponent';
import {FONTS} from '../constants/fonts';

export const HomeScreen = () => {
  const dispatch = useDispatch();

  const watchedContent = useSelector(selectWatchedContent);

  const [positionOneContent, setPositionOneContent] = useState([]);
  const [positionTwoContent, setPositionTwoContent] = useState([]);
  const [positionThreeContent, setPositionThreeContent] = useState([]);

  const fetchRemoteData = useCallback(async () => {
    try {
      await RemoteConfig().fetch(10);
      const activated = await RemoteConfig().fetchAndActivate();
      if (activated) {
        const configValue = RemoteConfig().getValue('content');
        const stringValue = configValue.asString();
        const jsonObject = JSON.parse(stringValue);

        dispatch(saveContentData(jsonObject));

        const positionOne = jsonObject.filter(
          (item: ContentItem) => item.position === 1,
        );
        const positionTwo = jsonObject.filter(
          (item: ContentItem) => item.position === 2,
        );
        const positionThree = jsonObject.filter(
          (item: ContentItem) => item.position === 3,
        );

        setPositionOneContent(positionOne);
        setPositionTwoContent(positionTwo);
        setPositionThreeContent(positionThree);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchRemoteData();
  }, [fetchRemoteData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container2}>
        <View style={styles.topTitleWrapper}>
          <Text style={styles.title}>Home</Text>
        </View>
        <HWCarousel
          type={'CONTENT_ONE'}
          data={positionOneContent}
          autoPlay={true}
          renderItem={({item, index}) => <ContentOneItem itemId={item.id} />}
        />

        {watchedContent && (
          <>
            <View style={styles.chapter}>
              <Text style={styles.title}>Continue Watching</Text>
            </View>
            <ContinueComponent itemId={watchedContent.id} />
          </>
        )}

        <View style={styles.chapter}>
          <Text style={styles.title}>Trending Now</Text>
        </View>
        <HWCarousel
          type={'CONTENT_TWO'}
          data={positionTwoContent}
          autoPlay={false}
          renderItem={({item, index}) => <ContentTwoItem itemId={item.id} />}
        />

        <View style={styles.chapter}>
          <Text style={styles.title}>Top Romance</Text>
        </View>
        <HWCarousel
          type={'CONTENT_TWO'}
          data={positionThreeContent}
          autoPlay={false}
          renderItem={({item, index}) => <ContentTwoItem itemId={item.id} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  container2: {
    width: '100%',
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 10,
    fontFamily: 'Nunito Sans',
  },
  topTitleWrapper: {
    width: '100%',
    height: 48,
  },
  chapter: {
    width: '100%',
    marginTop: 44,
    marginBottom: 14,
  },
});
