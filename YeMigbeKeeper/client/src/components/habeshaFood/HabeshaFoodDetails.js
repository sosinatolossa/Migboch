import React, { useEffect, useState, useContext } from "react";
import { Row, Col, CardGroup, Card, Button } from "react-bootstrap";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import { useParams, useHistory } from "react-router-dom";
import "../styling/detail.css"

const OneHabeshaFood = ({ aHabeshaFood }) => {
    const { deleteHabeshaFood, getAllHabeshaFoods } = useContext(HabeshaFoodContext);
    const history = useHistory();

    let currentUser = JSON.parse(sessionStorage.getItem("User"));

    // Handles showing the edit button if the current user is viewing a habeshaFood that they wrote. 
    const editButton = () => {
        if (aHabeshaFood.user?.id === currentUser?.id) {
            return <Button type="button" onClick={() => {
                history.push(`/habeshaFood/edit/${aHabeshaFood.id}`)
            }} className="edit-button" variant="danger">
                <i class="fas fa-pen"></i>
            </Button>
        }
    }

    // Handles showing the delete button if the current user is viewing a habesha food that they created. 
    const deleteButton = () => {
        if (aHabeshaFood.user?.id === currentUser.id) {
            return <Button variant="secondary" onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete this habesha food?"
                )
                if (confirmBox === true) {
                    deleteHabeshaFood(aHabeshaFood.id)
                        .then(getAllHabeshaFoods)
                        .then(history.push("/HabeshaFood"));
                }
            }} className="delete-button" variant="danger">
                <i class="fas fa-trash-alt"></i>
            </Button>
        }
    }

    return (
        <CardGroup className="foodCard">
            <Card>
                <h1 className="foodName">{aHabeshaFood.name}</h1>
                <Row className="justify-content-md-center">
                    <Col xs={12} sm={8} md={8}>
                        <Card.Img src={aHabeshaFood.picture} alt="route" />
                    </Col>
                </Row>

                <Card.Body className="nutritionFacts">
                    <Card.Text>Type: {aHabeshaFood.type?.name}</Card.Text>
                    <Card.Text>Star rating: {aHabeshaFood.rating}</Card.Text>
                    <Card.Text>{aHabeshaFood.description}</Card.Text>
                    <Card.Text>Ingredients: {aHabeshaFood.ingredient}</Card.Text>
                    <Card.Text>{aHabeshaFood.totalCalorie} calories</Card.Text>
                    <Card.Text>{aHabeshaFood.totalFat} grams fat</Card.Text>
                    <Card.Text>{aHabeshaFood.cholesterol} mg cholesterol</Card.Text>
                    <Card.Text>{aHabeshaFood.sodium} mg sodium</Card.Text>
                    <Card.Text>{aHabeshaFood.totalCarbohydrate} gram carbohydrate</Card.Text>
                    <Card.Text>{aHabeshaFood.protein} grams protein</Card.Text>
                    <Card.Text>{aHabeshaFood.calcium} % calcium</Card.Text>
                    <Card.Text>{aHabeshaFood.iron} % iron</Card.Text>
                    <Card.Text>{aHabeshaFood.potassium} mg potassium</Card.Text>
                    {editButton()}
                    {deleteButton()}
                </Card.Body>
            </Card>
        </CardGroup >
    )
};


const HabeshaFoodDetails = () => {
    const [habeshaFood, setHabeshaFood] = useState({});

    const { getHabehsaFoodById } = useContext(HabeshaFoodContext);
    const { id } = useParams();

    useEffect(() => {
        getHabehsaFoodById(id).then((res) => {
            setHabeshaFood(res);
        });
    }, []);

    return (
        <OneHabeshaFood key={habeshaFood.id} aHabeshaFood={habeshaFood} />
    )

}

export default HabeshaFoodDetails;