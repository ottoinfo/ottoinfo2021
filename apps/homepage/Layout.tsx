import React from 'react'
import Header from './components/Header'
import Languages from './components/Languages'
import About from './components/About'
import Timeline from './components/Timeline'
import { Layout } from './styles'

const Component = () => {
  return (
    <Layout>
      <Header />
      <Languages />
      <About />
      <Timeline />
    </Layout>
  )
}

export default Component
