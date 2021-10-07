import React from 'react'
import { Layout } from './styles'

type Props = { statusCode: number }

const Component = ({ statusCode }: Props) => {
  return (
    <Layout>
      <p>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      </p>
    </Layout>
  )
}

export default Component
