import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: { value: true, message: 'Email là bắt buộc' },
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      message: 'Email phải đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: ' Độ dài từ 5- 160 ký tự'
    },
    minLength: {
      value: 5,
      message: ' Độ dài từ 5- 160 ký tự'
    }
  },
  password: {
    required: { value: true, message: 'Password là bắt buộc' },

    maxLength: {
      value: 160,
      message: ' Độ dài từ 6- 160 ký tự'
    },
    minLength: {
      value: 6,
      message: ' Độ dài từ 6- 160 ký tự'
    }
  },
  confirm_password: {
    required: { value: true, message: 'Confirm Password là bắt buộc' },

    maxLength: {
      value: 160,
      message: ' Độ dài từ 6- 160 ký tự'
    },
    minLength: {
      value: 6,
      message: ' Độ dài từ 6- 160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không khớp'
        : undefined
  }
})
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('nhập lại Password là bắt buộc')
    .min(6, 'Độ dài password phải từ 6-160 kí tự')
    .max(160, 'Độ dài password phải từ 6-160 kí tự')
    .oneOf([yup.ref(refString)], 'Nhập lại password chưa khớp')
}
export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5-160 kí tự')
    .max(160, 'Độ dài từ 5-160 kí tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài password phải từ 6-160 kí tự')
    .max(160, 'Độ dài password phải từ 6-160 kí tự'),
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không hợp lệ',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_max !== '' || price_min !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không hợp lệ',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_max !== '' || price_min !== ''
    }
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})
const LoginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof LoginSchema>
export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 kí tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn 1 ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: handleConfirmPasswordYup('new_password')
})
export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
