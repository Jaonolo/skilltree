import { useEffect } from 'react';
import { fabric } from 'fabric'
import { myNode } from  './myNode.js'
import FabricCanvas from './FabricCanvas';
import './App.css';

function App() {
  var nc = new fabric.Canvas();
  const root = new myNode(0, 0);

  useEffect(() => {
    nc.initialize('canvas')
        nc.set({
            hoverCursor: 'select',
            backgroundColor: '#bbb'
        })
        fabric.Object.prototype.originX = 'center';
        fabric.Object.prototype.originY = 'center';

        nc.add(root.text, root.circle);
        nc.centerObject(root.circle);
        root.circle.setCoords();
        root.text.set({
            top: root.circle.getCenterPoint().y,
            left: root.circle.getCenterPoint().x
        });
        root.text.setCoords();
  })

  return (
    <div className="App" >
      <FabricCanvas nc={nc} root={root}/>
    </div>
  );
}

/* things that need to change:
    available space analyze
    check renderAll (and other things) efficiency
    check node limit (currently depth 6, quantity infinity? (react???))
    disable group select
    pan (zoom?)
    unclickable path, that would be pretty nice

    OWN MENU VS MUI MENU

    LEARN MORE ABOUT DOCKER, rewatch video??
*/

export default App;