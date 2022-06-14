import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export interface FileIconProps {
  size?: number;

  color?: string;
}

function SvgComponent(props: SvgProps & FileIconProps) {
  const { color, size } = props;

  return (
    <>
      <Svg width={size} height={size} fill="none">
        <Path
          d="M24.094 8.719 17.53 2.156c-.187-.187-.375-.281-.656-.281H7.5A1.88 1.88 0 0 0 5.625 3.75v22.5A1.88 1.88 0 0 0 7.5 28.125h15a1.88 1.88 0 0 0 1.875-1.875V9.375a.851.851 0 0 0-.281-.656Zm-7.219-4.594 5.25 5.25h-5.25v-5.25ZM22.5 26.25h-15V3.75H15v5.625a1.88 1.88 0 0 0 1.875 1.875H22.5v15Z"
          fill={color ?? '#fff'}
        />
        <Path
          d="M20.625 20.625H9.375V22.5h11.25v-1.875ZM20.625 15H9.375v1.875h11.25V15Z"
          fill={color ?? '#fff'}
        />
      </Svg>
    </>
  );
}

const FileIcon = React.memo(SvgComponent);
export default FileIcon;
