import axios, { AxiosError } from 'axios'
import { kMaxLength } from 'buffer'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error?.response?.status === HttpStatusCode.UnprocessableEntity
}
export function formatCurrency(currency: number) {
  return Intl.NumberFormat('de-DE').format(currency)
}
export function formatNumberToSocialStyle(value: number) {
  return Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'
