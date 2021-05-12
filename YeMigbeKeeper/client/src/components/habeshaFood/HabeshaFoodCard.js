import React, { useContext, useEffect } from "react";
import { CardGroup, Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import { FavoriteFoodContext } from "../favoriteFood/FavoriteFoodProvider";

const HabeshaFood = ({ habeshaFood }) => {
    const { addFavoriteHabeshaFood } = useContext(FavoriteFoodContext)

    const history = useHistory();

    let currentUser = JSON.parse(sessionStorage.getItem("User"));

    const addFavoriteFoodButton = () => {
        const favoriteHabeshaFoodObj = {
            //userId: currentUser?.id,
            habeshaFoodId: habeshaFood.id
        }
        return <Button variant="danger" onClick={() => {
            addFavoriteHabeshaFood(favoriteHabeshaFoodObj)
                .then(history.push(`/favoriteFood`))
        }} className="addFavoriteButton-button" >
            <i class="far fa-heart"></i>
        </Button >


    }

    // Handles showing the edit button if the current user is viewing a habeshaFood that they wrote. 
    const editButton = () => {
        if (habeshaFood.user.id === currentUser?.id) {
            return <Button type="button" onClick={() => {
                history.push(`/habeshaFood/edit/${habeshaFood.id}`)
            }} className="edit-button">
                <i class="fas fa-pen"></i>
            </Button>
        }
    }

    const { deleteHabeshaFood, getAllHabeshaFoods } = useContext(HabeshaFoodContext);

    // Handles showing the delete button if the current user is viewing a habesha food that they created. 
    const deleteButton = () => {
        if (habeshaFood.user.id === currentUser?.id) {
            return <Button variant="secondary" onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete this habesha food?"
                )
                if (confirmBox === true) {
                    deleteHabeshaFood(habeshaFood.id)
                        .then(getAllHabeshaFoods);
                }
            }} className="delete-button">
                <i class="fas fa-trash-alt"></i>
            </Button>
        }
    }

    return (
        <CardGroup className="foodCard">
            <Card >
                <Card.Body>
                    {addFavoriteFoodButton()}
                    <Card.Header>
                        <Link to={`/HabeshaFood/${habeshaFood.id}`}>{habeshaFood.name}</Link>
                    </Card.Header>
                    <Card.Img top width="80%" src={habeshaFood.picture} alt="route" />
                    <Card.Text>Type: {habeshaFood.type.name}</Card.Text>
                    <Card.Text>Star rating: {habeshaFood.rating}</Card.Text>
                    <Card.Text>{habeshaFood.description}</Card.Text>
                    <Card.Text>Ingredients: {habeshaFood.ingredient}</Card.Text>
                    {editButton()}
                    {deleteButton()}
                </Card.Body>

                <Card.Footer>
                    <small className="cardFooter">Created by: {habeshaFood.user.displayName}</small>
                </Card.Footer>
            </Card>
        </CardGroup >

    )
};

export default HabeshaFood;