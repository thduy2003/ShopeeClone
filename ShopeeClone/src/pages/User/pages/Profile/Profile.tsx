import React, { useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import userApi from 'src/apis/user.api'
import { Controller, useForm } from 'react-hook-form'
import { userSchema, UserSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import DateSelect from '../../components/DateSelect'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
type FormData = Pick<UserSchema, 'name' | 'address' | 'avatar' | 'date_of_birth' | 'phone'>
const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'date_of_birth', 'phone'])
const Profile = () => {
  const { setProfile } = useContext(AppContext)
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      phone: '',
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })
  const profile = profileData?.data?.data
  useEffect(() => {
    if (profile) {
      setValue('avatar', profile.avatar)
      setValue('address', profile.address)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
      setValue('name', profile.name)
      setValue('phone', profile.phone)
    }
  }, [profile, setValue])
  const onSubmit = handleSubmit(async (data) => {
    const res = await updateProfileMutation.mutateAsync({ ...data, date_of_birth: data.date_of_birth?.toISOString() })
    setProfile(res.data.data)
    setProfileToLS(res.data.data)
    refetch()
    toast.success(res.data.message)
  })
  return (
    <div className='rounded-sm bg-white px-2 md:px-7 pb-10 md:pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <form onSubmit={onSubmit} className='mt-8 flex flex-col-reverse md:flex-row md:items-center'>
          <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
            <div className='flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>
            <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='name'
                  placeholder='Tên'
                  errorMessage={errors.name?.message}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Controller
                  control={control}
                  name='phone'
                  render={({ field }) => (
                    <InputNumber
                      classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm'
                      errorMessage={errors.phone?.message}
                      placeholder='Số điện thoại'
                      {...field}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 ouline-none focus:border-gray-500 focus:shadow-sm'
                  register={register}
                  name='address'
                  placeholder='Địa chỉ'
                  errorMessage={errors.address?.message}
                />
              </div>
            </div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'></div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  type='submit'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
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
              <button
                className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
                type='button'
              >
                Chọn ảnh
              </button>
              <div className='mt-3 text-gray-400'>
                <div>Dung lượng file tối đa 1MB</div>
                <div>Định dạng: .PNG .JPEG</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
