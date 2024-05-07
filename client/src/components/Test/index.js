import React ,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import './style.css'
export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checkedOptions, setCheckedOptions] = React.useState({
    option1: false, // set to true if you want it checked by default
    option2: false,
    option3: false,
  });
  const [shouldCloseMenu, setShouldCloseMenu] = React.useState(true);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if(shouldCloseMenu){
        setAnchorEl(null);
    }
    setShouldCloseMenu(true)
  };

  const handleCheckboxToggle = (option) => () => {
    setShouldCloseMenu(false)
    setCheckedOptions({ ...checkedOptions, [option]: !checkedOptions[option] });
  };

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  useEffect(()=>{
    console.log("sdddddddddddddddddd",selectionRange)
  },[selectionRange])

  const handleSelect = (ranges) => {
    // ranges is an object with startDate and endDate
    setSelectionRange(ranges.selection);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checkedOptions.option1}
              tabIndex={-1}
              disableRipple
              onChange={handleCheckboxToggle('option1')}
            />
          </ListItemIcon>
          Option 1
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checkedOptions.option2}
              tabIndex={-1}
              disableRipple
              onChange={handleCheckboxToggle('option2')}
            />
          </ListItemIcon>
          Option 2
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checkedOptions.option3}
              tabIndex={-1}
              disableRipple
              onChange={handleCheckboxToggle('option3')}
            />
          </ListItemIcon>
          Option 3
        </MenuItem> */}

      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
      </Menu>
    </div>
  );
}
