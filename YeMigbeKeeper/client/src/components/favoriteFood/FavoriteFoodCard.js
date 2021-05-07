import React, { useContext } from "react";
import { CardGroup, Card, CardBody, CardText, CardImg, CardTitle, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { FavoriteFoodContext } from "./FavoriteFoodProvider";


const FavoriteFood = ({ favoriteFood }) => {

    const { deleteFavoriteHabeshaFood, setMyFavFoodDeleted } = useContext(FavoriteFoodContext);
    const history = useHistory();

    // Handles showing the delete button if the current user is viewing a habesha food that they created. 
    const removeButton = (favoriteFood) => {
        console.log(favoriteFood)
        return <Button variant="secondary" onClick={() => {
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
        <CardGroup className="foodCard">
            <Card>
                <CardBody>
                    {removeButton(favoriteFood.id)}
                    <CardImg top width="100%" src={favoriteFood.habeshaFood.picture} alt="route" />
                    <CardTitle>
                        <Link to={`/habeshaFood/${favoriteFood.habeshaFood.id}`}>
                            {favoriteFood.habeshaFood.name}</Link>
                    </CardTitle>
                    <CardText>Type: {favoriteFood.habeshaFood.type.name}</CardText>
                    <CardText>{favoriteFood.habeshaFood.description}</CardText>
                    <CardText>Ingredients: {favoriteFood.habeshaFood.ingredient}</CardText>
                </CardBody>
            </Card>
        </CardGroup >

    )
};

export default FavoriteFood;