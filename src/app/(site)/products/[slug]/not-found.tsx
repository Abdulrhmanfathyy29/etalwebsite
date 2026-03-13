import Link from 'next/link'

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="text-center">
        <p className="font-headline text-9xl text-brand-green/20">404</p>
        <h1 className="font-headline text-4xl text-white mt-4">Product Not Found</h1>
        <p className="font-body text-white/50 mt-2 mb-8">
          This product does not exist or has been removed.
        </p>
        <Link href="/products" className="btn-primary text-sm">
          Browse All Products
        </Link>
      </div>
    </div>
  )
}
