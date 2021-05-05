import React from "react";
import { CardGroup, Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { Link } from "react-router-dom";


const HabeshaFood = ({ habeshaFood }) => {
    //console.log(habeshaFood)

    return (
        <CardGroup className="foodCard">
            <Card>
                <CardImg top width="100%" src={habeshaFood.picture} alt="route" />
                <CardBody>
                    <CardTitle>
                        <Link to={`HabeshaFood/${habeshaFood.id}`}>{habeshaFood.name}</Link>
                    </CardTitle>
                    <CardText>Type: {habeshaFood.type.name}</CardText>
                    <CardText>{habeshaFood.description}</CardText>
                    <CardText>Ingredients: {habeshaFood.ingredient}</CardText>
                </CardBody>
            </Card>
        </CardGroup >

    )
};

export default HabeshaFood;