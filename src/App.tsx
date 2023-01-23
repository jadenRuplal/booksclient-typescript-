
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import './index.css'
import './assets/scss/Theme.scss'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import IndexMapping from './components/mapping/IndexMapping'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import IndexPayees from './components/payees/IndexPayees'
import IndexAccounts from './components/accounts/IndexAccounts'
import IndexCategories from './components/category/Indexcategories'
import LeftSidebar from './sidebar/LeftSidebar'
import Snackbars from './components/shared/SnackBar'
import IndexTransactions from './components/transactions/IndexTransactions'
const styles:any = {
	float: 'left',
	display: 'table-cell',
	height: '100vh',
	width: '20vw'
}
const stylesRoutes:any = {
	float: 'left',
	height: 'auto',
	width: '70vw',
	display: 'table-cell'
}

type Message = {
  heading: any,
  message: any,
  variant: any
}

interface componentInterface {
  msgAlert: (message: Message) => unknown,
  setMsgAlerts: () => any,
  user: {
	sessions: [{
		session_id: number,
		id: string,
	}]
	email: string,
	

} | null,
}

const App: React.FC<componentInterface> = () => {

  const [user, setUser] = useState<componentInterface["user"]>(null)
  const [msgAlerts, setMsgAlerts] = useState<any>([])
  const result:any = useSelector((state) => state);


  
  const clearUser = () => {
    
    setUser(null)
  }

	const deleteAlert = (id:any) => {
		setMsgAlerts((prevState:any) => {
			return (prevState.filter((msg:any)=> msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }:any) => {
		const id = uuid()
		setMsgAlerts(():any => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<>
			<Snackbars/>
				<div style={styles}>
					<h2 style={{position:'fixed'}}>myBooks</h2>
					<LeftSidebar />
				</div>
				<div style={stylesRoutes}>
				<Routes>
					<Route path='/' element={
					<RequireAuth result={result}>
					<Home msgAlert={msgAlert} user={user} />
					</RequireAuth>} />
					<Route
						path='/payees'
						element={<IndexPayees payees={null} payee={{
							name: '',
							uuid: ''
						}}/>}
					/>
					<Route
						path='/accounts'
						element={<IndexAccounts   accounts={null} account={{
							name: '',
							uuid: '',
							last4: 0
						}} />}
					/>
					<Route
						path='/categories'
						element={<IndexCategories categories={null} category={{
							name: '',
							uuid: ''
						}}/>}
					/>
					<Route
						path='/mapping'
						element={<IndexMapping mapping={undefined} map={null}		 />}
					/>
					<Route
						path='/transactions'
						element={<IndexTransactions transactions={undefined} transaction={null} 	 />}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth result={result}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user}  />
						</RequireAuth>
						}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} user={undefined} />}
					/>
				</Routes>
				</div>
			</>
		)
}

export default App
