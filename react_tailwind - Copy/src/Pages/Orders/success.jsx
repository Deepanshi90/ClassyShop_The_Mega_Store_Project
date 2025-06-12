import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    
    <section className='w-full p-10  py-20 flex items-center justify-center flex-col gap-2'>
        <img src="/checked.png" alt="checked image" width={120} />
        <h3 className='mb-0 text-[25px]'> Your Order is Placed</h3>
        <p className='mt-0'>Thankyou for your payment</p>
        <Link to={"/"} >
<Button className='btn-org  btn-border'>Back to Home</Button>
</Link>
    </section>
  )
}

export default OrderSuccess;