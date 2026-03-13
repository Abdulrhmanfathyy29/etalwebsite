import { createClient } from '@/lib/supabase/server'

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="font-headline text-4xl text-brand-dark">Settings</h1>
        <p className="font-body text-sm text-gray-500 mt-1">Account and system settings</p>
      </div>

      <div className="bg-white border border-gray-200 divide-y divide-gray-100">
        {/* Account */}
        <div className="px-6 py-4 bg-gray-50">
          <h2 className="font-body font-semibold text-sm text-gray-700">Account</h2>
        </div>
        <div className="px-6 py-5">
          <p className="font-body text-xs text-gray-500 uppercase tracking-widest mb-1">Logged in as</p>
          <p className="font-body font-semibold text-gray-800">{user?.email}</p>
        </div>

        {/* Supabase Storage */}
        <div className="px-6 py-4 bg-gray-50">
          <h2 className="font-body font-semibold text-sm text-gray-700">Storage Buckets</h2>
        </div>
        <div className="px-6 py-5">
          <p className="font-body text-sm text-gray-600 mb-4">
            Ensure the following storage buckets exist in your Supabase project:
          </p>
          {['products', 'downloads', 'sectors'].map((bucket) => (
            <div key={bucket} className="flex items-center gap-3 py-2">
              <div className="w-2 h-2 bg-brand-green rounded-full" />
              <code className="font-body text-sm text-gray-700 bg-gray-100 px-2 py-0.5">{bucket}</code>
              <span className="font-body text-xs text-gray-400">Public bucket</span>
            </div>
          ))}
        </div>

        {/* DB */}
        <div className="px-6 py-4 bg-gray-50">
          <h2 className="font-body font-semibold text-sm text-gray-700">Database</h2>
        </div>
        <div className="px-6 py-5">
          <p className="font-body text-sm text-gray-600">
            To set up the database, run the SQL schema from{' '}
            <code className="bg-gray-100 px-1 py-0.5 text-xs">supabase/schema.sql</code>{' '}
            in your Supabase SQL Editor.
          </p>
        </div>
      </div>
    </div>
  )
}
