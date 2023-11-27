import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import { useNavigate } from "react-router-dom";



const DeleteSpotModal = ({ spotId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    // const spots = useSelector(state => state.spots.allSpots);

    // console.log('%c   LOOK HERE', 'color: red; font-size: 18px', spots)

    const { closeModal } = useModal();


    const confirmDelete = async () => {
        await dispatch(deleteSpotThunk(spotId))
        navigate('/spots/current')
        closeModal()

    }

    const cancelDelete = () => {
        closeModal()
    }

    return (
        <div className="delete-modal">
            <div className="delete-modal-content">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to remove this spot from the listing?</p>
                <button onClick={confirmDelete} className="confirm-buttons" id='delete-button'>
                    Yes (Delete Spot)
                </button>
                <button onClick={cancelDelete} className="confirm-buttons" id='cancel-button'>
                    No (Keep Spot)
                </button>
            </div>
        </div>



    )
}

export default DeleteSpotModal
