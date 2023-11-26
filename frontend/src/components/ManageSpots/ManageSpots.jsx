import { useEffect } from "react";
import { allSpotsThunktion } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './ManageSpots.css'


function ManageUserSpots() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const spots = useSelector((state) => state.spots)
    const getAllSpots = spots.allSpots ? Object.values(spots.allSpots) : []

    useEffect(() => {
        dispatch(allSpotsThunktion());
    }, [dispatch]);

    if (!spots) {
        return null
    }

    // console.log('%c   LOOK HERE', 'color: red; font-size: 18px', user)
    // console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', getAllSpots)
    const currentUserSpots = getAllSpots.filter((spot) => parseInt(spot.ownerId) === (parseInt(user.id)))
    console.log('%c   LOOK HERE', 'color: green; font-size: 18px', currentUserSpots)


    return (
        <div id='manage-spots-container'>
            <h1>Manage Your Spots</h1>
            <div id='user-spots-container'>
                {currentUserSpots.map((spot) => (  // Ensure 'spot' is used only within this map callback
                    <NavLink to={`/spots/${spot.id}`} key={spot.id}>
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

        </div>
    )
}

export default ManageUserSpots
