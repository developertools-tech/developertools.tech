import ArticleIcon from '@mui/icons-material/Article';
import AspectRatio from '@mui/icons-material/AspectRatio';
import Code from '@mui/icons-material/Code';
import Css from '@mui/icons-material/Css';
import DataObject from '@mui/icons-material/DataObject';
import DifferenceIcon from '@mui/icons-material/Difference';
import Fingerprint from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import Image from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import Looks6 from '@mui/icons-material/Looks6';
import Search from '@mui/icons-material/Search';

// Icons Index: https://mui.com/material-ui/material-icons/

const navItems = [
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
    title: 'CSS',
    href: '/css',
    Icon: Css,
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
    title: 'URL Encode',
    href: '/url-encode',
    Icon: LinkIcon,
  },
  {
    title: 'HTML',
    href: '/html',
    Icon: Code,
  },
  {
    title: 'Lorem Ipsum',
    href: '/lorem-ipsum',
    Icon: ArticleIcon,
  },
  {
    title: 'Image Converter',
    href: '/image-converter',
    Icon: Image,
  },
  {
    title: 'Text Diff',
    href: '/text-diff',
    Icon: DifferenceIcon,
  },
  {
    title: 'Regex Tester',
    href: '/regex',
    Icon: Search,
  },
  {
    title: 'Case Converter',
    href: '/case-converter',
    Icon: Search,
  },
];

export default navItems;
