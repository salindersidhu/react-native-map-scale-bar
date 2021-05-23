/**
 * Copyright (c) Salinder Sidhu and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Number of feet per mile.
 */
export const FEET_PER_MILES = 5280;

/**
 * Number of feet per meter.
 */
export const FEET_PER_METER = 3.28084;

/**
 * Ratio of the max scale draw width to the screen width.
 */
export const SCALE_SCREEN_RATIO = 0.45;

/**
 * Tile size in meters at 0 zoom level.
 */
export const TILE_SIZE_METERS_AT_0_ZOOM = 156543.03;

/**
 * Scale steps in feet.
 */
export const SCALE_STEPS_IN_FEET = [
  10,
  20,
  50,
  100,
  200,
  500,
  1000,
  0.5 * FEET_PER_MILES,
  1 * FEET_PER_MILES,
  2 * FEET_PER_MILES,
  5 * FEET_PER_MILES,
  10 * FEET_PER_MILES,
  20 * FEET_PER_MILES,
  50 * FEET_PER_MILES,
  100 * FEET_PER_MILES,
  200 * FEET_PER_MILES,
  500 * FEET_PER_MILES,
  1000 * FEET_PER_MILES,
  2000 * FEET_PER_MILES,
];

/**
 * Scale steps in meters.
 */
export const SCALE_STEPS_IN_METERS = [
  5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000,
  200000, 500000, 1000000, 2000000, 5000000,
];
