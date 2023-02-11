
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import './index.css'
import './App.css'
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
import SideBar from './SidebarCollapse/SideBar'
const styles:any = {
	float: 'left',
	display: 'table-cell',
	height: '100vh',
	width: '15vw'
}
const stylesRoutes:any = {
	marginLeft:'10px',
	float: 'left',
	height: 'auto',
	width: '80vw',
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
  const result:any = useSelector((state) => state)
  const open = result?.sideBar.open



const classConcat = (name:string) => {
    if (open === true) {
        return name
    } else if (open === false) {
        return( name + '-collapsed')
    }
}

  
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
				<>
				<Routes>
					<Route path='/' element={
					<RequireAuth result={result}>
					<div className={classConcat('div-sidebar')}><SideBar/></div>
					<div className={classConcat('main-view')} ><Home msgAlert={msgAlert} user={user} /></div>
					</RequireAuth>} />
					<Route
						path='/payees'
						element={
							<>
							<div className={classConcat('div-sidebar')}><SideBar /></div>
							<div className={classConcat('main-view')}><IndexPayees payees={null} payee={{
								name: '',
								uuid: ''
							}} />
							</div>
							</>}
					/>
					<Route
						path='/accounts'
						element={
							<>
								<div className={classConcat('div-sidebar')}><SideBar /></div>
								<div className={classConcat('main-view')}><IndexAccounts accounts={null} account={{
								name: '',
								uuid: '',
								last4: 0
							}} />
							</div>
							</>}
					/>
					<Route
						path='/categories'
						element={
							<>
								<div className={classConcat('div-sidebar')}><SideBar /></div>
								<div className={classConcat('main-view')}><IndexCategories categories={null} category={{
								name: '',
								uuid: ''
							}} />
							</div>
							</>}
					/>
					<Route
						path='/mapping'
						element={
							<>
								<div className={classConcat('div-sidebar')}><SideBar /></div>
								<div className={classConcat('main-view')}><IndexMapping mapping={undefined} map={null} />
								</div>
								</>}
							/>
					<Route
						path='/transactions'
						element={<>
						<div className={classConcat('div-sidebar')}><SideBar /></div>
						<div className={classConcat('main-view')}><IndexTransactions transactions={undefined} transaction={null} />
						</div>
						</>}
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
				</>
			</>
		)
}

export default App


