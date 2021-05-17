# react-native-map-scale-bar

A customizable map scale bar for React Native Mapbox GL.

## Installation

```bash
npm install --save react-native-map-scale-bar
```

## Usage

1. Import the scale bar. Install and import lodash, safe area context and other react functions.

```javascript
import _ from "lodash";
import { useState, useRef } from "react";
import ScaleBar from "react-native-map-scale-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
```

2. Create state variables to hold MapView's center and zoom properties.

```javascript
const [zoom, setZoom] = useState();
const [center, setCenter] = useState();
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
<Mapbox.MapView
  ref={map}
  onRegionDidchange={handleMapChange}
  onRegionIsChanging={handleMapChange}
  OnRegionWillChange={_.debounce(handleMapChange, 200)}
/>
```

6. Add the scale bar component as a child of Mapbox's MapView component.

```javascript
<ScaleBar zoom={zoom} latitude={center[1]}>
```

## Credits

Original model based on code from [ScaleBar](https://github.com/felixgourdeau/ScaleBar).

## Contributing

Looking to contribute additional features, updates or bug fixes? Please see our [contributing guide](/CONTRIBUTING.md) for more info.
