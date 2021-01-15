import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { enableRipple } from '@syncfusion/ej2-base'

enableRipple(true)

interface IState {
  points: number
}

export default class SampleBase extends React.PureComponent<
  RouteComponentProps,
  IState
> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      points: 0,
    }
  }

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
