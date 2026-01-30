import { useState } from 'react';
import ProfileInformation from '../components/Profile_Information/ProfileInformation';
import ProfileStickyBanner from '../components/Profile_Information/ProfileStickyBanner';
import ViewRecipes from '../components/Recipe_Display/ViewRecipes';
import { getServerSidePropsUtility, updateRecipeList } from '../utils/utils';

function Profile({ profileData }) {
    const [latestRecipes, setLatestRecipes] = useState(profileData.recipes);
    const [displaySetting, setDisplaySetting] = useState('created');

    const handleRecipeListUpdate = (recipe, deleteId) => {
        setLatestRecipes(updateRecipeList(latestRecipes, recipe, deleteId));
    };

    const handleDisplaySetting = () => {
        let view = [];
        if (displaySetting === 'created') {
            view = latestRecipes.filter(r => r.owns);
        } else if (displaySetting === 'favorites') {
            view = latestRecipes.filter(r => r.liked);
        } else {
            view = latestRecipes.filter(r => r.owns && r.likedBy.length > 0);
        }
        return view;
    };
    return (
        <div className="flex flex-col min-h-screen items-center">
            {/* Show banner only if user has no recipes */}
            <ProfileStickyBanner userHasRecipes={latestRecipes.filter(r => r.owns).length !== 0} />
            <ProfileInformation
                recipes={latestRecipes}
                updateSelection={val => setDisplaySetting(val)}
                selectedDisplay={displaySetting}
                AIusage={profileData.AIusage}
            />
            <ViewRecipes recipes={handleDisplaySetting()} handleRecipeListUpdate={handleRecipeListUpdate} />
        </div>
    );
}

export async function getServerSideProps(context) {
    return await getServerSidePropsUtility(context, 'api/profile', 'profileData');
}

export default Profile;
