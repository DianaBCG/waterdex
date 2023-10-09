import '../App.css'
import {useState} from 'react'
const Map = (props) => {
  const {lat, long, setLat, setLong, expand, setExpand} = props;
  const [tempLat, setTempLat] = useState(lat)
  const [tempLon, setTempLon] = useState(long)


  return (
    <div>
      <button onClick={setExpand}>Choose another location</button>
      <div style={{ display: expand ? "flex" : "none", flexDirection: 'column'}} className="inputs">
        <div>lat</div>
        <input value={tempLat} onChange={(e) => setTempLat(e.target.value)}/>
        <div>lng</div>
        <input value={tempLon} onChange={(e) => setTempLon(e.target.value)}/>
        <button
          style={{
            cursor: 'pointer',
            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(100,100,100)',
            borderRadius: '1rem'
          }}
          onClick={() => {
            setLat(tempLat);
            setLong(tempLon);
          }}
        >
            Update
        </button>
      </div>
    </div>
  )
};

export default Map