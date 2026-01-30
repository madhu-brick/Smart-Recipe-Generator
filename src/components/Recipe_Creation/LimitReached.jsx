import { Button } from '@headlessui/react';
import { useRouter } from 'next/router';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const LimitReached = ({
    message = "You've reached your recipe creation limit.",
    onAction,
    actionText = "Go to Home",
    fullHeight = false,
}) => {
    const router = useRouter();
    const handleAction = () => {
        if (onAction) {
            onAction();
        } else {
            router.push('/');
        }
    };
    return (
        <div className={`flex flex-col items-center justify-top ${fullHeight ? 'min-h-screen' : 'h-full'} bg-gray-100 p-4`}>
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
                <ExclamationCircleIcon className="block m-auto h-16 w-16 text-red-500"/>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Limit Reached</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <Button
                    onClick={handleAction}
                    className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400"
                >
                    {actionText}
                </Button>
            </div>
        </div>
    );
};

export default LimitReached;
