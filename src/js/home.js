import { handleHomePageInit, handleHomeResize } from './handlers';

export function initHome() {
  document.addEventListener('DOMContentLoaded', handleHomePageInit);
}

window.addEventListener('resize', handleHomeResize);
