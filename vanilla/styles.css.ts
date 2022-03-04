import { style } from "@vanilla-extract/css";
import { vars } from "./vars.css";

export const card = style([
  {
    background: vars.test,
    position: 'relative',
    width: '100%',
    padding: 'var(--space-sm)',
  }
]);
