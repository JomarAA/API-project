import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import SpotPreview from "./SpotPreview";

function Spots() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const spotsObj = Object.values(useSelector((state) => state.spots));

    const spots = useSelector((state) => state.spots)

//   console.log('%c   LOOK HERE', 'color: green; font-size: 18px', spots)
  console.log('%c   LOOK HERE OBJ', 'color: purple; font-size: 18px', spotsObj)

  return (
    <section className='spots-container'>
    {spotsObj.map((spot) => (
      // Removed NavLink and replaced with a div element
      <div className='one-spot' key={spot.id}>
        <div className='display-components'>
          <img id='spot-img' src={spot.previewImage} alt='Spot preview' />
          <span className="display-text">{spot.name}</span>
        </div>
        <div className="spot-info">
          <div className="spot-details">
            <p className="city">
              {spot.city}, {spot.state}
            </p>
            <p className="price">
              ${spot.price} per night
            </p>
          </div>
          <div className="rating-info">
            {spot.avgRating ? (
              <div className="review">
                <b>
                  <i className="fa-solid fa-star"></i>
                  {parseFloat(spot.avgRating).toFixed(1)}
                </b>
              </div>
            ) : (
              <div className="review">
                <b>New</b>
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
   </section>
  );
}


export default Spots;
