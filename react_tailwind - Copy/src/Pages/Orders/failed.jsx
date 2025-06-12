import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const OrderFailed = () => {
  return (
    
    <section className='w-full p-10  py-20 flex items-center justify-center flex-col gap-2'>
        <img src="/close.png" alt="checked image" width={120} />
        <h3 className='mb-0 text-[25px]'> Your Order is not placed.</h3>
        <p className='mt-0'>Please try another way of payment.</p>
        <Link to={"/"} >
<Button className='btn-org  btn-border'>Back to Home</Button>
</Link>
    </section>
  )
}

export default OrderFailed;