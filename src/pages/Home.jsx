import { useEffect, useState, useRef, useCallback } from 'react';
import { ClockIcon, FireIcon } from '@heroicons/react/24/solid';
import SearchBar from '../components/SearchBar';
import ViewRecipes from '../components/Recipe_Display/ViewRecipes';
import FloatingActionButtons from '../components/FloatingActionButtons';
import Loading from '../components/Loading';
import PopularTags from '../components/PopularTags';
import { usePagination } from '../components/Hooks/usePagination';

const Home = () => {
    const [searchVal, setSearchVal] = useState('');
    const [sortOption, setSortOption] = useState('popular');
    const [searchTrigger, setSearchTrigger] = useState(false);

    const observerRef = useRef(null);
    const searchTimeout = useRef(null);
    const lastRecipeRef = useRef(null);

    const isSearching = searchVal.trim() !== "";
    const endpoint = isSearching ? "/api/search-recipes" : "/api/get-recipes";

    const {
        data: latestRecipes,
        loading,
        popularTags,
        loadMore,
        handleRecipeListUpdate,
        totalRecipes,
        page,
        totalPages
    } = usePagination({
        endpoint,
        sortOption,
        searchQuery: searchVal.trim(),
        searchTrigger,
        resetSearchTrigger: () => setSearchTrigger(false),
    });
    useEffect(() => {
        if (!latestRecipes.length) return;

        const lastRecipeElement = lastRecipeRef.current;
        if (!lastRecipeElement) return;

        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new window.IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting && !loading && page < totalPages) {
                loadMore();
                if (searchVal.trim() && !searchTrigger) {
                    setSearchTrigger(true);
                }
            }
        }, { threshold: 0.5 });

        observerRef.current.observe(lastRecipeElement);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, [latestRecipes, loading, page, totalPages, loadMore, searchVal, searchTrigger]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-brand-50 to-white p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl">
                <SearchBar
                    value={searchVal}
                    onChange={setSearchVal}
                    onSortChange={setSortOption}
                    sortOption={sortOption}
                />
                <PopularTags tags={popularTags} onTagClick={setSearchVal} />
                <ViewRecipes
                    recipes={latestRecipes}
                    loading={loading}
                    lastRecipeRef={lastRecipeRef}
                    handleRecipeListUpdate={handleRecipeListUpdate}
                    totalRecipes={totalRecipes}
                />
            </div>
            <FloatingActionButtons />
            {loading && <Loading />}
        </div>
    );
};

export default Home;
