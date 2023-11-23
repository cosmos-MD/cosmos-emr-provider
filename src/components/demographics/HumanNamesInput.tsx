/*
 * Copyright 2023 cosmosMD
 *
 * This file is part of cosmos-emr-provider and is released under
 * the terms of the GNU Affero General Public License v3.
 * See the LICENSE file in the root of this project for more details,
 * or <http://www.gnu.org/licenses/agpl-3.0.html>.
 */

import React, { useState, useEffect } from 'react';
import { Text, ActionIcon } from '@mantine/core';
import { HumanNameInput } from '@medplum/react';
import { IconPlus, IconX } from '@tabler/icons-react';
import './HumanNamesInput.css';

/**
 * Interface for defining the structure of a name option.
 */
interface NameOption {
  id: string;
  label: string;
  nameType: string;
  required: boolean;
  unique: boolean;
}

/**
 * Props for the HumanNamesInput component.
 * @param {Object[]} nameOptions - Array of name options for input fields.
 * @param {string} priorityName - Name label that should be shown at the top.
 */
interface HumanNamesInputProps {
  nameOptions: Omit<NameOption, 'id'>[];
  priorityName: string;
}

/**
 * A component for managing a list of human name input fields.
 * Allows adding and removing of name fields dynamically.
 *
 * @component
 * @param {HumanNamesInputProps} props - Props for the component.
 * @returns {React.ReactElement} - Rendered component.
 */
export default function HumanNamesInput({ nameOptions, priorityName }: HumanNamesInputProps) {
  const [nameInputs, setNameInputs] = useState<NameOption[]>([]);

  // Sets the initial required name inputs based on provided options
  useEffect(() => {
    const requiredNameOptions = nameOptions
      .filter(option => option.required)
      .map(option => ({ ...option, id: `name-${option.label}` }));
    setNameInputs(requiredNameOptions);
  }, [nameOptions]);

  /**
   * Function to add a new name input field to the list.
   * @param {string} label - The label for the new input field.
   */
  const addNameInput = (label: string) => {
    setNameInputs(currentInputs => {
      const newInput = {
        id: `name-${label}-${currentInputs.length}`,
        label,
        nameType: 'custom',
        required: false,
        unique: false,
      };
      return [...currentInputs, newInput];
    });
  };

  /**
   * Function to remove an existing name input field from the list.
   * @param {string} id - The id of the input field to remove.
   */
  const removeNameInput = (id: string) => {
    setNameInputs(currentInputs => currentInputs.filter(input => input.id !== id));
  };

  return (
    <div className="humanNameInputContainer">
      {nameInputs.map(({ id, label }, index) => (
        <div key={id} className="humanNameInputRow">
          <Text className="humanNameInputLabel">{label}</Text>
          <HumanNameInput name={id} />
          <ActionIcon onClick={() => removeNameInput(id)}>
            <IconX size={24} />
          </ActionIcon>
          {index === 0 && (
            <ActionIcon onClick={() => addNameInput('New Name')}>
              <IconPlus size={24} />
            </ActionIcon>
          )}
        </div>
      ))}
    </div>
  );
}
