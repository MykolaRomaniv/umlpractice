import * as React from 'react'
import { enableRipple } from '@syncfusion/ej2-base'

enableRipple(true)

export default class SampleBase extends React.PureComponent {
  componentDidMount(): void {
    setTimeout(() => {
      this.rendereComplete()
    })
  }

  // eslint-disable-next-line class-methods-use-this
  rendereComplete(): void {
    /** custom render complete function */
  }
}
