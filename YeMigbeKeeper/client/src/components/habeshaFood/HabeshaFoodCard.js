import React from "react";
import { useHistory } from "react-router-dom";
import CardDeck from 'react-bootstrap/CardDeck';
import { Card } from "reactstrap";


const HabeshaFood = ({ habeshaFood }) => {
    console.log(habeshaFood)
    const history = useHistory();

    return (
        <CardDeck>
            <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                    <Card.Title>Name: {habeshaFood.name}</Card.Title>
                    <Card.Text>Type: {habeshaFood.typeId}</Card.Text>
                    <Card.Text>Description: {habeshaFood.description}</Card.Text>
                    <Card.Text>Ingredients: {habeshaFood.ingredient}</Card.Text>
                    <Card.Text>Total calorie: {habeshaFood.totalCalorie}</Card.Text>
                    <Card.Text>Total fat: {habeshaFood.totalFat}</Card.Text>
                    <Card.Text>Cholesterol: {habeshaFood.cholesterol}</Card.Text>
                    <Card.Text>Sodium: {habeshaFood.sodium}</Card.Text>
                    <Card.Text>Total carbohydrate: {habeshaFood.totalCarbohydrate}</Card.Text>
                    <Card.Text>Protein: {habeshaFood.protein}</Card.Text>
                    <Card.Text>Calcium: {habeshaFood.calcium}</Card.Text>
                    <Card.Text>Iron: {habeshaFood.iron}</Card.Text>
                    <Card.Text>Potassium: {habeshaFood.potassium}</Card.Text>
                </Card.Body>
            </Card>
        </CardDeck>
    )
};

export default HabeshaFood;