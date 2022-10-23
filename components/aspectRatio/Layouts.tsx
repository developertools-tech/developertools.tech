import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useLocalState from '../../hooks/useLocalState';
import AspectRatioLayoutSettings from './LayoutSettings';
import AspectRatioLayoutTable, { LayoutData } from './LayoutTable';

export interface AspectRatioLayoutsProps {
  width: number | void;
  height: number | void;
}

export default function AspectRatioLayouts({
  width,
  height,
}: AspectRatioLayoutsProps) {
  const { t } = useTranslation('aspectRatio');
  const [margins, setMargins] = useLocalState({
    key: 'aspectRatioMargins',
    defaultValue: 0,
  });
  const [gap, setGap] = useLocalState({
    key: 'aspectRatioGap',
    defaultValue: 0,
  });
  const [expand, setExpand] = useLocalState({
    key: 'aspectRatioExpand',
    defaultValue: 0,
  });
  const [layoutCount, setLayoutCount] = useLocalState({
    key: 'aspectRatioLayoutCount',
    defaultValue: 4,
  });
  const [layoutWidths, setLayoutWidths] = useLocalState<string[]>({
    key: 'aspectRatioLayoutWidths',
    defaultValue: ['640', '1024', '1440', '1920'],
  });

  const getLayoutData = useCallback((): LayoutData[] | void => {
    if (!width || !height) return undefined;
    const result = [];
    for (let row = 0; row < layoutCount; row++) {
      const layout: LayoutData = {
        layout: `${row + 1} ${t('across')}`,
        columns: [],
      };
      const aspectRatio = width / height;
      const divisor = row + 1;
      for (let col = 0; col < layoutWidths.length; col++) {
        const layoutWidth = +layoutWidths[col];
        let unitWidth = Math.round(layoutWidth / divisor);
        if (margins) {
          unitWidth = Math.round(unitWidth - margins);
        }
        if (gap) {
          unitWidth = Math.round(unitWidth - gap * (divisor - 1));
        }
        if (expand) {
          unitWidth = Math.round(
            unitWidth + (unitWidth / 100) * expand,
          );
        }
        const unitHeight = Math.round(unitWidth / aspectRatio);
        layout.columns.push(`${unitWidth} x ${unitHeight}`);
      }
      result.push(layout);
    }
    return result;
  }, [
    width,
    height,
    layoutWidths,
    layoutCount,
    gap,
    margins,
    expand,
    t,
  ]);

  const layoutData = getLayoutData();

  return (
    <>
      <Typography
        mb={2}
        component='h2'
      >
        {t('layouts')}
      </Typography>
      <AspectRatioLayoutSettings
        layoutCount={layoutCount}
        setLayoutCount={setLayoutCount}
        layoutWidths={layoutWidths}
        setLayoutWidths={setLayoutWidths}
        margins={margins}
        setMargins={setMargins}
        gap={gap}
        setGap={setGap}
        expand={expand}
        setExpand={setExpand}
      />
      <AspectRatioLayoutTable
        layoutData={layoutData || undefined}
        layoutWidths={layoutWidths}
      />
    </>
  );
}
