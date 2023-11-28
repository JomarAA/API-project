import { useEffect } from "react";
import { getCurrentUserSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './ManageSpots.css'
import DeleteSpotModal from './DeleteSpotModal.jsx'

function ManageUserSpots() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate();
    const spots = useSelector((state) => state.spots)
    const currentUserSpots = spots.currentUserSpots ? Object.values(spots.currentUserSpots) : []
    // const getAllSpots = spots.allSpots ? Object.values(spots.allSpots) : []

    useEffect(() => {
        dispatch(getCurrentUserSpots());
    }, [dispatch]);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);


    // console.log('%c   LOOK HERE', 'color: red; font-size: 18px', user)
    // console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', currentUserSpots)
    // const currentUserSpots = getAllSpots.filter((spot) => parseInt(spot.ownerId) === (parseInt(user.id)))
    // console.log('%c   LOOK HERE', 'color: green; font-size: 18px', currentUserSpots)

    return (
        <div id='manage-spots-container'>
            <h1>Manage Your Spots</h1>
            {sessionUser && (
                <NavLink exact='true' to='/spots/new' className={'create-spot-button'}>
                    Create a New Spot
                </NavLink>
            )}
            <div id='user-spots-container'>
                {currentUserSpots.map((spot) => (
                    <div className='one-spot' key={spot.id} title={spot.name}>
                        <NavLink to={`/spots/${spot.id}`}>
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
                        </NavLink>
                        <div className='manage-spots-options'>
                            <button className='manage-spot-button' onClick={() => navigate(`/spots/${spot.id}/edit`)}>
                                Update
                            </button>
                            <OpenModalButton
                                buttonText='Delete'
                                className='delete-button'
                                modalComponent={<DeleteSpotModal spotId={spot.id} />}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManageUserSpots
