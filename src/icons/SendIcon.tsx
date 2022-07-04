import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export interface SendIconProps {
  size?: number;

  color?: string;
}

function SvgComponent(props: SvgProps & SendIconProps) {
  const { color } = props;

  return (
    <Svg width={30} height={30} fill="none">
      <Path
        d="M25.734 14.165 5.11 3.853a.937.937 0 0 0-1.012.112.937.937 0 0 0-.31.938l2.485 9.16h10.603v1.874H6.272L3.75 25.07a.938.938 0 0 0 .937 1.18.938.938 0 0 0 .422-.102l20.625-10.313a.938.938 0 0 0 0-1.669Z"
        fill={color ?? '#0F62FE'}
      />
    </Svg>
  );
}

const SendIcon = React.memo(SvgComponent);
export default SendIcon;
