import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export interface EmojiIconProps {
  size?: number;

  color?: string;
}

function SvgComponent(props: SvgProps & EmojiIconProps) {
  const { color } = props;

  return (
    <Svg width={21} height={20} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.068 0c5.523 0 10 4.477 10 10s-4.477 10-10 10c-5.522 0-10-4.477-10-10s4.478-10 10-10Zm3.927 13.101c-.995 1.274-2.28 1.896-3.927 1.896-1.646 0-2.931-.621-3.926-1.896a.833.833 0 1 0-1.314 1.026c1.312 1.68 3.083 2.536 5.24 2.536 2.158 0 3.928-.856 5.24-2.536a.833.833 0 0 0-1.313-1.026Zm-7.26-6.436c-.69 0-1.25.746-1.25 1.667 0 .92.56 1.666 1.25 1.666s1.25-.746 1.25-1.666c0-.92-.56-1.667-1.25-1.667Zm6.667 0c-.69 0-1.25.746-1.25 1.667 0 .92.56 1.666 1.25 1.666s1.25-.746 1.25-1.666c0-.92-.56-1.667-1.25-1.667Z"
        fill={color ?? '#0F62FE'}
      />
    </Svg>
  );
}

const EmojiIcon = React.memo(SvgComponent);
export default EmojiIcon;
