import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Image from 'next/image';
import {
    XMarkIcon,
    ClipboardDocumentIcon,
    ClipboardIcon,
    TrashIcon,
    ArrowTopRightOnSquareIcon,
    InformationCircleIcon,
    PlayCircleIcon,
    StopCircleIcon,
} from '@heroicons/react/16/solid'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import DeleteDialog from './DeleteDialog';
import { useRouter } from 'next/router';
import audioload from '../../assets/audioload.gif';
import audioGenerate from '../../assets/audiogenerate.gif'

export function ActionPopover({ handlers, states, data }) {
    const router = useRouter();

    const handleOpenRecipe = () => {
        if (!handlers.closeDialog) return;
        handlers.closeDialog()
        window.open(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/RecipeDetail?recipeId=${data.recipe._id}`,
            '_blank',
            'noopener,noreferrer'
        )
    }

    const getAudioControls = () => {
        if (states.isLoadingAudio) {
            return <Image src={audioload} alt="Loading audio" />;
        }
        // ...existing code for audio controls...
    }

    // ...existing code for popover actions and rendering...
}
