export const dynamic = "force-dynamic";

import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { logErrorResponse } from "../_utils/utils";
import { api } from "@/lib/api/api";

export async function GET() {
  try {
    const res = await api.get("/categories", {});
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
