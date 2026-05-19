'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Locale } from '@/data/products';

type NestedRecord = { [key: string]: string | NestedRecord };

const cache: Partial<Record<Locale, NestedRecord>> = {};

async function loadDict(locale: Locale): Promise<NestedRecord> {
  if (cache[locale]) return cache[locale]!;
  const mod = await import(`@/dictionaries/${locale}.json`);
  cache[locale] = mod.default as NestedRecord;
  return cache[locale]!;
}

function resolvePath(obj: NestedRecord, path: string): string {
  const parts = path.split('.');
  let cur: string | NestedRecord = obj;
  for (const part of parts) {
    if (typeof cur !== 'object' || cur === null) return path;
    cur = (cur as NestedRecord)[part];
  }
  return typeof cur === 'string' ? cur : path;
}

export function useT() {
  const [locale, setLocaleState] = useState<Locale>('ru');
  const [dict, setDict] = useState<NestedRecord>({});

  useEffect(() => {
    const stored = (localStorage.getItem('locale') as Locale) || 'ru';
    setLocaleState(stored);
    loadDict(stored).then(setDict);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    localStorage.setItem('locale', l);
    setLocaleState(l);
    loadDict(l).then(setDict);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>): string => {
      let str = resolvePath(dict, key);
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          str = str.replace(`{${k}}`, v);
        });
      }
      return str;
    },
    [dict]
  );

  return { t, locale, setLocale };
}

export function formatPrice(amount: number): string {
  return amount.toLocaleString('ru-RU').replace(/,/g, ' ');
}
