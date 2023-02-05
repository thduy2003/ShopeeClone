import http from 'src/utils/http'
import { ProductListConfig, ProductList, Product } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'

const URL = 'products'
export const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, { params })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  }
}
