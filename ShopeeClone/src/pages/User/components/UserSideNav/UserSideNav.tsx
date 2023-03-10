import React from 'react'
import { Link } from 'react-router-dom'

const UserSideNav = () => {
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link
          to='/user/profile'
          className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'
        >
          <img
            src='https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'
            alt=''
            className='w-full h-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>duytrieudong</div>
          <Link to='/user/profile' className='flex items-center capitalize text-gray-500 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <Link to='/user/profile' className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'
              alt=''
              className='w-full h-full'
            />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to='/user/password' className='flex items-center capitalize text-gray-600 transition-colors'>
          <div className='mr-3 mt-5 mb-5 h-[22px] w-[22px]'>
            <img
              src='https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'
              alt=''
              className='w-full h-full'
            />
          </div>
          Đổi mật khẩu
        </Link>
        <Link to='/user/purchase' className='flex items-center capitalize text-gray-600 transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img
              src='https://png.pngtree.com/png-vector/20191011/ourmid/pngtree-invoice-icon-png-image_1817550.jpg'
              alt=''
              className='w-full h-full'
            />
          </div>
          Đơn mua
        </Link>
      </div>
    </div>
  )
}

export default UserSideNav
