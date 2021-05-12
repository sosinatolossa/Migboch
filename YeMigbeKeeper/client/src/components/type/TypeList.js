import React, { useContext, useEffect } from "react";
import { TypeContext } from "./TypeProvider";
import Type from "./TypeCard";
import { Row, Col, Container } from "react-bootstrap";

const TypeList = () => {
    const { types, getAllTypes } = useContext(TypeContext);

    useEffect(() => {
        getAllTypes()
    }, []);

    // Maps through each habesh food object, sending 
    // them to be converted to HTML then prints them all out.
    return (
        <div>
            <Container>
                <Row>
                    {types.map((typeObj) => (
                        <Col md="4"><Type key={typeObj.id} type={typeObj} /></Col> //type is our parameter(object) in TypeCard
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default TypeList;
