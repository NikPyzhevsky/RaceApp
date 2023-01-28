import React, {FC} from 'react';
import {Points, vec} from '@shopify/react-native-skia';

type TriangleProps = {
  x: number;
  y: number;
  strokeWidth: number;
  size: number;
};

export const Triangle: FC<TriangleProps> = ({x, y, strokeWidth, size}) => {
  const points = [
    vec(x, y),
    vec(x + size / 2, y + size / 2),
    vec(x, y + size),
    vec(x, y),
  ];

  return <Points mode="polygon" points={points} strokeWidth={strokeWidth} />;
};
