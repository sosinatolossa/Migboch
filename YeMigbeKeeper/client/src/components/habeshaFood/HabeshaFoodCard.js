import React from "react";
import { CardGroup, Card, CardBody, CardTitle, CardText } from "reactstrap";



const HabeshaFood = ({ habeshaFood }) => {
    console.log(habeshaFood)
    //const history = useHistory();

    return (
        <CardGroup className="foodCard">
            <Card>

                <CardBody>
                    <CardTitle>Name: {habeshaFood.name}</CardTitle>
                    <CardText>Type: {habeshaFood.typeId}</CardText>
                    <CardText>Description: {habeshaFood.description}</CardText>
                    <CardText>Ingredients: {habeshaFood.ingredient}</CardText>
                    <CardText>Total calorie: {habeshaFood.totalCalorie}</CardText>
                    <CardText>Total fat: {habeshaFood.totalFat}</CardText>
                    <CardText>Cholesterol: {habeshaFood.cholesterol}</CardText>
                    <CardText>Sodium: {habeshaFood.sodium}</CardText>
                    <CardText>Total carbohydrate: {habeshaFood.totalCarbohydrate}</CardText>
                    <CardText>Protein: {habeshaFood.protein}</CardText>
                    <CardText>Calcium: {habeshaFood.calcium}</CardText>
                    <CardText>Iron: {habeshaFood.iron}</CardText>
                    <CardText>Potassium: {habeshaFood.potassium}</CardText>
                </CardBody>
            </Card>
        </CardGroup >

    )
};

export default HabeshaFood;