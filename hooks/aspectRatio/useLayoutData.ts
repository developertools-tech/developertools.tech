import { useCallback } from 'react';

type LayoutDataCol = {
  layout: string;
  [key: string]: string;
};

export default function useLayoutData({
  width,
  height,
}: {
  width: number | void;
  height: number | void;
}) {
  const getLayoutData = useCallback((): LayoutDataCol[] | void => {
    if (!width || !height) return undefined;
    const result = [];
    const layoutWidths = [640, 1024, 1440, 1920];
    for (let row = 0; row < 5; row += 1) {
      const layout: LayoutDataCol = { layout: `${row + 1} Across` };
      const aspectRatio = width / height;
      const divisor = row + 1;
      for (let col = 0; col < layoutWidths.length; col += 1) {
        const layoutWidth = layoutWidths[col];
        const unitWidth = Math.round(layoutWidth / divisor);
        const unitHeight = Math.round(unitWidth / aspectRatio);
        const colTitle = `w${layoutWidth}`;
        layout[colTitle] = `${unitWidth} x ${unitHeight}`;
      }
      result.push(layout);
    }
    return result;
  }, [width, height]);

  return getLayoutData;
}
