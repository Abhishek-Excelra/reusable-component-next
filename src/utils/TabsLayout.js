import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { tabConfig } from './tabConfig';
import Navbar from './Navbar';
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


const TabsLayout = ({ userDetails }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabInfo = tabConfig(userDetails.user_id)[userDetails.role_name]

  return (
    <Box
      sx={{ bgcolor: 'background.paper'}}
    >
      <Navbar userDetails={userDetails}/>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', display: 'flow',marginLeft:'26px'  }}
      >
        {tabInfo.map(({ label, index }) => <Tab label={label} key={index} />)}
      </Tabs>
      {tabInfo.map(({ index, component: Component }) =>
        <TabPanel value={value} index={index} key={index}>
          <Component />
        </TabPanel>)}
    </Box>
  );
}
export default TabsLayout