'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

const schema = z.object({
  name:            z.string().min(2, 'Full name is required'),
  company:         z.string().optional(),
  email:           z.string().email('Valid email address required'),
  phone:           z.string().optional(),
  country:         z.string().optional(),
  subject:         z.string().min(2, 'Subject is required'),
  product_interest:z.string().optional(),
  message:         z.string().min(10, 'Please provide more detail (min 10 characters)'),
})

type FormData = z.infer<typeof schema>

const PRODUCT_OPTIONS = [
  'Current Transformers',
  'HRC Fuse Links',
  'Fuse Switch Disconnectors',
  'Busbar Supports',
  'General Enquiry',
]

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-brand-green bg-brand-green/5 p-10 text-center">
        <CheckCircle2 size={48} className="text-brand-green mx-auto mb-4" />
        <h3 className="font-headline text-3xl text-brand-dark mb-2">Message Received</h3>
        <p className="font-body text-sm text-brand-gray mb-6">
          Thank you for your enquiry. A member of the ETAL team will respond within one business day.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3 text-red-600">
          <AlertCircle size={16} />
          <p className="font-body text-sm">Something went wrong. Please try again or email us directly.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          required
          placeholder="John Smith"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Company"
          placeholder="ABC Electrical Ltd"
          error={errors.company?.message}
          {...register('company')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Email Address"
          type="email"
          required
          placeholder="john@company.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="+44 xxx xxx xxxx"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Country"
          placeholder="United Kingdom"
          error={errors.country?.message}
          {...register('country')}
        />

        {/* Product Interest */}
        <div>
          <label className="block mb-1.5 font-body text-xs font-semibold uppercase tracking-widest text-brand-dark">
            Product Interest
          </label>
          <select
            className="input-base"
            {...register('product_interest')}
          >
            <option value="">Select a product...</option>
            {PRODUCT_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Subject"
        required
        placeholder="Pricing enquiry for CT range"
        error={errors.subject?.message}
        {...register('subject')}
      />

      <Textarea
        label="Message"
        required
        placeholder="Please provide details of your requirements, including quantities, specifications, or any other relevant information..."
        error={errors.message?.message}
        {...register('message')}
      />

      <div className="pt-2">
        <Button
          type="submit"
          loading={status === 'submitting'}
          size="lg"
          className="w-full sm:w-auto"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
        </Button>
        <p className="font-body text-xs text-brand-gray mt-3">
          By submitting this form you agree to ETAL using your information to respond to your enquiry.
        </p>
      </div>
    </form>
  )
}
