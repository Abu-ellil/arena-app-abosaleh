import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
    try {
        console.log('🔧 Setting up admin user...')
        console.log('🔗 DATABASE_URL:', process.env.DATABASE_URL)

        if (!prisma) {
            console.error('❌ Prisma client not available')
            return NextResponse.json({ error: 'Database connection not available' }, { status: 500 })
        }

        // Get custom credentials from request body (optional)
        let username = 'admin'
        let password = 'admin123'
        
        try {
            const body = await request.json()
            if (body.username) username = body.username
            if (body.password) password = body.password
        } catch (e) {
            // If no body or invalid JSON, use defaults
            console.log('Using default credentials')
        }

        // Check if admin already exists
        const existingAdmin = await prisma.admin.findFirst()

        if (existingAdmin) {
            console.log('✅ Admin user already exists')
            return NextResponse.json({
                message: 'Admin user already exists',
                username: existingAdmin.username
            })
        }

        // Create admin user with provided or default credentials
        const admin = await prisma.admin.create({
            data: {
                username: username,
                password: password // في الإنتاج، استخدم كلمة مرور مشفرة
            }
        })

        console.log('✅ Admin user created successfully')

        return NextResponse.json({
            message: 'Admin user created successfully',
            username: admin.username,
            note: `Password is: ${password}`
        })

    } catch (error) {
        console.error('❌ Setup admin error:', error)
        return NextResponse.json({
            error: 'Failed to setup admin user',
            details: error.message
        }, { status: 500 })
    }
}