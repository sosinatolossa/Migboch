import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { HabeshaFoodContext } from "./HabeshaFoodProvider"
//import "./HabeshaFood.css"
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export const HabeshaFoodForm = () => {
    const { addHabeshaFood, getHabeshaFoodById, updateHabeshaFood } = useContext(HabeshaFoodContext)

    /*
    With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
    Define the initial state of the form inputs with useState()
    */

    //const currentUser = parseInt(localStorage.getItem("ZuringTheWorld_user"))

    //const [imageURL, setImageURL] = useState("")
    //for edit, hold on to state of habeshaFood in this view
    const [habeshaFood, setHabeshaFood] = useState({
        typeId: 0,
        picture: "",
        name: "",
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
    const [isLoading, setIsLoading] = useState(true);

    // Now that the form can be used for editing as well as adding a habesha food, you need access to the habesha food id for fetching the habesha food you want to edit
    const { habeshaFoodId } = useParams();
    const history = useHistory();

    //image upload handling
    // const [loading, setLoading] = useState(false)
    // const uploadImage = async e => {
    //     const files = e.target.files
    //     const data = new FormData()
    //     data.append("file", files[0])
    //     data.append("upload_preset", "ZuringTheWorld")
    //     setLoading(true)
    //     const response = await fetch(
    //         "https://api.cloudinary.com/v1_1/sosina/image/upload",
    //         {
    //             method: "POST",
    //             body: data
    //         }
    //     )
    //     const file = await response.json()
    //     setImageURL(file.secure_url)
    //     setLoading(false)
    // }


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
    useEffect(() => {
    }, [habeshaFood])

    const handleClickSaveHabeshaFood = () => {

        const typeId = parseInt(habeshaFood.typeId)
        const picture = habeshaFood.picture
        const name = habeshaFood.name
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


        if (description === "") {
            window.alert("Please write a few description.")
        }

        else if (picture === "") {
            window.alert("Please upload a picture")
        }

        else if (name === "") {
            window.alert("Please type in the name of the food")
        }

        //typeId 0 or not a number, alert user with message
        else if (typeId === 0 || typeId === NaN) {
            window.alert("Please select a type.")
        }


        else if (ingredient === "") {
            window.alert("Please type in the ingredients.")
        }

        else if (totalCalorie === 0 || totalCalorie === NaN) {
            totalCalorie = "-"
        }

        else if (totalFat === 0 || totalFat === NaN) {
            totalFat = "-"
        }

        else if (cholesterol === 0 || cholesterol === NaN) {
            cholesterol = "-"
        }

        else {
            //disable the button - no extra clicks
            setIsLoading(true); //this ensures the user cannot repeatedly click the button while the API is being updated
            if (habeshaFoodId) {   //if this is the food that already exists in our api
                //PUT - update
                updateHabeshaFood({ //the foods will be populated the input fields with current values from the api
                    id: habeshaFood.id,
                    typeId: habeshaFood.typeId,
                    picture: habeshaFood.picture,
                    name: habeshaFood.name,
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
                })
                    .then(() => history.push(`/HabeshaFood`)) //then push it to the habesha foods list
            } else {
                //POST - add
                addHabeshaFood({ //if not, this must be a new note so the input fields will be empty
                    typeId: habeshaFood.typeId,
                    picture: habeshaFood.picture,
                    name: habeshaFood.name,
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
                })
                    .then(() => history.push("/HabeshaFood")) //then push it to the habesha foods list
            }
        }
    }


    /*
    Reach out to the world and get habesha foods state
    and locations state on initialization.
    */
    useEffect(() => {
        if (habeshaFoodId) { //if we have this habesha food id in the URL(api)
            getHabeshaFoodById(habeshaFoodId) //get that id(we're passing the id)
                .then(habeshaFood => { //get the object

                    setHabeshaFood(habeshaFood) //set the habesha food state with the new object
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }

    }, [])


    // <div className="form-group">
    //     <div>Upload Image</div>
    //     <input type="file" name="file" placeholder="Upload an image" onChange={uploadImage} />
    //     {loading ? (
    //         <h3>Loading...</h3>
    //     ) : (
    //         <img src={imageURL} style={{ width: "100px" }} />
    //     )}
    // </div>
    return (
        <>
            <Form className="habeshaFoodForm">
                <button className="link--close">
                    <Link to="/HabeshaFoods">close</Link>
                </button>
                <h2 className="habeshaFoodForm__title">{habeshaFoodId ? "Edit travel note" : "Add new habesha food"}</h2>

                <Form.Group>
                    <Form.File id="picture" label="Upload image" />
                </Form.Group>

                <Form.Group controlId="typeId">
                    <Form.Label>Select type</Form.Label>
                    <Form.Control as="select">
                        <option>breakfast</option>
                        <option>lunch</option>
                        <option>dinner</option>
                        <option>snack</option>
                        <option>dessert</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="name" />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="description" placeholder="description" />
                </Form.Group>

                <Form.Group controlId="ingredient">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control type="ingredient" placeholder="ingredients" />
                </Form.Group>

                <Form.Group controlId="totalCalorie">
                    <Form.Label>Calorie</Form.Label>
                    <Form.Control type="totalCalorie" placeholder="calorie" />
                </Form.Group>

                <Form.Group controlId="totalFat">
                    <Form.Label>Fat</Form.Label>
                    <Form.Control type="totalFat" placeholder="fat" />
                </Form.Group>

                <Form.Group controlId="cholesterol">
                    <Form.Label>Cholesterol</Form.Label>
                    <Form.Control type="cholesterol" placeholder="cholesterol" />
                </Form.Group>

                <Form.Group controlId="sodium">
                    <Form.Label>Sodium</Form.Label>
                    <Form.Control type="sodium" placeholder="sodium" />
                </Form.Group>

                <Form.Group controlId="totalCarbohydrate">
                    <Form.Label>Total Carbohydrate</Form.Label>
                    <Form.Control type="totalCarbohydrate" placeholder="total carbohydrate" />
                </Form.Group>

                <Form.Group controlId="protein">
                    <Form.Label>Protein</Form.Label>
                    <Form.Control type="protein" placeholder="protein" />
                </Form.Group>

                <Form.Group controlId="calcium">
                    <Form.Label>Calcium</Form.Label>
                    <Form.Control type="calcium" placeholder="calcium" />
                </Form.Group>

                <Form.Group controlId="iron">
                    <Form.Label>Iron</Form.Label>
                    <Form.Control type="iron" placeholder="iron" />
                </Form.Group>

                <Form.Group controlId="potassium">
                    <Form.Label>Potassium</Form.Label>
                    <Form.Control type="potassium" placeholder="potassium" />
                </Form.Group>

                <Button variant="outline-success" className="btn btn-primary"
                    disabled={isLoading}
                    onClick={event => {
                        event.preventDefault()
                        handleClickSaveHabeshaFood()
                    }}>{habeshaFoodId ? "Save note" : "Add note"}</Button>{' '}
            </Form>
        </>
    )
}

export default HabeshaFoodForm;