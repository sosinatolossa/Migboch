import React, { useContext } from "react";
import { CardGroup, Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import { FavoriteFoodContext } from "../favoriteFood/FavoriteFoodProvider";
import "../styling/cards.css"

const HabeshaFood = ({ habeshaFood }) => {
    const { addFavoriteHabeshaFood } = useContext(FavoriteFoodContext)

    const history = useHistory();

    let currentUser = JSON.parse(sessionStorage.getItem("User"));

    const addFavoriteFoodButton = () => {
        const favoriteHabeshaFoodObj = {
            habeshaFoodId: habeshaFood.id
        }
        return <Button variant="danger" onClick={() => {
            addFavoriteHabeshaFood(favoriteHabeshaFoodObj)
        }} className="addFavorite-button" >
            <i class="far fa-heart"></i>
        </Button >
    }

    // Handles showing the edit button if the current user is viewing a habeshaFood that they wrote. 
    const editButton = () => {
        if (habeshaFood.user.id === currentUser?.id) {
            return <Button type="button" onClick={() => {
                history.push(`/habeshaFood/edit/${habeshaFood.id}`)
            }} className="edit-button" variant="danger">
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
            }} className="delete-button" variant="danger">
                <i class="fas fa-trash-alt"></i>
            </Button>
        }
    }

    return (
        <CardGroup className="foodCard">
            <Card >
                <Card.Body>
                    {addFavoriteFoodButton()}
                    <h1>
                        <Link className="foodName" style={{ marginLeft: "25px" }} to={`/HabeshaFood/${habeshaFood.id}`}>{habeshaFood.name}</Link>
                    </h1>
                    <Card.Img classname="size picture" src={habeshaFood.picture} alt="route" />
                    <div className="details">
                        <Card.Text>Type: {habeshaFood.type.name}</Card.Text>
                        <Card.Text>Star rating: {habeshaFood.rating}</Card.Text>
                        <Card.Text>{habeshaFood.description}</Card.Text>
                        <Card.Text>Ingredients: {habeshaFood.ingredient}</Card.Text>
                    </div>
                    {editButton()}
                    {deleteButton()}
                </Card.Body>

                <Card.Footer>
                    <div className="cardFooter">Created by: {habeshaFood.user.displayName}</div>
                </Card.Footer>
            </Card>
        </CardGroup >

    )
};

export default HabeshaFood;