'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PHONE, PHONE_DISPLAY } from '@/lib/config';

export default function MobileCallBar() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const hero = document.getElementById('hero');

    if (!hero) {
      setVisible(true);
      return undefined;
    }

    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div
      className={`mobile-call-bar${visible ? ' is-visible' : ''}`}
      id="mobile-call-bar"
      aria-hidden={!visible}
    >
      <a href={`tel:${PHONE}`} tabIndex={visible ? 0 : -1}>
        <span style={{ fontSize: '22px' }}>📞</span>
        <span>
          <strong>立即拨打</strong> {PHONE_DISPLAY}
        </span>
      </a>
    </div>
  );
}
