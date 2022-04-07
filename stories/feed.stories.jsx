import Feed from "../components/Feed";
import { mockupRes } from "./mockupResponse";

export default {
    title: "Pages/Feed",
    component: Feed,
  };


const Template = (args) => <Feed {...args} />;

export const MintbaseFeed = Template.bind({});
MintbaseFeed.args = {
    mintbaseRes: mockupRes,
}