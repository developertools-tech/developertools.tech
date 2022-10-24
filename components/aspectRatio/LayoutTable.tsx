import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type LayoutData = {
  layout: string;
  columns: string[];
};

export interface AspectRatioLayoutTableProps {
  layoutData?: LayoutData[];
  layoutWidths: string[];
}

export default function AspectRatioLayoutTable({
  layoutData,
  layoutWidths,
}: AspectRatioLayoutTableProps) {
  const { t } = useTranslation('aspectRatio');
  return (
    <TableContainer
      component={Paper}
      sx={{ mb: 3, maxWidth: 1000 }}
    >
      <Table
        sx={{ minWidth: 650 }}
        aria-label='Image Layouts'
      >
        <TableHead>
          <TableRow>
            <TableCell>{t('layout')}</TableCell>
            {layoutWidths.map((label) => (
              <TableCell
                key={label}
                align='right'
              >
                {label}w
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {layoutData?.map(({ layout, columns }) => (
            <TableRow
              key={layout}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell
                component='th'
                scope='row'
              >
                {layout}
              </TableCell>
              {columns.map((colValue) => (
                <TableCell
                  align='right'
                  key={colValue}
                >
                  {colValue}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
