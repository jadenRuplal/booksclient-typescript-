import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}


interface componentInterface {
  user: any
    
}





const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
		<Nav.Item>
		    <Link to='sign-out' style={linkStyle}>Sign out</Link>
        </Nav.Item>
        <Nav.Item>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
		<Nav.Item>
			<Link to='payees' style={linkStyle}>
				Payees
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='createPayee' style={linkStyle}>
				create Payee
			</Link>
		</Nav.Item>
	</>
)

const Header: React.FC <componentInterface> = () => (
	<Navbar bg='primary' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
                react-auth-template
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{alwaysOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
