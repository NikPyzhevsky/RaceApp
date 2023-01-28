import React, {FC} from 'react';
import {DiffRect, rect, rrect} from '@shopify/react-native-skia';

type DiffRectProps = {
  x: number;
  y: number;
  strokeWidth: number;
  height: number;
  width: number;
  r: number;
};

export const RectWithHole: FC<DiffRectProps> = ({
  x,
  y,
  strokeWidth,
  height,
  width,
  r,
}) => {
  const outer = rrect(rect(x, y, width, height), r, r);
  const inner = rrect(
    rect(
      x + strokeWidth,
      y + strokeWidth,
      width - strokeWidth * 2,
      height - strokeWidth * 2,
    ),
    r,
    r,
  );

  return <DiffRect inner={inner} outer={outer} />;
};
