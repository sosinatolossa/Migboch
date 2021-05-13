import React, { useContext } from "react";
import { CardGroup, Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FavoriteFoodContext } from "./FavoriteFoodProvider";


const FavoriteFood = ({ favoriteFood }) => {

    const { deleteFavoriteHabeshaFood, setMyFavFoodDeleted } = useContext(FavoriteFoodContext);

    // Handles showing the delete button if the current user is viewing a habesha food that they created. 
    const removeButton = () => {
        return <Button variant="danger" onClick={() => {
            const confirmBox = window.confirm(
                "Do you really want to remove this habesha food from your favorite habesha food list?"
            )
            if (confirmBox === true) {
                deleteFavoriteHabeshaFood(favoriteFood.habeshaFoodId)
                setMyFavFoodDeleted(true)//this means "I deleted a fav habesha food"
            }
        }} className="removeFavorite-button">
            <i class="fas fa-heart"></i>
        </Button>

    }

    return (
        <CardGroup className="foodCard" bg="warning" variant="light">
            <Card>
                <Card.Body>
                    {removeButton()}
                    <h1 className="foodName">
                        <Link style={{ color: "#ff7b00" }} to={`/habeshaFood/${favoriteFood.habeshaFood.id}`}>
                            {favoriteFood.habeshaFood.name}</Link>
                    </h1>
                    <Card.Img src={favoriteFood.habeshaFood.picture} />
                    <div class="details">
                        <Card.Text>Type: {favoriteFood.habeshaFood.type.name}</Card.Text>
                        <Card.Text>{favoriteFood.habeshaFood.description}</Card.Text>
                        <Card.Text>Ingredients: {favoriteFood.habeshaFood.ingredient}</Card.Text>
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className="cardFooter">Created by: {favoriteFood.habeshaFood.user.displayName}</div>
                </Card.Footer>
            </Card>
        </CardGroup >

    )
};

export default FavoriteFood;