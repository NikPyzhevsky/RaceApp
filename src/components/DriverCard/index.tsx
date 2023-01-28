import React, {FC} from 'react';
import {Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import {
  Canvas,
  useClockValue,
  useComputedValue,
  vec,
  RoundedRect,
  Shader,
  BlurMask,
  Text,
  useFont,
  Group,
} from '@shopify/react-native-skia';
import {gradientAnimShader} from '../canvas';
import {DarkTheme} from '../../navigation/constants';
import {RectWithHole, Triangle} from '../canvas/components';

const CARD_HEIGHT = 128;
export const canvasPadding = 32;
const CONTENT_PADDING = canvasPadding + 4;
const RECTANGLE_HEIGHT = CARD_HEIGHT * 0.5;
const RECTANGLE_WIDTH = RECTANGLE_HEIGHT * 2;

interface DriverCardProps {
  name: string;
  dateOfBirth: string;
  onPressContainer: () => void;
  onPressButton: () => void;
}

export const DriverCard: FC<DriverCardProps> = props => {
  const {name, dateOfBirth, onPressContainer, onPressButton} = props;
  const {width} = useWindowDimensions();
  const titleFont = useFont(require('../../assets/fonts/Autentica.otf'), 24);
  const subTitleFont = useFont(require('../../assets/fonts/Autentica.otf'), 16);

  if (titleFont === null || subTitleFont === null) {
    return null;
  }

  return (
    <Pressable onPress={onPressContainer} style={styles.container}>
      <BackgroundGradient
        width={width}
        height={CARD_HEIGHT}
        children={
          <>
            <RoundedRect
              x={CONTENT_PADDING / 2}
              y={CONTENT_PADDING / 2}
              width={width - CONTENT_PADDING}
              height={CARD_HEIGHT - CONTENT_PADDING}
              color={DarkTheme.colors.card}
              r={20}
            />
            <Text
              font={titleFont}
              text={name}
              x={CONTENT_PADDING}
              y={CONTENT_PADDING + 16}
              color={DarkTheme.colors.text}
            />
            <Text
              font={subTitleFont}
              text={dateOfBirth}
              x={CONTENT_PADDING}
              y={CONTENT_PADDING + 16 + 16 + 24}
            />
            <RectWithHole
              x={width - CONTENT_PADDING - RECTANGLE_WIDTH}
              y={CONTENT_PADDING}
              strokeWidth={2}
              height={RECTANGLE_HEIGHT}
              width={RECTANGLE_WIDTH}
              r={12}
            />
            <Triangle
              x={width - CONTENT_PADDING - 32}
              y={CONTENT_PADDING + (RECTANGLE_HEIGHT - 32) / 2}
              strokeWidth={2}
              size={32}
            />
            <Text
              font={subTitleFont}
              text={'Show races'}
              x={width - CONTENT_PADDING - RECTANGLE_WIDTH + 8}
              y={CONTENT_PADDING + 16 + 16 + 16}
            />
          </>
        }
      />
      <Pressable
        onPress={onPressButton}
        style={{
          position: 'absolute',
          top: CONTENT_PADDING,
          bottom: CONTENT_PADDING,
          right: CONTENT_PADDING,
          left: width / 2,
        }}
      />
    </Pressable>
  );
};

type BackgroundGradientProps = {
  width: number;
  height: number;
  children?: React.ReactNode;
};

const BackgroundGradient: React.FC<BackgroundGradientProps> = React.memo(
  ({width, height, children}) => {
    const clock = useClockValue();
    const uniforms = useComputedValue(
      () => ({
        u_time: (clock.current / 10000) * 2,
        u_resolution: vec(width, height),
      }),
      [clock],
    );

    return (
      <Canvas
        style={{
          width: width,
          height: height,
        }}>
        <Group>
          <RoundedRect
            x={canvasPadding / 2}
            y={canvasPadding / 2}
            width={width - canvasPadding}
            height={height - canvasPadding}
            r={20}
          />
          <Shader source={gradientAnimShader} uniforms={uniforms} />
          <BlurMask blur={canvasPadding / 3.5} style={'solid'} />
          {children}
        </Group>
      </Canvas>
    );
  },
);

export {BackgroundGradient};

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
  },
  subTitle: {
    color: 'gray',
    fontSize: 12,
  },
  title: {
    color: 'black',
  },
});
