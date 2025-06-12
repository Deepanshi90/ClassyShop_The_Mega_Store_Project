import OrderModel from "../models/order.model.js";
import ProductModel from '../models/product.model.js';
import paypal from '@paypal/checkout-server-sdk';
import { paypalClient } from '../config/paypal.js';
import { request, response } from "express";
import UserModel from "../models/user.model.js"


export const createOrderController = async (request, response) => {
  try {
    let order = new OrderModel({
      userId: request.body.userId,
      products: request.body.products,
      paymentId: request.body.paymentId,
      payment_status: request.body.payment_status,
      delivery_address: request.body.delivery_address,
      totalAmt: request.body.totalAmt,
      date: request.body.date
    });

    if (!order) {
      response.status(500).json({
        error: true,
        success: false,
        message: "Order creation failed"
      });
    }

    for(let i = 0 ; i<request.body.products.length; i++){
        await ProductModel.findByIdAndUpdate(
            request.body.products[i].productId,
            {
                countInStock: parseInt(request.body.products[i].countInStock - request.body.products[i].quantity),
            },
            {new: true}
        )
    }

    order = await order.save();
    return response.status(200).json({
      error: false,
      success: true,
      message: "Order created successfully and Placed",
      order: order
    });

  } catch (error) {
    response.status(500).json({
      error: true,
      success: false,
      message: error.message,

    });
  }
};

export async function getOrderDetailsController(request, response) {
  try {
    const userId = request.userId; // order id

    const orderlist = await OrderModel.find()
      .sort({ createdAt: -1 })
      .populate('delivery_address userId');

    return response.json({
      message: "order list",
      data: orderlist,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

function getPayPalClient() {
  const environment =
    process.env.PAYPAL_MODE === "live"
      ? new paypal.core.LiveEnvironment(
          process.env.PAYPAL_CLIENT_ID_LIVE,
          process.env.PAYPAL_SECRET_LIVE
        )
      : new paypal.core.SandboxEnvironment(
          process.env.PAYPAL_CLIENT_ID_TEST,
          process.env.PAYPAL_SECRET_TEST
        );

  return new paypal.core.PayPalHttpClient(environment);
}


export const createOrderPaypalController = async (request, response) => {
    try {
        const req = new paypal.orders.OrdersCreateRequest();
        req.prefer('return=representation');

        req.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: request.query.totalAmount
                }
            }]
        });
          try {
    const client = getPayPalClient();
    const order = await client.execute(req);
    response.json({ id: order.result.id });
  } catch (error) {
    console.error(error);
    response.status(500).send("Error creating PayPal order");
  }

} catch (error) {
  return response.status(500).json({
    message: error.message || error,
    error: true,
    success: false,
  });
}
}


// export const createOrderPaypalController = async (request, response) => {
//   try {
//     const totalAmount = request.query.totalAmount;

//     // ✅ Validate amount
//     if (!totalAmount || isNaN(totalAmount)) {
//       return response.status(400).json({
//         message: "Invalid or missing totalAmount",
//         error: true,
//         success: false,
//       });
//     }

//     // ✅ Create PayPal order request
//     const req = new paypal.orders.OrdersCreateRequest();
//     req.prefer("return=representation");
//     req.requestBody({
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           reference_id: "default",
//           amount: {
//             currency_code: "USD",
//             value: parseFloat(totalAmount).toFixed(2),
//           },
//         },
//       ],
//     });

//     const client = getPayPalClient();
//     const order = await client.execute(req);

//     // ✅ Return the PayPal order ID
//     return response.status(200).json({ id: order.result.id });

//   } catch (error) {
//     console.error("PayPal Order Error:", error);
//     return response.status(500).json({
//       message: "Error creating PayPal order",
//       error: error.message || error,
//       success: false,
//     });
//   }
// };



