import React from 'react'
import EXPERIENCE from '../data/experience'
import { getTimeWorked } from '../helpers'

const Component = () => {
  return (
    <section data-section='experience'>
      <h3>Experience</h3>
      <ul>
        {EXPERIENCE.map((job) => {
          const { start, stop, company, title, description } = job
          const timeWorked = getTimeWorked(start, stop)
          return (
            <li>
              <p data-type='company'>
                {company} <span data-type='time'>{timeWorked || ''}</span>
              </p>
              <p data-type='title'>{title}</p>
              <p data-type='description'>{description}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Component
