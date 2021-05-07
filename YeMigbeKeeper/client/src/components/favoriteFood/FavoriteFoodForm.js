// import React, { useContext, useState, useEffect } from "react"
// import { Link, useHistory } from "react-router-dom";
// import { FavoriteFoodContext } from "./FavoriteFoodProvider"

// export const AddHabeshaFoodToFavoriteHabeshaFood = () => {
//     const { addFavoriteHabeshaFood } = useContext(FavoriteFoodContext)

//     const history = useHistory();

//     const [favoriteHabeshaFood, setFavoriteHabeshaFood] = useState({
//         habeshaFoodId: 0
//     });
//     //wait for data before button is active
//     const [isLoading, setIsLoading] = useState(false);
//     const [favoriteHabeshaFoodObj, setFavoriteHabeshaFoodObj] = useState({});


//     //when a field changes, update state. The return will re-render and display based on the values in state
//     //Controlled component
//     const handleControlledInputChange = (event) => {
//         /* When changing a state object or array,
//         always create a copy, make changes, and then set state.*/
//         const newFavoriteHabeshaFood = { ...favoriteHabeshaFood }

//         newFavoriteHabeshaFood[event.target.id] = event.target.value
//         // update state
//         setFavoriteHabeshaFood(newFavoriteHabeshaFood)
//     }




//     const handleClickSaveHabeshaFood = () => {

//         const habeshaFoodId = parseInt(favoriteHabeshaFood.habeshaFoodId)

//         //disable the button - no extra clicks
//         setIsLoading(true); //this ensures the user cannot repeatedly click the button while the API is being updated
//         //habeshaFood - add
//         addFavoriteHabeshaFood({ //if not, this must be a new note so the input fields will be empty
//             habeshaFoodId: favoriteHabeshaFood.habeshaFoodId
//         }).then(setFavoriteHabeshaFoodObj)
//             .then(() => setIsLoading(false))

//     }

//     useEffect(() => {
//         if (favoriteHabeshaFoodObj.id > 0) {
//             history.push(`/favoriteFood`);
//         }
//     }, [favoriteHabeshaFoodObj]) //habeshaFoodObj here is waiting for the state to be set

//     return (
//         <div
//             disabled={isLoading}
//             onClick={event => {
//                 event.preventDefault()
//                 handleClickSaveHabeshaFood()
//             }}></div>
//     )
// }

// export default AddHabeshaFoodToFavoriteHabeshaFood;