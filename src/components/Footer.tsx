import { Anchor, Container, createStyles, Divider, SimpleGrid, Stack, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  footer: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
  },

  inner: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
    borderTop: `1px solid ${theme.colors.gray[2]}`,
    padding: theme.spacing.xl,
    textAlign: 'center',
  },
}));

export function Footer(): JSX.Element {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <Container p="xl">
          <Stack spacing="xl">
            <Divider />
            <Text color="dimmed" size="sm">
              &copy; {new Date().getFullYear()} cosmosMD. All rights reserved.
            </Text>
          </Stack>
        </Container>
      </div>
    </footer>
  );
}
