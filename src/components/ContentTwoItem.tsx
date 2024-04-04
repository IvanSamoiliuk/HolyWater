import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Image} from 'react-native';
// State
import {useSelector} from 'react-redux';
import {selectContentDataById} from '../store/selectors/selectors';
// Third-party libraries
import {BlurView} from '@react-native-community/blur';
// Constants
import {COLORS} from '../constants/colors';

interface ContentTwoItemProps {
  itemId: string;
}

export const ContentTwoItem: React.FC<ContentTwoItemProps> = ({itemId}) => {
  const data = useSelector(state => selectContentDataById(state, itemId));

  const {description, coming, url_vertical, access} = data;

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: url_vertical}} style={styles.image} />

      {!access && (
        <View style={styles.blur}>
          <BlurView
            style={styles.blur}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <Image
            source={require('../assets/images/lock.png')}
            style={styles.lock}
          />
        </View>
      )}

      {coming && <Text style={styles.coming}>{coming}</Text>}

      <Text style={styles.text}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 210,
    borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: 8,
    borderRadius: 12,
  },
  coming: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.blue,
    marginTop: 8,
    textTransform: 'uppercase',
    fontFamily: 'Nunito Sans',
  },
  text: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: 8,
    fontFamily: 'Nunito Sans',
  },
  image: {width: 120, height: 150, borderRadius: 8},
  blur: {
    position: 'absolute',
    width: 120,
    height: 150,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lock: {
    width: 48,
    height: 48,
  },
});
