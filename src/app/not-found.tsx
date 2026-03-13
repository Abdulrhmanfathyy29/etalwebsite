import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-green" />

      <div className="relative text-center px-4">
        <div className="font-headline leading-none text-brand-green/10" style={{ fontSize: '20rem' }}>
          404
        </div>
        <div className="relative -mt-24">
          <h1 className="font-headline text-6xl text-white mb-4">Page Not Found</h1>
          <p className="font-body text-white/40 text-base mb-8 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary text-sm px-8 py-3">
              Back to Home
            </Link>
            <Link href="/products" className="btn-outline-white text-sm px-8 py-3">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
