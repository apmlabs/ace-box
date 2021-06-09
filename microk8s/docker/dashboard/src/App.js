import Nav from './Nav'
import Preview from './Preview'
import AceBoxLinks from './AceBoxLinks'

const App = () =>
  <div>
    <Nav />
    <main>
      <AceBoxLinks />
      <Preview />
    </main>
  </div>

export { App as default }
