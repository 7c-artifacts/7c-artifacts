import DOMPurify from 'isomorphic-dompurify';

export const sanitize = (html, options) => DOMPurify.sanitize(html, options);
