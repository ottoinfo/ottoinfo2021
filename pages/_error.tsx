import React from 'react'
import ErrorLayout from '../apps/error'

type Props = { statusCode: number }

const Error = ({ statusCode }: Props) => {
  return <ErrorLayout statusCode={statusCode} />
}

Error.getInitialProps = ({ res, err }: any): Props => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
