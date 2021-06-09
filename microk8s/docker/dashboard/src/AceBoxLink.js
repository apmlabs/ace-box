import { Fragment } from 'react'

const AceBoxLink = ({ title, href, credentials }) =>
  <li>
    <span>{title}: </span>
    <span><a href={href} target="_blank" rel="noreferrer">{href}</a></span>
    {
      !!credentials && credentials.map((credential, key) =>
        <Fragment key={key}>
          <span> | </span>
          <span>{credential.name} = </span>
          <span>{credential.value}</span>
        </Fragment>
      )
    }
  </li>

export { AceBoxLink as default }
