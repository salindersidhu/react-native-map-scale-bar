/**
 * Copyright (c) Salinder Sidhu and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { StyleSheet } from "react-native";

/**
 * Styles for ScaleBar.
 */
const Styles = StyleSheet.create({
  /**
   * Style of ScaleBar container.
   */
  container: {
    position: "absolute",
  },
  /**
   * Default style used for the ScaleBar.
   */
  defaultBarStyle: {
    borderWidth: 1,
    borderStyle: "solid",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "rgba(0, 0, 0, 1)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  /**
   * Default style used for the ScaleBar's text.
   */
  defaultBarTextStyle: {
    fontSize: 10,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    color: "rgba(0, 0, 0, 1)",
  },
});
export default Styles;
