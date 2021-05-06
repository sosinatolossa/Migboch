import React, { useEffect, useState, useContext } from "react";
import { CardGroup, Card, CardBody, CardTitle, CardText, CardImg, Button } from "reactstrap";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import { useParams } from "react-router-dom";


const OneHabeshaFood = ({ aHabeshaFood }) => {
    const { deleteHabeshaFood } = useContext(HabeshaFoodContext);

    // Handles showing the delete button if the current user is viewing a habesha food that they created. 
    const deleteButton = (habeshaFood) => {
        let currentUser = JSON.parse(sessionStorage.getItem("User"));
        if (habeshaFood.user.id === currentUser.id) {
            return <Button variant="secondary" onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete this habesha food?"
                )
                if (confirmBox === true) {
                    deleteHabeshaFood(habeshaFood.id);
                }
            }} className="delete-button">
                Delete
            </Button>
        }
    }

    return (
        <CardGroup className="foodCard">
            <Card>
                <CardImg top width="100%" src={aHabeshaFood.picture} alt="route" />
                <CardBody>
                    <CardTitle>{aHabeshaFood.name}</CardTitle>
                    <CardText>Type: {aHabeshaFood.type?.name}</CardText>
                    <CardText>{aHabeshaFood.description}</CardText>
                    <CardText>Ingredients: {aHabeshaFood.ingredient}</CardText>
                    <CardText>{aHabeshaFood.totalCalorie} calories</CardText>
                    <CardText>{aHabeshaFood.totalFat} grams fat</CardText>
                    <CardText>{aHabeshaFood.cholesterol} mg cholesterol</CardText>
                    <CardText>{aHabeshaFood.sodium} mg sodium</CardText>
                    <CardText>{aHabeshaFood.totalCarbohydrate} gram carbohydrate</CardText>
                    <CardText>{aHabeshaFood.protein} grams protein</CardText>
                    <CardText>{aHabeshaFood.calcium} % calcium</CardText>
                    <CardText>{aHabeshaFood.iron} % iron</CardText>
                    <CardText>{aHabeshaFood.potassium} mg potassium</CardText>
                    {deleteButton(aHabeshaFood)}
                </CardBody>
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