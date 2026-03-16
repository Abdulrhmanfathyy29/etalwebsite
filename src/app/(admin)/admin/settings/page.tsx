import { createClient } from '@/lib/supabase/server'
import { Settings, User, Database, HardDrive, ShieldCheck, ChevronRight } from 'lucide-react'

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
      
      {/* ── 1️⃣ Header Console ── */}
      <div className="relative mb-12 p-10 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#229264]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <Settings size={12} />
              <span>System</span>
              <ChevronRight size={10} />
              <span className="text-[#229264]">Configuration</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-headline font-bold text-[#131414] leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)' }}>
                Admin <span className="text-[#229264]">Settings.</span>
              </h1>
              <p className="text-[14px] text-[#131414]/50 font-medium">
                Manage your infrastructure, storage, and database environment.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-4 px-6 py-4 rounded-full bg-[#fcfcfc] border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-[#229264] flex items-center justify-center text-white shadow-lg shadow-[#229264]/20">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#131414]/30">Security Status</p>
              <p className="text-[13px] font-bold text-[#131414]">Authenticated</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        
        {/* ── 2️⃣ Account Section ── */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
            <User size={18} className="text-[#229264]" />
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40">Account Profile</h2>
          </div>
          <div className="p-8">
             <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-gray-50 border border-gray-100 w-fit">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-gray-200 text-[#131414]/40 font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#229264] mb-0.5">Logged in as</p>
                   <p className="font-bold text-[16px] text-[#131414] tracking-tight">{user?.email}</p>
                </div>
             </div>
          </div>
        </div>

        {/* ── 3️⃣ Storage Buckets ── */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
            <HardDrive size={18} className="text-[#229264]" />
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40">Storage Infrastructure</h2>
          </div>
          <div className="p-8">
            <p className="text-[14px] text-[#131414]/60 font-medium mb-8">
              Verify that these public buckets are configured in your Supabase project to handle media assets:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['products', 'downloads', 'sectors'].map((bucket) => (
                <div key={bucket} className="group flex flex-col items-center gap-4 p-6 rounded-[2rem] bg-white border border-gray-100 hover:border-[#229264]/30 hover:shadow-xl hover:shadow-[#229264]/5 transition-all duration-500">
                  <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#229264] group-hover:text-white transition-all duration-500">
                    <Database size={20} />
                  </div>
                  <div className="text-center">
                    <code className="block text-[14px] font-bold text-[#131414] font-mono tracking-tighter mb-1">
                      {bucket}
                    </code>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#229264] transition-colors">
                      Public Access
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 4️⃣ Database Console ── */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/30 flex items-center gap-3">
            <Database size={18} className="text-[#229264]" />
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40">Database Schema</h2>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-[2rem] border border-dashed border-gray-200 bg-gray-50/50">
               <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center text-[#229264] shadow-sm shrink-0">
                  <Settings size={24} className="animate-spin-slow" />
               </div>
               <p className="text-[14px] text-[#131414]/60 font-medium leading-relaxed">
                To initialize or update the system architecture, execute the SQL commands found in 
                <code className="mx-2 px-3 py-1 rounded-full bg-[#131414] text-white text-[12px] font-mono">
                  supabase/schema.sql
                </code> 
                within your Supabase SQL Editor.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* ── Footer Metadata ── */}
      <div className="mt-12 px-10 flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-[#131414]/20">
         <div className="h-1.5 w-1.5 rounded-full bg-[#229264]" />
         <span>Core System: Stable</span>
         <div className="h-1.5 w-1.5 rounded-full bg-gray-200 ml-auto" />
         <span>Last Handshake: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  )
}