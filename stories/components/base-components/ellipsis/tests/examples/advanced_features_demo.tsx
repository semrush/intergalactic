import FileM from '@semcore/icon/FileExport/m';
import FolderM from '@semcore/icon/Folder/m';
import SearchM from '@semcore/icon/Search/m';
import { Box, Flex } from '@semcore/ui/base-components';
import { DataTable } from '@semcore/ui/data-table';
import Input from '@semcore/ui/input';
import TabLine from '@semcore/ui/tab-line';
import { Text } from '@semcore/ui/typography';
import React from 'react';

const Demo = () => {
  const [activeTab, setActiveTab] = React.useState('files');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [copiedItem, setCopiedItem] = React.useState<string | null>(null);

  const files = [
    {
      id: 1,
      name: 'project-documentation-final-version-2024-updated.pdf',
      path: '/home/user/documents/work/projects/intergalactic/docs',
      description: 'Final version of project documentation with all updates and reviews from Q4 2024',
      size: '2.4 MB',
    },
    {
      id: 2,
      name: 'meeting-notes-Q4-2024-team-discussion-action-items.docx',
      path: '/home/user/documents/meetings/2024/Q4',
      description: 'Meeting notes containing team discussions and action items from quarterly review',
      size: '156 KB',
    },
    {
      id: 3,
      name: 'component-library-design-system-guidelines-v3.sketch',
      path: '/home/user/design/intergalactic/components',
      description: 'Complete design system guidelines version 3 for Intergalactic component library',
      size: '45.2 MB',
    },
    {
      id: 4,
      name: 'user-research-findings-january-2024-summary.pdf',
      path: '/home/user/research/2024/january',
      description: 'Summary of user research findings and insights from January 2024 interviews',
      size: '3.8 MB',
    },
  ];

  const logs = [
    {
      id: 1,
      timestamp: '2024-01-14 10:23:45',
      level: 'ERROR',
      message:
        'Authentication failed for user admin@example.com: Invalid credentials provided in login attempt',
    },
    {
      id: 2,
      timestamp: '2024-01-14 10:24:12',
      level: 'WARN',
      message:
        'Database connection pool reaching capacity: 95% utilization detected, consider scaling',
    },
    {
      id: 3,
      timestamp: '2024-01-14 10:25:33',
      level: 'INFO',
      message:
        'Successfully processed batch job: 1,245 records updated in customer database table',
    },
    {
      id: 4,
      timestamp: '2024-01-14 10:26:18',
      level: 'ERROR',
      message:
        'Failed to send notification email to support@example.com: SMTP timeout after 30 seconds',
    },
  ];

  const handleCopy = React.useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(text);
    setTimeout(() => setCopiedItem(null), 2000);
  }, []);

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredLogs = logs.filter((log) =>
    log.message.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Flex direction='column' gap={4}>
      <Box>
        <Text size={400} bold mb={2}>
          Advanced Features Demo
        </Text>
        <Text size={200} color='text-secondary'>
          Real-world example: File browser and log viewer with search highlighting and copy
          functionality
        </Text>
      </Box>

      {/* Search */}
      <Input w='100%'>
        <Input.Addon>
          <SearchM />
        </Input.Addon>
        <Input.Value
          placeholder='Search files, paths, or log messages...'
          value={searchQuery}
          onChange={(value) => setSearchQuery(value as string)}
        />
      </Input>

      {copiedItem && (
        <Box
          p={2}
          style={{
            background: 'var(--intergalactic-bg-primary-success)',
            color: 'var(--intergalactic-text-primary-invert)',
            borderRadius: '4px',
          }}
        >
          <Text size={200}>✓ Copied to clipboard!</Text>
        </Box>
      )}

      {/* Tabs */}
      <TabLine value={activeTab} onChange={(v: string) => setActiveTab(v)}>
        <TabLine.Item value='files'>
          <TabLine.Item.Text>
            Files ({filteredFiles.length}/{files.length})
          </TabLine.Item.Text>
        </TabLine.Item>
        <TabLine.Item value='logs'>
          <TabLine.Item.Text>
            Logs ({filteredLogs.length}/{logs.length})
          </TabLine.Item.Text>
        </TabLine.Item>
      </TabLine>

      {/* Files table */}
      {activeTab === 'files' && (
        <DataTable
          data={filteredFiles}
          aria-labelledby='files-table'
          columns={[
            { name: 'name', children: 'File name' },
            { name: 'path', children: 'Path' },
            { name: 'description', children: 'Description' },
            { name: 'size', children: 'Size', gtcWidth: 'auto' },
          ]}
          renderCell={(props) => {
            const rowData = filteredFiles[props.rowIndex];

            if (props.columnName === 'name') {
              return (
                <Flex alignItems='center' gap={2}>
                  <FileM color='icon-secondary' />
                  <Text
                    w={200}
                    ellipsis:cropPosition='middle'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleCopy(rowData.name)}
                    title='Click to copy'
                  >
                    {rowData.name}
                  </Text>
                </Flex>
              );
            }

            if (props.columnName === 'path') {
              return (
                <Flex alignItems='center' gap={2}>
                  <FolderM color='icon-secondary' />
                  <Text
                    w={250}
                    ellipsis:cropPosition='middle'
                    style={{ cursor: 'pointer', fontFamily: 'monospace' }}
                    onClick={() => handleCopy(rowData.path)}
                    title='Click to copy'
                  >
                    {rowData.path}
                  </Text>
                </Flex>
              );
            }

            if (props.columnName === 'description') {
              return (
                <Text
                  w={300}
                  ellipsis:cropPosition='end'
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCopy(rowData.description)}
                  title='Click to copy description'
                >
                  {rowData.description}
                </Text>
              );
            }

            return props.defaultRender();
          }}
        />
      )}

      {/* Logs table */}
      {activeTab === 'logs' && (
        <DataTable
          data={filteredLogs}
          aria-labelledby='logs-table'
          columns={[
            { name: 'timestamp', children: 'Time', gtcWidth: 'auto' },
            { name: 'level', children: 'Level', gtcWidth: 'auto' },
            { name: 'message', children: 'Message' },
          ]}
          renderCell={(props) => {
            const rowData = filteredLogs[props.rowIndex];

            if (props.columnName === 'timestamp') {
              return (
                <Text size={100} style={{ fontFamily: 'monospace' }}>
                  {rowData.timestamp}
                </Text>
              );
            }

            if (props.columnName === 'level') {
              const levelColors = {
                ERROR: 'var(--intergalactic-text-critical)',
                WARN: 'var(--intergalactic-text-warning)',
                INFO: 'var(--intergalactic-text-info)',
              };
              return (
                <Text
                  size={100}
                  bold
                  color={levelColors[rowData.level as keyof typeof levelColors]}
                >
                  {rowData.level}
                </Text>
              );
            }

            if (props.columnName === 'message') {
              return (
                <Text
                  w={400}
                  ellipsis:cropPosition='middle'
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCopy(rowData.message)}
                  title='Click to copy full message'
                >
                  {rowData.message}
                </Text>
              );
            }

            return props.defaultRender();
          }}
        />
      )}

      {/* No results */}
      {searchQuery &&
        ((activeTab === 'files' && filteredFiles.length === 0) ||
          (activeTab === 'logs' && filteredLogs.length === 0)) && (
        <Box p={4} style={{ textAlign: 'center' }}>
          <Text size={300} color='text-secondary'>
            No results found for "{searchQuery}"
          </Text>
        </Box>
      )}

      {/* Feature highlights */}
      <Flex gap={3}>
        <Box
          flex={1}
          p={3}
          bg='bg-primary-success-faint'
          borderRadius='popper-round'
          border='1px solid var(--intergalactic-border-success)'
        >
          <Text size={200} bold mb={2} color='text-success'>
            ✓ Copy Full Text
          </Text>
          <Text size={100}>
            Click on any truncated text to copy the full content. The complete path, filename, or
            message is copied - not the truncated version with "..."
          </Text>
        </Box>

        <Box
          flex={1}
          p={3}
          bg='bg-primary-success-faint'
          borderRadius='popper-round'
          border='1px solid var(--intergalactic-border-info)'
        >
          <Text size={200} bold mb={2} color='text-info'>
            ✓ Different Crop Positions
          </Text>
          <Text size={100}>
            File name, Path, and Message use middle crop (shows start and end). Description uses
            end crop (shows only beginning).
          </Text>
        </Box>
      </Flex>

      {/* Instructions */}
      <Box
        p={3}
        bg='bg-primary-info'
        borderRadius='popper-round'
      >
        <Text size={200} bold mb={2}>
          Try it out:
        </Text>
        <Text size={100} tag='ol' style={{ paddingLeft: 'var(--intergalactic-spacing-5x, 20px)', margin: 0 }}>
          <li>Search for: "documentation", "error", "2024", "user"</li>
          <li>Notice how matches stay visible even when text is truncated</li>
          <li>Click on any truncated text to copy the full version</li>
          <li>Try selecting and copying with Ctrl+C / Cmd+C</li>
          <li>Switch between Files and Logs tabs</li>
        </Text>
      </Box>
    </Flex>
  );
};

export default Demo;
