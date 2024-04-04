import * as React from 'react';
// Third-party libraries
import Carousel from 'react-native-reanimated-carousel';
// Utils
import {WINDOW_WIDTH} from '../utils/utils';

interface HWCarouselProps {
  data: any[];
  renderItem: any;
  type: string;
  autoPlay: boolean;
}

export const HWCarousel: React.FC<HWCarouselProps> = ({
  data,
  renderItem,
  type,
  autoPlay,
}) => {
  return (
    <Carousel
      style={type === 'CONTENT_TWO' ? {width: WINDOW_WIDTH} : {}}
      loop
      width={type === 'CONTENT_TWO' ? 136 : WINDOW_WIDTH}
      height={type === 'CONTENT_TWO' ? 216 : 210}
      autoPlay={autoPlay}
      data={data}
      scrollAnimationDuration={3000}
      renderItem={renderItem}
    />
  );
};
