import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import type { SvgComponent } from 'react-native-svg-types';
import PropTypes from 'prop-types';
import type { SvgProps } from 'react-native-svg';
import { modifyPathColor } from './functions/modify-path-colors';

/**
 * File: SvgIcon.tsx
 * @created 2020-12-16 11:00:09
 * @author Thanh Tùng <ht@thanhtunguet.info>
 * @type {FC<PropsWithChildren<SvgIconProps>>}
 */
const SvgIcon: FC<PropsWithChildren<SvgIconProps>> = (
  props: PropsWithChildren<SvgIconProps>
): ReactElement => {
  const { component, fill, stroke, solid, ...svgProps } = props;

  const element: ReactElement<PropsWithChildren<SvgProps>> =
    component.default(svgProps)!;

  const { children } = element.props;

  const childs: ReactNode[] = React.useMemo(
    () =>
      React.Children.toArray(children).map((child: ReactNode) => {
        return modifyPathColor(child, solid!, {
          fill,
          stroke,
        });
      }),
    [children, fill, stroke, solid]
  );

  return React.cloneElement(element, svgProps, childs);
};

export interface SvgIconProps extends SvgProps {
  component: {
    default: SvgComponent;
  };

  solid?: boolean;

  fill?: string;

  stroke?: string;
}

SvgIcon.defaultProps = {
  solid: false,
  fill: undefined,
  stroke: undefined,
};

SvgIcon.propTypes = {
  solid: PropTypes.bool,
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

SvgIcon.displayName = nameof(SvgIcon);

export default SvgIcon;
