import { createClient } from '@/utils/supabase/server'

interface Product {
  id: string
  name: string
  sku: string
  retail_price: number
  product_score: number
  box_count: number
  is_active: boolean
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('retail_price', { ascending: true })

  if (error) {
    return (
      <main className="p-8 text-red-500 font-medium">
        資料庫連線失敗：{error.message}
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto py-12 px-6 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Vegenova 入會方案
        </h1>
        <p className="mt-2 text-gray-600">
          選擇最適合你的加入方案，啟動健康生活與事業夥伴計畫
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {(products as Product[])?.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 inline-block px-3 py-1 rounded-full">
                {product.sku}
              </div>
              <h2 className="text-2xl font-bold mt-3 text-gray-900">
                {product.name}
              </h2>
              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-extrabold text-gray-900">
                  NT$ {product.retail_price?.toLocaleString()}
                </span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-6">
                <li>• 獎勵積分 / PV：{product.product_score?.toLocaleString()}</li>
                {product.box_count > 0 && (
                  <li>• 包含箱數：{product.box_count} 箱</li>
                )}
              </ul>
            </div>

            <button className="mt-8 w-full bg-emerald-600 text-white font-medium py-3 rounded-xl hover:bg-emerald-700 transition-colors">
              立即選購
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
