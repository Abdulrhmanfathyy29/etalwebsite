import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { z } from 'zod'

const schema = z.object({
  name:             z.string().min(2),
  company:          z.string().optional(),
  email:            z.string().email(),
  phone:            z.string().optional(),
  country:          z.string().optional(),
  subject:          z.string().min(2),
  product_interest: z.string().optional(),
  message:          z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const supabase = await createAdminClient()

    // Combine subject with product interest if present
    const subject = data.product_interest
      ? `[${data.product_interest}] ${data.subject}`
      : data.subject

    const { error } = await supabase.from('contact_messages').insert({
      name:    data.name,
      company: data.company || null,
      email:   data.email,
      phone:   data.phone || null,
      country: data.country || null,
      subject,
      message: data.message,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
    }
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
