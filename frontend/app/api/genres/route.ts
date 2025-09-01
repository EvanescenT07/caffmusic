import { NextResponse } from "next/server";

export async function GET() {
    const response = await fetch(`${process.env.BACKEND_ENDPOINT_URL}/genres`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        return NextResponse.json({
            error: 'Failed to fetch genres',
        }, {
            status: response.status
        })
    }
    const data = await response.json();
    return NextResponse.json(data)
}