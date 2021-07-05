import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import Layout from '../apps/homepage/Layout'

interface Props {
  // userAgent?: string
}

const Page: NextPage = (props: Props) => {
  console.log({ props })
  return <Layout />
}

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}

export default Page
