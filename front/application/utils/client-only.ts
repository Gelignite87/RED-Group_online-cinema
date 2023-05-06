import { Component, ReactNode } from 'react'

class ClientOnly extends Component {
	state = {
		isClient: false,
	}
	componentDidMount() {
		this.setState({
			isClient: true,
		})
	}
	render() {
		const { isClient } = this.state
		const { children }: { children?: ReactNode } = this.props
		return isClient ? children : false
	}
}
export default ClientOnly
