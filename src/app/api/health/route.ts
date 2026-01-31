import { NextResponse } from 'next/server';

// Health check endpoint for UptimeRobot to keep site awake
// Supports both GET and HEAD requests
export async function GET() {
    return NextResponse.json(
        { status: 'ok', timestamp: new Date().toISOString() },
        { status: 200 }
    );
}

export async function HEAD() {
    return new NextResponse(null, { status: 200 });
}
