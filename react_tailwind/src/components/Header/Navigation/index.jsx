// import Button from '@mui/material/Button';
// import React, { useState } from 'react'
// import {RiMenu2Fill} from "react-icons/ri";
// import {LiaAngleDownSolid} from "react-icons/lia";
// import { Link } from 'react-router-dom';
// import {GoRocket} from "react-icons/go"
// import CategoryPanel from './CategoryPanel';
// import "../Navigation/style.css";

//  const Navigation = () => {

//     const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
//     const openCategoryPanel = () =>{
//         setIsOpenCatPanel(true);
//     }
//   return (<>
//     <nav >
//         <div className="container flex items-center justify-end gap-8">
//             <div className="col_1 w-[20%]">
//                 <Button className='!text-black gap-2 w-full' onClick={openCategoryPanel}><RiMenu2Fill className='text-[18px]' />Shop By Categories
//                 <LiaAngleDownSolid  className='text-[13px] ml-auto font-bold '  /></Button>
//             </div>
//             <div className="col_2 w-[60%]">
//                 <ul className="flex items-center gap-3 nav">
//                     <li className='list-none'>
//                         <Link to={"/"} className='link transition text-[14px] font-[500]'><Button className='link transition font-[500]
//                         !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Home</Button></Link>
//                     </li>
//                     <li className='list-none relative'>
//                         <Link to={"/"} className='link transition text-[14px] font-[500]'>
//                         <Button className='link transition font-[500]
//                         !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Fashion</Button></Link>

//                         <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
//                             <ul>
//                                 <li className="list-none"><Link to="/" className='w-full' >
//                                     <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]' >Men</Button></Link>
//                                 </li>
//                                 <li className="list-none"><Link to="/" className='w-full' >
//                                     <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]' >Women</Button></Link>
//                                 </li>
//                                 <li className="list-none"><Link to="/" className='w-full' >
//                                     <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]' >Kids</Button></Link>
//                                 </li>
//                                 <li className="list-none"><Link to="/" className='w-full' >
//                                     <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none  hover:!text-[#ff5252]' >Girls</Button></Link>
//                                 </li>
//                                 <li className="list-none"><Link to="/" className='w-full' >
//                                     <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]' >Boys</Button></Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </li>
//                     <li className='list-none'>
//                         <Link to={"/"} className='link transition text-[14px] font-[500]'>
//                         <Button className='link transition font-[500]
//                         !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Electronics</Button></Link>
//                     </li>
//                     <li className='list-none'>
//                         <Link to={"/"} className='link transition text-[14px] font-[500]'>
//                         <Button className='link transition font-[500]
//                         !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Bags</Button></Link>
//                     </li>
//                     <li className='list-none'>
//                         <Link to={"/"} className='link transition text-[14px] font-[500]'>
//                         <Button className='link transition font-[500]
//                         !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Footwear</Button></Link>
//                     </li>
//                     <li className='list-none'>
//                         <Link to={"/"} className='link transition text-[14px] font-[500]'>
//                         <Button className='link transition font-[500]
//                         !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Groceries</Button></Link>
//                     </li>
//                     <li className='list-none'>
//                         <Link to={"/"} className='link transition text-[14px] font-[500]'>
//                         <Button className='link transition font-[500] 
//                         !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Beauty</Button></Link>
//                     </li>
//                     <li className='list-none'>
//                         <Link to={"/"} className='link transition text-[14px] font-[500]'>
//                         <Button className='link transition font-[500]
//                         !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Wellness</Button></Link>
//                     </li>
//                     <li className='list-none'>
//                         <Link to={"/"} className='link transition text-[14px] font-[500]'>
//                         <Button className='link transition font-[500]
//                         !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>Jwellery</Button></Link>
//                     </li>
//                 </ul>
//             </div>
//             <div className="col_3 w-[20%]">
//                 <p className='text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0 '><GoRocket className='text-[18px]'/>Free International Delivery
//                 </p>
//             </div>
//         </div>
//     </nav>
//     {/* Category Component Panel */}
//     <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel}/>
//     </>
//   )
// }


