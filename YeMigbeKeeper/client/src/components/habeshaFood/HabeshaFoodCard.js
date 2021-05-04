import React from "react";
import { CardGroup, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";


const HabeshaFood = ({ habeshaFood }) => {
    //console.log(habeshaFood)

    return (
        <CardGroup className="foodCard">
            <Card>

                <CardBody>
                    <CardTitle>
                        <Link to={`HabeshaFood/${habeshaFood.id}`}>Name: {habeshaFood.name}</Link>
                    </CardTitle>
                    <CardText>Type: {habeshaFood.typeId}</CardText>
                    <CardText>Description: {habeshaFood.description}</CardText>
                    <CardText>Ingredients: {habeshaFood.ingredient}</CardText>
                </CardBody>
            </Card>
        </CardGroup >

    )
};

export default HabeshaFood;