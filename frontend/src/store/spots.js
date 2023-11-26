import { csrfFetch } from "./csrf";

//const to avoid debugging typos
const GET_SPOTS = "spots/GET_SPOTS";
const GET_SPOT_DETAILS = '/spots/GET_SPOT_DETAILS';
const CREATE_SPOT = '/spots/CREATE_SPOT';
const GET_USER_SPOTS = '/spots/GET_USER_SPOTS'

const createSpot = (payload) => {
  return {
    type: CREATE_SPOT,
    payload
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

const currentUserSpots = (spots) => {
  return {
    type: GET_USER_SPOTS,
    spots
  }
}

// thunk action creator

export const allSpotsThunktion = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  // console.log("%c   LOOK HERE", "color: blue; font-size: 18px", res)
  if (res.ok) {
    let spots  = await res.json();
    spots = spots.Spots
    // console.log('SPOTS:   ',spots)
    dispatch(getSpots(spots));
    return spots;
  }
};


export const getSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  // console.log("%c   LOOK HERE", "color: blue; font-size: 18px", res);

  if (res.ok) {
    const spotDetails = await res.json();
    dispatch(getSpotDetails(spotDetails))
    return spotDetails;
  }
}

export const getCurrentUserSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots/current')

  if (res.ok) {
    const spots = await res.json()
    dispatch(currentUserSpots(spots))
  }
}



export const createNewSpot = (payload, img) => async (dispatch) => {
  try {
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  })
  if (res.ok) {
    const spot = await res.json();
    for (let i = 0; i < img.length; i++) {
      if (img[i]) {
      await csrfFetch(`/api/spots/${spot.id}/images`, {
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: img[i],
          preview: true,
        }),
      })
    }
    }
    dispatch(createSpot(spot));
    return spot;
  }else {
    const error = await res.json();
    console.error("Error in createNewSpot:", error);
    return error;
  }
}
  catch (error) {
    console.log("%c   LOOK HERE", "color: blue; font-size: 18px", error);
    return error;
  }

};


const initialState = {
  allSpots: {},
  oneSpot: null,
};

//reducer

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      return { ...state, allSpots: action.spots };
    case GET_SPOT_DETAILS:
      return { ...state, oneSpot: { ...action.spot } };
      case CREATE_SPOT:
        let updatedAllSpots = { ...state.allSpots };
        updatedAllSpots[action.payload.id] = action.spot;
        return { ...state,allSpots:{...updatedAllSpots}};
    default:
      return state;
  }
};

export default spotsReducer;
