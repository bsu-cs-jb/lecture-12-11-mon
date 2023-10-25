import * as React from "react";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import styles from "./styles";
import { useScale } from "./ScaleContext";

const RENDER_HIGHLIGHT = false;

interface CustomStyleTextProps extends TextProps {
  customStyle?: StyleProp<TextStyle>;
}

export function CustomStyleText({
  children,
  customStyle,
  style,
  ...props
}: CustomStyleTextProps) {
  const { scaleStyle } = useScale();
  const computedStyle = [scaleStyle(customStyle), scaleStyle(style)];
  if (RENDER_HIGHLIGHT) {
    return (
      <RenderHighlightText style={computedStyle} {...props}>
        {children}
      </RenderHighlightText>
    );
  } else {
    return (
      <Text style={computedStyle} {...props}>
        {children}
      </Text>
    );
  }
}

export function LabelText(props: TextProps) {
  return CustomStyleText({
    customStyle: styles.labelText,
    ...props,
  });
}

export function SubtitleText(props: TextProps) {
  return CustomStyleText({
    customStyle: styles.subTitleText,
    ...props,
  });
}

export function TitleText(props: TextProps) {
  return CustomStyleText({
    customStyle: styles.titleText,
    ...props,
  });
}

export function FlexFill() {
  return <View style={styles.flexFill} />;
}

export function LctHorzContainer({ children, style, ...props }: ViewProps) {
  if (RENDER_HIGHLIGHT) {
    return (
      <RenderHighlightView style={[style, styles.horzContainer]} {...props}>
        {children}
      </RenderHighlightView>
    );
  } else {
    return (
      <View style={[style, styles.horzContainer]} {...props}>
        {children}
      </View>
    );
  }
}

export function LctAvoidingView({ children, ...props }: ViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.avoidingView}
    >
      <LctView {...props}>{children}</LctView>
    </KeyboardAvoidingView>
  );
}
export function LctView({ children, style, ...props }: ViewProps) {
  if (RENDER_HIGHLIGHT) {
    return (
      <View style={style}>
        <RenderHighlightView
          style={[
            style,
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          ]}
          {...props}
        >
          {children}
        </RenderHighlightView>
      </View>
    );
  } else {
    return <View style={style}>{children}</View>;
  }
}

function useRenderHighlight(delay: number = 750) {
  const [showHighlight, setShowHighlight] = useState(true);
  const fromInterval = useRef(false);
  if (!fromInterval.current && !showHighlight) {
    setShowHighlight(true);
  }
  fromInterval.current = false;
  const highlight = showHighlight
    ? {
        borderColor: "#f00f",
        backgroundColor: "#f001",
        borderWidth: 2,
      }
    : {
        borderColor: "#0000",
        backgroundColor: "#0000",
        borderWidth: 2,
      };
  useEffect(() => {
    if (showHighlight) {
      const id = setInterval(() => {
        fromInterval.current = true;
        setShowHighlight(false);
      }, delay);
      return () => {
        clearInterval(id);
      };
    }
  });
  return highlight;
}

export function RenderHighlightView({ children, style, ...props }: ViewProps) {
  const highlight = useRenderHighlight();
  return (
    <View style={[style, highlight]} {...props}>
      {children}
    </View>
  );
}

export function RenderHighlightText({ children, style, ...props }: TextProps) {
  const highlight = useRenderHighlight();
  return (
    <Text style={[style, highlight]} {...props}>
      {children}
    </Text>
  );
}

interface BigButtonProps extends PressableProps {
  title: string;
  style?: ViewStyle;
}

export function BigButton({ title, onPress, style, ...props }: BigButtonProps) {
  const { scaleStyle } = useScale();
  return (
    <Pressable
      style={({ pressed }) => [
        style,
        scaleStyle(
          pressed ? styles.bigButtonPressed : styles.bigButtonUnpressed,
        ),
      ]}
      onPress={onPress}
      {...props}
    >
      <LabelText>{title}</LabelText>
    </Pressable>
  );
}
