import { Product } from '~/entities/Product'
import products from '~/fake/products.json'

import { Promise } from 'bluebird'

export default async function getProducts(): Promise<Product[]> {
  return Promise.delay(1000, products)
}
