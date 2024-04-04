import * as React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
// State
import {useSelector} from 'react-redux';
import {selectContentUrlById} from '../store/selectors/selectors';
// Utils
import {useMyNavigation} from '../navigation/utils/myUseNavigation';
// Types
import {RootState} from '../store/store';

interface ContentItemProps {
  itemId: string;
}

export const ContentOneItem: React.FC<ContentItemProps> = ({itemId}) => {
  const navigation = useMyNavigation();

  const url = useSelector((state: RootState) =>
    selectContentUrlById(state, itemId),
  );

  const onTopSwiperPress = () => {
    navigation.navigate('Video', {itemId, ofset: false, lastTime: 0});
  };

  return (
    <TouchableOpacity onPress={onTopSwiperPress} style={styles.container}>
      <Image source={{uri: url}} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  image: {height: 216, borderRadius: 12},
});
