import React, { useContext, useEffect } from "react";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import HabeshaFood from "./HabeshaFoodCard";
import { Row, Col, Container } from "reactstrap";

const HabeshaFoodList = () => {
    const { habeshaFoods, getAllHabeshaFoods } = useContext(HabeshaFoodContext);

    useEffect(() => {
        getAllHabeshaFoods()
    }, []);

    // Maps through each habesh food object, sending 
    // them to be converted to HTML then prints them all out.
    return (
        <Container>
            <Row>
                {habeshaFoods.map((habeshaFoodObj) => (
                    <Col md="4"><HabeshaFood key={habeshaFoodObj.id} habeshaFood={habeshaFoodObj} /></Col> //habeshaFood is our parameter(object) in HabeshaFoodCard
                ))}
            </Row>
        </Container>
    );
};

export default HabeshaFoodList;
