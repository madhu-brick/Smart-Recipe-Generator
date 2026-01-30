import React from 'react'
import Image from "next/image"
import { Button } from '@headlessui/react'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { HandThumbUpIcon as HandThumbUpSolid, ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import { call_api } from "../../utils/utils";

const getThumbsup = ({ liked, owns }) => {
    if (owns) {
        return <HandThumbUpSolid className="block h-6 w-6 text-gray-500" />
    }
    if (liked) {
        return <HandThumbUpSolid className="block h-6 w-6 text-brand-500" />
    }
    return <HandThumbUpIcon className="block h-6 w-6 text-brand-500" />
}

const FrontDisplay = React.forwardRef(
    ({ recipe, showRecipe, updateRecipeList }, ref) => {

    const handleRecipeLike = async (recipeId) => {
        try {
            const result = await call_api({ address: '/api/like-recipe', method: 'put', payload: { recipeId } })
            updateRecipeList(result);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div ref={ref} className="recipe-card max-w-sm bg-gradient-to-r from-slate-200 to-stone-100 border border-gray-200 rounded-lg shadow-lg mt-4 mb-2 transform transition-transform hover:scale-105 hover:shadow-lg flex flex-col h-full animate-fadeInUp">
            <div className="relative w-full h-64"> {/* Add a container for the image */}
                <Image
                    src={recipe.imgLink}
                    fill
                    alt={recipe.name}
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                    priority
                    sizes="auto"
                />
            </div>
            <div className="p-5 flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 drop-shadow-lg">{recipe.name}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{recipe.additionalInformation.nutritionalInformation}</p>
            </div>
            <div className="mx-auto flex">
                {
                    recipe.dietaryPreference.map((preference) => (
                        <span key={preference} className="chip bg-brand-100 text-brand-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded hover:scale-110">{preference}</span>
                    ))
                }
            </div>
            <div className="flex justify-between items-center p-4">
                <Button
                    className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-full hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition duration-300 ease-in-out"
                    onClick={() => showRecipe(recipe)}
                >
                    <ArrowRightCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    View
                </Button>
                <Button
                    className="flex items-center gap-2 bg-brand-100 text-brand-800 px-4 py-2 rounded-full hover:bg-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition duration-300 ease-in-out"
                    onClick={() => handleRecipeLike(recipe._id)}
                >
                    {getThumbsup({ liked: recipe.liked, owns: recipe.owns })}
                    {recipe.likes}
                </Button>
            </div>
        </div>
    )
})

export default FrontDisplay;
