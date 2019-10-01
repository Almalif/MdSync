import React from 'react';
import Link from 'next/link';

const links = [{ href: '/', label: 'Home' }, { href: '/About', label: 'About' }].map(link => {
  return { ...link, key: `nav-link-${link.href}-${link.label}` };
});

const Nav = () => (
  <nav>
    <ul>
      {links.map(({ key, href, label }) => (
        <Link href={href} key={key}>
          {label}
        </Link>
      ))}
    </ul>
  </nav>
);

export default Nav;
