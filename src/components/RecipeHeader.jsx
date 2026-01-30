import Image from 'next/image';
import UserLink from './UserLink';
import { formatDate } from '../utils/utils';

const RecipeHeader = ({ recipeData }) => (
    <>
        <div className="relative w-full h-80">
            <Image
                src={recipeData.imgLink}
                alt={recipeData.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transform hover:scale-105 transition-transform duration-300"
                priority
            />
        </div>
        <div className="pl-6 pt-6 pr-6">
            <h2 className="text-2xl font-bold mb-2 mt-2">{recipeData.name}</h2>
            <div className="flex items-center mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                        src={recipeData.owner.image}
                        alt={recipeData.owner.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <span className="text-gray-700 text-lg">By <UserLink
                        userId={recipeData.owner._id}
                        name={recipeData.owner.name}
                    /></span>
                    <p className="text-sm text-gray-500">{formatDate(recipeData.createdAt)}</p>
                </div>
            </div>
            <div className="mb-0">
                <h3 className="text-xl font-semibold mb-2">Dietary Preferences</h3>
                <div className="flex flex-wrap gap-2">
                    {recipeData.dietaryPreference.map((preference) => (
                        <span
                            key={preference}
                            className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                            {preference}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </>
);

export default RecipeHeader;
