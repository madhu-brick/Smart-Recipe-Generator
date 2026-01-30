import { useEffect, useState } from 'react';
import {
  Description, Dialog, DialogPanel,
  DialogTitle, DialogBackdrop,
  Button, Input, Field, Label
} from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import pluralize from 'pluralize';
import clsx from 'clsx';
import { call_api } from '../../utils/utils';
import Loading from '../Loading';

function NewIngredientDialog({ ingredientList, updateIngredientList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    setIngredientName('');
    setMessage('');
  }, [isOpen]);
  const handleInputChange = (e) => {
    setIngredientName(e.target.value);
    setMessage('');
    setIsDisabled(false);
  };
  const handleSubmit = async () => {
    if (!ingredientName.trim()) return;
    if (ingredientName.trim().length > 20) {
      setMessage('This ingredient name is too long!');
      setIsDisabled(true);
      return;
    }
    const ingredient = ingredientName.trim().toLowerCase();
    const availableIngredients = ingredientList.map(i => i.name.toLowerCase());
    const pluralizedIngredient = pluralize(ingredient);
    const singularizedIngredient = pluralize.singular(ingredient);
    const isAvailable = availableIngredients.includes(ingredient) ||
      availableIngredients.includes(pluralizedIngredient) ||
      availableIngredients.includes(singularizedIngredient);
    if (isAvailable) {
      setMessage('This ingredient is already available');
      setIsDisabled(true);
      return;
    }
    setIsLoading(true);
    try {
      const newIngredient = await call_api({
        address: '/api/add-ingredient',
        method: 'post',
        payload: { name: ingredient },
      });
      updateIngredientList(newIngredient);
      setMessage('Ingredient added successfully!');
      setIsDisabled(true);
    } catch (error) {
      setMessage('Failed to add ingredient.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button
        className="flex items-center px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition"
        onClick={() => setIsOpen(true)}
      >
        <PlusCircleIcon className="w-5 h-5 mr-2" />
        Add New Ingredient
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogBackdrop />
        <DialogPanel className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <DialogTitle className="text-lg font-bold mb-2">Add New Ingredient</DialogTitle>
          <Field className="mb-4">
            <Label htmlFor="ingredientName">Ingredient Name</Label>
            <Input
              id="ingredientName"
              value={ingredientName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              placeholder="e.g. zucchini"
              disabled={isLoading || isDisabled}
            />
          </Field>
          {message && <p className="text-sm text-red-500 mb-2">{message}</p>}
          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || isDisabled}
              className="bg-brand-500 text-white px-4 py-2 rounded-md hover:bg-brand-600 transition"
            >
              {isLoading ? 'Adding...' : 'Add Ingredient'}
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}

export default NewIngredientDialog;
