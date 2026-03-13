'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X, Loader2, GripVertical } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import type { Product, ProductCategory, ProductSpec } from '@/types/database'

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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl text-red-700 px-4 py-3
                        font-body text-sm flex items-center gap-2">
          <X size={15} className="shrink-0" />
          {error}
        </div>
      )}

      {/* Basic info */}
      <FormCard title="Basic Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Product Name"
            required
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="ECT-3.5 Current Transformer"
          />
          <Input
            label="URL Slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="ect-3-5-current-transformer"
          />
        </div>

        <div className="mt-5">
          <label className="block mb-1.5 font-body text-xs font-semibold uppercase tracking-widest text-brand-dark">
            Category <span className="text-brand-green">*</span>
          </label>
          <select
            className="input-admin"
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

        <div className="mt-5">
          <Input
            label="Short Description"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            placeholder="Brief overview for product cards (max 120 chars)"
          />
        </div>
        <div className="mt-5">
          <Textarea
            label="Full Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Full product description…"
            rows={5}
          />
        </div>
      </FormCard>

      {/* Media */}
      <FormCard title="Media & Files">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Primary Image URL"
            value={primaryImage}
            onChange={(e) => setPrimaryImage(e.target.value)}
            placeholder="https://…"
          />
          <Input
            label="Datasheet URL"
            value={datasheetUrl}
            onChange={(e) => setDatasheetUrl(e.target.value)}
            placeholder="https://…"
          />
        </div>
      </FormCard>

      {/* Technical Specs */}
      <FormCard title="Technical Specifications">
        <p className="font-body text-xs text-brand-gray mb-4">
          Specs are grouped by their Group name on the product page. Leave Group blank to use the default "Specifications" heading.
        </p>

        {/* Column headers */}
        <div className="grid grid-cols-[1.5fr_2fr_2fr_1fr_auto] gap-2 mb-1.5 px-1">
          {['Group', 'Spec Name', 'Value', 'Unit', ''].map((h) => (
            <span key={h} className="font-body text-[10px] font-semibold uppercase tracking-widest text-brand-gray/60">
              {h}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {specs.map((spec, i) => (
            <div key={i} className="grid grid-cols-[1.5fr_2fr_2fr_1fr_auto] gap-2 items-center
                                    group/row bg-brand-gray-light/40 hover:bg-brand-gray-light
                                    border border-transparent hover:border-brand-gray-mid
                                    transition-all px-1 py-1 rounded-sm">
              <input
                className="input-admin text-xs"
                value={spec.group}
                onChange={(e) => updateSpec(i, 'group', e.target.value)}
                placeholder="Electrical"
              />
              <input
                className="input-admin text-xs"
                value={spec.key}
                onChange={(e) => updateSpec(i, 'key', e.target.value)}
                placeholder="Rated Current"
              />
              <input
                className="input-admin text-xs"
                value={spec.value}
                onChange={(e) => updateSpec(i, 'value', e.target.value)}
                placeholder="100–4000"
              />
              <input
                className="input-admin text-xs"
                value={spec.unit}
                onChange={(e) => updateSpec(i, 'unit', e.target.value)}
                placeholder="A"
              />
              <button
                type="button"
                onClick={() => removeSpec(i)}
                className="w-7 h-7 flex items-center justify-center text-brand-gray/30
                           hover:text-red-500 hover:bg-red-50 transition-colors rounded-sm"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={addSpec} className="btn-ghost text-xs mt-3">
          <Plus size={13} /> Add Specification Row
        </button>
      </FormCard>

      {/* Features */}
      <FormCard title="Key Features">
        <div className="space-y-2">
          {features.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input
                className="input-admin flex-1 text-sm"
                value={f}
                onChange={(e) => updateFeature(i, e.target.value)}
                placeholder="e.g. Class 0.5 measurement accuracy"
              />
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="w-9 flex items-center justify-center text-brand-gray/30
                           hover:text-red-500 hover:bg-red-50 border border-transparent
                           hover:border-red-200 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addFeature} className="btn-ghost text-xs mt-3">
          <Plus size={13} /> Add Feature
        </button>
      </FormCard>

      {/* Certifications */}
      <FormCard title="Certifications & Standards">
        <div className="flex flex-wrap gap-2">
          {certifications.map((c, i) => (
            <div key={i}
                 className="flex items-center gap-1.5 bg-brand-gray-light border border-brand-gray-mid
                            px-3 py-1.5 hover:border-brand-green/40 transition-colors">
              <input
                className="bg-transparent font-body text-sm text-brand-dark outline-none w-28"
                value={c}
                onChange={(e) => updateCert(i, e.target.value)}
                placeholder="IEC 60044-1"
              />
              <button
                type="button"
                onClick={() => removeCert(i)}
                className="text-brand-gray/30 hover:text-red-500 transition-colors"
              >
                <X size={11} />
              </button>
            </div>
          ))}
          <button type="button" onClick={addCert} className="btn-ghost text-xs">
            <Plus size={12} /> Add
          </button>
        </div>
      </FormCard>

      {/* SEO */}
      <FormCard title="SEO (Optional)">
        <div className="space-y-4">
          <Input
            label="Meta Title"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Leave blank to use product name"
          />
          <Textarea
            label="Meta Description"
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
            placeholder="Leave blank to use short description"
            rows={2}
          />
        </div>
      </FormCard>

      {/* Visibility */}
      <FormCard title="Visibility">
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 accent-brand-green"
            />
            <div>
              <span className="font-body text-sm font-medium text-brand-dark">Active</span>
              <span className="font-body text-xs text-brand-gray ml-2">Visible on public website</span>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 accent-brand-green"
            />
            <div>
              <span className="font-body text-sm font-medium text-brand-dark">Featured</span>
              <span className="font-body text-xs text-brand-gray ml-2">Shown on homepage product section</span>
            </div>
          </label>
        </div>
      </FormCard>

      {/* Submit */}
      <div className="flex items-center gap-4 pb-8">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary text-sm px-8 py-3"
        >
          {saving ? (
            <><Loader2 size={16} className="animate-spin" /> Saving…</>
          ) : (
            isEdit ? 'Update Product' : 'Create Product'
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="font-body text-sm text-brand-gray hover:text-brand-dark transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="panel">
      <div className="panel-header">{title}</div>
      <div className="panel-body">{children}</div>
    </div>
  )
}
