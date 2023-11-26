import { csrfFetch } from "./csrf";

//const to avoid debugging typos
const GET_REVIEWS = "review/GET_REVIEWS";
const CREATE_REVIEW = "review/CREATE_REVIEW";

const getAllReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews,
  };
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

//thunktions
export const getSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getAllReviews(reviews));
    return reviews;
  }
};

export const createNewReview = (spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const review = await res.json();
    await dispatch(createReview(review, spotId));;
    return review;
  }
};

//state object
const initialState = {};

//reducer
const reviewsReducer = (state = initialState, action) => {
  let nextState;
  let reviews;
  switch (action.type) {
    case GET_REVIEWS:
      nextState = { ...state, spot: {}, user: {} };
      reviews = action.reviews.Reviews;
      reviews.forEach((review) => (nextState.spot[review.id] = review));
      return nextState;
    case CREATE_REVIEW:
    //   nextState = {
    //     ...state,
    //     spot: { ...state.spot },
    //     user: { ...state.user },
    //   };
    //   nextState.Spot[action.review.id] = action.review;
      return {...state,
      spot: {
        ...state.spot,
        [action.review.spotId]: [
          ...(state.spot[action.review.spotId] || []),
          action.review
        ]
      }
    };
    default:
      return state;
  }
};

export default reviewsReducer;
