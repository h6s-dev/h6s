import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { HomepageFeatures } from '@site/src/components/HomepageFeatures'
import { HomepageHeader } from '@site/src/components/HomepageHeader'
import Layout from '@theme/Layout'
import React from 'react'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title="Hello world"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
