/**
 * Copyright (c) Salinder Sidhu and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import Styles from "./styles";

/**
 * A customizable Bar with text used to draw the ScaleBar.
 */
function Bar(props) {
  const { text, size, barStyle, textStyle } = props;

  return (
    <View style={{ ...Styles.container, width: size }}>
      <View style={barStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
}

Bar.propTypes = {
  /**
   * Size of the bar.
   */
  size: PropTypes.number.isRequired,
  /**
   * Text inside the bar.
   */
  text: PropTypes.string.isRequired,
  /**
   * Style for the Bar.
   */
  barStyle: PropTypes.object.isRequired,
  /**
   * Style for the Bar's text.
   */
  textStyle: PropTypes.object.isRequired,
};

export default Bar;
