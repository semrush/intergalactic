import Badge from './entries/Badge';
import Breadcrumbs from './entries/Breadcrumbs';
import Button from './entries/Button';
import ChartArea from './entries/Chart/Area';
import ChartBar from './entries/Chart/Bar';
import ChartBarHorizontal from './entries/Chart/BarHorizontal';
import ChartBubble from './entries/Chart/Bubble';
import ChartLegend from './entries/Chart/ChartLegend';
import ChartCigarette from './entries/Chart/Cigarette';
import ChartDonut from './entries/Chart/Donut';
import ChartHistogram from './entries/Chart/Histogram';
import ChartLine from './entries/Chart/Line';
import MiniChart from './entries/Chart/MiniChart';
import ChartRadar from './entries/Chart/Radar';
import ChartScatterPlot from './entries/Chart/ScatterPlot';
import ChartStackedArea from './entries/Chart/StackedArea';
import ChartStackedBar from './entries/Chart/StackedBar';
import ChartStackedHorizontalBar from './entries/Chart/StackedHorizontalBar';
import ChartVenn from './entries/Chart/Venn';
import Checkbox from './entries/Checkbox';
import ColorPicker from './entries/ColorPicker';
import Counter from './entries/Counter';
import DatePicker from './entries/DatePicker';
import Divider from './entries/Divider';
import Dot from './entries/Dot';
import Dropdown from './entries/Dropdown';
import FeaturePopover from './entries/FeaturePopover';
import Hint from './entries/Hint';
import InlineInput from './entries/InlineInput';
import Input from './entries/Input';
import InputMask from './entries/InputMask';
import InputNumber from './entries/InputNumber';
import InputTags from './entries/InputTags';
import Link from './entries/Link';
import Notice from './entries/Notice';
import Pagination from './entries/Pagination';
import Pills from './entries/Pills';
import ProgressBar from './entries/ProgressBar';
import Radio from './entries/Radio';
import RadioCards from './entries/RadioCards';
import Spin from './entries/Spin';
import SpinContainer from './entries/SpinContainer';
import Switch from './entries/Switch';
import TabLine from './entries/TabLine';
import TabPanel from './entries/TabPanel';
import Tag from './entries/Tag';
import Textarea from './entries/Textarea';
import TimePicker from './entries/TimePicker';
import Tooltip from './entries/Tooltip';

const registry = {
  Badge,
  Breadcrumbs,
  Button,
  Checkbox,
  ColorPicker,
  Counter,
  DatePicker,
  Divider,
  Dot,
  Dropdown,
  FeaturePopover,
  Hint,
  InlineInput,
  Input,
  InputMask,
  InputNumber,
  InputTags,
  Link,
  Notice,
  Pagination,
  Pills,
  ProgressBar,
  Radio,
  RadioCards,
  Spin,
  SpinContainer,
  Switch,
  TabLine,
  TabPanel,
  Tag,
  Textarea,
  TimePicker,
  Tooltip,
  'Chart.Area': ChartArea,
  'Chart.Bar': ChartBar,
  'Chart.BarHorizontal': ChartBarHorizontal,
  'Chart.Bubble': ChartBubble,
  'Chart.Cigarette': ChartCigarette,
  'ChartLegend': ChartLegend,
  'Chart.Donut': ChartDonut,
  'Chart.Histogram': ChartHistogram,
  'Chart.Line': ChartLine,
  'MiniChart': MiniChart,
  'Chart.Radar': ChartRadar,
  'Chart.ScatterPlot': ChartScatterPlot,
  'Chart.StackedArea': ChartStackedArea,
  'Chart.StackedBar': ChartStackedBar,
  'Chart.StackedHorizontalBar': ChartStackedHorizontalBar,
  'Chart.Venn': ChartVenn,
};

export type Registry = typeof registry;
export type PlaygroundComponentName = keyof typeof registry;

export default registry;
