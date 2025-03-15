import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BarChart2, NotebookPen } from 'lucide-react';
import { Button } from '@/Components/ui/button';


export default function Home({auth}: PageProps) {
  return (
    <>
        <Head title="Accueil" />

        <nav className="fixed top-0 w-full bg-white border-b border-b-gray-300 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/">
                            <NotebookPen/>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <>
                            <Link href={route('dashboard')} className='text-gray-600 hover:text-gray-900'>
                                Tableau de bord
                            </Link>
                            <Link href={route('profile.edit')} className='text-gray-600 hover:text-gray-900'>
                                Profil
                            </Link>
                            <Link method='post' as="button" href={route('logout')} className='text-gray-600 hover:text-gray-900'>
                                Déconnexion
                            </Link>
                            </>
                        ) : (
                            <>
                            <Link href={route('login')} className='text-gray-600 hover:text-gray-900'>
                                Connexion
                            </Link>
                            <Link href={route('register')} >
                                <Button>
                                    Inscription
                                </Button>
                            </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>

        <section className="h-[90vh] flex items-center justify-center pt-16">
            <div className="relative">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="max-w-2xl text-center mx-auto">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Gérez vos contacts simplement
                        </h1>
                        <p className="mt-6 text-lg text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id perspiciatis ad repudiandae, reiciendis asperiores ducimus.
                        </p>
                        <div className="mt-10">
                            {auth.user ? (
                                <>
                                <Link href={route('dashboard')}>
                                    <Button>
                                        Tableau de bord <BarChart2 className='w-5 h-5' />
                                    </Button>
                                </Link>
                                </>
                            ) :
                            (
                                <>
                                    <Link href={route('register')}>
                                    <Button>
                                        Commencer <ArrowRight className='w-5 h-5' />
                                    </Button>
                                </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer className="bg-white border-t border-t-gray-300">
            <div className="max-w-7xl mx-auto px6 py-12 flex items-center justify-between px-8">
                <div className="mt-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Tous droits réservés. MonCarnet
                    </p>
                </div>
            </div>
        </footer>

    </>
  )
}
