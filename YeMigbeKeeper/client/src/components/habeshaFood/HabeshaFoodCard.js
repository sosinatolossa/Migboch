import React, { useContext, useEffect } from "react";
import { CardGroup, Card, CardBody, CardTitle, CardText, CardImg, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";


const HabeshaFood = ({ habeshaFood }) => {

    const history = useHistory();

    // Handles showing the edit button if the current user is viewing a habeshaFood that they wrote. 
    const editButton = (habeshaFoodId) => {
        let currentUser = JSON.parse(sessionStorage.getItem("User"));
        if (habeshaFood.user.id === currentUser.id) {
            return <Button type="button" onClick={() => {
                history.push(`/habeshaFood/edit/${habeshaFoodId}`)
            }} className="edit-button">
                Edit
            </Button>
        }
    }

    const { deleteHabeshaFood, getAllHabeshaFoods } = useContext(HabeshaFoodContext);

    // Handles showing the delete button if the current user is viewing a habesha food that they created. 
    const deleteButton = (habeshaFood) => {
        let currentUser = JSON.parse(sessionStorage.getItem("User"));
        if (habeshaFood.user?.id === currentUser.id) {
            return <Button variant="secondary" onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete this habesha food?"
                )
                if (confirmBox === true) {
                    deleteHabeshaFood(habeshaFood.id)
                        .then(getAllHabeshaFoods)
                        .then(history.push("/HabeshaFood"));
                }
            }} className="delete-button">
                Delete
            </Button>
        }
    }

    return (
        <CardGroup className="foodCard">
            <Card>
                <CardImg top width="100%" src={habeshaFood.picture} alt="route" />
                <CardBody>
                    <CardTitle>
                        <Link to={`/HabeshaFood/${habeshaFood.id}`}>{habeshaFood.name}</Link>
                    </CardTitle>
                    <CardText>Type: {habeshaFood.type.name}</CardText>
                    <CardText>{habeshaFood.description}</CardText>
                    <CardText>Ingredients: {habeshaFood.ingredient}</CardText>
                    {editButton(habeshaFood.id)}
                    {deleteButton(habeshaFood)}
                </CardBody>
            </Card>
        </CardGroup >

    )
};

export default HabeshaFood;