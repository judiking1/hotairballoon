import Link from 'next/link';

export default function Header({toggleDayNight,isNight}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="text-white font-bold text-2xl [text-shadow:_0_1px_0_var(--tw-shadow-color)]"
          >
            Home
          </Link>
          <button
            onClick={toggleDayNight}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {isNight ? 'Switch to Day' : 'Switch to Night'}
          </button>
        </div>
      </div>
    </header>
  );
}
