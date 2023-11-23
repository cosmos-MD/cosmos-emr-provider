/*
 * Copyright 2023 cosmosMD
 *
 * This file is part of cosmos-emr-provider and is released under
 * the terms of the GNU Affero General Public License v3.
 * See the LICENSE file in the root of this project for more details,
 * or <http://www.gnu.org/licenses/agpl-3.0.html>.
 */

import React from 'react';
import { Box, Text, Flex, useMantineTheme } from '@mantine/core';
import HumanNamesInput from './demographics/HumanNamesInput';

/**
 * Demographics component that renders demographic information input fields.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
export function Demographics(): JSX.Element {
  const { colorScheme } = useMantineTheme();

  // Dynamic background and text color based on the theme
  const backgroundColor = colorScheme === 'dark' ? '#333' : '#f8f8f8';
  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  // Example name options for initial testing of HumanNamesInput
  const nameOptions = [
    { label: 'Health Card Name', nameType: 'official', required: true, unique: true },
    { label: 'Preferred Name', nameType: 'usual', required: false, unique: true },
    { label: 'Previous Name', nameType: 'old', required: false, unique: false }
  ];

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
        {/* Integration of the HumanNamesInput component with example name options */}
        <HumanNamesInput nameOptions={nameOptions} priorityName="Preferred Name" />
      </Box>
    </Flex>
  );
}
