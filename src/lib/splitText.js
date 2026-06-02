// Lightweight text splitter — wraps each word/char in spans for animation.
// Recursively descends into inline children (e.g. <em>, <span>) so wrappers
// like the italic-blue brand emphasis survive the split. Returns the array
// of inner spans for GSAP to animate (transform + opacity).

function makeWordWrap(token) {
  const wrap = document.createElement('span');
  wrap.style.display = 'inline-block';
  wrap.style.overflow = 'hidden';
  wrap.style.verticalAlign = 'top';

  const inner = document.createElement('span');
  inner.style.display = 'inline-block';
  inner.style.willChange = 'transform';
  inner.textContent = token;

  wrap.appendChild(inner);
  return { wrap, inner };
}

function makeCharSpan(ch) {
  const span = document.createElement('span');
  span.style.display = 'inline-block';
  span.style.willChange = 'transform, opacity';
  span.textContent = ch;
  return span;
}

export function splitWords(node) {
  if (!node) return [];
  const wordEls = [];

  // Snapshot children, then detach them — we'll rebuild as we go.
  const children = Array.from(node.childNodes);
  while (node.firstChild) node.removeChild(node.firstChild);

  for (const child of children) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.nodeValue || '';
      const tokens = text.split(/(\s+)/);
      for (const token of tokens) {
        if (token === '') continue;
        if (/^\s+$/.test(token)) {
          node.appendChild(document.createTextNode(token));
          continue;
        }
        const { wrap, inner } = makeWordWrap(token);
        node.appendChild(wrap);
        wordEls.push(inner);
      }
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      // Recurse into the element so its words get wrapped, then re-attach
      // the (now-rebuilt) element to the parent. Classes / attrs preserved
      // → italic + color from <em> still apply to the inner word spans.
      const innerWords = splitWords(child);
      node.appendChild(child);
      wordEls.push(...innerWords);
    }
  }

  return wordEls;
}

export function splitChars(node) {
  if (!node) return [];
  const chars = [];

  const children = Array.from(node.childNodes);
  while (node.firstChild) node.removeChild(node.firstChild);

  for (const child of children) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.nodeValue || '';
      for (const ch of Array.from(text)) {
        if (ch === ' ') {
          node.appendChild(document.createTextNode(' '));
          continue;
        }
        const span = makeCharSpan(ch);
        node.appendChild(span);
        chars.push(span);
      }
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const innerChars = splitChars(child);
      node.appendChild(child);
      chars.push(...innerChars);
    }
  }

  return chars;
}
