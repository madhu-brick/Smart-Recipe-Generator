import { useEffect, useState } from 'react';
import { DialogBackdrop, Dialog, DialogPanel } from '@headlessui/react';
import Image from 'next/image';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import useActionPopover from '../Hooks/useActionPopover';
import RecipeCard from '../RecipeCard';
import Loading from '../Loading';
import { ActionPopover } from './ActionPopover';
import UserLink from '../UserLink';
import { formatDate } from '../../utils/utils';

export default function RecipeDisplayModal({ isOpen, close, recipe, removeRecipe, handleRecipeListUpdate }) {
    const [isLoading, setIsLoading] = useState(false)

    const updateRecipe = (audioLink) => {
        if (!recipe) return null
        handleRecipeListUpdate({
            ...recipe,
            audio: audioLink
        })
    }

    const {
        handleClone,
        handleCopy,
        handlePlayRecipe,
        killAudio,
        handleDeleteDialog,
        handleDeleteRecipe,
        linkCopied,
        isPlayingAudio,
        isLoadingAudio,
        isDeleteDialogOpen
    } = useActionPopover(recipe, updateRecipe);

    useEffect(() => {
        // Stop audio playback when the modal is closed
        if (!isOpen) {
            killAudio()
        }
    }, [isOpen, killAudio]);

    const deleteAndRemoveRecipe = async () => {
        try {
            setIsLoading(true)
            const { message, error } = await handleDeleteRecipe();
            setIsLoading(false)
            removeRecipe({ message, error })
        } catch (error) {
            console.error(error)
        }
    }

    // ...existing code for modal rendering...
}
