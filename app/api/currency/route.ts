import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Fetch the currency setting
export async function GET() {
    try {
        if (!prisma) {
            console.error('❌ Currency API: Prisma client not available')
            return NextResponse.json({ error: 'Database connection not available' }, { status: 500 })
        }

        const setting = await prisma.settings.findUnique({
            where: { key: "currency" }
        });

        if (!setting) {
            // If currency setting doesn't exist, return a default or 404 as appropriate
            // For now, let's return a default value if not found, or an error if preferred.
            // The original CurrencyProvider expects a value, so returning a default makes sense.
            return NextResponse.json({ value: "SAR" }); // Default to SAR if not found
        }

        return NextResponse.json({ value: setting.value });
    } catch (error) {
        console.error("❌ Currency API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch currency setting" },
            { status: 500 }
        );
    }
}

// PUT - Update the currency setting
export async function PUT(
    request: NextRequest
) {
    try {
        if (!prisma) {
            console.error('Currency PUT API: Prisma client not available')
            return NextResponse.json({ error: 'Database connection not available' }, { status: 500 })
        }

        const { value } = await request.json();

        const setting = await prisma.settings.upsert({
            where: { key: "currency" },
            update: { value: String(value) },
            create: { key: "currency", value: String(value) }
        });

        return NextResponse.json(setting);
    } catch (error) {
        console.error("Error updating currency setting:", error);
        return NextResponse.json(
            { error: "Failed to update currency setting" },
            { status: 500 }
        );
    }
}