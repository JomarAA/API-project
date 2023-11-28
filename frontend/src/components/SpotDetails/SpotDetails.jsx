import "./SpotDetails.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
import { getSpotReviews } from "../../store/reviews";
// import { useModal } from "../../context/Modal";
// import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import SpotReviews from "./Reviews";

const SpotDetails = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.oneSpot);
  const reviews = useSelector((state) => state.reviews.spot || []);
  // const user = useSelector((state) => state.session.user);
  // const { setModalContent } = useModal();
  // console.log("%c   LOOK HERE", "color: red; font-size: 18px", reviews);
  const reviewsArray = Object.values(reviews);

  const reviewAvg = (reviewsArray) => {
    let sum = 0
    for (let review of reviewsArray) {
      sum += review.stars
    }
    return sum / reviewsArray.length
  }

  const averageRating = reviewAvg(reviewsArray)

  useEffect(() => {
    if (spotId) {
      dispatch(getSpot(spotId));
    }
  }, [dispatch, spotId]);

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch, spotId]);

  if (!spot) {
    return null;
  }

  if (!reviews) {
    return null;
  }

  const images = spot.SpotImages.slice(1, 5);





  // const handleWriteReviewClick = () => {
  //   setModalContent(<ReviewFormModal spotId={spotId} closeModal={() => setModalContent(null)} />);
  // };

  // console.log("%c   LOOK HERE", "color: blue; font-size: 18px", userHasReviewed);
  // console.log("%c   LOOK HERE", "color: red; font-size: 18px", reviewsArray);

  return (
    <div className="one-spot-container">
      <h1>{spot.name}</h1>
      <div className="location">
        <h3>
          {spot.city}, {spot.state}, {spot.country}
        </h3>
      </div>
      <div className="spot-images-container">
        <img id="primary-image" src={spot.SpotImages[0].url} alt="Spot Image" />
        <div className="secondary-image-container">
          {images.map((image) => (
            <img
              key={image.id}
              className="secondary-image"
              src={image.url}
              alt={"Secondary Spot"}
            />
          ))}
        </div>
      </div>
      <div className="spot-details-container">
        <div id="spot-description">
          <h1>
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </h1>
          <p>{spot.description}</p>
        </div>
        <div id="reserve-square">
          <div id="reserve-info">
            <div id="pricing"> ${spot.price} night</div>
            <div className="rating-info">
              <div className="rating">
                <i className="fa-solid fa-star"></i>
                {reviewsArray.length > 0 ? (
                  <>
                    <i className="fa-solid fa-star"></i>
                    {parseFloat(averageRating).toFixed(1)}
                    <div className="num-reviews">
                      {reviewsArray.length} {reviewsArray.length === 1 ? 'review' : 'reviews'}
                    </div>
                  </>
                ) : (
                  <div className="num-reviews">New</div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              alert("Feature Coming Soon");
            }}
            id="reserve-button"
          >
            {" "}
            Reserve
          </button>
        </div>
      </div>
      <hr></hr>
      <SpotReviews spotId={spotId} />
    </div>
  );
};

export default SpotDetails;
