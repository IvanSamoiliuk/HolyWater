import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
// State
import {useSelector} from 'react-redux';
import {selectWatchedContent} from '../store/selectors/selectors';
// Utils
import {useMyNavigation} from '../navigation/utils/myUseNavigation';
// Constants
import {COLORS} from '../constants/colors';
import {ContentItem} from '../store/slices/contentSlice';

interface Item {
  url: string;
  title: string;
  director?: string;
  author?: string;
}

interface ContinueComponentProps {
  item: Item;
}

export const ContinueComponent: React.FC<ContinueComponentProps> = () => {
  const navigation = useMyNavigation();

  const {contentId, lastTime} = useSelector(selectWatchedContent);
  const {url_vertical, title, author}: ContentItem = useSelector(state =>
    state.content.contentData.find(
      (item: ContentItem) => item.id === contentId,
    ),
  );

  const onTopSwiperPress = () => {
    navigation.navigate('Video', {itemId: contentId, ofset: true, lastTime});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onTopSwiperPress}>
      <View style={styles.row}>
        <Image
          source={{
            uri: url_vertical,
          }}
          style={styles.image}
        />
        <View style={styles.wrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
      </View>
      <Image
        source={require('../assets/images/arrow.png')}
        style={styles.arrow}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 68,
    backgroundColor: COLORS.darkblue,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 20,
    marginHorizontal: 10,
  },
  wrapper: {
    marginLeft: 10,
    justifyContent: 'space-evenly',
  },
  image: {width: 44, height: 56, borderRadius: 8},
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Nunito Sans',
  },
  author: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nunito Sans',
  },
  arrow: {width: 8, height: 16},
  row: {
    flexDirection: 'row',
  },
});
