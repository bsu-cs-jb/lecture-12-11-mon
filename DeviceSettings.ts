import { Dimensions, PixelRatio, Platform } from "react-native";

const SCREEN_PPI = 72;

const DIMENSIONS = {
  iPhone12: {
    height: 2532,
    width: 1170,
    ppi: 460,
  },
};

const emulate = DIMENSIONS.iPhone12;
const TARGET_DIMS = {
  width: 432,
  ratio: 2.05,
};

const screenDims = Dimensions.get("screen");

const pixelRatioScaled = {
  width: PixelRatio.getPixelSizeForLayoutSize(TARGET_DIMS.width),
  height: PixelRatio.getPixelSizeForLayoutSize(
    TARGET_DIMS.width * TARGET_DIMS.ratio,
  ),
};

export const dims = {
  ...(Platform.OS === "web"
    ? {
        width: TARGET_DIMS.width,
        height: TARGET_DIMS.width * TARGET_DIMS.ratio,
      }
    : {
        width: screenDims.width,
        height: screenDims.height,
      }),
  outerBorderRadius: 60,
  innerBorderRadius: 44,
  innerMargin: 20,
};
