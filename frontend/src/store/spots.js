import { csrfFetch } from "./csrf";

//const to avoid debugging typos
const GET_SPOTS = "spots/GET_SPOTS";
const GET_SPOT_DETAILS = '/spots/GET_SPOT_DETAILS';
const CREATE_SPOT = '/spots/CREATE_SPOT';

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  }
}

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

export const createNewSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(spot)
    })
    if (res.ok) {
      const newSpot = await res.json();
      dispatch(createSpot(newSpot))
    }
    return res
}

export const getSpot = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if (res.ok) {
        const spotDetails = await res.json();
        dispatch(getSpotDetails(spotDetails))
        return spotDetails;
    }
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
        return {...state,oneSpot:{...action.spot}}
      case CREATE_SPOT:
        return {...state, [action.spot.id]: action.spot}
      default:
        return state;
    }
  };


export default spotsReducer;
