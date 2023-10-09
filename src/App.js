import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './components/Modal';
import Header from './components/Header';
import EndangeredSpecies from './components/EndangeredSpecies';
import WaterOrigin from './components/WaterOrigin';
import WaterQuality from './components/WaterQuality';
import Map from './components/Map';

function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [location, setLocation] = useState()
  const [city, setCity] = useState()
  const [waterOrigin, setWaterOrigin] = useState()
  const [endangeredSpecies, setEndangeredSpecies] = useState();
  const [species, setSpecies] = useState();
  const [quality, setQuality] = useState();
  const [qualityInfo, setQualityInfo] = useState();
  const [currentSpecie, setCurrentSpecie] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [displayInput, setDisplayInput] = useState(false)

  const fetchLocation = async (lat, long) => {
    try {
      const res = await axios(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=true&key=AIzaSyCL0W0fL_anMWVoNzmkp22n5CetXd-my_U`
      );
      setLocation(res?.data?.results[0]?.address_components[2].long_name)
      setCity(res?.data?.results[0]?.address_components[3].long_name);
  } catch (err) {
      console.error(err);
    }
  }

  const fetchWaterOrigin = async (lat, long) => {
    try {
      const res = await axios(
        `http://waterdex.eu-central-1.elasticbeanstalk.com/info/flow?lat=${lat}&long=${long}`
      );
      setWaterOrigin(res.data.info)
  } catch (err) {
      console.error(err);
    }
  }

  const fetchSpecies= async (lat, long) => {
    try {
      const res = await axios(
        `http://waterdex.eu-central-1.elasticbeanstalk.com/species?lat=${lat}&long=${long}`
      );
      console.log(res, 'RESPONSE')
      setEndangeredSpecies(res.data.endangeredSpecies)
      setSpecies(res.data.species)
      return res.data.info;
  } catch (err) {
      console.error(err);
    }
  }

  const fetchQuality= async (lat, long) => {
    try {
      const res = await axios(
        `http://waterdex.eu-central-1.elasticbeanstalk.com/info?lat=${lat}&long=${long}`
      );
      console.log(res, 'RESPONSE')
      setQuality(res.data.WaterQuality.color)
      setQuality(res.data.WaterQuality.xml)
      return res.data.info;
  } catch (err) {
      console.error(err);
    }
  }
  console.log(location, '<------ LOCATION')

  function success(position) {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude);
    console.log(latitude, longitude)
    // const location = fetchLocation(latitude, longitude);
    // console.log(location)
  }

  function error() {
    console.log('error');
  }

  function onChangeLat(newLat) {
    setLatitude(newLat)
  }

  function onChangeLng(newLong) {
    setLongitude(newLong)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [])

  useEffect(() => {
    const etwas= fetchWaterOrigin(latitude, longitude).then((data) => data);
    console.log(etwas)
  }, [longitude, latitude])

  useEffect(() => {
    const etwas= fetchSpecies(latitude, longitude).then((data) => data);
    console.log(etwas)
  }, [longitude, latitude])

   useEffect(() => {
    const etwas= fetchQuality(latitude, longitude).then((data) => data);
    console.log(etwas)
  }, [longitude, latitude])

  useEffect(() => {
    if (longitude && latitude) {
      const location = fetchLocation(latitude, longitude).then((data) => data);
      console.log(location, location?.results)
    }
  }, [longitude, latitude])

  console.log(waterOrigin, 'WATER ORIGIN')
  
  return (
    <div className="w-full App">
      <Header
        location={location|| null}
        city={city || null}
      />
      <Map
        lat={latitude}
        long={longitude}
        setLat={(e) => onChangeLat(e)}
        setLong={(e) => onChangeLng(e)}
        expand={displayInput}
        setExpand={() => setDisplayInput(!displayInput)}
      />
      {qualityInfo && (<WaterQuality
        info={qualityInfo}
        color={quality}
      />)}
      {species && (<EndangeredSpecies
        speciesList={species}
        openModal={() =>setOpenModal(true)}
        setSpecie={(e) => setCurrentSpecie(e)}
      />)}
      {endangeredSpecies && (<EndangeredSpecies
        openModal={() =>setOpenModal(true)}
        speciesList={endangeredSpecies}
        setSpecie={(e) => setCurrentSpecie(e)}
        endangered
      />)}
      {waterOrigin&&(<WaterOrigin info={waterOrigin} />)}
      {openModal && (
        <Modal
          specie={currentSpecie}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}

export default App;
