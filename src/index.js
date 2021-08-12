import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { DATA_URL } from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

require('d3-request').csv(DATA_URL, (error, response) => {
  if (!error) {
    const data = response.map(d => [Number(d.lng), Number(d.lat)]);
    ReactDOM.render(<App data={data} />, root);
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
