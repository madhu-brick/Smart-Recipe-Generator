import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import NewIngredientDialog from './NewIngredientDialog';

const initialComboIngredient = { id: 0, name: '' };

const Chip = ({ ingredient, onDelete }) => {
    return (
        <div className="flex items-center bg-brand-500 text-white text-sm font-medium px-3 py-1.5 rounded-full m-1 transition transform hover:scale-105">
            <span>{`${ingredient.name}${ingredient.quantity ? ` (${ingredient.quantity})` : ''}`}</span>
            <button onClick={() => onDelete(ingredient.id)} className="ml-2 focus:outline-none">
                <XMarkIcon className="w-4 h-4 text-white hover:text-gray-200" />
            </button>
        </div>
    );
};

function IngredientList({ ingredientList, ingredientUpdate, generatedRecipes }) {
    const [selectedIngredient, setSelectedIngredient] = useState(initialComboIngredient);
    const [query, setQuery] = useState('');
    const filteredIngredients =
        query === ''
            ? ingredientList
            : ingredientList.filter((ingredient) =>
                ingredient.name.toLowerCase().includes(query.toLowerCase())
            );
    const handleSelectedIngredient = (ingredient) => {
        setSelectedIngredient(initialComboIngredient);
        ingredientUpdate(ingredient?.name);
    };
    return (
        <div className="relative w-full">
            <Combobox
                value={selectedIngredient}
                onChange={handleSelectedIngredient}
                disabled={Boolean(generatedRecipes.length)}
            >
                <div className="relative w-full">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <ComboboxInput
                        className={clsx(
                            'w-full rounded-lg border border-gray-300 bg-white py-3 pr-10 pl-9 text-base text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300'
                        )}
                        displayValue={(ingredient) => ingredient?.name}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    </ComboboxButton>
                    <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredIngredients.length === 0 && query !== '' ? (
                            <ComboboxOption value={initialComboIngredient} disabled>
                                No ingredients found.
                            </ComboboxOption>
                        ) : (
                            filteredIngredients.map((ingredient) => (
                                <ComboboxOption key={ingredient._id} value={{ id: ingredient._id, name: ingredient.name }}>
                                    {({ active, selected }) => (
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'} ${active ? 'bg-brand-100' : ''}`}>
                                            {ingredient.name}
                                        </span>
                                    )}
                                </ComboboxOption>
                            ))
                        )}
                    </ComboboxOptions>
                </div>
            </Combobox>
        </div>
    );
}

export default IngredientList;
