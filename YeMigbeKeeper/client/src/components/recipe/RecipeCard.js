import React, { useState } from "react";
import { CardGroup, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MDBContainer } from 'mdbreact';


const Recipe = ({ recipe }) => {

    const [show, setShow] = useState(false); //modal state

    const handleClose = () => setShow(false); //closes modal
    const handleShow = () => setShow(true); //opens the modal

    return (
        <>
            <CardGroup className="recipeCard">
                <Card>
                    <Card.Body>
                        <Card.Header>
                            <Link to={`/HabeshaFood/${recipe.habeshaFoodId}`}>{recipe.habeshaFood.name}</Link>
                        </Card.Header>
                        <Card.Img top width="80%" src={recipe.habeshaFood.picture} alt="route" />
                        <Button className="recipePopupBtn" variant="primary" onClick={handleShow}>Recipe</Button>
                        <Modal show={show} onHide={handleClose}>
                            <Card.Text>{recipe.theRecipe}</Card.Text>
                            <Button variant="secondary" onClick={handleClose}>
                                close
                            </Button>
                        </Modal>

                        <Card.Text className="embed-responsive embed-responsive-16by9">
                            Helpful link: <iframe className="embed-responsive-item" src={recipe.helpfulLink} allowfullscreen></iframe>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup >
        </>
    )
};

export default Recipe;

