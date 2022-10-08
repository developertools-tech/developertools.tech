import AspectRatio from '@mui/icons-material/AspectRatio';
import DataObject from '@mui/icons-material/DataObject';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import Fingerprint from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import Looks6 from '@mui/icons-material/Looks6';

// Icons Index: https://mui.com/material-ui/material-icons/

export default [
  {
    title: 'Home',
    href: '/',
    Icon: HomeIcon,
  },
  {
    title: 'Aspect Ratio',
    href: '/aspect-ratio',
    Icon: AspectRatio,
  },
  {
    title: 'UUID',
    href: '/uuid',
    Icon: Fingerprint,
  },
  {
    title: 'Base64',
    href: '/base64',
    Icon: Looks6,
  },
  {
    title: 'JSON',
    href: '/json',
    Icon: DataObject,
  },
  {
    title: 'Markdown Preview',
    href: '/markdown',
    Icon: DocumentScanner,
  },
];
