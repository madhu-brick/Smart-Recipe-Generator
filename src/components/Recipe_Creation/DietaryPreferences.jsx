import { useState, useEffect } from 'react';
import { Checkbox } from '@headlessui/react';
import {
  CheckIcon,
  SparklesIcon,
  CubeIcon,
  FireIcon,
  CakeIcon,
  BoltIcon,
  GlobeAltIcon,
  HeartIcon,
} from '@heroicons/react/24/solid';

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Halal',
  'Kosher'
];

const iconMap = {
  Vegetarian: SparklesIcon,
  Vegan: CubeIcon,
  'Gluten-Free': FireIcon,
  'Dairy-Free': CakeIcon,
  Keto: BoltIcon,
  Halal: GlobeAltIcon,
  Kosher: HeartIcon,
};

const tooltipMap = {
  Vegetarian: 'No meat or fish',
  Vegan: 'No animal products',
  'Gluten-Free': 'No wheat, barley or rye',
  'Dairy-Free': 'No milk or dairy products',
  Keto: 'Low-carb, high-fat',
  Halal: 'Halal-certified ingredients',
  Kosher: 'Prepared according to Jewish dietary laws',
};

export default function DietaryPreferences({
  preferences,
  updatePreferences,
  generatedRecipes,
}) {
  const [noPreference, setNoPreference] = useState(false);
  useEffect(() => {
    if (!preferences.length) {
      setNoPreference(true);
    } else {
      setNoPreference(false);
    }
  }, [preferences]);
  const handleToggle = (option) => {
    if (preferences.includes(option)) {
      updatePreferences(preferences.filter((p) => p !== option));
    } else {
      updatePreferences([...preferences, option]);
    }
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dietary Preferences</h3>
      <div className="flex flex-wrap gap-3">
        {dietaryOptions.map((option) => {
          const Icon = iconMap[option];
          return (
            <button
              key={option}
              type="button"
              className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200 ${preferences.includes(option) ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-brand-100'}`}
              title={tooltipMap[option]}
              onClick={() => handleToggle(option)}
              disabled={!!generatedRecipes.length}
            >
              <Icon className="w-5 h-5 mr-2" />
              {option}
              {preferences.includes(option) && <CheckIcon className="w-4 h-4 ml-2" />}
            </button>
          );
        })}
      </div>
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={noPreference}
            onChange={() => {
              if (noPreference) {
                setNoPreference(false);
              } else {
                setNoPreference(true);
                updatePreferences([]);
              }
            }}
            disabled={!!generatedRecipes.length}
            className="form-checkbox h-4 w-4 text-brand-500"
          />
          <span className="ml-2 text-gray-600">No Preference</span>
        </label>
      </div>
    </div>
  );
}
