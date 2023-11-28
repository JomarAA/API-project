import { useSelector, useDispatch } from "react-redux";
import { getSpotReviews } from "../../store/reviews";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";


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


    const unfilteredReviews = Object.values(reviews);

    const reviewsArray = [...unfilteredReviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const userHasReviewed = reviewsArray.map((review) => review.userId).includes(user?.id)

    console.log("%c   LOOK HERE", "color: purple; font-size: 18px", reviewsArray);

    const reviewAvg = (reviewsArray) => {
        let sum = 0
        for (let review of reviewsArray) {
            sum += review.stars
        }
        return sum / reviewsArray.length
    }

    const averageRating = reviewAvg(reviewsArray)

    const handleWriteReviewClick = () => {
        setModalContent(<ReviewFormModal spotId={spotId} closeModal={() => setModalContent(null)} />);
    };

    const handleDeleteReviewClick = (reviewId) => {
        setModalContent(<DeleteReviewModal reviewId={reviewId} />)
    }

    return (
        <div className="reviews-container">
            <div className="review-info">
                <div className="rating">
                    {reviewsArray.length > 0 ? (
                        <>
                            <i className="fa-solid fa-star"></i>
                            {parseFloat(averageRating).toFixed(1)}
                            <span className="dot">&#183;</span>
                            <div className="num-reviews">
                                {reviewsArray.length} {reviewsArray.length === 1 ? 'review' : 'reviews'}
                            </div>
                        </>
                    ) : (
                        <div className="num-reviews"><i className="fa-solid fa-star"></i> New</div>
                    )}
                </div>
                {loggedInUser && !ownerCheck && !userHasReviewed && (
                    <button onClick={handleWriteReviewClick} id="review-button">
                        Write a Review
                    </button>
                )}
            </div>
            {reviewsArray.length === 0 && loggedInUser && !ownerCheck ? (
                <div className="no-reviews-message">
                    Be the first to post a review!
                </div>
            ) : (
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
                            {user?.id === review.userId && (
                                <button onClick={() => handleDeleteReviewClick(review.id)} className="delete-review-button">
                                    Delete Review
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews
