import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { schema, Schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
const useSearchProducts = () => {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  type FormData = Pick<Schema, 'name'>
  const nameSchema = schema.pick(['name'])
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: '/',
      search: createSearchParams(config).toString()
    })
  })
  return { register, onSubmitSearch }
}

export default useSearchProducts