export const captureOrderPaypalController = async (request, response) => {
    try {
        const { paymentId } = request.body;

        const req = new paypal.orders.OrdersCaptureRequest(paymentId);
        req.requestBody({});

        const orderInfo = {
            userId: request.body.userId,
            products: request.body.products,
            paymentId: request.body.paymentId,
            payment_status: request.body.payment_status,
            delivery_address: request.body.delivery_address,
            totalAmt: request.body.totalAmount,
            date: request.body.date
        }

           const order = new OrderModel(orderInfo);
    await order.save();

    for (let i = 0; i < request.body.products.length; i++) {
        await ProductModel.findByIdAndUpdate(
            request.body.products[i].productId,
            {
                countInStock: parseInt(request.body.products[i].countInStock - request.body.products[i].qty),
                new: true
            }
        );
    }

    response.json({ success: true, error: false, order: order ,message:"Order placed"});

} catch (error) {
    return response.status(500).json({
      message: error.message || error,
    error: true,
    success: false,
    })}
  }


// export const captureOrderPaypalController = async (request, response) => {
//   try {
//     const {
//       paymentId,
//       userId,
//       products,
//       payment_status,
//       delivery_address,
//       totalAmount,
//       date,
//     } = request.body;

//     // ✅ 1. Create PayPal capture request
//     const req = new paypal.orders.OrdersCaptureRequest(paymentId);
//     req.requestBody({});
//     const capture = await paypalClient.execute(req);

//     // ✅ 2. Save Order to DB
//     const order = new OrderModel({
//       userId,
//       products,
//       paymentId,
//       payment_status,
//       delivery_address,
//       totalAmt: totalAmount,
//       date,
//     });

//     await order.save();

//     // ✅ 3. Update product stock
//     for (let i = 0; i < products.length; i++) {
//       await ProductModel.findByIdAndUpdate(
//         products[i].productId,
//         {
//           countInStock:
//             parseInt(products[i].countInStock - products[i].qty),
//         },
//         { new: true }
//       );
//     }

//     response.json({ success: true, error: false, order:order , message:"Order Placed" });

//   } catch (error) {
//     console.error("PAYPAL CAPTURE ERROR:", error);
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false,
//     });
//   }
// };



export const updateOrderStausController = async (request, response) => {
 try {
   const {id, order_status} = request.body;
  // const userId = request.userId;

   const updateOrder = await OrderModel.updateOne({
            _id : id,
            // userId: userId
        },
    {
        order_status: order_status,
    },{
        new: true
    })

     return response.status(200).json({
        message:"Order Status Updated Successfully!",
        error: false,
        succcess: true,
        data: updateOrder
    })

 } catch (error) {
   console.error("Cart updating error", error);
        response.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
 }
}

export const getTotalOrdersCountController = async(request,response) =>{
  try {
    const ordersCount  = await OrderModel.countDocuments();
    return response.status(200).json({
      error: false,
      succcess: true,
      count: ordersCount
    })
  } catch (error) {
      console.error("Cart updating error", error);
        response.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
  }
}



