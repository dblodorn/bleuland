import { Global, css } from '@emotion/react'
import { media, buttonStyle } from './mixins'
import { returnBreakpoint } from './breakpoints'

export default function GlobalStyles({theme}: {theme?: any}) {
  console.log('theme', theme)
  
  return (
    <Global
      styles={css`
        :root {
          @font-face {
            font-family: ThemeFont;
            src: url(${theme.fonts.primary.uri});
          }

          /* COLORS */
          --colors-primary: ${theme?.colors?.primary};
          --colors-secondary: ${theme?.colors?.secondary};
          --colors-tertiary: ${theme?.colors?.tertiary};

          --black: var(--colors-primary);
          --white: #fff;
          --bg-color: #f6f8fa;
          --overlay: rgba(0, 0, 0, 0.85);
          --overlay-light: rgba(0, 0, 0, 0.35);
          --border-black: 1px solid var(--black);
          --border-light: 1px solid #dbdbdb;

          /* FONTS */
          --font-a: 'ThemeFont', Helvetica, Arial, sans-serif;
          --font-b: Courier, monospace;

          /* SPACING */
          --base-unit: ${theme?.base_unit}px;
          --unit-multiplier: 2.5;
          --space-sm: calc((var(--base-unit) * 2) * var(--unit-multiplier));
          --space-md: calc((var(--base-unit) * 3) * var(--unit-multiplier));
          --space-lg: calc((var(--base-unit) * 5) * var(--unit-multiplier));

          /* TYPOGRAPHY */
          --text-01: calc((var(--base-unit) * 1.75) * var(--unit-multiplier));
          --text-02: calc((var(--base-unit) * 2.5) * var(--unit-multiplier));
          --text-03: calc((var(--base-unit) * 3.5) * var(--unit-multiplier));
          --text-04: calc((var(--base-unit) * 4.5) * var(--unit-multiplier));
          --text-05: calc((var(--base-unit) * 5.5) * var(--unit-multiplier));

          /* LAYOUT */
          --header-z: 100;
          --header-height: calc((var(--base-unit) * 10) * var(--unit-multiplier));
          --footer-height: calc((var(--base-unit) * 10) * var(--unit-multiplier));
          --content-width-md: 960px;
          --content-width-lg: ${returnBreakpoint('desktop')};
          --content-width-xl: ${returnBreakpoint('xl')};
        }

        /* DEFAULTS */
        /* LAYOUT */
        body * {
          font-family: var(--font-a) !important;
        }

        main {
          width: 100%;
          overflow-x: hidden;
          position: relative;
          min-height: calc(100vh - var(--header-height));
          background-color: var(--colors-tertiary);
        }

        header,
        footer {
          font-size: var(--text-02);
          padding: 0 var(--space-md);
          width: 100%;
          align-items: center;
          display: flex;
          justify-content: space-between;
          background-color: var(--colors-secondary);
          a {
            text-decoration: none;
            color: var(--black);
            &.active {
              text-decoration: underline;
            }
            ${media.hover`
              text-decoration: underline;
            `}
          }
        }

        header {
          height: var(--header-height);
          position: sticky;
          top: 0;
          z-index: var(--header-z);
          text-transform: uppercase;
          a {
            margin-right: 30px;
          }
        }

        .flex-row {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        footer {
          height: var(--footer-height);
          a {
            text-decoration: none;
          }
        }

        /* TYPOGRPAHY */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-weight: 500;
        }
        h1 {
          font-size: var(--text-05);
          line-height: 1;
          text-align: center;
          padding: var(--space-md) 0 var(--space-lg);
        }
        h2 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        h3 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        a {
          font-weight: 400;
        }
        p,
        ol,
        ul {
          font-size: var(--text-02);
          padding-bottom: var(--space-sm);
          line-height: 1.35;
          font-weight: 400;
        }

        /* CUSTOM */
        .button {
          ${buttonStyle};
        }

        /* UTIL */
        .code-wrapper {
          text-align: start;
          border-radius: 5px;
          padding: 12px;
          background-color: #f3f3f3;
          overflow-x: scroll;
          margin-top: 20px;
          code {
            font-size: 12px !important;
            line-height: 1.25;
            background-color: var(--bg-color);
          }
          * {
            font-family: var(--font-b) !important;
          }
        }
      `}
    />
  )
}
