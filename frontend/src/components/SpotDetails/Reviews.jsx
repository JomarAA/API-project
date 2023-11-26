import { useSelector, useDispatch } from "react-redux";
import { getSpotReviews } from "../../store/reviews";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";


const Reviews = ({ spotId }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    const { setModalContent } = useModal();
    const spot = useSelector((state) => state.spots.oneSpot);

    const reviews = useSelector((state) => state.reviews.spot || [])

    useEffect(() => {
        dispatch(getSpotReviews(spotId));
    }, [dispatch, spotId]);

    const loggedInUser = !!user;

    const ownerCheck = user && user.id === spot.Owner.id


    const reviewsArray = Object.values(reviews);

    const userHasReviewed = reviewsArray.map((review) => review.userId).includes(user?.id)

    // console.log("%c   LOOK HERE", "color: purple; font-size: 18px", reviewsArray);

    const handleWriteReviewClick = () => {
        setModalContent(<ReviewFormModal spotId={spotId} closeModal={() => setModalContent(null)} />);
    };


    return (

        <div className="reviews-container" >
            <div className="review-info">
                <div className="rating">
                    <i className="fa-solid fa-star"></i>
                    {parseFloat(spot.avgRating).toFixed(1)}
                    <div className="num-reviews">{spot.numReviews} reviews</div>
                </div>
                {loggedInUser && !ownerCheck && !userHasReviewed && (
                    <button onClick={handleWriteReviewClick} id="review-button">
                        Write a Review
                    </button>
                )}
                <div className="review-list">
                    {reviewsArray.map((review) => (
                        <div key={review.id} className="review-item">
                            <b className="review-user">{review.User.firstName} </b>
                            <p className="review-date">
                                {new Date(review.createdAt).toLocaleDateString(undefined, {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                            <p className="review-text">{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Reviews
