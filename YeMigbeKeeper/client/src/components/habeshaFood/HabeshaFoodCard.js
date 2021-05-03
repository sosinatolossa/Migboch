import React from "react";
import { useHistory } from "react-router-dom";
import CardDeck from 'react-bootstrap/CardDeck';
import { Card } from "reactstrap";


const HabeshaFood = ({ habeshaFood }) => {
    const history = useHistory();

    return (
        <CardDeck>
            <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                    <Card.Title>Name: {habeshaFood.Name}</Card.Title>
                    <Card.Text>Type: {habeshaFood.TypeId}</Card.Text>
                    <Card.Text>Description: {habeshaFood.Description}</Card.Text>
                    <Card.Text>Ingredients: {habeshaFood.Ingredient}</Card.Text>
                    <Card.Text>Total calorie: {habeshaFood.TotalCalorie}</Card.Text>
                    <Card.Text>Total fat: {habeshaFood.TotalFat}</Card.Text>
                    <Card.Text>Cholesterol: {habeshaFood.Cholesterol}</Card.Text>
                    <Card.Text>Sodium: {habeshaFood.Sodium}</Card.Text>
                    <Card.Text>Total carbohydrate: {habeshaFood.TotalCarbohydrate}</Card.Text>
                    <Card.Text>Protein: {habeshaFood.Protein}</Card.Text>
                    <Card.Text>Calcium: {habeshaFood.Calcium}</Card.Text>
                    <Card.Text>Iron: {habeshaFood.Iron}</Card.Text>
                    <Card.Text>Potassium: {habeshaFood.Potassium}</Card.Text>
                </Card.Body>
            </Card>
        </CardDeck>
    )
};

export default HabeshaFood;