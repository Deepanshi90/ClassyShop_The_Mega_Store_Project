import React, { useContext } from 'react'
import { LiaShippingFastSolid } from 'react-icons/lia';
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { LiaGiftSolid } from 'react-icons/lia';
import { BiSupport } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { IoChatboxOutline } from 'react-icons/io5';
import  Button  from '@mui/material/Button';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { FaFacebookF } from 'react-icons/fa';
import {AiOutlineYoutube} from "react-icons/ai";
import {FaPinterestP} from "react-icons/fa";
import { FaInstagram } from 'react-icons/fa';

import Drawer from '@mui/material/Drawer';
import CartPanel from '../CartPanel';
import { MyContext } from '../../App';
import { IoCloseSharp } from 'react-icons/io5'


const Footer = () => {

    const context = useContext(MyContext);
    return (
        <>
        <footer className="py-6 bg-white border-1 border-[rgba(0,0,0,0.1)]">
            <div className="container">
                <div className="flex items-center justify-center gap-2 pb-5 py-8">
                    <div className="col flex items-center justify-center flex-col group w-[20%]">
                        < LiaShippingFastSolid className='text-[50px] mb-3 transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-2' />
                        <h3 className='text-[16px] font-[600]'>Free Shipping</h3>
                        <p className='text-[12px] font-[500]'>For all Orders Over $100</p>
                    </div>
                    <div className="col flex items-center justify-center flex-col group w-[20%]">
                        < PiKeyReturnLight className='text-[50px] mb-3 transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-2' />
                        <h3 className='text-[16px] font-[600]'>30 Days Returns</h3>
                        <p className='text-[12px] font-[500]'>Payment Cards Accepted</p>
                    </div>
                    <div className="col flex items-center justify-center flex-col group w-[20%]">
                        < BsWallet2 className='text-[50px] mb-3 transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-2' />
                        <h3 className='text-[16px] font-[600]'>Secured Payment</h3>
                        <p className='text-[12px] font-[500]'>For all Orders Over $100</p>
                    </div>
                    <div className="col flex items-center justify-center flex-col group w-[20%]">
                        < LiaGiftSolid className='text-[50px] mb-3 transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-2' />
                        <h3 className='text-[16px] font-[600]'>Special Gifts
                        </h3>
                        <p className='text-[12px] font-[500]'>Our First Product Order</p>
                    </div>
                    <div className="col flex items-center justify-center flex-col group w-[20%]">
                        <BiSupport className='text-[50px] mb-3 transition-all duration-300 group-hover:text-[#ff5252] group-hover:-translate-y-2' />
                        <h3 className='text-[16px] font-[600]'>Support 24/7</h3>
                        <p className='text-[12px] font-[500]'>Contact us Anytime</p>
                    </div>

                </div>
                
                <br/>

                <div className="footer flex  py-8 border-t border-[rgba(0,0,0,0.2)] ">
                    <div className="part1 w-[25%] border-r border-[rgba(0,0,0,0.1)]">
                        <h2 className='text-[18px]font-[600] mb-4'>Contact Us</h2>
                        <p className='text-[13px]font-[400] pb-4'>Classyshop - Mega Super Store<br />
                            507-Union Trade Centre<br/>
                            France</p>
                            <Link to="mailto:someexample@gmail.com" className='link text-[13px]'>sales@yourcompany.com</Link>
                            <span className='text-[22px] font-[600] block w-full text-[#ff5252] mt-3 mb-5'>(+91) 9876-543-210
                            </span>
                            <div className="flex items-center  gap-2 "><IoChatboxOutline className='text-[#ff5252] text-[40px]'/>
                            <span className='text-[16px] font-[600] '>Online Chat <br />
                            Get Expert Help</span>
                            </div>
                    </div>
                    <div className="part2 w-[40%] flex pl-8"> 
                        <div className="par2_col1 w-[50%]">
                        <h2 className='text-[18px] font-[600] mb-4'>Products</h2>
                        <ul className='list'>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Price drop</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>New Products</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Best Sales</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Contact Us</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Sitemap</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Stores</Link></li>
                        </ul>
                        </div>
                        <div className="par2_col2 w-[50%]">
                        <h2 className='text-[18px] font-[600] mb-4'>Our Company</h2>
                        <ul className='list'>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Delivery</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Legal Notice</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Terms and Conditions</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>About Us</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Secure Payment</Link></li>
                            <li className='list-none text-[14px] w-full mb-2'><Link to="/" className='link'>Login</Link></li>
                        </ul>
                        </div>

                        
                        
                    </div>
                    
                    <div className="part2 w-[35%] flex pl-8 flex-col pr-8">
                        <h2 className='text-[18px] font-[600] mb-4'>Subscribe To Newsletter</h2>
                        <p className='text-[13px]'>Subscribe to our latest newsletter to get news about special discounts.</p>
                        <form className='mt-5'>
                            <input type="text" className='w-full h-35px border outline-none pl-4 pr-4 rounded-sm mb-4 focus:border-[rgba(0,0,0,0.3)]' placeholder='Your email address' />
                            <Button className='btn-org '>Subscribe</Button>
                            <FormControlLabel control={<Checkbox />} label=" I agree to the terms and conditions and the privacy policy" />
                        </form>
                        </div>
                </div>

                
            </div>
        </footer>

        <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] py-3 bg-white">
            <div className="container flex items-center justify-between">
                <ul className='flex items-center gap-2'>
                    <li className="list-none">
                        <Link to="/" target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all' ><FaFacebookF className='text-[15px]  group-hover:text-white' /></Link>
                    </li>
                    <li className="list-none">
                        <Link to="/" target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all' ><AiOutlineYoutube className='text-[20px]  group-hover:text-white' /></Link>
                    </li>
                    <li className="list-none">
                        <Link to="/" target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all' ><FaPinterestP className='text-[15px]  group-hover:text-white' /></Link>
                    </li>
                    <li className="list-none">
                        <Link to="/" target='_blank' className='w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-[#ff5252] transition-all' ><FaInstagram  className='text-[15px]  group-hover:text-white' /></Link>
                    </li>

                </ul>
                <p className='text-[13px] text-center mb-0'>@ 2025 - E Commerce Website</p>
                <div className="flex items-center">
                    <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/carte_bleue.png" alt="p1" />
                    <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/visa.png" alt="p1" />
                    <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/master_card.png" alt="p1" />
                    <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/american_express.png" alt="p1" />
                    <img src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_blockpaymentlogo/views/img/paypal.png" alt="p1" />
                </div>
            </div>
        </div>




{/* Cart Panel */}
<Drawer open={context.openCartPanel} onClose={context.toggleCartPanel(false)} anchor={"right"} className='cartPanel'>
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)] overflow-hidden">
        <h4>Shopping Cart (1)</h4> <IoCloseSharp className='text-[20px] cursor-pointer' onClick={context.toggleCartPanel(false)}/>
        </div>

       <CartPanel />
      </Drawer>
        </>

    )
}

export default Footer;
