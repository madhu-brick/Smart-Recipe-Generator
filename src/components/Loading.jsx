import { useEffect, useState } from 'react';

const generationMessages = [
    '🔪 Chopping up some fresh ingredients...',
    '🥘 Stirring the pot with expert precision...',
    '🍳 Heating the pan to the perfect temperature...',
    '🧂 Adding a pinch of magic (and salt)...',
    '🍅 Tossing in the tomatoes—watch out for splashes!',
    '🔥 Turning up the heat for that perfect sear...',
    '🧁 Sprinkling in some creativity and flavor...',
    '🍽️ Plating the dish like a Michelin-star chef...',
    '🥄 Taste-testing... hmm, needs just a little more zest!',
    '🧑‍🍳 Adjusting the seasoning like a pro...',
    '🥖 Tearing up some fresh bread for the side...',
    '🍋 Squeezing in a bit of citrus for balance...',
    '🍷 Deglazing the pan with a splash of wine...',
    '🌀 Blending flavors together into something amazing...',
    '💡 A spark of inspiration—trying a new twist on the recipe!',
    '🌿 Garnishing with a touch of fresh herbs...',
    '⏳ Giving it time to simmer and develop rich flavors...',
    '🎨 Perfecting the presentation—food is art, after all!',
    '📸 Snapping a pic before serving—this one’s a beauty!',
    '🥢 Arranging everything just right before the final reveal...',
];

const savingMessages = [
    '🖼️ Generating beautiful images for your recipe...',
    '🚀 Fetching the perfect visuals from AI...',
    '📤 Uploading your recipe images to the cloud...',
    '☁️ Storing images securely on our servers...',
    '📝 Preparing your recipe details...',
    '💾 Saving your recipe to your personal cookbook...',
    '📑 Finalizing everything and making it just right...',
];

const finalGenerationMessage = '🍳 Finalizing your recipe... hold tight, flavor takes time!';
const finalSavingMessage = '🔄 Putting it all together... fetching images, saving your recipe, and making sure everything is perfect!';

const Loading = ({
    isComplete = false,
    isProgressBar = false,
    loadingType = 'generation',
}) => {
    const [progress, setProgress] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(
        loadingType === 'saving' ? savingMessages[0] : generationMessages[0]
    );

    useEffect(() => {
        if (!isProgressBar) return;
        if (isComplete) {
            setProgress(100);
            setCurrentMessage('✅ Your recipe is ready!');
            return;
        }
        let interval;
        let messageList = loadingType === 'saving' ? savingMessages : generationMessages;
        let i = 0;
        setProgress(0);
        setCurrentMessage(messageList[0]);
        interval = setInterval(() => {
            i++;
            setProgress((prev) => Math.min(prev + 100 / messageList.length, 100));
            if (i < messageList.length) {
                setCurrentMessage(messageList[i]);
            } else {
                setCurrentMessage(
                    loadingType === 'saving' ? finalSavingMessage : finalGenerationMessage
                );
                clearInterval(interval);
            }
        }, 900);
        return () => clearInterval(interval);
    }, [isProgressBar, isComplete, loadingType]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
            {isProgressBar && (
                <div className="w-full max-w-md mb-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-2 bg-brand-500 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}
            <div className="text-lg font-medium text-gray-700 animate-pulse text-center">
                {currentMessage}
            </div>
        </div>
    );
};

export default Loading;
