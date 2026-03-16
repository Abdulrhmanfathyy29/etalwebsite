'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, Loader2, Info, Image as ImageIcon, Settings, ShieldCheck, Search, Activity } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import type { Product, ProductCategory, ProductSpec } from '@/types/database'
import { cn } from '@/lib/utils'

interface Props {
  categories: ProductCategory[]
  product?: Product & { specs?: ProductSpec[] }
}

type SpecRow = { group: string; key: string; value: string; unit: string }

export default function ProductForm({ categories, product }: Props) {
  const router = useRouter()
  const isEdit = !!product

  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState<string | null>(null)

  // Form state
  const [name,          setName]          = useState(product?.name             || '')
  const [slug,          setSlug]          = useState(product?.slug             || '')
  const [categoryId,    setCategoryId]    = useState(product?.category_id      || '')
  const [shortDesc,     setShortDesc]     = useState(product?.short_desc       || '')
  const [description,   setDescription]  = useState(product?.description      || '')
  const [primaryImage,  setPrimaryImage]  = useState(product?.primary_image    || '')
  const [datasheetUrl,  setDatasheetUrl]  = useState(product?.datasheet_url    || '')
  const [isActive,      setIsActive]      = useState(product?.is_active        ?? true)
  const [isFeatured,    setIsFeatured]    = useState(product?.is_featured      ?? false)
  const [metaTitle,     setMetaTitle]     = useState(product?.meta_title       || '')
  const [metaDesc,      setMetaDesc]      = useState(product?.meta_description || '')

  const [features, setFeatures] = useState<string[]>(
    product?.features?.length ? product.features : ['']
  )
  const [certifications, setCertifications] = useState<string[]>(
    product?.certifications?.length ? product.certifications : ['']
  )
  const [specs, setSpecs] = useState<SpecRow[]>(
    product?.specs?.length
      ? product.specs.map((s) => ({
          group: s.spec_group || '',
          key:   s.spec_key,
          value: s.spec_value,
          unit:  s.spec_unit || '',
        }))
      : [{ group: '', key: '', value: '', unit: '' }]
  )

  const handleNameChange = (v: string) => {
    setName(v)
    if (!isEdit) setSlug(slugify(v))
  }

  const addFeature    = ()           => setFeatures([...features, ''])
  const removeFeature = (i: number)  => setFeatures(features.filter((_, idx) => idx !== i))
  const updateFeature = (i: number, v: string) =>
    setFeatures(features.map((f, idx) => idx === i ? v : f))

  const addCert    = ()           => setCertifications([...certifications, ''])
  const removeCert = (i: number)  => setCertifications(certifications.filter((_, idx) => idx !== i))
  const updateCert = (i: number, v: string) =>
    setCertifications(certifications.map((c, idx) => idx === i ? v : c))

  const addSpec    = ()           => setSpecs([...specs, { group: '', key: '', value: '', unit: '' }])
  const removeSpec = (i: number)  => setSpecs(specs.filter((_, idx) => idx !== i))
  const updateSpec = (i: number, field: keyof SpecRow, v: string) =>
    setSpecs(specs.map((s, idx) => idx === i ? { ...s, [field]: v } : s))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryId) { setError('Please select a category.'); return }
    setSaving(true)
    setError(null)

    const supabase = createClient()

    const payload = {
      name,
      slug,
      category_id:      categoryId,
      short_desc:       shortDesc       || null,
      description,
      primary_image:    primaryImage    || null,
      datasheet_url:    datasheetUrl    || null,
      features:         features.filter(Boolean),
      certifications:   certifications.filter(Boolean),
      is_active:        isActive,
      is_featured:      isFeatured,
      meta_title:       metaTitle       || null,
      meta_description: metaDesc        || null,
    }

    try {
      let productId = product?.id

      if (isEdit && productId) {
        const { error: err } = await supabase.from('products').update(payload).eq('id', productId)
        if (err) throw err
        await supabase.from('product_specs').delete().eq('product_id', productId)
      } else {
        const { data, error: err } = await supabase.from('products').insert(payload).select().single()
        if (err) throw err
        productId = data.id
      }

      const validSpecs = specs.filter((s) => s.key && s.value)
      if (validSpecs.length > 0 && productId) {
        await supabase.from('product_specs').insert(
          validSpecs.map((s, i) => ({
            product_id: productId!,
            spec_group: s.group || null,
            spec_key:   s.key,
            spec_value: s.value,
            spec_unit:  s.unit || null,
            sort_order: i,
          }))
        )
      }

      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to save product.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto pb-20">
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-full font-medium text-sm animate-fade-in">
          <X size={18} />
          {error}
        </div>
      )}

      {/* ── 1. Basic Identity ── */}
      <FormCard title="Product Identity" icon={<Info size={18} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Formal Product Name"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="ECT-3.5 Current Transformer"
            className="rounded-2xl"
          />
          <Input
            label="Technical URL Slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ect-3-5-transformer"
            className="rounded-2xl font-mono text-[13px]"
          />
        </div>

        <div className="mt-8 space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-[#131414]/40 ml-1">
            Category Classification <span className="text-[#229264]">*</span>
          </label>
          <select
            className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4 text-[14px] font-medium text-[#131414] focus:outline-none focus:ring-4 focus:ring-[#229264]/10 focus:border-[#229264] transition-all cursor-pointer appearance-none"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select category…</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-8">
          <Input
            label="Card Tagline (Brief)"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            placeholder="Max 120 chars for catalog cards"
            className="rounded-2xl"
          />
        </div>
        <div className="mt-8">
          <Textarea
            label="Engineering Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Full technical overview..."
            rows={5}
            className="rounded-[2rem]"
          />
        </div>
      </FormCard>

      {/* ── 2. Media Assets ── */}
      <FormCard title="Digital Assets" icon={<ImageIcon size={18} />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Primary Image URL"
            value={primaryImage}
            onChange={(e) => setPrimaryImage(e.target.value)}
            placeholder="https://storage.etal.com/..."
            className="rounded-2xl"
          />
          <Input
            label="Datasheet Library URL"
            value={datasheetUrl}
            onChange={(e) => setDatasheetUrl(e.target.value)}
            placeholder="https://storage.etal.com/..."
            className="rounded-2xl"
          />
        </div>
      </FormCard>

      {/* ── 3. Technical Specs (Advanced Table) ── */}
      <FormCard title="Technical Specifications" icon={<Settings size={18} />}>
        <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100">
          <p className="text-[12px] text-[#131414]/50 font-medium mb-6 flex items-center gap-2">
            <Info size={14} className="text-[#229264]" />
            Specify parameter groups for organized submittals.
          </p>

          <div className="space-y-3">
            {specs.map((spec, i) => (
              <div key={i} className="grid grid-cols-[1.2fr_1.8fr_1.8fr_0.8fr_auto] gap-3 items-center group/row">
                <input
                  className="w-full rounded-xl border border-gray-100 bg-white px-4 py-3 text-[12px] font-bold text-[#131414] focus:ring-2 focus:ring-[#229264]/20 outline-none transition-all"
                  value={spec.group}
                  onChange={(e) => updateSpec(i, 'group', e.target.value)}
                  placeholder="Group"
                />
                <input
                  className="w-full rounded-xl border border-gray-100 bg-white px-4 py-3 text-[12px] font-medium text-[#131414] focus:ring-2 focus:ring-[#229264]/20 outline-none transition-all"
                  value={spec.key}
                  onChange={(e) => updateSpec(i, 'key', e.target.value)}
                  placeholder="Key"
                />
                <input
                  className="w-full rounded-xl border border-gray-100 bg-white px-4 py-3 text-[12px] font-medium text-[#131414] focus:ring-2 focus:ring-[#229264]/20 outline-none transition-all"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, 'value', e.target.value)}
                  placeholder="Value"
                />
                <input
                  className="w-full rounded-xl border border-gray-100 bg-white px-4 py-3 text-[12px] font-bold text-[#229264] focus:ring-2 focus:ring-[#229264]/20 outline-none transition-all text-center"
                  value={spec.unit}
                  onChange={(e) => updateSpec(i, 'unit', e.target.value)}
                  placeholder="Unit"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(i)}
                  className="h-10 w-10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <button 
            type="button" 
            onClick={addSpec} 
            className="mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#229264] hover:text-[#131414] transition-colors"
          >
            <Plus size={14} strokeWidth={3} /> Add Specification Row
          </button>
        </div>
      </FormCard>

      {/* ── 4. Mixed Features & Visibility ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormCard title="Key Features" icon={<Plus size={18} />}>
          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-5 py-3 text-[13px] font-medium text-[#131414] outline-none focus:ring-2 focus:ring-[#229264]/20 transition-all"
                  value={f}
                  onChange={(e) => updateFeature(i, e.target.value)}
                  placeholder="Feature point..."
                />
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="h-10 w-10 shrink-0 flex items-center justify-center text-gray-300 hover:text-red-500 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addFeature} className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#229264]">
            + Append Feature
          </button>
        </FormCard>

        <FormCard title="Standards Compliance" icon={<ShieldCheck size={18} />}>
          <div className="flex flex-wrap gap-2">
            {certifications.map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
                <input
                  className="bg-transparent text-[12px] font-bold text-[#131414] outline-none w-24"
                  value={c}
                  onChange={(e) => updateCert(i, e.target.value)}
                />
                <button type="button" onClick={() => removeCert(i)} className="text-gray-300 hover:text-red-500">
                  <X size={12} strokeWidth={3} />
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={addCert} 
              className="px-4 py-2 rounded-full border border-dashed border-gray-300 text-[11px] font-bold text-gray-400 hover:border-[#229264] hover:text-[#229264] transition-all"
            >
              + Standard
            </button>
          </div>
        </FormCard>
      </div>

      {/* ── 5. SEO & Lifecycle ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FormCard title="Search Optimization" icon={<Search size={18} />}>
          <div className="space-y-4">
            <Input label="Meta Title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="rounded-xl" />
            <Textarea label="Meta Description" value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} rows={2} className="rounded-2xl" />
          </div>
        </FormCard>

        <FormCard title="Asset Visibility" icon={<Activity size={18} />}>
          <div className="space-y-6">
            <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-all">
              <div>
                <span className="block text-[13px] font-bold text-[#131414]">Public Activation</span>
                <span className="text-[11px] text-[#131414]/40 font-medium">Visible in global catalog</span>
              </div>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-5 h-5 accent-[#229264]"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-all">
              <div>
                <span className="block text-[13px] font-bold text-[#131414]">Highlight Spotlight</span>
                <span className="text-[11px] text-[#131414]/40 font-medium">Featured on landing sections</span>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-5 h-5 accent-[#229264]"
              />
            </label>
          </div>
        </FormCard>
      </div>

      {/* ── 6. Final Sync ── */}
      <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-[#131414] text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[13px] hover:bg-[#229264] hover:shadow-2xl hover:shadow-[#229264]/20 transition-all duration-300 disabled:bg-gray-400"
        >
          {saving ? (
            <><Loader2 size={18} className="animate-spin" /> Finalizing...</>
          ) : (
            isEdit ? 'Sync Changes' : 'Deploy Product'
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-10 py-5 rounded-full border border-gray-200 text-[#131414]/40 font-bold uppercase tracking-widest hover:bg-gray-50 hover:text-[#131414] transition-all"
        >
          Discard
        </button>
      </div>
    </form>
  )
}

function FormCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/20">
        <div className="text-[#229264]">{icon}</div>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#131414]/40">{title}</h3>
      </div>
      <div className="p-8">{children}</div>
    </div>
  )
}