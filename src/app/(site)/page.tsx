import type { Metadata } from 'next'
import HeroSection            from '@/components/sections/HeroSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import StatsSection           from '@/components/sections/StatsSection'
import SectorsSection         from '@/components/sections/SectorsSection'
import AudienceSection        from '@/components/sections/AudienceSection'
import CtaBannerSection       from '@/components/sections/CtaBannerSection'

export const metadata: Metadata = {
  title: 'ETAL | Engineering Excellence in Electrical Protection',
  description:
    'ETAL manufactures precision current transformers, HRC fuse links, and industrial protection components in Egypt since 2007.',
}

export default function HomePage() {
  return (
    <div className="relative flex flex-col gap-2 md:gap-4 bg-[#FAFAFA] pb-4 md:pb-8">
      
      {/* ── 1. Hero Section ── */}
      {/* الهيرو ينتهي بانحناء ناعم جداً ليحتضن القسم التالي */}
      <section className="relative z-20 overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] bg-white shadow-sm">
        <HeroSection />
      </section>

      {/* ── 2. Featured Products ── */}
      {/* قسم المنتجات يظهر كـ "كبسولة" عائمة فوق الخلفية الرمادية الفاتحة */}
      <section className="relative z-10 -mt-12 md:-mt-20 container-etal">
        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-xl shadow-black/[0.02] overflow-hidden">
          <FeaturedProductsSection />
        </div>
      </section>

      {/* ── 3. Stats & Metrics ── */}
      {/* قسم الإحصائيات يأتي بتصميم شفاف ليعطي متنفساً بصرياً */}
      <section className="py-10 md:py-20">
        <StatsSection />
      </section>

      {/* ── 4. Audience & Sectors (The Industrial Core) ── */}
      {/* دمجنا هذين القسمين داخل حاوية واحدة داكنة أو فخمة لتعزيز الهوية التقنية */}
      <section className="container-etal">
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
            <AudienceSection />
          </div>
          
          <div className="bg-[#131414] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl shadow-black/10">
            <SectorsSection />
          </div>
        </div>
      </section>

      {/* ── 5. Call to Action ── */}
      {/* البانر الأخير يأتي كـ "كبسولة ختامية" ناعمة جداً */}
      <section className="container-etal mt-10 md:mt-20">
        <div className="bg-[#229264] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl shadow-[#229264]/20">
          <CtaBannerSection />
        </div>
      </section>

      {/* ── Background Decoration ── */}
      {/* لمسة هندسية عائمة تظهر خلف الأقسام */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-[#229264] blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[40%] bg-[#229264] blur-[150px] rounded-full" />
      </div>
      
    </div>
  )
}