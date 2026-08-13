/* The brand lockup, built from the new thicker mark.

   The asset is the PNG mark alone (per the brief: use the PNG, ignore the
   zip), so the lockup composes it with a set wordmark rather than shipping a
   drawn one. On dark surfaces the same PNG is turned white with a filter,
   which is safe because the mark is a single solid colour on transparency.

   variant: 'ink' (purple mark, ink wordmark) | 'white' (all white)
   mark:    render the mark alone, no wordmark */

const SRC = '/assets/Staffintra_Logo_Icon.png';

export default function Brand({ variant = 'ink', mark = false, className = '' }) {
  return (
    <span className={`brand brand--${variant}${mark ? ' brand--mark' : ''} ${className}`.trim()}>
      <img className="brand-mark" src={SRC} alt="" aria-hidden={mark ? undefined : 'true'} />
      {!mark ? <span className="brand-word">staffintra</span> : null}
    </span>
  );
}
