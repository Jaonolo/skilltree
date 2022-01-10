import { canvasInitialize } from './canvasInitialize';
import { useEffect } from 'react';
import { fabric } from 'fabric'
import { myNode } from  './myNode.js'
import FabricCanvas from './FabricCanvas';
import './App.css';

function App() {
  const nc = new fabric.Canvas();
  const root = new myNode(0, 0);

  useEffect(() => {
    canvasInitialize(nc, root);
  })

  return (
    <div className="App">
      <FabricCanvas nc={nc} root={root}/>
    </div>
  );
}

/* things that need to change:
  unclickable path, that would be pretty nice

  less page refresh?
  elevating the state
  better way to store
  color to _uid
  available space analyze
  text bug

  OWN MENU VS MUI MENU

  LEARN MORE ABOUT DOCKER, rewatch video??
*/

export default App;