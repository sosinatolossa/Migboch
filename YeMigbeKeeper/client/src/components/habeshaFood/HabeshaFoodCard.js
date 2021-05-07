import React, { useContext, useEffect } from "react";
import { CardGroup, Card, CardBody, CardTitle, CardText, CardImg, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import AddHabeshaFoodToFavoriteHabeshaFood from "../favoriteFood/FavoriteFoodForm";


const HabeshaFood = ({ habeshaFood }) => {

    const history = useHistory();


    // Handles showing the edit button if the current user is viewing a habeshaFood that they wrote. 
    const addFavoriteFoodButton = (habeshaFood) => {

        return <Button type="button" onClick={() => {
            let currentUser = JSON.parse(sessionStorage.getItem("User"));
            (habeshaFood.user?.id === currentUser.id)
                //AddHabeshaFoodToFavoriteHabeshaFood()
                (history.push(`/favoriteFood`))
        }} className="addFavoriteButton-button" >
            <i class="far fa-heart"></i>
        </Button >

    }

    // Handles showing the edit button if the current user is viewing a habeshaFood that they wrote. 
    const editButton = (habeshaFoodId) => {
        let currentUser = JSON.parse(sessionStorage.getItem("User"));
        if (habeshaFood.user.id === currentUser.id) {
            return <Button type="button" onClick={() => {
                history.push(`/habeshaFood/edit/${habeshaFoodId}`)
            }} className="edit-button">
                <i class="fas fa-pen"></i>
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
                <i class="fas fa-trash-alt"></i>
            </Button>
        }
    }

    return (
        <CardGroup className="foodCard">
            <Card>
                <CardBody>
                    {addFavoriteFoodButton(habeshaFood) && <AddHabeshaFoodToFavoriteHabeshaFood />}
                    <CardImg top width="100%" src={habeshaFood.picture} alt="route" />
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