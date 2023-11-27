import "./CreateSpot.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpot, editSpot } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateSpot() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots.oneSpot);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);


    useEffect(() => {
        if (spotId) {
            dispatch(getSpot(spotId))
                .then(() => setIsLoading(false));
        }
    }, [dispatch, spotId]);

    // console.log("%c   LOOK HERE", "color: purple; font-size: 18px", spot);

    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [validations, setValidation] = useState({});
    const [submittted, setSubmitted] = useState(false);
    // const [countryPlaceholder, setCountryPlaceholder] = useState("Country");

    // const [previewImg, setPreviewImg] = useState("")
    // const [img2, setImg2] = useState("")
    // const [img3, setImg3] = useState("")
    // const [img4, setImg4] = useState("")
    // const [img5, setImg5] = useState("")


    useEffect(() => {

        const validationsObj = {};
        if (!address) {
            validationsObj.address = "Street address is required";
        }
        if (!city) {
            validationsObj.city = "City is required";
        }
        if (!state) {
            validationsObj.state = "State is required";
        }
        if (!country) {
            validationsObj.country = "Country is required";
        }
        if (!lat) {
            validationsObj.lat = "Latitude is required";
        }
        if (lat <= -150 || lat >= 150) {
            validationsObj.lat = "Latitude is not valid";
        }
        if (!lng) {
            validationsObj.lng = "Longitude is required";
        }
        if (lng <= -150 || lng >= 150) {
            validationsObj.lng = "Longitude is not valid";
        }
        if (!name) {
            validationsObj.name = "Name is required";
        }
        if (description.length < 30) {
            validationsObj.description = "Description needs minumum of 30 characters";
        }
        if (!price) {
            validationsObj.price = "Price is required";
        }
        // if (!previewImg) {
        //     validationsObj.previewImg = 'Preview image is required'
        // }
        setValidation(validationsObj);

    }, [city, state, country, address, description, name, price, lat, lng])
    // if (!previewImg.endsWith('.jpg') && !previewImg.endsWith('.jpeg') && !previewImg.endsWith('.png')) {
    //   validationsObj.previewImg = 'Image URL must end in a .png, .jpg, or .jpeg'
    //   errorsArray.push('Image URL must end in a .png, .jpg, or .jpeg')
    // }



    useEffect(() => {
        if (spot && !isLoading) {
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setCountry(spot.country);
            setLat(spot.lat);
            setLng(spot.lng);
            setName(spot.name);
            setDescription(spot.description);
            setPrice(spot.price);
            // setPreviewImg(spot.SpotImages[0].url || "")
        }
    }, [spot, isLoading]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!Object.values(validations).length) {

            const parsedLat = parseInt(lat);
            const parsedLng = parseInt(lng);

            const spot = {
                address,
                city,
                state,
                country,
                name,
                description,
                price,
                lat: parsedLat,
                lng: parsedLng,
                // id: parseInt(spotId)
            };
            // const images = [previewImg, img2, img3, img4, img5];

            // console.log("%c   LOOK HERE", "color: red; font-size: 18px", spot);
            const updatedSpot = await dispatch(editSpot(spot, spotId))

            // await dispatch(allSpotsThunktion())

            navigate(`/spots/${updatedSpot.id}`);
            // }
        }

    }



    return (
        <div className="create-spot-container">
            <h2>Create a new Spot</h2>
            <form onSubmit={handleSubmit} className="create-spot-form">
                <div className="location-section">
                    <h3>Where&apos;s your place located?</h3>
                    <p>
                        Guests will only get your exact address once they booked a
                        reservation
                    </p>
                    <div id="country-input">
                        <div className="label-and-error">
                            <label htmlFor="country">Country</label>
                            {submittted && validations.country && (
                                <span className="error">{validations.country}</span>
                            )}
                        </div>
                        <input
                            id="country"
                            type="text"
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value)
                            }}
                            placeholder='Country'
                        />
                    </div>

                    <div id="address-input">
                        <div className="label-and-error">
                            <label htmlFor="street-address">Street Adress</label>
                            {submittted && validations.address && (
                                <span className="error">{validations.address}</span>
                            )}
                        </div>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                    </div>

                    <div id="location-details">
                        <div id="city-input">
                            <div className="label-and-error">
                                <label htmlFor="city">City</label>
                                {submittted && validations.city && (
                                    <span className="error">{validations.city}</span>
                                )}
                            </div>
                            <input
                                id="city"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                            />
                        </div>

                        <div id="state-input">
                            <div className="label-and-error">
                                <label htmlFor="state">State</label>
                                {submittted && validations.state && (
                                    <span className="error">{validations.state}</span>
                                )}
                            </div>
                            <input
                                id="state"
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State"
                            />
                        </div>

                        <div id="lat-input">
                            <div className="label-and-error">
                                <label htmlFor="lat">Latitude</label>
                            </div>
                            <input
                                id="latitude"
                                type="text"
                                value={lat}
                                onChange={(e) => setLat(e.target.value)}
                                placeholder="Latitude"
                            />
                        </div>

                        <div id="lng-input">
                            <div className="label-and-error">
                                <label htmlFor="lng">Longitude</label>
                            </div>
                            <input
                                id="longitude"
                                type="text"
                                value={lng}
                                onChange={(e) => setLng(e.target.value)}
                                placeholder="Longitude"
                            />
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="description-section">
                    <h2> Describe your place to guests</h2>
                    <p>
                        Mention the best features of your space, any special amenities
                        like fast wifi or parking, and what you love about the
                        neighborhood
                    </p>
                    <div id="description-input">
                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={validations.description ? "Description" : "Please write at least 30 characters"}
                        />
                        <div className="label-and-error">
                            {submittted && validations.description && (
                                <span className="error">{validations.description}</span>
                            )}
                        </div>
                    </div>
                </div>
                <hr></hr>

                <div id='name-section'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special</p>
                    <div id="name-input">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name of your spot"
                        />
                        <div className="label-and-error">
                            {submittted && validations.name && (
                                <span className="error">{validations.name}</span>
                            )}
                        </div>
                    </div>
                </div>
                <hr></hr>

                <div id='price-section'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <div id="price-input">
                        $ <input
                            id="price"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price per night (USD)"
                        />
                        <div className="label-and-error">
                            {submittted && validations.price && (
                                <span className="error">{validations.price}</span>
                            )}
                        </div>
                    </div>
                </div>
                <hr></hr>


                <button type="submit" className="create-spot-button">
                    Create Spot
                </button>
            </form>
        </div>
    );
}


export default UpdateSpot
