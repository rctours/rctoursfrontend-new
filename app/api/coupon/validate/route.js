import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {

    const { couponCode, mobile } = await request.json();


    if (!couponCode || !mobile) {
      return NextResponse.json({
        success:false,
        message:"Coupon code and mobile number are required.",
      });
    }


    // Mobile normalize
    let cleanMobile = mobile
      .replace(/\D/g,"")
      .replace(/^0+/,"");


    if(cleanMobile.length > 10){
      cleanMobile = cleanMobile.slice(-10);
    }


    const client = await clientPromise;
    const db = client.db("rctours");


    const customers = await db.collection("customers")
    .find({})
    .toArray();


    const customer = customers.find((item)=>{

      let dbMobile = String(item.mobile || "")
      .replace(/\D/g,"")
      .replace(/^0+/,"");


      if(dbMobile.length > 10){
        dbMobile = dbMobile.slice(-10);
      }


      return dbMobile === cleanMobile;

    });



    console.log("SEARCH MOBILE:",cleanMobile);
    console.log("CUSTOMER:",customer);
    console.log("COUPON INPUT:",couponCode);



    if(!customer){

      return NextResponse.json({
        success:false,
        message:"Customer not found.",
      });

    }



    if(
      !customer.couponCode ||
      customer.couponCode.trim().toUpperCase()
      !==
      couponCode.trim().toUpperCase()
    ){

      return NextResponse.json({
        success:false,
        message:"Invalid coupon code.",
      });

    }



    if(customer.couponUsed){

      return NextResponse.json({
        success:false,
        message:"Coupon already used.",
      });

    }



    return NextResponse.json({

      success:true,

      couponCode:customer.couponCode,

      discount:customer.couponDiscount || 0,

      discountType:"vehicleFare",

      applyOn:"vehicleFare",

      message:"Coupon Applied Successfully"

    });


  } catch(error){

    console.error("Coupon Validate Error:",error);


    return NextResponse.json({

      success:false,

      message:"Internal Server Error",

    },{
      status:500
    });

  }
}