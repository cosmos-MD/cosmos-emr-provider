import React, { useState, useEffect } from 'react';
import { Text, ActionIcon } from '@mantine/core';
import { HumanNameInput } from './HumanNameInput';
import { IconPlus, IconX } from '@tabler/icons-react';
import './HumanNamesInput.css';

// Name option structure for use inside this component, includes field to put unique id
interface NameOption {
  id: string;
  label: string;
  nameType: string;
  required: boolean;
  unique: boolean;
}

/**
 * Props for HumanNamesInput component.
 * @param {Object[]} nameOptions - Array of name options for input fields.
 * @param {string} priorityName - Name label that should be shown at the top.
 */
interface HumanNamesInputProps {
  nameOptions: Omit<NameOption, 'id'>[];
  priorityName: string;
}

/**
 * A component for managing a list of human name input fields.
 *
 * @component
 * @param {HumanNamesInputProps} props - Props for the component.
 * @returns {React.ReactElement} - Rendered component.
 */
export default function HumanNamesInput({ nameOptions, priorityName }: HumanNamesInputProps) {
  // State to manage the name inputs
  const [nameInputs, setNameInputs] = useState<NameOption[]>([]);

  // Effect to set the initial required name inputs
  useEffect(() => {
    const requiredNameOptions = nameOptions
      .filter(option => option.required)
      .map(option => ({ ...option, id: `name-${option.label}` })); // Simple ID generation
    setNameInputs(requiredNameOptions);
  }, [nameOptions]);

  // Basic rendering of the name inputs
  return (
    <div>
      {nameInputs.map(({ id, label }) => (
        <div key={id}>
          <Text>{label}</Text>
          <HumanNameInput name={id} />
        </div>
      ))}
    </div>
  );
}
