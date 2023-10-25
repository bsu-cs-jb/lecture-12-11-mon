import { createContext, useContext } from "react";

export const ScaleContext = createContext({
  scale: 1,
  scaleStyle: makeScaleFn(1),
});

export function useScale() {
  return useContext(ScaleContext);
}

const SCALE_STYLES = [
  "height",
  "width",
  "left",
  "right",
  "top",
  "bottom",
  "borderWidth",
  "borderRadius",
  "fontSize",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "margin",
  "marginHorizontal",
  "marginVertical",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "padding",
  "paddingHorizontal",
  "paddingVertical",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBottom",
  "gap",
];

export function makeScaleFn(scale: number) {
  return (
    style?: Record<string, any> | null | false,
    propsToScale?: string[],
  ) => {
    return scaleStyle(scale, style, propsToScale);
  };
}

export function scaleStyle(
  scale: number,
  style: Record<string, any> | null | undefined | false,
  propsToScale?: string[],
) {
  if (!style) {
    return style;
  }
  propsToScale = propsToScale || SCALE_STYLES;
  const scaledStyle = { ...style };
  for (const prop of propsToScale) {
    if (prop in style) {
      scaledStyle[prop] = style[prop] * scale;
    }
  }
  return scaledStyle;
}
