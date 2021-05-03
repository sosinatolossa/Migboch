import React, { useContext, useEffect } from "react";
import { HabeshaFoodContext } from "./HabeshaFoodProvider";
import HabeshaFood from "./HabeshaFoodCard";

const HabeshaFoodList = () => {
    const { habeshaFoods, getAllHabeshaFoods } = useContext(HabeshaFoodContext);

    useEffect(() => {
        getAllHabeshaFoods()
    }, []);

    // Maps through each habesh food object, sending 
    // them to be converted to HTML then prints them all out.
    return (
        <section>
            {habeshaFoods.map((aHabeshaFood) => (
                <HabeshaFood key={aHabeshaFood.id} HabeshaFood={aHabeshaFood} />
            ))}
        </section>
    );
};

export default HabeshaFoodList;
