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
