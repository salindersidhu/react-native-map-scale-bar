import R from "ramda";
import { Dimensions } from "react-native";

import {
  FEET_PER_METER,
  SCALE_TEXT_IN_FEET,
  SCALE_TEXT_IN_METERS,
  SCALE_STEPS_IN_FEET,
  SCALE_STEPS_IN_METERS,
  SCALE_SCREEN_RATIO,
  TILE_SIZE_METERS_AT_0_ZOOM,
} from "./constants";

const trimCurry = R.curry((digits, number) => +Number(number).toFixed(digits));

const trimTo7digits = trimCurry(7);

const getScaleTextInFeet = (step) => SCALE_TEXT_IN_FEET[step];

const getScaleTextInMeters = (step) => SCALE_TEXT_IN_METERS[step];

const getScaleSizeInFeet = (step, resolution) =>
  trimTo7digits((2 * SCALE_STEPS_IN_FEET[step]) / resolution / FEET_PER_METER);

const getScaleSizeInMeters = (step, resolution) =>
  trimTo7digits((2 * SCALE_STEPS_IN_METERS[step]) / resolution);

const getStepFromResolution = (resolution) => {
  let bestStep = getBestStepFromResolution(resolution);
  return SCALE_STEPS_IN_METERS.reduce(bestStep, 0);
};

const getResolutionFromZoomAndLatitude = (zoom, latitude) =>
  (TILE_SIZE_METERS_AT_0_ZOOM * Math.cos((latitude * Math.PI) / 180)) /
  Math.pow(2, zoom);

const getBestStepFromResolution = R.curry(
  (resolution, bestScaleStep, scale, currentStep) => {
    return getScaleSizeInMeters(currentStep, resolution) /
      Dimensions.get("window").width <
      SCALE_SCREEN_RATIO
      ? currentStep
      : bestScaleStep;
  }
);

export {
  getScaleTextInFeet,
  getScaleTextInMeters,
  getScaleSizeInFeet,
  getScaleSizeInMeters,
  getStepFromResolution,
  getResolutionFromZoomAndLatitude,
};
