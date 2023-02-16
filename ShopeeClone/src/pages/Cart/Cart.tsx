import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { purchasesStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { Link } from 'react-router-dom'
import QuantityController from 'src/components/QuantityController'
import Button from 'src/components/Button'
import { Purchase } from 'src/types/purchase.type'
import produce from 'immer'
interface ExtendedPurchase extends Purchase {
  checked: boolean
  disable: boolean
}
const Cart = () => {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked)
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchaseInCart = purchaseInCartData?.data.data
  useEffect(() => {
    setExtendedPurchase(
      purchaseInCart?.map((purchase) => ({
        ...purchase,
        disable: false,
        checked: false
      })) || []
    )
  }, [purchaseInCart])
  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchase((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px] '>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 test-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6 '>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                      className='w-5 h-5 accent-orange'
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm bg-white p-5 shadow'>
              {extendedPurchase?.map((purchase, index) => (
                <div
                  key={purchase._id}
                  className='grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0 mb-5'
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          checked={purchase.checked}
                          onChange={handleCheck(index)}
                          className='w-5 h-5 accent-orange'
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            className='h-20 w-20 flex-shrink-0'
                            to={`/${generateNameId({
                              name: purchase.product.name,
                              id: purchase.product._id
                            })}`}
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              to={`/${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                              className='line-clamp-2'
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center'>
                          <span className='text-gray-300 line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-none text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky mt-8 bottom-0 z-10 flex flex-col sm:flex-row sm:items-center rounded-sm bg-white shadow border-gray-100 p-5 '>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input type='checkbox' checked={isAllChecked} className='h-5 w-5 accent-orange' />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({extendedPurchase.length})
            </button>
            <button className='mx-3 border-none bg-none'>Xóa</button>
          </div>

          <div className='ml-auto mt-5 sm:mt-0 flex-col sm:flex-row flex sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán(0 sản phẩm)</div>
                <div className='ml-2 text-2xl text-orange'> ₫138000</div>
              </div>
              <div className='flex items-center sm:justify-end text-sm'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫138000</div>
              </div>
            </div>
            <Button className='ml-4 mt-5 sm:mt-0 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600'>
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
Cart
