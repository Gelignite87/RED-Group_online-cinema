import { Component } from 'react'

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
		const { children }: any = this.props
		return isClient ? children : false
	}
}

export default ClientOnly
