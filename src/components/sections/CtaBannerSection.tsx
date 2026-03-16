import Link from 'next/link'
import { ArrowRight, Download, FileText } from 'lucide-react'

export default function CtaBannerSection() {
  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-etal">
        {/* Main Banner Card - Now rounded-3xl */}
        <div className="relative group overflow-hidden rounded-3xl border border-[#229264] bg-[#229264] p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-500">
          
          {/* Subtle Industrial Background Decoration */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.06] pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-700 text-white">
             <FileText size={300} strokeWidth={0.5} />
          </div>
          
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#EBDC36] animate-pulse"></span>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                  Resources & Support
                </p>
              </div>

              <h2 className="font-headline font-bold text-white leading-[1.1]" 
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
                Technical documentation <br className="hidden md:block" /> 
                <span className="text-white/60">on demand.</span>
              </h2>

              <p className="max-w-xl text-[14px] leading-relaxed text-white/80 font-medium">
                Access datasheets, IEC certificates, and CAD drawings for our complete electrical range. 
                Everything you need for your technical submittals, ready for instant download.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              {/* Primary Download Button - Now rounded-full */}
              <Link 
                href="/downloads" 
                className="group/btn relative flex items-center justify-center gap-3 bg-[#EBDC36] text-[#131414] px-8 py-4 rounded-full font-sans text-[12px] font-bold uppercase tracking-widest transition-all hover:bg-white hover:shadow-[0_4px_20px_rgba(235,220,54,0.3)]"
              >
                <Download size={16} className="transition-transform group-hover/btn:-translate-y-1" />
                Download Library
                <ArrowRight size={16} className="ml-1 transition-transform group-hover/btn:translate-x-1" />
              </Link>

              {/* Secondary Contact Button - Now rounded-full */}
              <Link 
                href="/contact" 
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-sans text-[12px] font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-all"
              >
                Talk to an engineer
              </Link>
            </div>

          </div>

          {/* Bottom Accent Decoration */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        {/* Floating Tagline */}
        <p className="text-center mt-6 text-[10px] font-mono uppercase tracking-[0.25em] text-[#131414]/40">
          No registration required for public documentation
        </p>
      </div>
    </section>
  )
}