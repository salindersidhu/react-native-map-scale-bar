# react-native-map-scale-bar

A customizable map scale bar for React Native Mapbox GL.

![image](https://user-images.githubusercontent.com/12175684/118427794-0893f600-b69c-11eb-92e3-bc50c41d04f7.png)

## Installation

```bash
npm install --save react-native-map-scale-bar
```

## Usage

1. Import the scale bar from the package.

```javascript
import ScaleBar from "react-native-map-scale-bar";
```

2. Create states to hold MapView's center and zoom properties.

```javascript
const [zoom, setZoom] = useState(0);
const [center, setCenter] = useState([0, 0]);
```

3. Create a reference to be used on MapBox's MapView component.

```javascript
const map = useRef();
```

4. Create handler function to capture Mapbox MapView's center and zoom properties.

```javascript
const handleMapChange = async () => {
  setZoom(await map.current.getZoom());
  setCenter(await map.current.getCenter());
};
```

5. Assign the reference and handler function to Mapbox's MapView component.

```javascript
<MapboxGL.MapView
  ref={map}
  onRegionDidchange={handleMapChange}
  onRegionIsChanging={handleMapChange}
  OnRegionWillChange={_.debounce(handleMapChange, 200)}
/>
```

6. Add the scale bar component after the Mapbox's MapView component.

```javascript
<ScaleBar zoom={zoom} latitude={center[1]}>
```

## Props

| Prop                 | Required |   Type   |                                                                                                  Default                                                                                                   | Description                                 |
| :------------------- | :------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------ |
| zoom                 |   yes    | `number` |                                                                                                     -                                                                                                      | Zoom level to adjust the scale bar.         |
| latitude             |   yes    | `number` |                                                                                                     -                                                                                                      | Latitude to adjust the scale bar precision. |
| left                 |    no    | `number` |                                                                                                     10                                                                                                     | Padding with left border of the screen.     |
| bottom               |    no    | `number` |                                                                                                     32                                                                                                     | Padding with bottom of the screen.          |
| metricBarStyle       |    no    | `object` | `{ borderWidth: 1, borderStyle: "solid", borderTopWidth: 0, borderBottomWidth: 1, borderColor: "rgba(0, 0, 0, 1)", borderBottomColor: "rgba(0, 0, 0, 0.4)", backgroundColor: "rgba(255, 255, 255, 0.5)" }` | Styles for the metric bar.                  |
| metricBarTextStyle   |    no    | `object` |                                                       `{ fontSize: 10, paddingTop: 5, paddingLeft: 5, paddingBottom: 5, color: "rgba(0, 0, 0, 1)"}`                                                        | Styles for the metric bar's text.           |
| imperialBarStyle     |    no    | `object` |                      `{ borderWidth: 1, borderStyle: "solid", borderTopWidth: 0, borderBottomWidth: 0, borderColor: "rgba(0, 0, 0, 1)", backgroundColor: "rgba(255, 255, 255, 0.5)"}`                      | Styles for the imperial bar.                |
| imperialBarTextStyle |    no    | `object` |                                                       `{ fontSize: 10, paddingTop: 5, paddingLeft: 5, paddingBottom: 5, color: "rgba(0, 0, 0, 1)"}`                                                        | Styles for the imperial bar's text.         |

## Example

![Animation](https://user-images.githubusercontent.com/12175684/118429275-53633d00-b69f-11eb-8de2-b4076bc308de.gif)

```javascript
import _ from "lodash";
import React from "react";
import { StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import ScaleBar from "react-native-map-scale-bar";
import MapboxGL from "@react-native-mapbox-gl/maps";

const Styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

const MAPBOX_API_KEY = "...";

function App() {
  const map = useRef();

  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState([0, 48]);

  useEffect(() => {
    MapboxGL.setAccessToken(MAPBOX_API_KEY);
    MapboxGL.setTelemetryEnabled(false);
    handleMapChange();
  }, []);

  const handleMapChange = async () => {
    setZoom(await map.current.getZoom());
    setCenter(await map.current.getCenter());
  };

  return (
    <>
      <MapboxGL.MapView
        ref={map}
        style={Styles.map}
        onRegionDidchange={handleMapChange}
        onRegionIsChanging={handleMapChange}
        OnRegionWillChange={_.debounce(handleMapChange, 200)}
      />
      <ScaleBar zoom={zoom} latitude={center[1]} />
    </>
  );
}

export default App;
```

## Credits

Original model based on code from [ScaleBar](https://github.com/felixgourdeau/ScaleBar).

## Contributing

Looking to contribute additional features, updates or bug fixes? Please see our [contributing guide](/CONTRIBUTING.md) for more info.
