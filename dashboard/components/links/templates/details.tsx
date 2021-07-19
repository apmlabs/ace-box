import { useState, FunctionComponent } from 'react'

type DetailsProps = {
  title: string
  href: string
  credentials?: any[]
}

const Details: FunctionComponent<DetailsProps> = ({ title, href, credentials }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <tbody className={`expandable ${isExpanded ? "is-active" : ""}`}>
      <tr>
        <td>{title}</td>
        <td><a href={href} target="_blank" rel="noreferrer">{href}</a></td>
        <td>
          {
            !!credentials &&
              <button className="expandable__trigger" style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }} onClick={() => setIsExpanded(isExpanded => !isExpanded)}>more</button>
          }
        </td>
      </tr>
      <tr className="">
        {
          isExpanded &&
            <td colSpan={3}>
              <div style={{ display: "grid", gridTemplateColumns: "auto", rowGap: "10px" }}>
                {
                  !!credentials && credentials.map((Credential, key) =>
                    <Credential key={key} />
                  )
                }
              </div>
            </td>
        }
      </tr>
    </tbody>
  )
}

export { Details as default }
