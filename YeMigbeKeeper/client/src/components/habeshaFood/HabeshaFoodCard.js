import React from "react";
import { CardGroup, Card, CardBody, CardTitle, CardText, CardImg, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";


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
                </CardBody>
            </Card>
        </CardGroup >

    )
};

export default HabeshaFood;