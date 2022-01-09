import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import logo from './h6s_storybook_logo.png'

addons.setConfig({
  theme: create({
    base: 'light',
    brandUrl: 'https://h6s.dev/',
    brandTitle: 'h6s',
    brandImage: logo,
  }),
});
