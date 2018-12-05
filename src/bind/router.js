import React from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';

export function useHash(children) {
  return (
    <HashRouter>
      {children}
    </HashRouter>
  );
}

export function useBrowser(children) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}
