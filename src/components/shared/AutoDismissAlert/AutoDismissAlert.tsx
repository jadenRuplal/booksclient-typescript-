import React from 'react'
import Alert from 'react-bootstrap/Alert'

import './AutoDismissAlert.scss'


type MsgAlert = {
	msgAlert: {
		id: any,
		heading: any,
		variant: any,
		message: any
	}
}

class AutoDismissAlert extends React.Component<{}, {show: boolean}, MsgAlert["msgAlert"]> {
	timeoutId: any
	constructor(props: any) {
		super(props)
		this.state = {
			show: true,
		}
		this.timeoutId = null
	}

	componentDidMount() {
		this.timeoutId = setTimeout(this.handleClose, 5000)
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId)
	}

	handleClose = () => this.setState({ show: false })

	render() {
		const { variant, heading, message, deleteAlert, id }:any = this.props
		// Delete this alert after the fade animation time (300 ms by default)
		if (!this.state.show) {
			setTimeout(() => {
				deleteAlert(id)
			}, 300)
		}

		return (
			<Alert
				dismissible
				show={this.state.show}
				variant={variant}
				onClose={this.handleClose}>
				<div className='container'>
					<Alert.Heading>{heading}</Alert.Heading>
					<p className='alert-body'>{message}</p>
				</div>
			</Alert>
		)
	}
}

export default AutoDismissAlert
