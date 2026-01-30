import { Switch, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const RecipeCard = ({ recipe, handleRecipeSelection, selectedRecipes, showSwitch, removeMargin }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const parentClassName = `max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden relative ${removeMargin ? '' : 'mt-10 mb-5'}`;
    return (
        <div className={`${parentClassName} overflow-x-hidden`} key={recipe.name}>
            <div className="px-6 py-4 relative">
                <div className="flex justify-between items-stretch w-full">
                    <div
                        className={`font-bold text-lg sm:text-xl lg:text-2xl mb-4 
            ${showSwitch && !isExpanded ? 'truncate max-w-[65%] sm:max-w-[75%] lg:max-w-[85%]' : 'w-full'}
            ${showSwitch ? 'cursor-pointer' : ''}`}
                        onClick={() => showSwitch && setIsExpanded(!isExpanded)}
                        title={!showSwitch ? recipe.name : ''}
                    >
                        {recipe.name}
                    </div>
                    {showSwitch && (
                        <Switch
                            checked={selectedRecipes.includes(recipe.openaiPromptId)}
                            onChange={() =>
                                handleRecipeSelection ? handleRecipeSelection(recipe.openaiPromptId) : undefined
                            }
                            className={`
                relative inline-flex flex-shrink-0
                ${selectedRecipes.includes(recipe.openaiPromptId) ? 'bg-brand-500' : 'bg-gray-300'}
                h-[20px] w-[40px] sm:h-[28px] sm:w-[54px]
                cursor-pointer rounded-full border-2 border-transparent
                transition-colors duration-200 ease-in-out focus:outline-none
            `}
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={`
                    pointer-events-none inline-block
                    h-[16px] w-[16px] sm:h-[24px] sm:w-[23px]
                    ${selectedRecipes.includes(recipe.openaiPromptId) ? 'translate-x-5 sm:translate-x-7' : 'translate-x-0'}
                    transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out
                `}
                            />
                        </Switch>
                    )}
                </div>
                <div className="mb-2 text-gray-700 text-base">
                    {recipe.description}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                    {recipe.ingredients && recipe.ingredients.map((ingredient, idx) => (
                        <span key={idx} className="bg-brand-100 text-brand-800 px-2 py-1 rounded-full text-xs">
                            {ingredient.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                    {recipe.dietaryPreference && recipe.dietaryPreference.map((pref, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                            {pref}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-400">{recipe.cookTime}</span>
                    <span className="text-xs text-gray-400">{recipe.servings} servings</span>
                </div>
                {showSwitch && (
                    <button
                        className="absolute right-4 top-4 text-gray-400 hover:text-brand-500"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <ChevronDownIcon className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                )}
            </div>
            {isExpanded && (
                <div className="px-6 pb-4">
                    <div className="text-sm text-gray-600 mb-2">{recipe.instructions}</div>
                </div>
            )}
        </div>
    );
};

export default RecipeCard;
