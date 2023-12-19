import { Meta } from "@storybook/react";

import React from "react";
import { Calendar } from "./Calendar";

export default ({
  title: "Calendar/With table element",
  component: Calendar,
} as Meta);

const Template = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
