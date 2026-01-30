import { Button } from '@headlessui/react';
import {
  PencilIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  CubeIcon,
  FireIcon,
  CakeIcon,
  BoltIcon,
  GlobeAltIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';
import useWindowSize from '../Hooks/useWindowSize';

const preferenceIconMap = {
  Vegetarian: SparklesIcon,
  Vegan: CubeIcon,
  'Gluten-Free': FireIcon,
  'Dairy-Free': CakeIcon,
  Keto: BoltIcon,
  Halal: GlobeAltIcon,
  Kosher: HeartIcon,
};

const ReviewComponent = ({
  ingredients,
  dietaryPreference,
  onSubmit,
  onEdit,
  generatedRecipes,
}) => {
  const { height } = useWindowSize();
  const showButtons = generatedRecipes.length === 0;
  return (
    <div
      className="w-full p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-stone-100 shadow-md rounded-xl animate-fadeInUp overflow-y-auto"
      style={{ maxHeight: height - 160 }}
    >
      <div className="px-1 py-1">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-medium text-gray-800 sm:text-3xl">
            {showButtons ? 'Review Your Selections' : 'Submit Your Recipe Choices'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {showButtons
              ? 'Double-check your ingredients and dietary preferences before generating recipes.'
              : 'Select your favorite recipes from the generated list.'}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, idx) => (
              <span
                key={idx}
                className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm"
              >
                {ingredient.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {dietaryPreference.map((pref, idx) => {
              const Icon = preferenceIconMap[pref];
              return (
                <span
                  key={idx}
                  className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {pref}
                </span>
              );
            })}
          </div>
        </div>
        {showButtons && (
          <div className="flex justify-between mt-6">
            <Button
              onClick={onEdit}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              <PencilIcon className="w-4 h-4 mr-2 inline" />Edit
            </Button>
            <Button
              onClick={onSubmit}
              className="bg-brand-500 text-white px-4 py-2 rounded-md hover:bg-brand-600 transition"
            >
              <CheckCircleIcon className="w-4 h-4 mr-2 inline" />Generate Recipes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
