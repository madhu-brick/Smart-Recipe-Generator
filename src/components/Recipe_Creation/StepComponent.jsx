import IngredientForm from './IngredientForm';
import DietaryPreferences from './DietaryPreferences';
import ReviewComponent from './ReviewIngredients';

function StepComponent({
    step,
    ingredientList,
    ingredients,
    updateIngredients,
    preferences,
    updatePreferences,
    editInputs,
    handleIngredientSubmit,
    generatedRecipes
}) {
    return (
        <div className="mt-8">
            {(() => {
                switch (step) {
                    case 0:
                        return (
                            <IngredientForm
                                ingredientList={ingredientList}
                                ingredients={ingredients}
                                updateIngredients={updateIngredients}
                                generatedRecipes={generatedRecipes}
                            />
                        );
                    case 1:
                        return (
                            <DietaryPreferences
                                preferences={preferences}
                                updatePreferences={updatePreferences}
                                generatedRecipes={generatedRecipes}
                            />
                        )
                    case 2:
                        return (
                            <ReviewComponent
                                ingredients={ingredients}
                                dietaryPreference={preferences}
                                onEdit={editInputs}
                                onSubmit={handleIngredientSubmit}
                                generatedRecipes={generatedRecipes}
                            />
                        )
                    default:
                        return null;
                }
            })()}
        </div>
    );
}

export default StepComponent;
