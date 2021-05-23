/**
 * Copyright (c) Salinder Sidhu and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { View } from "react-native";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import Bar from "./Bar";
import Styles from "./styles";
import {
  getScaleTextInFeet,
  getScaleTextInMeters,
  getScaleSizeInFeet,
  getScaleSizeInMeters,
  getStepFromResolution,
  getResolutionFromZoomAndLatitude,
} from "./utils";

/**
 * A customizable map scale for React Native Mapbox GL. Displays two bars
 * across the screen, one as metric (m and km) and another as Imperial (feet
 * and miles).
 */
function ScaleBar(props) {
  const {
    left,
    bottom,
    zoom,
    latitude,
    metricBarStyle,
    metricBarTextStyle,
    imperialBarStyle,
    imperialBarTextStyle,
  } = props;

  const [textMetric, setTextMetric] = useState("");
  const [textImperial, setTextImperial] = useState("");
  const [lengthMetric, setLengthMetric] = useState(0);
  const [lengthImperial, setLengthImperial] = useState(0);

  useEffect(() => {
    let resolution = getResolutionFromZoomAndLatitude(zoom, latitude);
    let step = getStepFromResolution(resolution);

    // Generate length and text for the metric bar
    setLengthMetric(getScaleSizeInMeters(step, resolution));
    setTextMetric(getScaleTextInMeters(step));
    // Generate length and text for the imperial bar
    setLengthImperial(getScaleSizeInFeet(step, resolution));
    setTextImperial(getScaleTextInFeet(step));
  }, [zoom, latitude]);

  return (
    <View
      style={{
        ...Styles.container,
        left: left,
        bottom: bottom,
      }}
    >
      <Bar
        text={textMetric}
        size={lengthMetric}
        barStyle={metricBarStyle}
        textStyle={metricBarTextStyle}
      />
      <Bar
        text={textImperial}
        size={lengthImperial}
        barStyle={imperialBarStyle}
        textStyle={imperialBarTextStyle}
      />
    </View>
  );
}

ScaleBar.defaultProps = {
  left: 10,
  bottom: 32,
  metricBarStyle: {
    ...Styles.defaultBarStyle,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.4)",
  },
  metricBarTextStyle: Styles.defaultBarTextStyle,
  imperialBarStyle: Styles.defaultBarStyle,
  imperialBarTextStyle: Styles.defaultBarTextStyle,
};

ScaleBar.propTypes = {
  /**
   * Padding with left border of the screen.
   */
  left: PropTypes.number,
  /**
   * Padding with bottom of the screen.
   */
  bottom: PropTypes.number,
  /**
   * Zoom level to adjust the scale bar.
   */
  zoom: PropTypes.number.isRequired,
  /**
   * Latitude to adjust the scale bar precision.
   */
  latitude: PropTypes.number.isRequired,
  /**
   * Styles for the metric bar.
   */
  metricBarStyle: PropTypes.object,
  /**
   * Styles for the metric bar's text.
   */
  metricBarTextStyle: PropTypes.object,
  /**
   * Styles for the imperial bar.
   */
  imperialBarStyle: PropTypes.object,
  /**
   * Styles for the imperial bar's text.
   */
  imperialBarTextStyle: PropTypes.object,
};

export default ScaleBar;
