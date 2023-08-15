import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request, res) {

}
