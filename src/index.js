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

    setTextMetric(getScaleTextInMeters(step));
    setTextImperial(getScaleTextInFeet(step));
    setLengthMetric(getScaleSizeInMeters(step, resolution));
    setLengthImperial(getScaleSizeInFeet(step, resolution));
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
  left: PropTypes.number,
  bottom: PropTypes.number,
  zoom: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  metricBarStyle: PropTypes.object,
  metricBarTextStyle: PropTypes.object,
  imperialBarStyle: PropTypes.object,
  imperialBarTextStyle: PropTypes.object,
};

export default ScaleBar;
