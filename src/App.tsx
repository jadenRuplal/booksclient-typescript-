
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
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
import Snackbars from './components/shared/SnackBar'
import IndexTransactions from './components/transactions/IndexTransactions'
import SideBar from './SidebarCollapse/SideBar'


interface componentInterface {
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

	

		return (
			<>
			<Snackbars/>
				<>
				<Routes>
					<Route path='/' element={
					<RequireAuth result={result}>
						<div className={classConcat('div-sidebar')}><SideBar /></div>
						<div className={classConcat('main-view')} ><Home user={user} /></div>
					</RequireAuth>} />
					<Route
						path='/payees'
						element={
							<>
							<div className={classConcat('div-sidebar')}><SideBar /></div>
							<div className={classConcat('main-view')}><IndexPayees payees={null} payee={null} />
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
										last4: 0,
										account_type: {
											display_name: ''
										}
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
								<div className={classConcat('main-view')}><IndexMapping mapping={null} map={null} />
								</div>
								</>}
							/>
					<Route
						path='/transactions'
						element={<>
						<div className={classConcat('div-sidebar')}><SideBar /></div>
						<div className={classConcat('main-view')}><IndexTransactions transactions={null} transaction={null} />
						</div>
						</>}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth result={result}>
							<SignOut clearUser={clearUser} user={user}  />
						</RequireAuth>
						}
					/>
					<Route
						path='/sign-in'
						element={<SignIn setUser={setUser} user={null} />}
					/>
				</Routes>
				</>
			</>
		)
}

export default App


