import React, { useState, useRef, useEffect } from 'react';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';
import './App.css';

export const DATA_URL = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';

const App = ({ data }) => {

  const [subLayer, setSubLayer] = useState();
  const [binData, setBinData] = useState();
  const interval = useRef();

  const layers = ([
    new HexagonLayer({
      id: 'heatmap',
      data,
      elevationRange: [0, 3000],
      elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      getPosition: d => d,
      radius: 1000,
      upperPercentile: 100
    })
  ]);

  const getSubLayer = () => {
    const sl = layers[0].getSubLayers()[0];
    if (sl) setSubLayer(sl);
  };

  useEffect(() => {
    interval.current = setInterval(getSubLayer, 100);
    return () => clearInterval(interval.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (subLayer) {
      setBinData(subLayer.props.data.map(bin => ({ points: bin.points.map(pt => pt.source), position: bin.position })));
    }
  }, [subLayer]);

  useEffect(() => {
    if (binData && binData.length) {
      console.log(binData);
      clearInterval(interval.current);
    }
  }, [binData]);

  return (
    <div className='app'>
      <DeckGL
        layers={layers}
        initialViewState={{}}
      />
    </div>
  );
}

export default App;

// PASTE THE CODE BELOW INTO CESIUM SANDCASTLE: https://sandcastle.cesium.com/
// OR, CLICK THIS LINK: https://sandcastle.cesium.com/#c=jVPvT9swEP1XTv3SdGRuQltGS6k20YpO6tSJIaaJImSSa2Lh2JXtQMPE/77LjwIr+7AvSXx3793l3XOklXXwIPARDZyCwkc4QyvyjF1VMa8dVcczrRwXCk27c7JSKxVVuAQpwh3OccsTrYjAi1A5ND4YHovcduB0Ar9XCqCOU0VDf8aNoy+uemxtdDbFxCBajzFWV5ZtCFWPh8YJmoPQ1zdVfK0NeBIdCIoFJ/QawxG9Dg46dbsddEv5mpBt4aCZCj7AN+5SFmnrNeNU5+9fb5dXs4vby/nFbEZFoh5ix1W8chXvuKxQ/8e1+xm2yW3qvRH8VRFv60Ph73o9dWroc/kw6HKjXkgo8fxmHzREIrE3pX3ciXId9WIZEQknqCePY6/SR/EMR9D+0kCgN4UGpNfgUgSe0EIS2m0MMXccyiVViRije5ZIoJVnG4ltv6TbaFmQAUY78VNBvjBRWoz2PeJdfwxYODweBP3B0aB/dDg8Do77PgxCNgjCT4fhcNjrhf3h4Y0PYRAEHb9mxK0zeYzxHEWSuhH0eyRqWdDkM2phBJejFzm11Ib9mi0Wy59Njc6dJA+PgKjw71hVvYc9Xy6mlfBU+lzbvtHzSevsUnt76nZOWn5rbF0hcVKTA3wW2UYbB7mR5O2uQ9KMJrXduzy6R8cia3fGGHffQsexeAARn65aexdw1YJIcmsps86l/CGecNWajLtU/w4qNXlUJUuyi+RFWZaGk0UdpJs27tLx30intbzjZo/5Dw

// const viewer = new Cesium.Viewer('cesiumContainer');

// const generateHexagon = (center, radius) => {
//   center = Cesium.Cartesian3.fromDegrees(...center);
//   const vertices = [];
//   for (let i = 0; i < 6; i++) {
//     const x = center.x + radius * Math.cos(Cesium.Math.PI_OVER_THREE * i);
//     const y = center.y + radius * Math.sin(Cesium.Math.PI_OVER_THREE * i);
//     vertices.push(new Cesium.Cartesian3(x, y, center.z));
//   }
//   return vertices;
// };

// const single3DHexbin = viewer.entities.add({
//   name: 'A single 3D Hexbin of the aggregated data from the deck.gl example',
//   polygon: {
//     hierarchy: generateHexagon([-0.19850456546298084, 51.50172199331492], 1000),
//     extrudedHeight: 43 * 1000,
//     material: Cesium.Color.YELLOW,
//     outline: true,
//     outlineColor: Cesium.Color.GOLD
//   },
// });

// viewer.zoomTo(viewer.entities);
