import './waterorigin.css'
function WaterOrigin(props) {
  const { info  } = props;
  return(
    <div className="card-info">
      <img src="./axolotl.png" width={100} className="avatar"/>
      <p className="question">Did you know?</p>
      <p>{info}</p>
    </div>
  )
}

export default WaterOrigin;