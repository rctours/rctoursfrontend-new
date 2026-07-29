import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function GET(request, { params }) {

  try {

    const { slug } = await params;


    const client = await clientPromise;

    const db = client.db("rctours");


    const tourPackage = await db
      .collection("tourPackages")
      .findOne({
        slug: slug,
        status: "Published",
      });



    if (!tourPackage) {

      return NextResponse.json(
        {
          success:false,
          message:"Package not found",
        },
        {
          status:404
        }
      );

    }



    return NextResponse.json({

      success:true,

      package:tourPackage

    });



  } catch(error) {


    console.log(error);


    return NextResponse.json(

      {
        success:false,
        message:"Server error"
      },

      {
        status:500
      }

    );


  }

}