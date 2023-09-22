import React, { useContext, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import userApi from 'src/apis/user.api'
import { Controller, useForm, useFormContext, FormProvider } from 'react-hook-form'
import { userSchema, UserSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import InputNumber from 'src/components/InputNumber'
import DateSelect from '../../components/DateSelect'

import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { getAvatarUrl } from 'src/utils/utils'
import config from 'src/constants/config'
import InputFile from 'src/components/InputFile'
function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <React.Fragment>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
            register={register}
            name='name'
            placeholder='Tên'
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Số điện thoại'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
type FormData = Pick<UserSchema, 'name' | 'address' | 'avatar' | 'date_of_birth' | 'phone'>
const profileSchema = userSchema.pick(['name', 'address', 'avatar', 'date_of_birth', 'phone'])
const Profile = () => {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = React.useState<File>()
  const previewImage = React.useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      phone: '',
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = methods
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
    try {
      let avatarName = ''
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  })
  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className='mt-8 flex flex-col-reverse md:flex-row md:items-center'>
            <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
              <div className='flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <div className='pt-3 text-gray-700'>{profile?.email}</div>
                </div>
              </div>
              <Info />
              <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
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
              <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
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
                <div className='my-5 h-24 w-24'>
                  <img
                    src={previewImage || getAvatarUrl(profile?.avatar)}
                    alt=''
                    className='h-full w-full object-cover'
                  />
                </div>
                <InputFile onChange={handleChangeFile} />
                <div className='mt-3 text-gray-400'>
                  <div>Dung lượng file tối đa 1MB</div>
                  <div>Định dạng: .PNG .JPEG</div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Profile
