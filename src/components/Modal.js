import '../App.css'
import { useState, useEffect} from 'react'
import axios from 'axios'

function Modal(props) {
  const {onClose, specie} = props;
  const [cares, setCares] = useState()

  const fetchSpecieInfo = async (name) => {
    try {
      const res = await axios(
        `http://waterdex.eu-central-1.elasticbeanstalk.com/species/${name}`
      );
      setCares(res.data.info)
  } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchSpecieInfo(specie.scientificName)
  }, [specie.scientificName])

  console.log(specie, "SPECIE")
  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modal-header">
          <div className="header-text">{specie?.name}</div>
          <div className="close-button" onClick={onClose}>X</div>
        </div>
        <div className="modal-body">
          <p className="name-left">Scientific Name:</p>
          <p className="name-right">{specie?.scientificName}</p>
          <p className="name-left">Endangered score:</p>
          <p className="name-right">{specie?.score}</p>
          <p className="specie-info">{cares ? cares : 'Loading...'}</p>
        </div>
      </div>
    </div>
  )
}

export default Modal;