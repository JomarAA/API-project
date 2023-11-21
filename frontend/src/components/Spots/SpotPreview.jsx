import './SpotPreview.css'
import { useSelector } from "react-redux"

function SpotPreview(props) {
    const {id} = props;
    const spot = Object.values(useSelector((state) => state.spots[id]));

    console.log('%c   LOOK HERE', 'color: blue; font-size: 16px', spot)
    // console.log('%c   LOOK HERE', 'color: red; font-size: 16px', id)

    return (
        <div className="spot" title={spot.name}>
        <img src={spot.previewImage} alt={`${spot.name} preview`} />
            <div className='spot-details'>
                <h3>{spot.name}</h3>
                <span className='location'>
                    {spot.city}, {spot.state}
                </span>
                <span className='rating'>
                    <i className='fa-solid fa-star'></i>
                    {spot.avgRating !== null ? Number(spot.avgRating).toFixed(1) : "new"}
                </span>
                <span className='price'>
                    ${spot.price} per night
                </span>
                </div>
        </div>
    )
}

export default SpotPreview;
