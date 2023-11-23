import React from 'react';
import { Box, Text, Flex, useMantineTheme } from '@mantine/core';

export function Demographics(): JSX.Element {
  // Get the current color scheme from Mantine theme
  const { colorScheme } = useMantineTheme();

  // Determine the background color based on the color scheme
  const backgroundColor = colorScheme === 'dark' ? '#333' : '#f8f8f8';
  
  return (
    <Flex direction="column" align="center" style={{ padding: '2px' }}>
      <Box style={{ width: '80%', textAlign: 'left', background: backgroundColor }}>
        <Text size="xl" weight={700}>
          Demographics
        </Text>
      </Box>
    </Flex>
  );
}
