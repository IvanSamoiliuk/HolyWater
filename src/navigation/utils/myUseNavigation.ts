import {useNavigation as useOriginalNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export function useMyNavigation() {
  return useOriginalNavigation<NativeStackNavigationProp<RootStackParamList>>();
}
