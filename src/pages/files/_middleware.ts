import {NextRequest, NextResponse} from "next/server";
import {validateExtendSession} from "../../helper/processes";

export async function middleware(req: NextRequest) {

    const session = JSON.parse(req.cookies.session || "{}");

    if (await validateExtendSession(session, process.env.PEC_CLIENT_API_URL || "") === -1)
        return NextResponse.redirect(new URL("/auth", req.url));
    return NextResponse.next();
}
