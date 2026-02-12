import Book from '@semcore/icon/Book/m';
import Chat from '@semcore/icon/Chat/m';
import ChevronRight from '@semcore/icon/ChevronRight/m';
import InfoIcon from '@semcore/icon/Info/m';
import LinkExternal from '@semcore/icon/LinkExternal/m';
import MathPlus from '@semcore/icon/MathPlus/m';
import Question from '@semcore/icon/Question/m';
import Search from '@semcore/icon/Search/m';
import Settings from '@semcore/icon/Settings/m';
import Accordion from '@semcore/ui/accordion';
import Badge from '@semcore/ui/badge';
import { Box, Flex, ScreenReaderOnly } from '@semcore/ui/base-components';
import { LinkTrigger, FilterTrigger } from '@semcore/ui/base-trigger';
import Breadcrumbs from '@semcore/ui/breadcrumbs';
import Button, { ButtonLink } from '@semcore/ui/button';
import Card from '@semcore/ui/card';
import Checkbox from '@semcore/ui/checkbox';
import type { DataTableData } from '@semcore/ui/data-table';
import { DataTable } from '@semcore/ui/data-table';
import { DatePicker, DateRangeComparator, DateRangePicker } from '@semcore/ui/date-picker';
import DnD from '@semcore/ui/drag-and-drop';
import DropdownMenu from '@semcore/ui/dropdown-menu';
import FeaturePopover from '@semcore/ui/feature-popover';
import type { FlagsIso2 } from '@semcore/ui/flags';
import Flags, { iso2Name } from '@semcore/ui/flags';
import Input from '@semcore/ui/input';
import InputTags from '@semcore/ui/input-tags';
import Link from '@semcore/ui/link';
import Pagination from '@semcore/ui/pagination';
import Pills from '@semcore/ui/pills';
import ProductHead, { Info, Title } from '@semcore/ui/product-head';
import Radio, { RadioGroup } from '@semcore/ui/radio';
import Select from '@semcore/ui/select';
import Slider from '@semcore/ui/slider';
import Switch from '@semcore/ui/switch';
import TabLine from '@semcore/ui/tab-line';
import Tag from '@semcore/ui/tag';
import Textarea from '@semcore/ui/textarea';
import { DescriptionTooltip } from '@semcore/ui/tooltip';
import { Text, List } from '@semcore/ui/typography';
import React from 'react';

// not including:
// - bulktextarea
// - carousel
// - color picker
// - dnd with cards/files
// -
//
//
//
//
//

const FPContent = () => (
  <Flex alignItems='start'>
    <Box
      w={40}
      h={40}
      mr={4}
      flex='0 0 auto'
      style={{
        borderRadius: '50%',
        background: 'orange',
      }}
    />
    <div>
      <Text size={300} bold tag='h3' mb={1} mt={0}>
        Export your data
      </Text>
      <Text mb={4} size={200} tag='p'>
        With this new feature, you can now export your data to CSV or PDF files.
      </Text>
      <Flex gap={2} alignItems='center'>
        <Button
          theme='invert'
          use='primary'
        >
          Next
        </Button>
        <Button
          theme='invert'
          use='tertiary'
        >
          Remind me later
        </Button>

        <Text size={200} aria-live='polite' ml='auto'>
          Step 1
          <span aria-hidden='true'>/</span>
          <ScreenReaderOnly>of</ScreenReaderOnly>
          5
        </Text>
      </Flex>
    </div>
  </Flex>
);

