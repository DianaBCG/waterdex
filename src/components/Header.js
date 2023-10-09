import './header.css';

function Header(props) {
  const {location, city} = props;
  return (
    <div className="flex w-full content-between h-20 lg:h-40 bg-gradient-to-r from-indigo-500 to-blue-500 header">
      <div className="loc-cont">
        <div className="location">{location},</div>
        <div className="city">{city}</div>
      </div>
      <img src="./H2Owo.svg" className="justify-self-end" />
    </div>
  )
}

export default Header;