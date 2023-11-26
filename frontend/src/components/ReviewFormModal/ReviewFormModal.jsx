import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewReview, getSpotReviews } from "../../store/reviews";
import * as sessionActions from '../../store/reviews'


const ReviewFormModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.oneSpot);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0)
    const user = useSelector((state) => state.session.user);

    const { closeModal } = useModal();

    const handleStarInput = (starValue) => {
        setRating(starValue)
    }

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i <= rating ? 'filled' : ''}`}
                    onClick={() => handleStarInput(i)}
                >
                    {i <= rating ? '★' : '☆'}
                </span>
            );
        }
        return stars;
    };
    console.log("%c   LOOK HERE", "color: red; font-size: 18px", user);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReview = {
            review: reviewText,
            stars: parseInt(rating),
            userId: user.id,
            spotId: spot.id,
            // firstname: user.firstname
        }
        const createdReview = await dispatch(createNewReview(spotId, newReview));
        console.log("%c   LOOK HERE", "color: blue; font-size: 18px", createdReview);

        // if (!createdReview.firstName) return null
        closeModal()
    }


    return (
        <div className="review-modal">
            <div className="review-modal-content">
                <h2>Write a Review</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        id='review-text-input'
                        rows="4"
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <div className="star-rating">
                        {renderStars()}
                    </div>

                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewFormModal;
