import { csrfFetch } from "./csrf";

//const to avoid debugging typos
const GET_SPOTS = "spots/getSpots";
const GET_SPOT_DETAILS = '/spots/getSpotDetails';

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
        const data = await res.json();
        dispatch(getSpotDetails)
    }
    return res;
}

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
//   console.log(res);

  if (res.ok) {
    const { Spots } = await res.json();
    const spotsById = Spots.reduce((acc, spot) => {
      acc[spot.id] = spot;
      return acc;
    }, {});
    // console.log('SPOTS:   ',Spots)
    dispatch(getSpots(spotsById));
  }
  return res;
};

// export const getAllSpots = () => async (dispatch) => {
//     const res = await csrfFetch("/api/spots");
//   //   console.log(res);

//     if (res.ok) {
//       const data = await res.json();
//       console.log('DATA:   ',data)
//       dispatch(getSpots(data.Spots));
//     }
//     return res;
//   };


//state object
const initialState = {};

//reducer

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SPOTS:
        return {
          ...state,
          spots: action.spots
        };
      case GET_SPOT_DETAILS:
        return {
            ...state, [action.spot.id]: action.spot
        }
      default:
        return state;
    }
  };


export default spotsReducer;
