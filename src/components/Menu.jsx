import Link from 'next/link';

const Menu = () => {
    return (
        <header className="w-full bg-gray-50 shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="text-2xl font-serif font-bold">
                    <Link href="/" className='text-green-900'>
                        J&L
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="space-x-8 text-sm font-semibold text-green-900">
                    <Link href="/">
                        Bem-vindos!
                    </Link>
                    <Link href="/presentes">
                        Presentes
                    </Link>
                    <Link href="/livro-de-visitas">
                        Livro de visitas
                    </Link>
                </nav>
            </div>
        </header >
    );
}

export default Menu