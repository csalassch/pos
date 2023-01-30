import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request){
    const jwt=request.cookies.get('tokenUser');
        if(jwt===undefined){
            return NextResponse.redirect(new URL('/login',request.url));
        }
        try{
            const {payload}=await jwtVerify(jwt.value,new TextEncoder().encode('secret'));
            console.log("Aqui: ",jwt.value);
            console.log(payload);
            return NextResponse.next();

        }catch(error){
            console.error("aqui error:",error);
            return NextResponse.redirect(new URL('/login',request.url));
        }
    
}
export const config={
    // matcher: ['/dashboard/:path*','/']
    matcher: ['/dashboard','/']
}