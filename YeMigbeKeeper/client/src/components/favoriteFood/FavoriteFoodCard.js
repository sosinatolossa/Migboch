import React, { useContext } from "react";
import { CardGroup, Card, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { FavoriteFoodContext } from "./FavoriteFoodProvider";


const FavoriteFood = ({ favoriteFood }) => {

    const { deleteFavoriteHabeshaFood, setMyFavFoodDeleted } = useContext(FavoriteFoodContext);
    //const history = useHistory();

    // Handles showing the delete button if the current user is viewing a habesha food that they created. 
    const removeButton = (favoriteFood) => {
        console.log(favoriteFood)
        return <Button variant="danger" onClick={() => {
            const confirmBox = window.confirm(
                "Do you really want to remove this habesha food from your favorite habesha food list?"
            )
            if (confirmBox === true) {
                deleteFavoriteHabeshaFood(favoriteFood)
                setMyFavFoodDeleted(true)//this means "I deleted a fav habesha food"
            }
        }} className="delete-button">
            <i class="fas fa-heart"></i>
        </Button>

    }

    return (
        <CardGroup className="foodCard" bg="warning" variant="light">
            <Card>
                <Card.Body>
                    {removeButton(favoriteFood.id)}
                    <Card.Header>
                        <Link to={`/habeshaFood/${favoriteFood.habeshaFood.id}`}>
                            {favoriteFood.habeshaFood.name}</Link>
                    </Card.Header>
                    <Card.Img top width="100%" src={favoriteFood.habeshaFood.picture} alt="route" />

                    <Card.Text>Type: {favoriteFood.habeshaFood.type.name}</Card.Text>
                    <Card.Text>{favoriteFood.habeshaFood.description}</Card.Text>
                    <Card.Text>Ingredients: {favoriteFood.habeshaFood.ingredient}</Card.Text>
                </Card.Body>
            </Card>
        </CardGroup >

    )
};

export default FavoriteFood;