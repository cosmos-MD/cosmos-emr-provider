import {
  Box,
  createStyles,
  Group,
  useMantineTheme,
} from '@mantine/core';
import { formatHumanName } from '@medplum/core';
import { Patient, Practitioner } from '@medplum/fhirtypes';
import { useMedplumProfile } from '@medplum/react';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  welcomeText: {
    backgroundColor: theme.fn.darken(theme.fn.primaryColor(), 0.4),
    color: theme.white,
    padding: theme.spacing.md,
    textAlign: 'center',
  },
}));


export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const profile = useMedplumProfile() as Patient | Practitioner;
  const profileName = profile.name ? formatHumanName(profile.name[0]) : '';

  return (
    <>
      <Box className={classes.welcomeText}>
        <Group position="center">
          <p>Welcome to cosmosEMR</p>
        </Group>
      </Box>
    </>
  );
}
