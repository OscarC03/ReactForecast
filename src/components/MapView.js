import '../components/css/Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function MapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
}

export default MapView;