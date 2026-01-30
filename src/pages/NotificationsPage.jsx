import { useState } from 'react';
import { useRouter } from 'next/router';
import { CheckIcon } from '@heroicons/react/24/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { call_api, getServerSidePropsUtility, formatDate } from '../utils/utils';

const NotificationsPage = ({ initialNotifications }) => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const router = useRouter();
    
    const markAsRead = async (id) => {
        try {
            await call_api({ address: `/api/read-notification?id=${id}`, method: 'put' });
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification._id === id ? { ...notification, read: true } : notification
                )
            );
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
            {notifications.length === 0 ? (
                <p className="text-sm text-gray-500">You have no notifications.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {notifications.map(({ read, _id, message, createdAt, recipeId }) => (
                        <li
                            key={_id}
                            className={`py-3 px-2 flex items-start space-x-3 rounded-md hover:bg-gray-100 ${read ? 'text-gray-500' : 'text-gray-800 font-bold'}`}
                        >
                            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10">
                                {read ? (
                                    <CheckIcon className="h-6 w-6 text-brand-500" />
                                ) : (
                                    <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm">{message}</p>
                                <p className="text-xs text-gray-400">{formatDate(createdAt)}</p>
                                <div className="flex space-x-2 mt-1">
                                    {!read && (
                                        <button
                                            className="text-xs text-brand-500 hover:underline"
                                            onClick={() => markAsRead(_id)}
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                    {recipeId && (
                                        <button
                                            className="text-xs text-blue-500 hover:underline"
                                            onClick={() => router.push(`/RecipeDetail?id=${recipeId}`)}
                                        >
                                            View Recipe
                                        </button>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export async function getServerSideProps(context) {
    return await getServerSidePropsUtility(context, 'api/get-notifications', 'initialNotifications');
}

export default NotificationsPage;
