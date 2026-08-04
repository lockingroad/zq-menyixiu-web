'use client';

import { useState, useEffect } from 'react';
import { BRAND_NAME, PHONE } from '@/lib/config';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <img src="/images/logo.jpg" alt={`${BRAND_NAME}标志`} className="logo-icon" />
          <span>{BRAND_NAME}</span>
        </Link>
        <div className="header-actions">
          <nav className="header-nav" aria-label="首页内容导航">
            <Link href="/#knowledge">常见故障</Link>
            <Link href="/#cases">真实案例</Link>
            <Link href="/#services">主营服务</Link>
          </nav>
          <a href={`tel:${PHONE}`} className="btn-call" id="header-call-btn">
            一键拨号
          </a>
        </div>
      </div>
    </header>
  );
}
