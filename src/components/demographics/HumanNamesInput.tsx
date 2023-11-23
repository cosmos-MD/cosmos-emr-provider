import React, { useState } from 'react';
import { Text, ActionIcon, Paper } from '@mantine/core';
import { HumanNameInput } from '@medplum/react';
import { IconPlus, IconX } from '@tabler/icons-react';

// Define the structure of each name option 
interface NameOption {
  id: string;
  label: string;
  nameType: string;
  required: boolean;
  unique: boolean;
}

// Props for HumanNamesInput component 
interface HumanNamesInputProps {
  nameOptions: Omit<NameOption, 'id'>[];
  priorityName: string;
}

export default function HumanNamesInput({ nameOptions, priorityName }: HumanNamesInputProps) {
  // State and logic to be added in subsequent commits

  return (
    <div>
      {/* Basic component structure - to be expanded in future commits */}
    </div>
  );
}
