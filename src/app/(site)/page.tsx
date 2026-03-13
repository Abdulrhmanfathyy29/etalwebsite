import type { Metadata } from 'next'
import HeroSection            from '@/components/sections/HeroSection'
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection'
import StatsSection           from '@/components/sections/StatsSection'
import SectorsSection         from '@/components/sections/SectorsSection'
import AudienceSection        from '@/components/sections/AudienceSection'
import CtaBannerSection       from '@/components/sections/CtaBannerSection'

export const metadata: Metadata = {
  title: 'ETAL | Electrical Protection Equipment Manufacturer',
  description:
    'ETAL manufactures current transformers, HRC fuse links, fuse switch disconnectors and busbar supports for industrial electrical protection since 2007.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProductsSection />
      <StatsSection />
      <AudienceSection />
      <SectorsSection />
      <CtaBannerSection />
    </>
  )
}
