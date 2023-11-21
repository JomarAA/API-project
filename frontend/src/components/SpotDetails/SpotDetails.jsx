import './SpotDetails.css'
import { useEffect } from "react";
import { useDispatch} from 'react-redux';
import {getSpot} from '../../store/spots'
import { useParams } from 'react-router-dom';


function SpotDetails() {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if(id) {
            dispatch(getSpot(id))
        }
    }, [dispatch, id])

    // const spot = Object.values(useSelector((state) => state.spots[id]))

    // console.log('%c   LOOK HERE', 'color: blue; font-size: 18px', spot)


    return (
        <h1>spot details test</h1>
    )
}

export default SpotDetails;
