import React, { useState } from "react";
import { CardGroup, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Recipe = ({ recipe }) => {

    const [show, setShow] = useState(false); //modal state

    const handleClose = () => setShow(false); //closes modal
    const handleShow = () => setShow(true); //opens the modal

    return (
        <>
            <CardGroup className="recipeCard" style={{ margin: "10px" }}>
                <Card>
                    <Card.Body>
                        <h1 className="foodName">
                            <Link style={{ color: "#ff7b00" }} to={`/HabeshaFood/${recipe.habeshaFoodId}`}>{recipe.habeshaFood.name}</Link>
                        </h1>
                        <Card.Img top width="80%" src={recipe.habeshaFood.picture} alt="route" />
                        <div className="recipePopupBtn">
                            <Button onClick={handleShow} variant="warning" style={{ margin: "5px" }}>Recipe</Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Card.Text style={{ backgroundColor: "rgba(170, 237, 139, 0.35)" }}>{recipe.theRecipe}</Card.Text>
                            <Button variant="danger" onClick={handleClose} style={{ margin: "5px" }}>
                                <i class="fas fa-window-close"></i>
                            </Button>
                        </Modal>
                        <h4 className="helfulLinkTitle">Helpful link</h4>
                        <Card.Text className="embed-responsive embed-responsive-16by9" >
                            <iframe className="embed-responsive-item" src={recipe.helpfulLink} allowfullscreen />
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup >
        </>
    )
};

export default Recipe;

