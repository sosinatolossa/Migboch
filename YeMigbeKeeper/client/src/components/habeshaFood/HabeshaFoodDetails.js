import { CardGroup, Card, CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import React, { useContext, useEffect, useState } from "react";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import { useParams } from "react-router-dom";



const OneHabeshaFood = ({ aHabeshaFood }) => {
    console.log(aHabeshaFood)

    return (
        <CardGroup className="foodCard">
            <Card>
                <CardImg top width="100%" src={aHabeshaFood.picture} alt="route" />
                <CardBody>
                    <CardTitle>{aHabeshaFood.name}</CardTitle>
                    <CardText>Type: {aHabeshaFood.type?.name}</CardText>
                    <CardText>{aHabeshaFood.description}</CardText>
                    <CardText>Ingredients: {aHabeshaFood.ingredient}</CardText>
                    <CardText>{aHabeshaFood.totalCalorie} calories</CardText>
                    <CardText>{aHabeshaFood.totalFat} grams fat</CardText>
                    <CardText>{aHabeshaFood.cholesterol} mg cholesterol</CardText>
                    <CardText>{aHabeshaFood.sodium} mg sodium</CardText>
                    <CardText>{aHabeshaFood.totalCarbohydrate} gram carbohydrate</CardText>
                    <CardText>{aHabeshaFood.protein} grams protein</CardText>
                    <CardText>{aHabeshaFood.calcium} % calcium</CardText>
                    <CardText>{aHabeshaFood.iron} % iron</CardText>
                    <CardText>{aHabeshaFood.potassium} mg potassium</CardText>
                </CardBody>
            </Card>
        </CardGroup >

    )
};

const HabeshaFoodDetails = () => {
    const [habeshaFood, setHabeshaFood] = useState({});

    const { getHabehsaFoodById } = useContext(HabeshaFoodContext);
    const { id } = useParams();

    useEffect(() => {
        getHabehsaFoodById(id).then((res) => {
            setHabeshaFood(res);
        });
    }, []);

    return (
        <OneHabeshaFood key={habeshaFood.id} aHabeshaFood={habeshaFood} />
    )

}

export default HabeshaFoodDetails;