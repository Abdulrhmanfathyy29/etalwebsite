'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, AlertCircle, Mail, User, Building2, Globe, Send, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
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

  // 1️⃣ Success State - Refined Pill Style
  if (status === 'success') {
    return (
      <div className="relative overflow-hidden rounded-[3rem] border border-[#229264]/20 bg-white p-12 md:p-20 text-center shadow-2xl shadow-[#229264]/5 animate-in fade-in zoom-in duration-500">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#229264_1.5px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#229264]/10">
             <div className="absolute inset-0 rounded-full border-2 border-[#229264] animate-ping opacity-20" />
             <CheckCircle2 size={40} className="text-[#229264]" />
          </div>
          
          <h3 className="font-headline text-3xl md:text-4xl font-bold text-[#131414] mb-4 tracking-tight">Transmission Successful</h3>
          <p className="font-sans text-[16px] font-medium text-[#131414]/50 mb-10 max-w-sm mx-auto leading-relaxed">
            Your technical inquiry has been logged. An ETAL engineer will review your specifications and respond shortly.
          </p>
          
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#229264]/5 border border-[#229264]/10 mb-10">
             <span className="h-2 w-2 rounded-full bg-[#229264] animate-pulse" />
             <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#229264]">STATUS: QUEUED FOR ANALYSIS</span>
          </div>
          
          <button 
            onClick={() => setStatus('idle')}
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-gray-200 text-[#131414] font-bold text-sm hover:bg-gray-50 transition-all shadow-sm"
          >
            New Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-white p-8 md:p-14 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-black/[0.02]">
      
      {/* Decorative Branding Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#229264]/5 rounded-full blur-[100px] pointer-events-none" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 relative z-10">
        
        {/* Error State */}
        {status === 'error' && (
          <div className="flex items-center gap-4 bg-red-50 border border-red-100 p-5 rounded-[2rem] animate-in fade-in slide-in-from-top-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-red-600 uppercase tracking-widest mb-0.5">Network Exception</p>
              <p className="text-[13px] text-red-600/70 font-medium">Failed to dispatch request. Please verify credentials or try again.</p>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Michael Chen"
              error={errors.name?.message}
              {...register('name')}
              className="rounded-full px-6"
            />
            <Input
              label="Company / Entity"
              placeholder="e.g. Global Energy Systems"
              error={errors.company?.message}
              {...register('company')}
              className="rounded-full px-6"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="m.chen@example.com"
              error={errors.email?.message}
              {...register('email')}
              className="rounded-full px-6"
            />
            <Input
              label="Contact Phone"
              type="tel"
              placeholder="+20 xxx xxx xxxx"
              error={errors.phone?.message}
              {...register('phone')}
              className="rounded-full px-6"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Input
              label="Location / Country"
              placeholder="e.g. United Kingdom"
              error={errors.country?.message}
              {...register('country')}
              className="rounded-full px-6"
            />

            <div className="w-full">
              <label className="mb-3 ml-4 block text-[10px] font-bold uppercase tracking-[0.25em] text-[#131414]/40">
                Primary Interest
              </label>
              <div className="relative group">
                <select
                  className={cn(
                    'peer appearance-none w-full rounded-full border bg-gray-50/50 px-8 py-4 text-[14px] font-medium text-[#131414] outline-none transition-all duration-300',
                    'hover:bg-gray-50 hover:border-gray-300',
                    'focus:bg-white focus:border-[#229264] focus:ring-4 focus:ring-[#229264]/10'
                  )}
                  {...register('product_interest')}
                >
                  <option value="">Select a category...</option>
                  {PRODUCT_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#229264] transition-colors">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>
          </div>

          <Input
            label="Inquiry Subject"
            required
            placeholder="Technical specs for HRC fuse range"
            error={errors.subject?.message}
            {...register('subject')}
            className="rounded-full px-8"
          />

          <Textarea
            label="Technical Message"
            required
            placeholder="Provide specific details regarding quantities, operational environments, or standard requirements..."
            error={errors.message?.message}
            {...register('message')}
            className="rounded-[2.5rem] px-8 py-6"
            rows={5}
          />
        </div>

        {/* Footer Actions */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="group relative flex items-center justify-center gap-3 bg-[#131414] text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-[#229264] hover:shadow-2xl hover:shadow-[#229264]/20 transition-all duration-500 disabled:bg-gray-400 overflow-hidden"
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Transmitting...
              </span>
            ) : (
              <>
                Dispatch Inquiry
                <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </>
            )}
          </button>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#131414]/30 mb-2">Secure Link Established</p>
            <div className="flex items-center gap-2">
               <span className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
               <p className="text-[10px] font-bold uppercase tracking-widest text-[#131414]/50 leading-relaxed text-center md:text-right">
                 Encrypted Data Transfer Active
               </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}