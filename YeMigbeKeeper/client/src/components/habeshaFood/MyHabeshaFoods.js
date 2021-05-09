import React, { useEffect, useContext } from "react";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import HabeshaFood from "./HabeshaFoodCard";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyHabeshaFoods = () => {
    const { habeshaFoods, getHabeshaFoodsByUser } = useContext(HabeshaFoodContext);

    useEffect(() => {
        getHabeshaFoodsByUser();
    }, []);

    return (
        <Container>
            <Link to="/HabeshaFood/create" className="nav-link">
                Add new habesha food
        </Link>
            <Row>
                {habeshaFoods?.map((habeshaFoodObj) => (
                    <Col border="primary" md="4"><HabeshaFood key={habeshaFoodObj.id} habeshaFood={habeshaFoodObj} /></Col>
                ))}
            </Row>
        </Container>
    );
};

export default MyHabeshaFoods;