// export default Navigation;

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';
import { GoRocket } from "react-icons/go";
import CategoryPanel from './CategoryPanel';
import "../Navigation/style.css";

// Translation dictionary
const translations = {
  en: {
    shopByCategories: "Shop By Categories",
    home: "Home",
    fashion: "Fashion",
    electronics: "Electronics",
    bags: "Bags",
    footwear: "Footwear",
    groceries: "Groceries",
    beauty: "Beauty",
    wellness: "Wellness",
    jewellery: "Jewellery",
    freeDelivery: "Free International Delivery",
    subcategories: ["Men", "Women", "Kids", "Girls", "Boys"],
  },
  hi: {
    shopByCategories: "श्रेणियों के अनुसार खरीदें",
    home: "मुखपृष्ठ",
    fashion: "फैशन",
    electronics: "इलेक्ट्रॉनिक्स",
    bags: "बैग",
    footwear: "जूते",
    groceries: "किराना",
    beauty: "सौंदर्य",
    wellness: "स्वास्थ्य",
    jewellery: "आभूषण",
    freeDelivery: "नि:शुल्क अंतरराष्ट्रीय डिलीवरी",
    subcategories: ["पुरुष", "महिला", "बच्चे", "लड़कियाँ", "लड़के"],
  }
};

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const t = translations[language];

  return (
    <>
      <nav>
        <div className="container flex items-center justify-end gap-8">
          {/* Category Button */}
          <div className="col_1 w-[20%]">
            <Button className='!text-black gap-2 w-full' onClick={openCategoryPanel}>
              <RiMenu2Fill className='text-[18px]' />
              {t.shopByCategories}
              <LiaAngleDownSolid className='text-[13px] ml-auto font-bold' />
            </Button>
          </div>

          {/* Navigation Menu */}
          <div className="col_2 w-[60%]">
            <ul className="flex items-center gap-3 nav">
              <li className='list-none'>
                <Link to={"/"}>
                  <Button className='link transition font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>
                    {t.home}
                  </Button>
                </Link>
              </li>

              {/* Fashion with submenu */}
              <li className='list-none relative'>
                <Link to={"/"}>
                  <Button className='link transition font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>
                    {t.fashion}
                  </Button>
                </Link>
                <div className="submenu absolute top-[120%] left-[0%] min-w-[150px] bg-white shadow-md opacity-0 transition-all">
                  <ul>
                    {t.subcategories.map((sub, index) => (
                      <li className="list-none" key={index}>
                        <Link to="/">
                          <Button className='!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]'>
                            {sub}
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Other menu items */}
              {[t.electronics, t.bags, t.footwear, t.groceries, t.beauty, t.wellness, t.jewellery].map((item, index) => (
                <li className='list-none' key={index}>
                  <Link to={"/"}>
                    <Button className='link transition font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4'>
                      {item}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery + Language Switch */}
          <div className="col_3 w-[20%] flex flex-col items-end">
            <p className='text-[14px] font-[500] flex items-center gap-3 mb-1 mt-0'>
              <GoRocket className='text-[18px]' />
              {t.freeDelivery}
            </p>
            <div className="flex gap-2">
              <button
                className={`text-sm ${language === 'en' ? 'font-bold' : ''}`}
                onClick={() => handleLanguageChange("en")}
              >
                EN
              </button>
              <button
                className={`text-sm ${language === 'hi' ? 'font-bold' : ''}`}
                onClick={() => handleLanguageChange("hi")}
              >
                HI
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Panel */}
      <CategoryPanel isOpenCatPanel={isOpenCatPanel} setIsOpenCatPanel={setIsOpenCatPanel} />
    </>
  );
};

export default Navigation;

