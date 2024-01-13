import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

import { Button } from './components/Button'
import { GlobalStyle } from './styles/globals'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="secondary" />

      <GlobalStyle />
    </ThemeProvider>
  )
}
