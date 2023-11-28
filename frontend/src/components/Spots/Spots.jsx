import { useEffect } from "react";
import { allSpotsThunktion } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './Spots.css'

const Spots = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots)
  const getAllSpots = spots.allSpots ? Object.values(spots.allSpots) : []

  useEffect(() => {
    dispatch(allSpotsThunktion());
  }, [dispatch]);

  // console.log('%c   LOOK HERE', 'color: green; font-size: 18px', spots)
  // console.log('%c   LOOK HERE OBJ 0', 'color: purple; font-size: 18px', spots)

  return (
    <>
      <div className='spots-container'>
        {getAllSpots.map((spot) => (
          <NavLink to={`/spots/${spot.id}`} key={spot.id}>
            <div className='one-spot' key={spot.id} title={spot.name}>
              <div className='display-components'>
                <img id='spot-img' src={spot.previewImage} alt='Spot preview' />
              </div>
              <div className="spot-info">
                <div className="spot-details">
                  <p className="city">
                    {spot.city}, {spot.state}
                  </p>
                  <p className="price">
                    ${spot.price} night
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
          </NavLink>
        ))}
      </div>
    </>
  );
}


export default Spots;
