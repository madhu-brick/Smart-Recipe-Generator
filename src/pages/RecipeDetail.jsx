import { useRouter } from "next/router";
import Image from 'next/image';
import { HandThumbUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { EllipsisHorizontalIcon, HandThumbUpIcon as HandThumbUpSolid } from '@heroicons/react/16/solid';
import useActionPopover from "../components/Hooks/useActionPopover";
import { useRecipeData } from "../components/Hooks/useRecipeData";
import { ActionPopover } from "../components/Recipe_Display/ActionPopover";
import RecipeHeader from "../components/RecipeHeader";
import UserLink from "../components/UserLink";
import Loading from "../components/Loading";
import ErrorPage from "./auth/error";
import { call_api } from "../utils/utils";

const getThumbsup = ({ liked, owns }) => {
    const baseClass = "size-8";
    if (owns) {
        return <HandThumbUpSolid className={`${baseClass} text-gray-500`} />;
    }
    if (liked) {
        return <HandThumbUpSolid className={`${baseClass} text-brand-500`} />;
    }
    return <HandThumbUpIcon className={`${baseClass} text-brand-500`} />;
};

export default function RecipeDetail() {
    const router = useRouter();
    const { recipeId } = router.query;
    const { recipeData, loading, error, setRecipeData, setLoading } = useRecipeData(recipeId);

    const updateRecipe = (audioLink) => {
        setRecipeData((prevRecipdata) => {
            if (!prevRecipdata) return null;
            return {
                ...prevRecipdata,
                audio: audioLink,
            };
        });
    };

    const handleRecipeLike = async (recipeId) => {
        try {
            const result = await call_api({ address: '/api/like-recipe', method: 'put', payload: { recipeId } });
            setRecipeData(result);
        } catch (error) {
            console.log(error);
        }
    };

    const {
        handleClone,
        handleCopy,
        handlePlayRecipe,
        handleDeleteDialog,
        handleDeleteRecipe,
        linkCopied,
        isPlayingAudio,
        isLoadingAudio,
        isDeleteDialogOpen
    } = useActionPopover(recipeData, setRecipeData, updateRecipe, setLoading);

    if (loading) return <Loading />;
    if (error) return <ErrorPage message={error} />;
    if (!recipeData) return <ErrorPage message="Recipe not found" />;

    return (
        <div className="min-h-screen bg-gradient-to-r from-brand-50 to-white p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-3xl">
                <RecipeHeader recipe={recipeData} />
                <div className="flex items-center space-x-4 mt-4">
                    <UserLink user={recipeData.user} />
                    <span className="text-xs text-gray-400">{recipeData.createdAt}</span>
                </div>
                <div className="mt-6">
                    <Image src={recipeData.image} alt={recipeData.title} width={600} height={400} className="rounded-lg" />
                </div>
                <div className="flex items-center space-x-2 mt-4">
                    {getThumbsup({ liked: recipeData.liked, owns: recipeData.owns })}
                    <span>{recipeData.likesCount}</span>
                    <button onClick={() => handleRecipeLike(recipeData._id)} className="ml-2 text-brand-500 hover:underline text-xs">Like</button>
                </div>
                <div className="mt-6">
                    <ActionPopover
                        recipe={recipeData}
                        handleClone={handleClone}
                        handleCopy={handleCopy}
                        handlePlayRecipe={handlePlayRecipe}
                        handleDeleteDialog={handleDeleteDialog}
                        linkCopied={linkCopied}
                        isPlayingAudio={isPlayingAudio}
                        isLoadingAudio={isLoadingAudio}
                    />
                </div>
                {isDeleteDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p>Are you sure you want to delete this recipe?</p>
                            <div className="flex space-x-4 mt-4">
                                <button onClick={() => handleDeleteRecipe(recipeData._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                                <button onClick={handleDeleteDialog} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
