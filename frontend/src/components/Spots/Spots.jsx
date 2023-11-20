import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import SpotPreview from './SpotPreview'


function Spots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    const spots = Object.values(useSelector((state) => state.spots))

    console.log('SPOTS:   ', spots)


    return (
        <div className='spotDisplay'>
           {spots.map((spot) => {
            <SpotPreview key={spot.id} id={spot.id}/>
           })}




        </div>

    )
}



export default Spots;
