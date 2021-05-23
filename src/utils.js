/**
 * Copyright (c) Salinder Sidhu and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import R from "ramda";
import { Dimensions } from "react-native";

import {
  FEET_PER_METER,
  FEET_PER_MILES,
  SCALE_SCREEN_RATIO,
  SCALE_STEPS_IN_FEET,
  SCALE_STEPS_IN_METERS,
  TILE_SIZE_METERS_AT_0_ZOOM,
} from "./constants";

/**
 * Return curried version of trimToDigits.
 */
const trimToDigits = R.curry(
  /**
   * Trim a number to a specific number of digits.
   *
   * @param {number} digits - Length of digits to trim.
   * @param {number} number - A number to trim.
   * @returns {number} - A number trimed to the specified length of digits.
   */
  (digits, number) => +Number(number).toFixed(digits)
);

// /**
//  * Trim a number to 7 digits.
//  *
//  * @param {number} number - A number to trim.
//  * @returns {number} - A number trimed to 7 digits.
//  */
// const trimTo7digits = trimCurry(7);

/**
 * Return the size of the scale using the scale step and resolution in imperial units.
 *
 * @public
 * @param {number} step - The scale step.
 * @param {number} resolution - The scale resolution.
 * @returns {number} The size of the scale in imperial units.
 */
const getScaleSizeInFeet = (step, resolution) =>
  trimToDigits(
    7,
    (2 * SCALE_STEPS_IN_FEET[step]) / resolution / FEET_PER_METER
  );

/**
 * Return the size of the scale using the scale step and resolution in metric
 * units.
 *
 * @public
 * @param {number} step - The scale step.
 * @param {number} resolution - The scale resolution.
 * @returns {number} The size of the scale in metric units.
 */
const getScaleSizeInMeters = (step, resolution) =>
  trimToDigits(7, (2 * SCALE_STEPS_IN_METERS[step]) / resolution);

/**
 * Return the scale resolution using the current zoom and latitude from the map.
 *
 * @public
 * @param {number} zoom - The zoom level from the map.
 * @param {number} latitude - The latitude from the map.
 * @returns {number} The scale resolution.
 */
const getResolutionFromZoomAndLatitude = (zoom, latitude) =>
  (TILE_SIZE_METERS_AT_0_ZOOM * Math.cos((latitude * Math.PI) / 180)) /
  Math.pow(2, zoom);

/**
 * Return the scale resolution from the scale step.
 *
 * @public
 * @param {number} resolution - The scale resolution.
 * @returns {number} The scale step.
 */
const getStepFromResolution = (resolution) => {
  let bestStep = getBestStepFromResolution(resolution);
  return SCALE_STEPS_IN_METERS.reduce(bestStep, 0);
};

/**
 * Return the text corresponding to the length of the scale step in imperial
 * units.
 *
 * @public
 * @param {number} step - The scale step.
 * @returns {string} The length of the scale in imperial units.
 */
const getScaleTextInFeet = (step) => {
  let lengthImperial = SCALE_STEPS_IN_FEET[step];
  return lengthImperial >= 0.5 * FEET_PER_MILES
    ? `${lengthImperial / FEET_PER_MILES} mi`
    : `${lengthImperial} ft`;
};

/**
 * Return the text corresponding to the length of the scale step in metric
 * units.
 *
 * @public
 * @param {number} step - The scale step.
 * @returns {string} The length of the scale step in metric units.
 */
const getScaleTextInMeters = (step) => {
  let lengthMetric = SCALE_STEPS_IN_METERS[step];
  return lengthMetric >= 1000
    ? `${lengthMetric / 1000} km`
    : `${lengthMetric} m`;
};

/**
 * Return curried version of getBestStepFromResolution.
 */
const getBestStepFromResolution = R.curry(
  /**
   * Compute the best scale step based on the resolution.
   *
   * @param {number} resolution - The scale resolution.
   * @param {number} bestScaleStep - The best scale step.
   * @param {number} currentStep - The current scale step.
   * @returns {number} The best scale step.
   */
  (resolution, bestScaleStep, _, currentStep) => {
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
