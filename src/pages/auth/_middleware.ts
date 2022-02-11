import {NextRequest, NextResponse} from "next/server";
import {validateSession} from "../../util/processes";

export function middleware(req: NextRequest) {

    const session = JSON.parse(req.cookies.session || "{}");

    if (validateSession(session, process.env.PEC_CLIENT_API_URL || ""))
        return NextResponse.redirect(new URL("/files", req.url));

    return NextResponse.next();
}
