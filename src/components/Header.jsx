import { useRouter } from 'next/router';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Notifications from './Notifications';

const userNavigation = [
    { name: 'Your Profile', route: '/Profile' },
    { name: 'Sign out', route: '/auth/signout' },
];

const navigation = [
    { name: 'Home', route: '/Home', style: 'text-gray-300 hover:bg-brand-700 hover:text-white' },
    { name: 'Create Recipes', route: '/CreateRecipe', style: 'bg-brand-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-brand-600 transition-all animate-pulse' },
    { name: 'About', route: '/', style: 'text-gray-300 hover:bg-brand-700 hover:text-white' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Header({ user }) {
    const router = useRouter();
    const handleNavigation = (menu) => {
        if (menu.name === 'Sign out') {
            signOut();
            return;
        }
        if (menu.name === 'About') {
            window.open('https://github.com/Dereje1/smart-recipe-generator', '_blank');
        }
        router.push(menu.route);
    };
    if (!user) return null;
    return (
        <Disclosure as="nav" className="sticky top-0 z-header bg-brand-800 shadow-md" style={{ scrollbarGutter: 'stable' }}>
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-white">
                                    <Image
                                        src="/favicon.ico"
                                        alt="logo"
                                        width={62}
                                        height={62}
                                        priority
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <button
                                                key={item.name}
                                                onClick={() => handleNavigation(item)}
                                                className={classNames(item.style, 'px-3 py-2 rounded-md text-sm font-medium')}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Notifications />
                            <div className="hidden md:block">
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="flex max-w-xs items-center rounded-full bg-brand-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-800">
                                            <span className="sr-only">Open user menu</span>
                                            <Image
                                                className="h-8 w-8 rounded-full"
                                                src={user.image || '/default-user.png'}
                                                alt="User avatar"
                                                width={32}
                                                height={32}
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {userNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => handleNavigation(item)}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                                                        )}
                                                    >
                                                        {item.name}
                                                    </button>
                                                )}
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            {navigation.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item)}
                                    className={classNames(item.style, 'block px-3 py-2 rounded-md text-base font-medium w-full text-left')}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pt-4 pb-3">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <Image
                                        className="h-10 w-10 rounded-full"
                                        src={user.image || '/default-user.png'}
                                        alt="User avatar"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item)}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white w-full text-left"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}

export default Header;
