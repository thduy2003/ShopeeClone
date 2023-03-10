import React from 'react'
import Input from 'src/components/Input'

const Profile = () => {
  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <div className='mt-8 flex flex-col-reverse md:flex-row md:items-center'>
          <form className='mt-6 flex-grow md:pr-12 md:mt-0'>
            <div className='flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>duy***********@gmail.com</div>
              </div>
            </div>
            <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='flex justify-between'>
                  <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                    <option disabled>Ngày</option>
                  </select>
                  <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                    <option disabled>Tháng</option>
                  </select>
                  <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                    <option disabled>Năm</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 w-24 h-24'>
                <img
                  src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
                  alt=''
                  className='w-full h-full object-cover'
                />
              </div>
              <input type='file' className='hidden' accept='.jpg, .jpeg, .png' />
              <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
                Chọn ảnh
              </button>
              <div className='mt-3 text-gray-400'>
                <div>Dung lượng file tối đa 1MB</div>
                <div>Định dạng: .PNG .JPEG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
