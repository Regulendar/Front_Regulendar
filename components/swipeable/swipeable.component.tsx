import { memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import RNGHSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { SharedValue } from 'react-native-reanimated';

export type IRenderActionsProps = {
  drag: SharedValue<number>;
  onClose?: () => void;
};

type ISwipeableProps = {
  swipeDirections: 'left' | 'right' | 'both';
  hasOvershoot: boolean;
  renderLeftActions?: ({ drag, onClose }: IRenderActionsProps) => ReactNode;
  renderRightActions?: ({ drag, onClose }: IRenderActionsProps) => ReactNode;
  leftActionsWidth?: number;
  rightActionsWidth?: number;
  containerStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
};

export const Swipeable = memo<ISwipeableProps>(
  ({
    swipeDirections,
    hasOvershoot = false,
    renderLeftActions,
    renderRightActions,
    leftActionsWidth,
    rightActionsWidth,
    containerStyle,
    children,
  }) => {
    const { hasLeftSwipe, hasRightSwipe } = useMemo(() => {
      const hasLeftSwipe = swipeDirections === 'left' || swipeDirections === 'both';
      const hasRightSwipe = swipeDirections === 'right' || swipeDirections === 'both';

      return { hasLeftSwipe, hasRightSwipe };
    }, [swipeDirections]);

    const swipeableRef = useRef<SwipeableMethods>(null);
    const handleCloseSwipeable = useCallback(() => {
      const swipeableRefCurrent = swipeableRef.current;
      if (!swipeableRefCurrent) {
        return;
      }
      swipeableRefCurrent.close();
    }, []);

    return (
      <RNGHSwipeable
        ref={swipeableRef}
        containerStyle={[{ width: '100%', height: 'auto' }, containerStyle]}
        overshootLeft={hasOvershoot}
        overshootRight={hasOvershoot}
        leftThreshold={hasLeftSwipe ? leftActionsWidth : 0}
        rightThreshold={hasRightSwipe ? rightActionsWidth : 0}
        renderLeftActions={(_, drag) => {
          const hasLeftRender = !renderLeftActions;
          const hasLeftActions = hasLeftSwipe && !hasLeftRender;
          if (!hasLeftActions) return;
          return renderLeftActions({ drag, onClose: handleCloseSwipeable });
        }}
        renderRightActions={(_, drag) => {
          const hasRightRender = !renderRightActions;
          const hasRightActions = hasRightSwipe && !hasRightRender;
          if (!hasRightActions) return;
          return renderRightActions({ drag, onClose: handleCloseSwipeable });
        }}>
        {children}
      </RNGHSwipeable>
    );
  }
);
