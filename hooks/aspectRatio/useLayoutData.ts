import { useCallback } from 'react';

type LayoutData = {
  layout: string;
  columns: string[];
};

export default function useLayoutData({
  width,
  height,
  layoutWidths = [640, 1024, 1440, 1920],
  layoutCount = 5,
  margin = 0,
  gap = 0,
  expand = 0,
}: {
  width: number | void;
  height: number | void;
  layoutWidths?: number[];
  layoutCount?: number;
  margin?: number;
  gap?: number;
  expand?: number;
}) {
  const getLayoutData = useCallback((): LayoutData[] | void => {
    if (!width || !height) return undefined;
    const result = [];
    for (let row = 0; row < layoutCount; row += 1) {
      const layout: LayoutData = {
        layout: `${row + 1} Across`,
        columns: [],
      };
      const aspectRatio = width / height;
      const divisor = row + 1;
      for (let col = 0; col < layoutWidths.length; col += 1) {
        const layoutWidth = layoutWidths[col];
        let unitWidth = Math.round(layoutWidth / divisor);
        if (margin) {
          unitWidth -= margin;
        }
        if (gap) {
          unitWidth -= gap * (divisor - 1);
        }
        if (expand) {
          unitWidth += (unitWidth / 100) * expand;
        }
        const unitHeight = Math.round(unitWidth / aspectRatio);
        layout.columns.push(`${unitWidth} x ${unitHeight}`);
      }
      result.push(layout);
    }
    return result;
  }, [width, height, layoutWidths, layoutCount, gap, margin, expand]);

  return getLayoutData;
}
