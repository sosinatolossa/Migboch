import React, { useEffect, useContext } from "react";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import HabeshaFood from "./HabeshaFoodCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const MyHabeshaFoods = () => {
    const { habeshaFoods, getHabeshaFoodsByUser } = useContext(HabeshaFoodContext);
    const history = useHistory();

    useEffect(() => {
        getHabeshaFoodsByUser();
    }, []);

    return (
        <Container>
            <Button className="addNewHabeshaFoodBtn" onClick={() => { history.push("/HabeshaFood/create") }}>Add habesha food</Button>
            <Row>
                {habeshaFoods?.map((habeshaFoodObj) => (
                    <Col border="primary" md="4"><HabeshaFood key={habeshaFoodObj.id} habeshaFood={habeshaFoodObj} /></Col>
                ))}
            </Row>
        </Container>
    );
};

export default MyHabeshaFoods;