import React, { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
//import "./HabeshaFood.css"
import { Form, Modal, Button } from "react-bootstrap";
import { HabeshaFoodContext } from "./HabeshaFoodProvider"
import StarRatingSystem from "./StarRating";
import { TypeContext } from "../type/TypeProvider";

export const HabeshaFoodCreateForm = () => {
    const { addHabeshaFood } = useContext(HabeshaFoodContext)
    const { types, getAllTypes } = useContext(TypeContext)

    const history = useHistory();

    useEffect(() => {
        getAllTypes();
    }, []);

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the initial state of the form inputs with useState()
    */

    //const currentUser = parseInt(localStorage.getItem("ZuringTheWorld_user"))

    const [imageURL, setImageURL] = useState("")
    const [habeshaFood, setHabeshaFood] = useState({
        typeId: 0,
        picture: "",
        name: "",
        rating: 0,
        description: "",
        ingredient: "",
        totalCalorie: 0,
        totalFat: 0,
        cholesterol: 0,
        sodium: 0,
        totalCarbohydrate: 0,
        protein: 0,
        calcium: 0,
        iron: 0,
        potassium: 0
    });
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(false);
    const [habeshaFoodObj, setHabeshaFoodObj] = useState({});

    //image upload handling
    const [loading, setLoading] = useState(false)
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "YeMigbeKeeper")
        setLoading(true)
        const response = await fetch(
            "https://api.cloudinary.com/v1_1/sosina/image/upload",
            {
                method: "POST",
                body: data
            }
        )
        const file = await response.json()
        setImageURL(file.secure_url)
        setLoading(false)
    }


    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
        always create a copy, make changes, and then set state.*/
        const newHabeshaFood = { ...habeshaFood }

        /* HabeshaFood is an object with properties.
        Set the property to the new value
        using object bracket notation. */
        newHabeshaFood[event.target.id] = event.target.value
        // update state
        setHabeshaFood(newHabeshaFood)
    }




    const handleClickSaveHabeshaFood = () => {

        const typeId = parseInt(habeshaFood.typeId)
        const picture = habeshaFood.picture
        const name = habeshaFood.name
        const rating = habeshaFood.rating
        const description = habeshaFood.description
        const ingredient = habeshaFood.ingredient
        let totalCalorie = parseInt(habeshaFood.totalCalorie)
        let totalFat = parseInt(habeshaFood.totalFat)
        let cholesterol = parseInt(habeshaFood.cholesterol)
        let sodium = parseInt(habeshaFood.sodium)
        let totalCarbohydrate = parseInt(habeshaFood.totalCarbohydrate)
        let protein = parseInt(habeshaFood.protein)
        let calcium = parseInt(habeshaFood.calcium)
        let iron = parseInt(habeshaFood.iron)
        let potassium = parseInt(habeshaFood.potassium)


        if (name === "") {
            window.alert("Please type in the name of the food")
        } else if (typeId === 0 || typeId === NaN) {
            window.alert("Please select a type")
        } else if (rating === 0) {
            window.alert("Please rate your habesha food")
        } else if (description === "") {
            window.alert("Please write description")
        } else if (ingredient === "") {
            window.alert("Please type in the ingredients")
        } else {
            //disable the button - no extra clicks
            setIsLoading(true); //this ensures the user cannot repeatedly click the button while the API is being updated
            //habeshaFood - add
            addHabeshaFood({ //if not, this must be a new note so the input fields will be empty
                typeId: habeshaFood.typeId,
                picture: imageURL,
                name: habeshaFood.name,
                rating: habeshaFood.rating,
                description: habeshaFood.description,
                ingredient: habeshaFood.ingredient,
                totalCalorie: habeshaFood.totalCalorie,
                totalFat: habeshaFood.totalFat,
                cholesterol: habeshaFood.cholesterol,
                sodium: habeshaFood.sodium,
                totalCarbohydrate: habeshaFood.totalCarbohydrate,
                protein: habeshaFood.protein,
                calcium: habeshaFood.calcium,
                iron: habeshaFood.iron,
                potassium: habeshaFood.potassium
            }).then(setHabeshaFoodObj)
                .then(() => setIsLoading(false))
        }
    }

    useEffect(() => {
        if (habeshaFoodObj.id > 0) {
            history.push(`/habeshaFood`);
        }
    }, [habeshaFoodObj]) //habeshaFoodObj here is waiting for the state to be set

    const [show, setShow] = useState(false); //modal state

    const handleClose = () => setShow(false); //closes modal
    const handleShow = () => setShow(true); //opens the modal

    return (
        <>
            <Form className="habeshaFoodForm">
                <button className="link--close">
                    <Link to="/HabeshaFood">close</Link>
                </button>
                <h2 className="habeshaFoodForm__title">Add new habesha food</h2>

                <Form.Group>
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control id="picture" type="file" name="file" placeholder="Upload an image" onChange={uploadImage} />
                    {loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <img src={imageURL} style={{ width: "50px" }} />
                    )}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Select type</Form.Label>
                    <Form.Control id="typeId" onChange={handleControlledInputChange} as="select">
                        <option value="0">Select a type </option>
                        {types.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control"
                        value={habeshaFood.name} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Star rating</Form.Label>
                    <StarRatingSystem habeshaFood={habeshaFood} />

                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Please describe this dish" id="description" onChange={handleControlledInputChange} required autoFocus className="form-control"
                        value={habeshaFood.description} as="textarea" rows={3} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control type="text" placeholder="Please specify" id="ingredient" onChange={handleControlledInputChange} required autoFocus className="form-control"
                        value={habeshaFood.ingredient} as="textarea" rows={3} />
                </Form.Group>

                <Button variant="primary" onClick={handleShow}>
                    Add nutrition facts
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nutrition facts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Calorie</Form.Label>
                            <Form.Control type="text" placeholder="calorie" id="totalCalorie" onChange={handleControlledInputChange} required autoFocus className="form-control"
                                value={habeshaFood.totalCalorie} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Fat</Form.Label>
                            <Form.Control type="text" placeholder="fat" id="totalFat" onChange={handleControlledInputChange} required autoFocus className="form-control"
                                value={habeshaFood.totalFat} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Cholesterol</Form.Label>
                            <Form.Control type="text" placeholder="cholesterol" id="cholesterol" onChange={handleControlledInputChange} required autoFocus className="form-control"
                                value={habeshaFood.cholesterol} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Sodium</Form.Label>
                            <Form.Control type="text" placeholder="sodium" id="sodium" onChange={handleControlledInputChange} required autoFocus className="form-control"
                                value={habeshaFood.sodium} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Total Carbohydrate</Form.Label>
                            <Form.Control type="text" placeholder="total carbohydrate" id="totalCarbohydrate" onChange={handleControlledInputChange} required autoFocus className="form-control"
                                value={habeshaFood.totalCarbohydrate} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Protein</Form.Label>
                            <Form.Control type="text" placeholder="protein" id="protein" onChange={handleControlledInputChange} required autoFocus className="form-control"
                                value={habeshaFood.protein} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Calcium</Form.Label>
                            <Form.Control type="text" placeholder="calcium" id="calcium" onChange={handleControlledInputChange} required autoFocus className="form-control"
                                value={habeshaFood.calcium} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Iron</Form.Label>
                            <Form.Control type="text" placeholder="iron" id="iron" onChange={handleControlledInputChange} required autoFocus className="form-control"
                                value={habeshaFood.iron} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Potassium</Form.Label>
                            <Form.Control type="text" placeholder="potassium" id="potassium" onChange={handleControlledInputChange} required autoFocus className="form-control"
                                value={habeshaFood.potassium} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>

                <button className="btn btn-primary"
                    disabled={isLoading}
                    onClick={event => {
                        event.preventDefault()
                        handleClickSaveHabeshaFood()
                    }}>
                    Add habesha food</button>
            </Form>
        </>
    )
}

export default HabeshaFoodCreateForm;