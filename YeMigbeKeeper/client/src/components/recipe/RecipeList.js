import React, { useContext, useEffect } from "react";
import { RecipeContext } from "./RecipeProvider";
import Recipe from "./RecipeCard";
import { Row, Col, Container } from "react-bootstrap";

const RecipeList = () => {
    const { recipes, getAllRecipes } = useContext(RecipeContext);
    console.log(recipes, "the recipes in recipe list")

    useEffect(() => {
        getAllRecipes()
    }, []);

    // Maps through each recipe object, sending 
    // them to be converted to HTML then prints them all out.
    return (
        <Container>
            <Row>
                {recipes?.map((recipeObj) => (
                    <Col md="4"><Recipe key={recipeObj.id} recipe={recipeObj} /></Col>
                ))}
            </Row>
        </Container>
    );
};

export default RecipeList;
