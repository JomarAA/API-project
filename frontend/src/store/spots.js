import { csrfFetch } from "./csrf";

//const to avoid debugging typos
const GET_SPOTS = "spots/GET_SPOTS";
const GET_SPOT_DETAILS = '/spots/GET_SPOT_DETAILS';

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

const getSpotDetails = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        spot
    }
}

// thunk action creator
export const getSpot = (id) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`)

    if (res.ok) {
        const spot = await res.json();
        dispatch(getSpotDetails(spot))
    }
    return res;
}

export const allSpotsThunktion = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");

  if (res.ok) {
    let spots  = await res.json();
    spots = spots.Spots
    // console.log('SPOTS:   ',Spots)
    dispatch(getSpots(spots));
    return spots;
  }
};

//state object
const initialState = {};

//reducer

const spotsReducer = (state = initialState, action) => {

    let allSpots = {};
    switch (action.type) {
      case GET_SPOTS:
        action.spots.forEach((spot) => (allSpots[spot.id] = spot))
        return {allSpots: {...allSpots}}
      case GET_SPOT_DETAILS:
        return {
            ...state, [action.spot.id]: action.spot
        }
      default:
        return state;
    }
  };


export default spotsReducer;
