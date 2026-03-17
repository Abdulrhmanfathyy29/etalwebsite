import type { Metadata } from 'next'
import HeroSection             from '@/components/sections/HeroSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import StatsSection            from '@/components/sections/StatsSection'
import SectorsSection          from '@/components/sections/SectorsSection'
import AudienceSection         from '@/components/sections/AudienceSection'
import CtaBannerSection        from '@/components/sections/CtaBannerSection'
import { getDictionary }       from '@/lib/getDictionary'

type Locale = 'en' | 'ar'

export const metadata: Metadata = {
  title: 'ETAL | Engineering Excellence in Electrical Protection',
  description: 'ETAL manufactures precision current transformers, HRC fuse links, and industrial protection components in Egypt since 2007.',
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <div className="relative flex flex-col gap-2 md:gap-4 bg-[#FAFAFA] pb-4 md:pb-8">

      <section className="relative z-20 overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem] bg-white shadow-sm">
        <HeroSection dict={dict} locale={locale} />
      </section>

      <section className="relative z-10 -mt-12 md:-mt-20 container-etal">
        <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-xl shadow-black/[0.02] overflow-hidden">
          <FeaturedProductsSection dict={dict} locale={locale} />
        </div>
      </section>

      <section className="py-10 md:py-20">
        <StatsSection dict={dict} />
      </section>

      <section className="container-etal">
        <div className="space-y-4 md:space-y-6">
          <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 shadow-sm overflow-hidden">
            <AudienceSection dict={dict} locale={locale} />
          </div>
          <div className="bg-[#131414] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl shadow-black/10">
            <SectorsSection dict={dict} locale={locale} />
          </div>
        </div>
      </section>

      <section className="container-etal mt-10 md:mt-20">
        <div className="bg-[#229264] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl shadow-[#229264]/20">
          <CtaBannerSection dict={dict} locale={locale} />
        </div>
      </section>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-[#229264] blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[40%] h-[40%] bg-[#229264] blur-[150px] rounded-full" />
      </div>
    </div>
  )
}
