
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav'
import './sidebar.css'
const styles:any = {
  color:'white',
  textAlign: 'center',
  
}

const Sidebar = (props:any) => {
    return (
      <div style={{backgroundColor: 'black', height: '100vh'}}>
        
          <h3 style={{color:'white', textAlign:'center'}}>MyBooks</h3>

        <Nav className="flex-column pt-2">
        <Nav.Link    style={{textAlign:'center'}}>
			<Link to='/' style={styles} >
				Dashboard
			</Link>
		</Nav.Link>
		<Nav.Item style={{textAlign:'center'}}>
		    <Link to='sign-out' style={styles} >Sign out</Link>
        </Nav.Item >
        <Nav.Item style={{textAlign:'center'}}>
		    <Link to='sign-in' style={styles} >Sign In</Link>
        </Nav.Item>
		<Nav.Item style={{textAlign:'center'}}>
			<Link to='payees' style={styles} >
				Payees
			</Link>
		</Nav.Item >
    <Nav.Item style={{textAlign:'center'}}>
			<Link to='accounts' style={styles} >
				Accounts
			</Link>
		</Nav.Item >
		<Nav.Item style={{textAlign:'center'}}>
			<Link to='createPayee' style={styles} >
				create Payee
			</Link>
		</Nav.Item>
        </Nav>
      </div>
    );
  }

export default Sidebar