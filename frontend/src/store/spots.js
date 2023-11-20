import { csrfFetch } from "./csrf";

//const to avoid debugging typos
const GET_SPOTS = "spots/getSpots";

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots,
  };
};

//thunk action creator
export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/users");
  console.log(res);

  if (res.ok) {
    const data = await res.json();
    dispatch(getSpots(data.Spots));
  }
  return res;
};

//state object
const initialState = {};

//reducer

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      const newState = { ...state };
      const spots = {};
      action.spots.forEach((spot) => {
        spots[spot.id] = spot;
      });
      return (newState.spots = spots);
  }
};

export default spotsReducer;
