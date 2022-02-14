import {NextRequest, NextResponse} from "next/server";
import {validateSession} from "../../util/processes";

export async function middleware(req: NextRequest) {

    const session = JSON.parse(req.cookies.session || "{}");

    if (!await validateSession(session, process.env.PEC_CLIENT_API_URL || ""))
        return NextResponse.redirect(new URL("/auth", req.url));
    return NextResponse.next();
}
