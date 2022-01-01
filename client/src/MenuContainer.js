import './FabricCanvas.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';

const save = (root) => {
    axios
        .post("http://localhost:5000/record/add", root)
        .then((res) => console.log(res.data))

}

export const MenuContainer = ({root}) => {
    return(
        <div className="menuContainer canvasContainer">
            <div className="menuHolder">
                <button className="button"><FontAwesomeIcon icon={faPencilAlt} style={{height: 25, width: 25}}/></button>
                <button className="button" onClick={() => {save(root)}}><FontAwesomeIcon icon={faSave} style={{height: 25, width: 25}}/></button>
                <button className="button"><FontAwesomeIcon icon={faPencilAlt} style={{height: 25, width: 25}}/></button>
                <button className="button"><FontAwesomeIcon icon={faPencilAlt} style={{height: 25, width: 25}}/></button>
                <button className="button"><FontAwesomeIcon icon={faPencilAlt} style={{height: 25, width: 25}}/></button>
            </div>
        </div>
    )
}