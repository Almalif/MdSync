import React from 'react';
import Link from 'next/link';

const links = [{ href: '/', label: 'Home' }].map(link => {
  return { ...link, key: `nav-link-${link.href}-${link.label}` };
});

export default (): React.ReactNode[] => {
  return links.map(({ key, href, label }) => (
    <div className="item" key={key}>
      <Link href={href}>
        <a href={href}>{label}</a>
      </Link>
    </div>
  ));
};
