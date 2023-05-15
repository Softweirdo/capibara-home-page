
import * as React from "react";
import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { blue } from "@mui/material/colors";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import BuyBox from "./BuyBox";
import ClaimBox from "./ClaimBox";
const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #393735;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: auto 36px;
  border: none;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  justify-content: center;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0px;
  text-align: left;
  color: #393735;

  &:hover {
    background-color: rgba(47, 50, 65, 0.1);
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0px;
    text-align: left;
    color: #393735;
  }

  &:focus {
    color: #fff;
    border-radius: 10px 10px 0px 0px;
    outline: none;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: rgba(47, 50, 65, 0.1);
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0px;
    text-align: left;
    color: #393735;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    background: rgba(47, 50, 65, 0.1);
    cursor: not-allowed;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 27px;
    letter-spacing: 0px;
    text-align: center;
  }
`;
const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: transperant;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;
const SwapBox = () =>{
     const [value, setValue] = React.useState(0);
     const handleChange = (event, newValue) => {
       setValue(newValue);
     };
    return (
      <Box sx={{ width: "100%" }}>
        <TabsUnstyled defaultValue={0}>
          <TabsList>
            <Tab>Buy</Tab>
            <Tab>Claim</Tab>
          </TabsList>
          <TabPanel value={0}><BuyBox /></TabPanel>
          <TabPanel value={1}><ClaimBox/></TabPanel>
        </TabsUnstyled>
      </Box>
    );
}
export default SwapBox