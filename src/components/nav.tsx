import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="mt-8 flex items-center justify-between">
      <Link href="/" className="font-medium">
        linksaver<span className="text-primary-800">.app</span>
      </Link>
      <button className="rounded-full w-10 h-10 bg-grey-900 hover:outline hover:outline-2 hover:outline-primary-900 hover:outline-offset-2 focus:outline focus:outline-2 focus:outline-primary-900 focus:outline-offset-2"></button>
    </nav>
  );
}
