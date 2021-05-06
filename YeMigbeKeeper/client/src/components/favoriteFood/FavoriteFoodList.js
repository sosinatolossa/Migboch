import React, { useContext, useEffect } from "react";
import { Row, Col, Container } from "reactstrap";
import FavoriteFood from "./FavoriteFoodCard";
import { FavoriteFoodContext } from "./FavoriteFoodProvider";

const FavoriteFoodList = () => {
    const { favoriteFoods, getAllFavoriteFoods } = useContext(FavoriteFoodContext);


    useEffect(() => {
        getAllFavoriteFoods()
    }, []);

    // Maps through each habesh food object, sending 
    // them to be converted to HTML then prints them all out.
    return (
        <div>
            <Container>
                <Row>
                    {favoriteFoods.map((favoriteHabeshaFoodObj) => (
                        <Col md="4"><FavoriteFood key={favoriteHabeshaFoodObj.id} favoriteFood={favoriteHabeshaFoodObj} /></Col> //favoriteFood is our parameter(object) in FavoriteFoodCard
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default FavoriteFoodList;
