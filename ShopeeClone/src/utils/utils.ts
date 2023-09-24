import axios, { AxiosError } from 'axios'
import { kMaxLength } from 'buffer'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import userImage from 'src/assets/images/user.svg'
import { AuthResponse } from 'src/types/auth.type'
import { ErrorResponse } from 'src/types/utils.type'
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error?.response?.status === HttpStatusCode.UnprocessableEntity
}
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error?.response?.status === HttpStatusCode.Unauthorized
}
export function isAxiosExpiredRefreshTokenError<AuthorizedError>(error: unknown): error is AxiosError<AuthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ message: string; name: string }>>(error) &&
    error?.response?.data.data?.name === 'EXPIRED_TOKEN'
  )
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
export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`
}
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i,')
  return arr[arr.length - 1]
}
export const getAvatarUrl = (nameAvatar?: string) => (nameAvatar ? `${config.baseURL}images/${nameAvatar}` : userImage)
