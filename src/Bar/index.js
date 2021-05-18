import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import Styles from "./styles";

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
  size: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  barStyle: PropTypes.object.isRequired,
  textStyle: PropTypes.object.isRequired,
};

export default Bar;
