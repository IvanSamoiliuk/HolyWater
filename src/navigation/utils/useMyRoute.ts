import {
  RouteProp,
  useRoute as useOriginalRoute,
} from '@react-navigation/native';
import {RootStackParamList} from '../RootStackParamList';

export function useMyRoute<Screen extends keyof RootStackParamList>() {
  return useOriginalRoute<RouteProp<RootStackParamList, Screen>>();
}
