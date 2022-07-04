import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export interface MediaIconProps {
  size?: number;

  color?: string;
}

function SvgComponent(props: SvgProps & MediaIconProps) {
  const { color } = props;

  return (
    <Svg width={22} height={18} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 2c0-1.105-1.094-2-2.444-2H2.444C1.094 0 0 .895 0 2v14c0 1.105 1.094 2 2.444 2h17.112c1.35 0 2.444-.895 2.444-2V2ZM7.944 5c1.013 0 1.834.672 1.834 1.5S8.957 8 7.944 8c-1.012 0-1.833-.672-1.833-1.5S6.931 5 7.944 5Zm9.778 10c.338 0 .611-.225.611-.5l-.012-.33a.463.463 0 0 0-.134-.32l-4.571-4.67a.67.67 0 0 0-.477-.188.67.67 0 0 0-.477.187l-2.799 2.88a.668.668 0 0 1-.482.194.668.668 0 0 1-.483-.194L7.676 10.7a.68.68 0 0 0-.495-.2.68.68 0 0 0-.495.2l-2.897 3.17a.452.452 0 0 0-.122.3v.33c0 .276.273.5.61.5h13.445Z"
        fill={color ?? '#0F62FE'}
      />
    </Svg>
  );
}

const MediaIcon = React.memo(SvgComponent);
export default MediaIcon;
