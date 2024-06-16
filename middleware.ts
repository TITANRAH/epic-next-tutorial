import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader.service";

export async function middleware(request: NextRequest) {

  console.log('entro al middelware');
  
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  // console.log("############ MIDDLEWARE ############");

  // console.log(user,'<---- user');
  // console.log(currentPath,'<---- current path');

  // console.log("############ MIDDLEWARE ############");

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    console.log('entro al que no esta logeuado')
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
