import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAFAFA] selection:bg-[#229264]/20 selection:text-[#229264]">
      
      {/* ── 1️⃣ Atmospheric Background Layer ── */}
      {/* هذا الجزء يضيف لمسة هندسية خفيفة جداً في الخلفية لتعزيز هوية المصنع دون تشتيت الانتباه */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#131414_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-white via-transparent to-transparent opacity-60" />
      </div>

      {/* ── 2️⃣ Navigation ── */}
      {/* الـ Navbar سيتكفل بنفسه بأسلوب الـ Glassmorphism الذي صممناه */}
      <header className="relative z-50">
        <Navbar />
      </header>

      {/* ── 3️⃣ Main Dynamic Canvas ── */}
      {/* قمت بإضافة p-4 ليعطي المحتوى "متنفساً" (Margin) تجعل الأقسام تبدو كأنها كبسولات عائمة */}
      <main className="relative z-10 flex-1 flex flex-col w-full max-w-[1920px] mx-auto overflow-x-hidden">
        {/* نستخدم pt-20 لضمان عدم تداخل المحتوى مع الـ Navbar العائم */}
        <div className="flex-1 w-full animate-in fade-in duration-700">
          {children}
        </div>
      </main>

      {/* ── 4️⃣ Footer Capsule ── */}
      {/* الفوتر سيبدأ من خلفية بيضاء ناعمة بحواف دائرية علوية ضخمة */}
      <footer className="relative z-10 mt-auto bg-white rounded-t-[3.5rem] border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <Footer />
      </footer>

      {/* ── 5️⃣ System Metadata Overlay (Optional Accents) ── */}
      {/* علامات هندسية صغيرة جداً في زوايا الموقع لتعزيز الطابع التقني */}
      <div className="fixed bottom-10 left-10 hidden xl:block pointer-events-none opacity-10">
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] vertical-text text-[#131414]">
          Engineering Excellence // {new Date().getFullYear()}
        </span>
      </div>
    </div>
  )
}