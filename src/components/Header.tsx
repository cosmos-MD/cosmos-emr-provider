import {
  Burger,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  Menu,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ResourceAvatar, useMedplumProfile } from '@medplum/react';
import { IconChevronDown, IconLogout, IconSettings, IconUserCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
  inner: {
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Demographics', href: '/demographics' },
  { name: 'Billing', href: '/billing' },
  { name: 'Administration', href: '/administration' },
];

export function Header(): JSX.Element {
  const navigate = useNavigate();
  const profile = useMedplumProfile();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <MantineHeader height={80} mb={120} fixed={true}>
      <Container>
        <div className={classes.inner}>
          <Group spacing={4} className={classes.links}>
            {navigation.map((link) => (
              <Link key={link.name} to={link.href} className={classes.link}>
                {link.name}
              </Link>
            ))}
          </Group>
          <Menu
            width={260}
            shadow="xl"
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
                <Group spacing={7}>
                  <ResourceAvatar radius="xl" value={profile} />
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconUserCircle size={16} color={theme.colors.red[6]} stroke={1.5} />}
                onClick={() => navigate('/account/profile')}
              >
                Your profile
              </Menu.Item>
              <Menu.Item
                icon={<IconLogout size={16} color={theme.colors.gray[6]} stroke={1.5} />}
                onClick={() => navigate('/signout')}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </div>
      </Container>
    </MantineHeader>
  );
}
