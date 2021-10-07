import React from 'react'
import EXPERIENCE from '../data/experience'
import { getTimeWorked } from '../helpers'

const Component = () => {
  return (
    <section data-section='experience'>
      <h3>Experience</h3>
      <ul data-type='job'>
        {EXPERIENCE.map((job, key) => {
          const { start, stop, company, title, description, stack } = job
          const timeWorked = getTimeWorked(start, stop)
          return (
            <li key={`company-${key}`}>
              <p data-type='company'>
                {company} <span data-type='time'>{timeWorked || ''}</span>
              </p>
              <p data-type='title'>{title}</p>
              <p data-type='description'>{description}</p>

              <ul data-type='job-stack'>
                {stack?.map((item) => {
                  return (
                    <li data-type='stack' key={`company-stack-${item}`}>
                      {item}
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Component
