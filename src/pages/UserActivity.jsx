import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '../components/Loading';
import ErrorPage from './auth/error';
import { call_api } from '../utils/utils';
import ViewRecipes from '../components/Recipe_Display/ViewRecipes';

const initialUser = {
    name: '',
    image: '',
    joinedDate: '',
};

export default function UserActivityPage() {
    const router = useRouter();
    const { userId } = router.query;

    const [user, setUser] = useState(initialUser);
    const [createdRecipes, setCreatedRecipes] = useState([]);
    const [likedRecipes, setLikedRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('created');

    useEffect(() => {
        if (!userId) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await call_api({ address: `/api/get-user-activity?userId=${userId}` });
                if (result.error) {
                    throw new Error(result.error);
                }
                setUser(result.user || initialUser);
                setCreatedRecipes(result.createdRecipes || []);
                setLikedRecipes(result.likedRecipes || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.message || 'Failed to load user activity');
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    const handleRecipeListUpdate = (updatedRecipe, deleteId) => {
        if (updatedRecipe) {
            if (activeTab === 'created') {
                setCreatedRecipes((prev) => prev.map(r => r._id === updatedRecipe._id ? updatedRecipe : r));
            } else {
                setLikedRecipes((prev) => prev.map(r => r._id === updatedRecipe._id ? updatedRecipe : r));
            }
        } else if (deleteId) {
            if (activeTab === 'created') {
                setCreatedRecipes((prev) => prev.filter(r => r._id !== deleteId));
            } else {
                setLikedRecipes((prev) => prev.filter(r => r._id !== deleteId));
            }
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorPage message={error} />;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-center space-x-4 mb-6">
                <Image src={user.image || '/default-user.png'} alt={user.name} width={60} height={60} className="rounded-full" />
                <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-gray-500">Joined: {user.joinedDate}</p>
                </div>
            </div>
            <div className="flex space-x-4 mb-4">
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'created' ? 'bg-brand-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('created')}
                >
                    Created Recipes
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'liked' ? 'bg-brand-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('liked')}
                >
                    Liked Recipes
                </button>
            </div>
            <ViewRecipes
                recipes={activeTab === 'created' ? createdRecipes : likedRecipes}
                handleRecipeListUpdate={handleRecipeListUpdate}
            />
        </div>
    );
}
