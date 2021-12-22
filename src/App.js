import './App.css';
import FabricCanvas from './FabricCanvas';

function App() {
  return (
    <div className="App" >
      <FabricCanvas/>
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
*/

export default App;