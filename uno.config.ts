import { defineConfig, transformerCompileClass } from 'unocss';
import { presetUseful } from 'unocss-preset-useful';
import { theme as windTheme } from 'unocss/preset-wind';

export default defineConfig({
  preflights: [
    {
      getCSS: ({ theme }) => `
        @media (min-width: ${theme.breakpoints?.lg}) {
          :root {
            --font-heading-1: 2.5rem;
            --leading-heading-1: 3rem;

            --font-heading-2: 2rem;
            --leading-heading-2: 2.5rem;

            --font-heading-3: 2.5rem;
            --leading-heading-3: 2rem;

            --font-heading-4: 1.25rem;
            --leading-heading-4: 1.75rem;

            --font-body: 1rem;
            --leading-body: 1.5rem;

            --font-tiny: 0.875rem;
            --leading-tiny: 1.25rem;
          }
        }

        body {
          color-scheme: light;
          text-rendering: optimizeLegibility;

          @apply font-sans font-normal text-body text-neutral-950 bg-neutral-100 font-synthesis-none antialiased;
        }
      `,
    },
  ],
  theme: {
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      primary: windTheme.colors?.blue || 'var(--color-primary)',
      neutral: windTheme.colors?.gray || 'var(--color-neutral)',
      danger: windTheme.colors?.red || 'var(--color-danger)',
      warning: windTheme.colors?.amber || 'var(--color-warning)',
      success: windTheme.colors?.green || 'var(--color-success)',
      info: windTheme.colors?.sky || 'var(--color-info)',
    },
    fontSize: {
      'heading-1': ['var(--font-heading-1, 2.25rem)', 'var(--leading-heading-1, 2.75rem)'],
      'heading-2': ['var(--font-heading-2, 1.75rem)', 'var(--leading-heading-2, 2.25rem)'],
      'heading-3': ['var(--font-heading-3, 1.5rem)', 'var(--leading-heading-3, 2rem)'],
      'heading-4': ['var(--font-heading-4, 1.25rem)', 'var(--leading-heading-4, 1.75rem)'],
      body: ['var(--font-body, 1rem)', 'var(--leading-body, 1.5rem)'],
      tiny: ['var(--font-tiny, 0.875rem)', 'var(--leading-tiny, 1.25rem)'],
    },
    container: {
      center: true,
      padding: '2rem',
      maxWidth: {
        '2xl': '1400px',
      },
    },
  },
  presets: [
    presetUseful({
      enableMagicAnimations: false,
      icons: {
        scale: 1.25,
      },
      webFonts: {
        provider: 'fontshare',
        fonts: {
          sans: 'Quicksand',
        },
      },
    }),
  ],
  transformers: [transformerCompileClass()],
});
