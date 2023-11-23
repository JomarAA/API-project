import "./CreateSpot.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewSpot } from "../../store/spots";
import { Navigate, useNavigate } from "react-router-dom";


const CreateSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState([])
    const [validations, setValidation] = useState({})
    const [submittted, setSubmitted] = useState(false)

    useEffect(() => {
        const errorsArray = []
        const validationsObj = {}
        if (!address){
            validationsObj.address = 'Street address is required'
            errorsArray.push('Street address is required')
        }
        if (!city) {
            validationsObj.city = 'City is required'
            errorsArray.push('City required')
        }
        if (!state) {
            validationsObj.state = 'State is required'
            errorsArray.push('State required')
        }
        if (!country) {
            validationsObj.country = 'Country is required'
            errorsArray.push('Country required')
        }
        if (!lat ) {
            validationsObj.lat = 'Latitude is required'
            errorsArray.push('Latitude required')
        }
        if (lat <= -150 || lat >= 150) {
            validationsObj.lat = 'Latitude is not valid'
            errorsArray.push('Latitude is not valid')
        }
        if (!lng ) {
            validationsObj.lng = 'Longitude is required'
            errorsArray.push('Longitude required')
        }
        if (lng <= -150 || lng >= 150) {
            validationsObj.lng = 'Longitude is not valid'
            errorsArray.push('Longitude is not valid')
        }
        if (!name) {
            validationsObj.name = 'Name is required'
            errorsArray.push('Name required')
        }
        if (!description) {
            validationsObj.description = 'Description is required'
            errorsArray.push('Description required')
        }
        if (!price) {
            validationsObj.price = 'Price is required'
            errorsArray.push('Price required')
        }
        setErrors(errorsArray);
        setValidation(validationsObj)
    }, [address, city, state, country, lat, lng, name, description, price]
    )

    const onSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

        if (!errors.length) {
            const newSpot = {
                address,
                city,
                state,
                country,
                name,
                description,
                price,
                lat,
                lng
            }
            const spotCreate = await dispatch(createNewSpot(newSpot));
            navigate(`/spots/${spots}/${spotCreate.id}`)
        }
    }


    console.log("%c   LOOK HERE", "color: blue; font-size: 18px", errors);


    return (
        <div className="create-spot-page">

        <div className="create-spot-form">
        <form onSubmit={onSubmit} className='create-form'>
            <div className="first-section">
        <h1>Create a new Spot</h1>
        <h2>Where's your place located?</h2>
        <p> Guests will only get your exact address once they booked a reservation</p>

            </div>



        </form>
        </div>
        </div>
    )
}

export default CreateSpot;
