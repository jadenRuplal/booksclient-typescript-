
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import './index.css'
import './assets/scss/Theme.scss'
// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
// import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import IndexPayees from './components/payees/IndexPayees'
import ShowPayee from './components/payees/ShowPayee'
import IndexAccounts from './components/accounts/IndexAccounts'
import ShowAccount from './components/accounts/ShowAccount'
import ShowCategory from './components/category/ShowCategory'
import IndexCategories from './components/category/Indexcategories'
import LeftSidebar from './sidebar/LeftSidebar'
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
						path='/payees/:id'
						element={
							<RequireAuth result={result}>
						<ShowPayee msgAlert={msgAlert}  updatePayee={function (): void {
							throw new Error('Function not implemented.')
						} } payee={null} />
						</RequireAuth>}
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
						path='/accounts/:id'
						element={
							<RequireAuth result={result}>
						<ShowAccount msgAlert={msgAlert}  updateAccount={function (): void {
							throw new Error('Function not implemented.')
						} } payee={null} />
						</RequireAuth>}
					/>
					<Route
						path='/categories'
						element={<IndexCategories categories={null} category={{
							name: '',
							uuid: ''
						}}/>}
					/>
					<Route
						path='/categories/:id'
						element={
							<RequireAuth result={result}>
						<ShowCategory msgAlert={msgAlert}  updatePayee={function (): void {
							throw new Error('Function not implemented.')
						} } category={null} />
						</RequireAuth>}
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
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
				</Routes>
				</div>
				{/* {msgAlerts.map((msgAlert:any) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))} */}
			</>
		)
}

export default App