const FocusInAllComponents = () => {
  // select with countries
  const formatName = (name?: string) => name?.replace(/([a-z])([A-Z])/g, '$1 $2');
  const flags = Object.keys(iso2Name) as FlagsIso2[];
  const countries = flags.map((code) => {
    return {
      value: code,
      children: <><Flags iso2={code as keyof typeof iso2Name} mr={2} />{formatName(iso2Name[code])}</>,
      label: formatName(iso2Name[code]),
    };
  });
  const [value, setValue] = React.useState(null);
  const [filter, setFilter] = React.useState('');
  const country = countries.filter((item) => {
    return item.value === value;
  })[0]?.label;
  const filteredCountries = React.useMemo(
    () =>
      countries.filter((option) => {
        return option.value.toString().toLowerCase().includes(filter.toLowerCase());
      }),
    [filter],
  );

  // dropdown menu with dnd
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);
  const [columns, setColumns] = React.useState(defaultColumns);
  const handleDnD = React.useCallback(
    ({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) => {
      setColumns((columns) => {
        const newColumns = [...columns];
        const shift = fromIndex < toIndex ? 1 : -1;
        for (let i = fromIndex; i !== toIndex; i += shift) {
          newColumns[i] = columns[i + shift];
        }
        newColumns[toIndex] = columns[fromIndex];
        return newColumns;
      });
      setHighlightedIndex(toIndex);
    },
    [],
  );
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>(defaultSelectedColumns);

  const resetToDefault = React.useCallback(() => {
    setSelectedColumns(defaultSelectedColumns);
  }, []);
  const toggleAll = React.useCallback(() => {
    const allSelected = selectedColumns.length === columns.length;
    const allColumns = columns.map((column) => column.id);
    if (allSelected) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(allColumns);
    }
  }, [selectedColumns, columns]);

  // featurepopover
  const [fpVisible, setFpVisible] = React.useState(true);

  return (
    <Flex direction='column' style={{ background: 'var(--intergalactic-bg-secondary-neutral)' }} p={8} gap={4}>
      <ProductHead mb={0}>
        <ProductHead.Row>
          <Breadcrumbs>
            <Breadcrumbs.Item href='#'>Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#'>Domain.com</Breadcrumbs.Item>
            <Breadcrumbs.Item href='#' active>
              Tool Name
            </Breadcrumbs.Item>
          </Breadcrumbs>

          <ProductHead.Links>
            <ButtonLink addonLeft={Chat}>Feedback</ButtonLink>
            <Link addonLeft={Book}>User manual</Link>
          </ProductHead.Links>
        </ProductHead.Row>

        <ProductHead.Row>
          <Title toolName='Tool Name:'>
            <Text color='text-secondary' noWrap>
              Domain.com
            </Text>
          </Title>

          <ProductHead.Buttons>
            <Button use='primary' addonLeft={MathPlus}>
              Add Project
            </Button>
            <Button addonLeft={Settings}>Settings</Button>
            <Button use='tertiary' addonLeft={Question} title='Help' theme='muted' />
          </ProductHead.Buttons>
        </ProductHead.Row>

        <ProductHead.Row>
          <Info>
            <Info.Item>
              <Info.Item.Label tag='label' htmlFor='select-location'>
                Location:
              </Info.Item.Label>
              <Select placeholder='Select country' value={value} onChange={setValue}>
                <Select.Trigger tag={LinkTrigger} m='auto' aria-label='Country'>
                  {country}
                </Select.Trigger>
                <Select.Popper aria-label='Fruits with search' wMax={250}>
                  <Select.InputSearch
                    value={filter}
                    onChange={setFilter}
                    aria-describedby={filter ? 'search-result' : undefined}
                  />
                  <Select.List>
                    {filteredCountries.map(({ value, children }) => (
                      <Select.Option key={value} value={value}>
                        {children}
                      </Select.Option>
                    ))}
                    {filteredCountries.length
                      ? (
                          <ScreenReaderOnly id='search-result' aria-hidden='true'>
                            {filteredCountries.length}
                            {' '}
                            result
                            {filteredCountries.length > 1 && 's'}
                            {' '}
                            found
                          </ScreenReaderOnly>
                        )
                      : (
                          <Text
                            tag='div'
                            id='search-result'
                            key='Nothing'
                            p='6px 8px'
                            size={200}
                            use='secondary'
                          >
                            Nothing found
                          </Text>
                        )}
                  </Select.List>
                </Select.Popper>
              </Select>
            </Info.Item>
            <Info.Item>
              <Info.Item.Label tag='label' htmlFor='select-device'>
                Device:
              </Info.Item.Label>
              <Select
                id='select-device'
                defaultValue='Desktop'
                placeholder='Select option'
                m='auto'
                tag={LinkTrigger}
                options={[
                  { value: 'Desktop', children: 'Desktop' },
                  { value: 'Mobile', children: 'Mobile' },
                ]}
              />
            </Info.Item>
            <Info.Item label='Last update:'>
              1 hour ago
              <DescriptionTooltip>
                <DescriptionTooltip.Trigger
                  tag={ButtonLink}
                  addonLeft={InfoIcon}
                  display='inline-flex'
                  ml={1}
                  color='icon-secondary-neutral'
                  aria-label='About update rate'
                />
                <DescriptionTooltip.Popper aria-label='About update rate'>
                  Some details about data update rates.
                </DescriptionTooltip.Popper>
              </DescriptionTooltip>
            </Info.Item>
          </Info>
        </ProductHead.Row>
      </ProductHead>

      <TabLine defaultValue={1} size='l' mx={-8} px={8}>
        <TabLine.Item value={1}>
          Facebook
        </TabLine.Item>
        <TabLine.Item value={2}>
          <TabLine.Item.Text>
            Instagram
          </TabLine.Item.Text>
          <TabLine.Item.Addon>
            <Badge type='new' />
          </TabLine.Item.Addon>
        </TabLine.Item>
        <TabLine.Item value={3}>
          Twitter
        </TabLine.Item>
      </TabLine>

      <Flex gap={3}>

        <DatePicker>
          <DatePicker.Trigger />
          <DatePicker.Popper />
        </DatePicker>

        <DateRangePicker>
          <DateRangePicker.Trigger />
          <DateRangePicker.Popper />
        </DateRangePicker>

        <DateRangeComparator />

        <DropdownMenu
          selectable
          multiselect
          highlightedIndex={highlightedIndex}
          onHighlightedIndexChange={setHighlightedIndex}
        >
          <DropdownMenu.Trigger tag={Button} addonLeft={Settings}>
            Manage columns
          </DropdownMenu.Trigger>
          <DropdownMenu.Popper hMax={800} aria-labelledby='popper_id'>
            <Flex direction='column' alignItems='flex-start' p={2} gap={2}>
              <Text bold id='popper_id'>
                Show table columns
              </Text>
              <ButtonLink onClick={resetToDefault}>Reset to default</ButtonLink>
              <ButtonLink onClick={toggleAll}>
                {selectedColumns.length === columns.length ? 'Deselect' : 'Select'}
                {' '}
                all
              </ButtonLink>
            </Flex>
            <DropdownMenu.List hMax={800}>
              <DnD onDnD={handleDnD} aria-label='drag-and-drop container'>
                {columns.map((column, index) => (
                  <DropdownMenu.Item
                    tag={DnD.Draggable}
                    isCustomFocus={true}
                    key={column.id}
                    selected={selectedColumns.includes(column.id)}
                    onClick={(e) => {
                      if (
                        e.target instanceof HTMLElement &&
                        e.target.getAttribute('role') === 'menuitemcheckbox'
                      ) {
                        if (!selectedColumns.includes(column.id)) {
                          setSelectedColumns([...selectedColumns, column.id]);
                        } else {
                          setSelectedColumns(selectedColumns.filter((i) => i !== column.id));
                        }
                      }
                    }}
                  >
                    {column.label}
                  </DropdownMenu.Item>
                ))}
              </DnD>
            </DropdownMenu.List>
          </DropdownMenu.Popper>
        </DropdownMenu>

        <FeaturePopover
          visible={fpVisible}
          onVisibleChange={setFpVisible}
          disablePortal
          placement='bottom-end'
          theme='neutral'
        >
          <FeaturePopover.Trigger>
            <DropdownMenu>
              <DropdownMenu.Trigger tag={Button}>Big menu</DropdownMenu.Trigger>
              <DropdownMenu.Menu>
                <DropdownMenu.Item>Menu item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Menu item 2</DropdownMenu.Item>

                <DropdownMenu.Item>
                  <DropdownMenu inlineActions placement='right'>
                    <Flex justifyContent='space-between' gap={3}>
                      <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                        Menu item 3
                      </DropdownMenu.Item.Content>
                      <DropdownMenu.Actions gap={1}>
                        <DropdownMenu.Item tag={Button} addonLeft={MathPlus} title='Add new' />
                        <DropdownMenu.Item tag={Button} addonLeft={Settings} title='Delete' />
                      </DropdownMenu.Actions>
                    </Flex>
                  </DropdownMenu>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <DropdownMenu
                    placement='right-start'
                    interaction={DropdownMenu.nestedMenuInteraction}
                    timeout={[0, 300]}
                    offset={[-11, 12]}
                  >
                    <DropdownMenu.Item.Content tag={DropdownMenu.Trigger}>
                      Menu item 4
                      <ChevronRight color='icon-secondary-neutral' />
                    </DropdownMenu.Item.Content>
                    <DropdownMenu.Menu>
                      <DropdownMenu.Item>Add</DropdownMenu.Item>
                      <DropdownMenu.Item>Delete</DropdownMenu.Item>
                    </DropdownMenu.Menu>
                  </DropdownMenu>
                </DropdownMenu.Item>
              </DropdownMenu.Menu>
            </DropdownMenu>
            {fpVisible && <FeaturePopover.Spot />}
          </FeaturePopover.Trigger>
          <FeaturePopover.Popper
            closeIcon
            wMax={400}
            aria-label='New feature: Export'
          >
            <FPContent />
          </FeaturePopover.Popper>
        </FeaturePopover>

      </Flex>

      <Flex gap={4}>
        <Card flex='auto'>
          <Card.Body p={0}>
            <Flex m={5} gap={3}>

              <Pills defaultValue={1}>
                <Pills.Item value={1}>Visibility</Pills.Item>
                <Pills.Item value={2}>Est. Traffic</Pills.Item>
                <Pills.Item value={3}>Avg. Position</Pills.Item>
              </Pills>

              <Flex>
                <Input neighborLocation='right' w={150}>
                  <Input.Value placeholder='Filter by keyword' />
                </Input>
                <Button addonLeft={Search} title='Search' neighborLocation='left' />
              </Flex>

              <Select>
                <Select.Trigger tag={FilterTrigger} id='color-filter-trigger' />
                <Select.Menu aria-labelledby='color-filter-label'>
                  {['Blue', 'Gray', 'Green', 'Orange', 'Pink'].map((option, idx) => (
                    <Select.Option key={idx} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select.Menu>
              </Select>

            </Flex>

            <DataTable
              sideIndents='wide'
              data={data}
              aria-label='Basic table example'
              defaultGridTemplateColumnWidth='auto'
              headerProps={{
                sticky: true,
              }}
              columns={[
                {
                  name: 'keyword',
                  children: 'Keyword',
                },
                {
                  name: 'kd',
                  children: 'KD %',
                },
                {
                  name: 'cpc',
                  children: 'CPC',
                },
                {
                  name: 'hiddenColumn',
                  children: 'Empty',
                },
                {
                  name: 'vol',
                  children: 'Vol.',
                },
              ]}
            />
            <Flex mx={5} my={4} gap={3}>
              <Pagination totalPages={15} />
              <Select
                options={[10, 20, 30].map((x) => { return { value: x, children: x }; })}
                defaultValue={10}
              />
            </Flex>
          </Card.Body>
        </Card>

        <Card w='25%'>
          <Card.Header>
            <Card.Title innerHint='Something'>Settings</Card.Title>
          </Card.Header>
          <Card.Body tag={Flex} direction='column' gap={4}>

            <Textarea />
            <Switch size='l'>
              <Switch.Value />
              <Switch.Addon>Receive updates</Switch.Addon>
            </Switch>
            <Slider
              min={1}
              max={3}
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'big', label: 'Big' },
              ]}
            />
            <InputTags>
              {['tiktok', 'instagram', 'facebook'].map((tag, idx) => (
                <InputTags.Tag
                  key={tag}
                  tag={InputTags.Tag}
                  theme='primary'
                  editable
                // active={false}
                >
                  <InputTags.Tag.Text>
                    {tag}
                  </InputTags.Tag.Text>
                  <InputTags.Tag.Close />
                </InputTags.Tag>
              ))}
              <InputTags.Value
                placeholder='Add a tag'
              />
            </InputTags>

            <Text tag='legend' size={200} mb={-1}>
              List of options
            </Text>
            <List>
              {[1, 2, 3].map((value) => (
                <List.Item key={value} marker=''>
                  <Checkbox label={`Option ${value}`} />
                </List.Item>
              ))}
            </List>

            <RadioGroup
              name='radio'
              aria-labelledby='radioGroup'
              tag={Flex}
              gap={2}
              direction='column'
            >
              <Text id='radioGroup' size={200}>
                Select dog breed
              </Text>
              <Radio value='1' label='Labrador Retriever' />
              <Radio value='2' label='German Shepherd' />
              <Radio value='3' label='Beagle' />
            </RadioGroup>

          </Card.Body>
        </Card>
      </Flex>

      <Card>
        <Text size={400} tag='h3' mb={3} mt={0} semibold textAlign='center'>
          Some questions
        </Text>
        <Accordion use='primary'>
          {[1, 2, 3].map((_, index) => (
            <Accordion.Item value={index} key={index}>
              <Accordion.Item.Toggle wMax={500} mx='auto'>
                <Accordion.Item.ToggleButton gap={2}>
                  <Accordion.Item.Chevron />
                  {`Section ${index + 1}`}
                </Accordion.Item.ToggleButton>
              </Accordion.Item.Toggle>
              <Accordion.Item.Collapse wMax={500} mx='auto'>
                <Box m={3} ml={6}>
                  {`Hello Section ${index + 1}`}
                </Box>
              </Accordion.Item.Collapse>
            </Accordion.Item>
          ))}
        </Accordion>
        <Text size={400} tag='h3' mb={3} mt={6} semibold textAlign='center'>
          Other questions
        </Text>
        <Accordion>
          {[1, 2, 3].map((_, index) => (
            <Accordion.Item value={index} key={index}>
              <Accordion.Item.Toggle wMax={500} mx='auto'>
                <Accordion.Item.ToggleButton gap={2}>
                  <Accordion.Item.Chevron />
                  {`Section ${index + 1}`}
                </Accordion.Item.ToggleButton>
              </Accordion.Item.Toggle>
              <Accordion.Item.Collapse wMax={500} mx='auto'>
                <Box m={3} ml={6}>
                  {`Hello Section ${index + 1}`}
                </Box>
              </Accordion.Item.Collapse>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </Flex>
  );
};

const data: DataTableData = [
  {
    keyword: <>ebay buy<Tag color='green-500' interactive ml={2}>New</Tag></>,
    kd: '77.8',
    cpc: '$1.25',
    vol: '32,500,000',
  },
  {
    keyword: <>www.ebay.com<Tag color='red-500' interactive ml={2}>Wrong</Tag></>,
    kd: '11.2',
    cpc: '$3.4',
    vol: '65,457,920',
  },
  {
    keyword: <>www.ebay.com <Link size={200}>semrush.com</Link></>,
    kd: '10',
    cpc: '$0.65',
    vol: '47,354,640',
  },
  {
    keyword: <>ebay buy<ButtonLink size={200} use='secondary' ml={2}>What's this?</ButtonLink></>,
    kd: null,
    cpc: '$0',
    vol: 'n/a',
  },
  {
    keyword: <>ebay buy <ButtonLink addonLeft={LinkExternal} use='secondary' title='Go to' /></>,
    kd: 75.89,
    cpc: '$0',
    vol: '21,644,290',
  },
];

const defaultColumns = [
  { id: 'uniquePageviews', label: 'Unique Pageviews' },
  { id: 'uniqueVisitors', label: 'Unique Visitors' },
  { id: 'entranceSources', label: 'Entrance Sources' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'mobile', label: 'Mobile' },
];
const defaultSelectedColumns = ['uniquePageviews', 'entranceSources'];

export default FocusInAllComponents;
