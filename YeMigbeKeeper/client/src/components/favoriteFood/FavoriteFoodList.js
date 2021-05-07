import React, { useContext, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import { FavoriteFoodContext } from "./FavoriteFoodProvider";
import FavoriteFood from "../favoriteFood/FavoriteFoodCard";

const FavoriteFoodList = () => {
    const { myFavoriteFoods, getFavoriteFoodsByUser } = useContext(FavoriteFoodContext);


    useEffect(() => {
        getFavoriteFoodsByUser()
    }, [myFavoriteFoods]);

    // Maps through each habesh food object, sending 
    // them to be converted to HTML then prints them all out.
    return (
        <div>
            <Container>
                <Row>
                    {myFavoriteFoods.map((favoriteHabeshaFoodObj) => (
                        <Col md="4"><FavoriteFood key={favoriteHabeshaFoodObj.id} favoriteFood={favoriteHabeshaFoodObj} /></Col> //favoriteFood is our parameter(object) in FavoriteFoodCard
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default FavoriteFoodList;
