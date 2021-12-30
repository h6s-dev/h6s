import clsx from 'clsx'
import React from 'react'

import styles from './HomepageFeatures.module.css'

const features = [
  {
    title: 'Integrate Anything',
    description: (
      <>
        You don't need to extend or customize styles. You don't care what CSS library or Design system framework you're using. Because you don't have to worry about it because you can just integrate it and use it!
      </>
    ),
  },
  {
    title: 'Simplify Complexity',
    description: (
      <>
        No matter how complex the user interface is, it can be easily implemented with a simplified interface. You don't care about complex internal implementations, just use declarative interfaces
      </>
    ),
  },
  {
    title: 'Lightweight Code',
    description: (
      <>
        You can use only the package you need for each UI from h6s. Of course, you don't need to worry about bundle size because unused code is tree shaked.
      </>
    ),
  },
]

export function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map(({ title, description }) => (
            <div key={title} className={clsx('col col--4')}>
              <div className="padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
