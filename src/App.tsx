
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { useSelector } from 'react-redux'
import './index.css'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
// import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import IndexPayees from './components/payees/IndexPayees'
import ShowPayee from './components/payees/ShowPayee'
import CreatePayee from './components/payees/CreatePayee'
// import ChangePassword from './components/auth/ChangePassword'


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
  const result = useSelector((state) => state);
 

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
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
			<Fragment>
				<Header user={result}  />
				<Routes>
					<Route path='/' element={
					<RequireAuth result={result}>
					<Home msgAlert={msgAlert} user={user} />
					</RequireAuth>} />
					<Route
						path='/payees'
						element={<IndexPayees   user={user} payees={null} payee={{
							name: '',
							uuid: ''
						}} />}
					/>
					<Route
						path='/payees/:id'
						element={
							<RequireAuth result={result}>
						<ShowPayee msgAlert={msgAlert} user={user} updatePayee={function (): void {
							throw new Error('Function not implemented.')
						} } payee={null} />
						</RequireAuth>}
					/>
					<Route
						path='/createPayee'
						element={
						<RequireAuth result={result}>
							<CreatePayee msgAlert={msgAlert} />
						</RequireAuth>
						}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth result={result}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user}  />
						</RequireAuth>
						}
					/>
          {/* <Route
            path='/change-password'
            element={
              <RequireAuth user={user}>
                <ChangePassword msgAlert={msgAlert} user={user} />
              </RequireAuth>}
          /> */}
				</Routes>
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
			</Fragment>
		)
}

export default App
