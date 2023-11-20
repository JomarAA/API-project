import { useSelector } from "react-redux"
import './SpotPreview.css'

function SpotPreview({id}) {
    const spot = useSelector((state) => state.spots[id])


    return (
        <div className="spot" title={spot.name}>
        <img src={spot.previewImage} alt={`${spot.name} preview`} />
        <span className='location'>
            {spot.city}, {spot.state}
        </span>
        <span className='price'>${spot.price}night</span>
        </div>
    )
}

export default SpotPreview;
