import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Header from './Header';
import Hero from '../pages/Hero';
import Loading from './Loading';
import ErrorPage from '../pages/auth/error';

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { error: signinError } = router.query;

  if (signinError) {
    return <ErrorPage />;
  }

  if (router.pathname === '/_error') {
    return <ErrorPage message="Page not found" />;
  }

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    if (router.pathname === '/RecipeDetail') {
      signIn('google');
      return null;
    }
    return <Hero />;
  }

  if (session) {
    return (
      <div>
        <Header user={session.user} />
        <main className="min-h-screen bg-brand-50">{children}</main>
      </div>
    );
  }

  return <Loading />;
};

export default Layout;
