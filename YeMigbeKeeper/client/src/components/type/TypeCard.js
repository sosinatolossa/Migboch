import React from "react";
import { CardGroup, Card, CardBody, CardText } from "reactstrap";


const Type = ({ type }) => {
    console.log(type)

    return (
        <CardGroup className="foodCard">
            <Card>
                <CardBody>
                    <CardText>{type.name}</CardText>
                </CardBody>
            </Card>
        </CardGroup >

    )
};

export default Type;