import {NextRequest, NextResponse} from "next/server";
import {validateExtendSession} from "../../util/processes";

export async function middleware(req: NextRequest) {

    const session = JSON.parse(req.cookies.session || "{}");

    if (await validateExtendSession(session, process.env.PEC_CLIENT_API_URL || "") > 0)
        return NextResponse.redirect(new URL("/files", req.url));
    return NextResponse.next();
}
