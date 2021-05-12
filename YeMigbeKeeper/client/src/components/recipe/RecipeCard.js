import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Recipe = ({ recipe }) => {

    return (
        <CardGroup className="recipeCard">
            <Card>
                <Card.Body>
                    <Card.Header>
                        <Link to={`/HabeshaFood/${recipe.habeshaFoodId}`}>{recipe.habeshaFood.name}</Link>
                    </Card.Header>
                    <Card.Img top width="80%" src={recipe.habeshaFood.picture} alt="route" />
                    <Card.Text>Recipe: {recipe.theRecipe}</Card.Text>
                    <Card.Text>Helpful link: {recipe.helpfulLink}</Card.Text>
                </Card.Body>
            </Card>
        </CardGroup >
    )
};

export default Recipe;