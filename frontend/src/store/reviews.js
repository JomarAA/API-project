import { csrfFetch } from "./csrf";

//const to avoid debugging typos
const GET_REVIEWS = "review/GET_REVIEWS";
const CREATE_REVIEW = "review/CREATE_REVIEW";
const DELETE_REVIEW = 'review/DELETE_REVIEW'

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

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

//thunktions

export const deleteSpotReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE"
  })

  if (res.ok) {
    dispatch(deleteReview(reviewId))
  }
}

export const getSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(getAllReviews(reviews));
    return reviews;
  }
};

export const createNewReview = (spotId, review, user) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const review = await res.json();
    await dispatch(createReview({...review, User:user}));
    // console.log("%c   LOOK HERE", "color: red; font-size: 18px", review);
    return {...review, User: user};
  }
};

//state object
const initialState = {};

//reducer
const reviewsReducer = (state = initialState, action) => {
  Object.freeze(state)
  let nextState = Object.assign({}, state)
  let reviews;
  switch (action.type) {
    case GET_REVIEWS:
      nextState = { ...state, spot: {}, user: {} };
      reviews = action.reviews.Reviews;
      reviews.forEach((review) => (nextState.spot[review.id] = review));
      return nextState;
      case CREATE_REVIEW:
        return {...nextState,
          spot: {
            ...nextState.spot,
            [action.review.id]: action.review
          }
        };
        case DELETE_REVIEW:
          nextState = {...state}
          // console.log("%c   LOOK HERE", "color: green; font-size: 18px", nextState.spot[action.reviewId]);
      delete nextState.spot[action.reviewId]
      return nextState
    default:
      return state;
  }
};

export default reviewsReducer;
