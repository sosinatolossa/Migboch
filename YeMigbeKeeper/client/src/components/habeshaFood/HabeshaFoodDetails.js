import React, { useEffect, useState, useContext } from "react";
import { CardGroup, Card, Button } from "react-bootstrap";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import { useParams, useHistory } from "react-router-dom";


const OneHabeshaFood = ({ aHabeshaFood }) => {
    const { deleteHabeshaFood, getAllHabeshaFoods } = useContext(HabeshaFoodContext);
    const history = useHistory();

    // Handles showing the delete button if the current user is viewing a habesha food that they created. 
    const deleteButton = (habeshaFood) => {
        let currentUser = JSON.parse(sessionStorage.getItem("User"));
        if (aHabeshaFood.user?.id === currentUser.id) {
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
                <Card.Header>{aHabeshaFood.name}</Card.Header>
                <Card.Img top width="80%" src={aHabeshaFood.picture} rounded />
                <Card.Body>
                    <Card.Text>Type: {aHabeshaFood.type?.name}</Card.Text>
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
                    {deleteButton(aHabeshaFood)}
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