import React, { useEffect, useState } from 'react'

import { Product as ProductModel } from '~/entities/Product'
import getProducts from '~/services/getProducts'

import Product from '../Product'
import { Container, Loading } from './styles'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
      setLoading(false)
    })()
  }, [setProducts])

  return (
    <Container>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      )}
    </Container>
  )
}

export default ProductList
