import React from 'react';
import { Box, Text, Flex, useMantineTheme } from '@mantine/core';

export function Demographics(): JSX.Element {
  const { colorScheme } = useMantineTheme();

  // Adjusting background and text color based on the theme
  const backgroundColor = colorScheme === 'dark' ? '#333' : '#f8f8f8';
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <Flex direction="column" align="center" style={{ padding: '2px' }}>
      <Box style={{ width: '80%', textAlign: 'left', background: backgroundColor }}>
        <Text
          size="xl"
          weight={700}
          style={{ color: textColor, padding: '4px 8px', borderRadius: '4px' }}
        >
          Demographics
        </Text>
        {/* Placeholder for future component */}
      </Box>
    </Flex>
  );
}
