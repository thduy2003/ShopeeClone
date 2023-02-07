import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
interface Props {
  product: ProductType
}
const Product = ({ product }: Props) => {
  return (
    <Link to={`/${product._id}`}>
      <div className='bg-white shadow rounded-sm overflow-hidden hover:translate-y-[-0.03rem] hover:shadow-md duration-100 transition-transform'>
        <div className='w-full pt-[100%] relative'>
          <img
            src={product.image}
            className='absolute top-0 left-0 bg-white w-full h-full object-cover'
            alt={product.name}
          />
        </div>
        <div className='p-2 overflow-hidden'>
          <div className='min-h-[2rem] line-clamp-2 text-xs'>{product.name}</div>
          <div className='flex items-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 truncate'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className=' text-orange ml-1 truncate'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'> {formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 justify-end flex items-center'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
