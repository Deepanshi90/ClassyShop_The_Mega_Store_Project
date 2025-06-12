// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import { IoCloseSharp } from "react-icons/io5";
// import { useState } from 'react';
// import CategoryCollapse from '../../CategoryCollapse';
// import { useTranslation } from 'react-i18next';

// const CategoryPanel = (props) => {
 

//   const toggleDrawer = (newOpen) => () => {
//     props.setIsOpenCatPanel(newOpen);
//   };

//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
//       <h3 className='p-3 text-[18px] font-[500] flex items-center justify-between'>
//         Shop By Categories
//         <IoCloseSharp onClick={toggleDrawer(false)} className='cursor-pointer text-[20px]' />
//       </h3>
//       <CategoryCollapse />
//     </Box>
//   );

//   return (
//     <div>
//       <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
//         {DrawerList}
//       </Drawer>
//     </div>
//   );
// };

// export default CategoryPanel;



import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IoCloseSharp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import CategoryCollapse from '../../CategoryCollapse';

const CategoryPanel = (props) => {
  const { i18n } = useTranslation();

  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCatPanel(newOpen);
  };

  // Language switch handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel p-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className='text-[18px] font-[500]'>Shop By Categories</h3>
        <IoCloseSharp onClick={toggleDrawer(false)} className='cursor-pointer text-[20px]' />
      </div>

      {/* Language Switcher */}
      <div className="mb-6">
        <label htmlFor="language-select" className="block mb-1 font-semibold">Select Language:</label>
        <select
          id="language-select"
          className="w-full p-2 border rounded"
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          {/* Add more languages here */}
        </select>
      </div>

      <CategoryCollapse />
    </Box>
  );

  return (
    <div>
      <Drawer open={props.isOpenCatPanel} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default CategoryPanel;
