import { link } from 'fs';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#fffffe',
        headline: '#272343',
        paragraph: '#2d334a',
        button: '#ffd803',
        buttonText: '#272343',
        stroke: '#272343',
        main: '#fffffe',
        highlight: '#ffd803',
        secondary: '#e3f6f5',
        tertiary: '#bae8e8',
        link: '#0017c1',
        buttonHover: '#e8c702',
        headlineHover: '#1f1e2b',
        paragraphHover: '#1f233a',
      },
      fontSize: {
        h1: [
          '2.75rem',
          {
            lineHeight: '1.455',
            letterSpacing: '0.44px',
          },
        ], // デスクトップ
        h1Sm: ['2rem', { lineHeight: '48px' }],
        h2: ['2rem', { lineHeight: '1.5' }],
        h2Sm: [
          '1.625rem',
          { lineHeight: '40px' },
        ],
        h3: [
          '1.625rem',
          {
            lineHeight: '1.538',
            letterSpacing: '0.26px',
          },
        ],
        h3Sm: [
          '1.4375rem',
          { lineHeight: '40px' },
        ],
        h4: [
          '1.375rem',
          {
            lineHeight: '1.82',
            letterSpacing: '0.2px',
          },
        ],
        h4Sm: ['1.25rem', { lineHeight: '32px' }],
        h5: [
          '1.0625rem',
          {
            lineHeight: '1.88235',
            letterSpacing: '0.68px',
          },
        ],
        h5Sm: [
          '1.063rem',
          { lineHeight: '32px' },
        ],
        h6: [
          '0.8125rem',
          {
            lineHeight: '1.85',
            letterSpacing: '0.13px',
          },
        ],
        h6Sm: ['1rem', { lineHeight: '2' }],
        p: [
          '1rem',
          {
            lineHeight: '1.7',
            letterSpacing: '0.04rem',
          },
        ],
        pSm: [
          '0.875rem',
          {
            lineHeight: '1.7',
            letterSpacing: '0.035rem',
          },
        ],
      },
      screens: {
        sm: { max: '767px' },
        xs: { max: '519px' },
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '108': '27rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
