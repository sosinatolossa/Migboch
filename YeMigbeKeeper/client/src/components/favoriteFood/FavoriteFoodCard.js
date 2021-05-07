import React from "react";
import { CardGroup, Card, CardBody, CardText, CardImg, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";


const FavoriteFood = ({ favoriteFood }) => {
    console.log(favoriteFood)

    return (
        <CardGroup className="foodCard">
            <Card>
                <CardImg top width="100%" src={favoriteFood.habeshaFood.picture} alt="route" />
                <CardBody>
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