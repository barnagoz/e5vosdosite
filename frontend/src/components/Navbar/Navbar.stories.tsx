import { ComponentMeta, ComponentStory } from "@storybook/react";

import Navbar from "./Navbar";

export default {
  title: "Navbar/Navbar",
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar />;
export const Primary = Template.bind({});
