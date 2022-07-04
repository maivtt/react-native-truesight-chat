import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export interface FolderIconProps {
  size?: number;

  color?: string;
}

function SvgComponent(props: SvgProps & FolderIconProps) {
  const { color } = props;

  return (
    <Svg width={16} height={20} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 0H6.83a2 2 0 0 0-1.42.59L.59 5.41A2 2 0 0 0 0 6.83V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM1.82 7 7 1.82V6a1 1 0 0 1-1 1H1.82Zm7.06 6.88h1.62a.5.5 0 0 0 .5-.5v-.76a.5.5 0 0 0-.5-.5H8.88V10.5a.5.5 0 0 0-.5-.5h-.76a.5.5 0 0 0-.5.5v1.62H5.5a.5.5 0 0 0-.5.5v.76a.5.5 0 0 0 .5.5h1.62v1.62a.5.5 0 0 0 .5.5h.76a.5.5 0 0 0 .5-.5v-1.62Z"
        fill={color ?? '#0F62FE'}
      />
    </Svg>
  );
}

const FolderIcon = React.memo(SvgComponent);
export default FolderIcon;
