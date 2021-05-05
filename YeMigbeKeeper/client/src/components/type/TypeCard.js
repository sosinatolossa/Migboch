import React from "react";
import { CardGroup, Card, CardBody, CardText } from "reactstrap";


const Type = ({ type }) => {

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