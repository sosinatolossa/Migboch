import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import StarRatingSystem from "./StarRating";
import { TypeContext } from "../type/TypeProvider";
import { Form, Modal, Button } from 'react-bootstrap';

export const HabeshaFoodEditForm = () => {
    const { updateHabeshaFood, getHabehsaFoodById } = useContext(HabeshaFoodContext);
    const { types, getAllTypes } = useContext(TypeContext);
    const { habeshaFoodId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    // Set the initial state of HabeshaFood
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

    // Gets a list of all categories (for the Type dropdown) &
    // Sets the state of HabeshaFood to the values from the original HabeshaFood
    useEffect(() => {
        getAllTypes()
            .then(getHabehsaFoodById(habeshaFoodId)
                .then(oldHabeshaFood => {
                    // Save the original habeshaFood to the local state variable, habeshaFood
                    setHabeshaFood(oldHabeshaFood);
                }))
    }, [])

    // Handles changes to any input field
    const handleControlledInputChange = (event) => {

        // saves the most recent version of the HabeshaFood object to newHabeshaFood
        const newHabeshaFood = { ...habeshaFood };

        // Ex newHabeshaFood[TypeId] = 2
        newHabeshaFood[event.target.id] = event.target.value;

        // update state
        setHabeshaFood(newHabeshaFood);
    };

    // Handles saving the new edited HabeshaFood
    const handleClickEditHabeshaFood = () => {

        // Check to make sure all relevant input fields have data
        if (habeshaFood.picture === "") return window.alert("Please add an image url.");
        if (habeshaFood.name === "") return window.alert("Please enter a name");
        if (habeshaFood.description === "") return window.alert("Please add a description.");
        if (habeshaFood.ingredient === "") return window.alert("Please type in the ingredients.");

        //disable the button - no extra clicks
        setIsLoading(true);

        // Send the new HabeshaFood object to server side to update the original HabeshaFood
        updateHabeshaFood({
            id: habeshaFood.id,
            typeId: habeshaFood.typeId,
            picture: habeshaFood.picture,
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
        });
    };

    const [show, setShow] = useState(false); //modal state

    const handleClose = () => setShow(false); //close modal
    const handleShow = () => setShow(true); //opens the modal

    return (
        <>
            <Form className="habeshaFoodForm">
                <button className="link--close">
                    <Link to="/HabeshaFood">close</Link>
                </button>
                <h2 className="habeshaFoodForm__title">Edit habesha food</h2>

                <Form.Group>
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="picture" id="picture" onChange={handleControlledInputChange} required autoFocus className="form-control"
                        value={habeshaFood.picture} />
                </Form.Group>


                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control id="typeId" value={habeshaFood.typeId} onChange={handleControlledInputChange} as="select">
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
                    Edit nutrition facts
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
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                <button className="btn btn-primary"
                    disabled={isLoading}
                    onClick={event => {
                        event.preventDefault()
                        handleClickEditHabeshaFood()
                    }}>
                    Save changes</button>
            </Form>
        </>
    );
};

export default HabeshaFoodEditForm;