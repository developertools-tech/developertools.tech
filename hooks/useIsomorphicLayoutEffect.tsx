/* eslint-disable no-restricted-imports */
/* This is the only place we can use `React.useLayoutEffect` */

import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
