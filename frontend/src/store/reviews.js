import { csrfFetch } from "./csrf";

//const to avoid debugging typos
const GET_REVIEWS = 'review/GET_REVIEWS'


const getAllReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}



//thunktions
export const getSpotReviews = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if(res.ok) {
        const reviews = await res.json()
        dispatch(getAllReviews(reviews))
        return reviews
    }
};


//state object
const initialState = {}

//reducer
const reviewsReducer = (state= initialState, action) => {
    switch(action.type) {
        case GET_REVIEWS:
        const nextState = {...state, spot: {}, user: {}};
        const reviews = action.reviews.Reviews
        reviews.forEach((review) => (nextState.spot[review.id] = review))
        return nextState

        default:
            return state
    }
}

export default reviewsReducer;
