/*
 * Copyright 2023 cosmosMD
 *
 * This file is part of cosmos-emr-provider and is released under
 * the terms of the GNU Affero General Public License v3.
 * See the LICENSE file in the root of this project for more details,
 * or <http://www.gnu.org/licenses/agpl-3.0.html>.
 */

/**
 * HumanNamesInput Component
 *
 * This React component is responsible for managing a list of human names input fields.
 * It allows users to add, remove, and prioritize name inputs based on predefined name options.
 *
 * @component
 *
 * @param {Object[]} nameOptions - An array of name options that define the structure of each name input.
 * @param {string} nameOptions[].label - The label for the name input.
 * @param {string} nameOptions[].nameType - The type of the name input (for future use).
 * @param {boolean} nameOptions[].required - Indicates if the name input is required.
 * @param {boolean} nameOptions[].unique - Indicates if the name input should be unique.
 * @param {string} priorityName - The name label that should always be shown at the top.
 *
 * @example
 * // Example usage of the HumanNamesInput component
 *  <HumanNamesInput
 *    nameOptions={[
 *      { label: 'Health Card Name', nameType: 'official', required: true, unique: true },
 *      { label: 'Preferred Name', nameType: 'usual', required: false, unique: true },
 *      { label: 'Previous Name', nameType: 'old', required: false, unique: false }
 *    ]}
 *    priorityName="Preferred Name"
 *  />
 *
 * @returns {React.ReactElement} A React component representing the HumanNamesInput.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Text, ActionIcon, Paper } from '@mantine/core';
import { HumanNameInput } from '@medplum/react';
import { IconPlus, IconX } from '@tabler/icons-react';
import './HumanNamesInput.css';
import { generateUniqueId } from '../../utils/generateUniqueId';

// Define the structure of each name option.  nameType for future use.
interface NameOption {
  id: string;
  label: string;
  nameType: string;
  required: boolean;
  unique: boolean;
}

// Props for this HumanNamesInput component; priorty will always show at the top if added to page
interface HumanNamesInputProps {
  nameOptions: Omit<NameOption, 'id'>[];
  priorityName: string;
}

export default function HumanNamesInput({ nameOptions, priorityName }: HumanNamesInputProps) {
  // State to manage the name inputs, dropdown visibility, and its position.
  const [nameInputs, setNameInputs] = useState<NameOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const plusIconRef = useRef<HTMLButtonElement | null>(null);

  // Sets the initial name inputs based on required options.  At least one must be required.
  useEffect(() => {
    const requiredNameOptions = nameOptions
      .filter(option => option.required)
      .map(option => ({ ...option, id: generateUniqueId(option.label) }));
    setNameInputs(requiredNameOptions);
  }, [nameOptions]);

  // Adds a new name input field; trigged by pressing + and using the menu
  const addNameInput = (label: string) => {
    setNameInputs(currentInputs => {
      const nameOption = nameOptions.find(option => option.label === label);
      if (!nameOption || (nameOption.unique && currentInputs.some(input => input.label === label))) {
        return currentInputs;
      }

      const newInput = { ...nameOption, id: generateUniqueId(label) };
      return label === priorityName ? [newInput, ...currentInputs] : [...currentInputs, newInput];
    });
    setShowDropdown(false);
  };

  // Removes an existing name input field.  Triggered by pressing the X beside a row.
  const removeNameInput = (id: string) => {
    setNameInputs(currentInputs => currentInputs.filter(input => input.id !== id));
  };

  // Toggles the dropdown and sets its position.
  const handleShowDropdown = () => {
    if (plusIconRef.current) {
      const rect = plusIconRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setShowDropdown(currentShow => !currentShow);
  };

  // Renders the dropdown options based on the nameOptions and current nameInputs.
  // Uniques should only be an option to add once. 
  const renderDropdownOptions = () => {
    return nameOptions
      .filter(({ label, unique }) => !unique || !nameInputs.some(input => input.label === label))
      .map(({ label }) => (
        <Text
          key={label}
          onClick={() => addNameInput(label)}
          style={{
            cursor: 'pointer',
            padding: '5px',
          }}
        >
          {label}
        </Text>
      ));
  };

  return (
    <div className="humanNamesContainer">
      {nameInputs.map(({ id, label, required }, index) => (
        <div key={id} className="rowStyle">
          <Text
            className={label === priorityName ? 'preferredNameStyle' : 'textStyle'}
            style={{
              fontWeight: label === priorityName ? 'bold' : undefined,
              textAlign: 'right', // Add this line to right-justify the text
            }}
          >
            {label}
          </Text>          <HumanNameInput name={id} style={{ flex: 1, marginLeft: '10px' }} />

          {index === 0 && (
            <ActionIcon ref={plusIconRef} onClick={handleShowDropdown}>
              <IconPlus size={24} />
            </ActionIcon>
          )}

          {!required && (
            <ActionIcon onClick={() => removeNameInput(id)}>
              <IconX size={24} />
            </ActionIcon>
          )}
        </div>
      ))}

      {showDropdown && (
        <Paper
          withBorder
          shadow="xl"
          radius="md"
          className="paperStyle"
          style={{ position: 'absolute', top: dropdownPosition.top, left: dropdownPosition.left, zIndex: 1 }}
        >
          {renderDropdownOptions()}
        </Paper>
      )}
    </div>
  );
}