export const totalSalesController = async(request,response) =>{
  try {
    const currentYear = new Date().getFullYear();

    const ordersList = await OrderModel.find();

    let totalSales = 0;
    let monthlySales = [
      { name: 'JAN', TotalSales: 0 },
      { name: 'FEB', TotalSales: 0 },
      { name: 'MAR', TotalSales: 0 },
      { name: 'APRIL', TotalSales: 0 },
      { name: 'MAY', TotalSales: 0 },
      { name: 'JUNE', TotalSales: 0 },
      { name: 'JULY', TotalSales: 0 },
      { name: 'AUG', TotalSales: 0 },
      { name: 'SEP', TotalSales: 0 },
      { name: 'OCT', TotalSales: 0 },
      { name: 'NOV', TotalSales: 0 },
      { name: 'DEC', TotalSales: 0 },
    ];


    for(let i = 0; i<ordersList.length;i++){
      totalSales = totalSales + parseInt(ordersList[i].totalAmt);
      const str = JSON.stringify(ordersList[i]?.createdAt);
      const year = str.substr(1,4);
      const monthStr = str.substr(6,8);
      const month = parseInt(monthStr.substr(0,2));

      if(currentYear == year){
        if (month === 1) {
  monthlySales[0] = {
    name: 'JAN',
    TotalSales: parseInt(monthlySales[0].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 2) {
  monthlySales[1] = {
    name: 'FEB',
    TotalSales: parseInt(monthlySales[1].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 3) {
  monthlySales[2] = {
    name: 'MAR',
    TotalSales: parseInt(monthlySales[2].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 4) {
  monthlySales[3] = {
    name: 'APRIL',
    TotalSales: parseInt(monthlySales[3].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 5) {
  monthlySales[4] = {
    name: 'MAY',
    TotalSales: parseInt(monthlySales[4].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 6) {
  monthlySales[5] = {
    name: 'JUNE',
    TotalSales: parseInt(monthlySales[5].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 7) {
  monthlySales[6] = {
    name: 'JULY',
    TotalSales: parseInt(monthlySales[6].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 8) {
  monthlySales[7] = {
    name: 'AUG',
    TotalSales: parseInt(monthlySales[7].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 9) {
  monthlySales[8] = {
    name: 'SEP',
    TotalSales: parseInt(monthlySales[8].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 10) {
  monthlySales[9] = {
    name: 'OCT',
    TotalSales: parseInt(monthlySales[9].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 11) {
  monthlySales[10] = {
    name: 'NOV',
    TotalSales: parseInt(monthlySales[10].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}

if (month === 12) {
  monthlySales[11] = {
    name: 'DEC',
    TotalSales: parseInt(monthlySales[11].TotalSales) + parseInt(ordersList[i].totalAmt)
  };
}
        
        
      }

    }


    return response.status(200).json({
      totalSales: totalSales,
      monthlySales: monthlySales,
      error: false,
      succcess: true
    })
  } catch (error) {
     console.error("Cart updating error", error);
        response.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
  }
}


export const totalUsersController = async (request,response) =>{
  try {
    const users = await UserModel.aggregate([
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { "_id.year": 1, "_id.month": 1 }
  }
]);

     let monthlyUsers = [
      { name: 'JAN', TotalUsers: 0 },
      { name: 'FEB', TotalUsers: 0 },
      { name: 'MAR', TotalUsers: 0 },
      { name: 'APRIL', TotalUsers: 0 },
      { name: 'MAY', TotalUsers: 0 },
      { name: 'JUNE', TotalUsers: 0 },
      { name: 'JULY', TotalUsers: 0 },
      { name: 'AUG', TotalUsers: 0 },
      { name: 'SEP', TotalUsers: 0 },
      { name: 'OCT', TotalUsers: 0 },
      { name: 'NOV', TotalUsers: 0 },
      { name: 'DEC', TotalUsers: 0 },
    ];

     for (let i = 0; i < users.length; i++) {
  const month = users[i]?._id?.month;

  if (month === 1) {
    monthlyUsers[0] = {
      name: 'JAN',
      TotalUsers: users[i].count
    };
  }

  if (month === 2) {
    monthlyUsers[1] = {
      name: 'FEB',
      TotalUsers: users[i].count
    };
  }

  if (month === 3) {
    monthlyUsers[2] = {
      name: 'MAR',
      TotalUsers: users[i].count
    };
  }

  if (month === 4) {
    monthlyUsers[3] = {
      name: 'APRIL',
      TotalUsers: users[i].count
    };
  }

  if (month === 5) {
    monthlyUsers[4] = {
      name: 'MAY',
      TotalUsers: users[i].count
    };
  }

  if (month === 6) {
    monthlyUsers[5] = {
      name: 'JUNE',
      TotalUsers: users[i].count
    };
  }

  if (month === 7) {
    monthlyUsers[6] = {
      name: 'JULY',
      TotalUsers: users[i].count
    };
  }

  if (month === 8) {
    monthlyUsers[7] = {
      name: 'AUG',
      TotalUsers: users[i].count
    };
  }

  if (month === 9) {
    monthlyUsers[8] = {
      name: 'SEP',
      TotalUsers: users[i].count
    };
  }

  if (month === 10) {
    monthlyUsers[9] = {
      name: 'OCT',
      TotalUsers: users[i].count
    };
  }

  if (month === 11) {
    monthlyUsers[10] = {
      name: 'NOV',
      TotalUsers: users[i].count
    };
  }

  if (month === 12) {
    monthlyUsers[11] = {
      name: 'DEC',
      TotalUsers: users[i].count
    };
  }
}


return response.status(200).json({
  TotalUsers:monthlyUsers,
  error: false,
  succcess: true
})
  } catch (error) {
     console.error("Cart updating error", error);
        response.status(500).json({
            success: false,
            message: error.message || error,
            error: true
        });
  }
}