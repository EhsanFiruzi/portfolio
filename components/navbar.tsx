import Link from "next/link";

export default function Navbar() {
    const links = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Contact", href: "/contact" },
];
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <div className="text-xl font-bold">
          Ehsan
        </div>

        <nav className="flex gap-8">
          {links.map(link => <Link key={link.href} href={link.href}>{link.title}</Link>)}
        </nav>

      </div>
    </header>
  );
}