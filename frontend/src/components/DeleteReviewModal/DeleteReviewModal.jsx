import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotReview } from "../../store/reviews";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";
import './DeleteReview.css'

const DeleteReviewModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const navigate = useNavigate();
    const { spotId } = useParams()


    const confirmDelete = async () => {
        dispatch(deleteSpotReview(reviewId))
            .then(() => {
                navigate(`/spots/${spotId}`); // Navigate after the review is created
            })
            .then(() => {
                dispatch(getSpotReviews(spotId))
            })
            .finally(() => {
                closeModal(); // Close the modal in either case
            })
    }

    const cancelDelete = () => {
        closeModal()
    }


    return (
        <div className="delete-modal">
            <div className="delete-modal-content">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this review?</p>
                <button onClick={confirmDelete} className="confirm-buttons" id='delete-button'>
                    Yes (Delete Review)
                </button>
                <button onClick={cancelDelete} className="confirm-buttons" id='cancel-button'>
                    No (Keep Review)
                </button>
            </div>
        </div>

    )
}

export default DeleteReviewModal
