import Abc from '@mui/icons-material/Abc';
import ArticleIcon from '@mui/icons-material/Article';
import AspectRatio from '@mui/icons-material/AspectRatio';
import Code from '@mui/icons-material/Code';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Css from '@mui/icons-material/Css';
import DataObject from '@mui/icons-material/DataObject';
import DifferenceIcon from '@mui/icons-material/Difference';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import Fingerprint from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import Image from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import Looks6 from '@mui/icons-material/Looks6';
import Pin from '@mui/icons-material/Pin';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Search from '@mui/icons-material/Search';
import Segment from '@mui/icons-material/Segment';
import SortByAlpha from '@mui/icons-material/SortByAlpha';

// Icons Index: https://mui.com/material-ui/material-icons/

const navItems = [
  {
    title: 'home', // These are translation keys in the common namespace
    href: '/',
    Icon: HomeIcon,
  },
  {
    title: 'aspectRatio',
    href: '/aspect-ratio',
    Icon: AspectRatio,
  },
  {
    title: 'css',
    href: '/css',
    Icon: Css,
  },
  {
    title: 'uuid',
    href: '/uuid',
    Icon: Fingerprint,
  },
  {
    title: 'base64',
    href: '/base64',
    Icon: Looks6,
  },
  {
    title: 'json',
    href: '/json',
    Icon: DataObject,
  },
  {
    title: 'markdownPreview',
    href: '/markdown',
    Icon: DocumentScanner,
  },
  {
    title: 'colors',
    href: '/colors',
    Icon: ColorLensIcon,
  },
  {
    title: 'urlEncode',
    href: '/url-encode',
    Icon: LinkIcon,
  },
  {
    title: 'html',
    href: '/html',
    Icon: Code,
  },
  {
    title: 'loremIpsum',
    href: '/lorem-ipsum',
    Icon: ArticleIcon,
  },
  {
    title: 'imageConverter',
    href: '/image-converter',
    Icon: Image,
  },
  {
    title: 'textDiff',
    href: '/text-diff',
    Icon: DifferenceIcon,
  },
  {
    title: 'queryString',
    href: '/query-string',
    Icon: QuestionMark,
  },
  {
    title: 'regexTester',
    href: '/regex',
    Icon: Search,
  },
  {
    title: 'caseConverter',
    href: '/case-converter',
    Icon: SortByAlpha,
  },
  {
    title: 'htmlCharCodes',
    href: '/html-char-codes',
    Icon: Abc,
  },
  {
    title: 'charCounter',
    href: '/character-counter',
    Icon: Segment,
  },
  {
    title: 'totp',
    href: '/totp',
    Icon: Pin,
  },
];

export default navItems;
