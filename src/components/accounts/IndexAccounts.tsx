import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import React from 'react'
import CreateAccountModal from './CreateAccountModal'
import EditAccountModal from './EditAccountModal'
import FilterAccountModal from './FilterAccountModal'
import '../css/pagination.css'
import '../css/transaction.css'
import FilterListIcon from '@mui/icons-material/FilterList'
import IconButton from '@mui/material/IconButton'
import { Tooltip, Zoom } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import Pagination from '@mui/material/Pagination'


interface componentInterface {
 accounts: {
  name: string,
  uuid: string,
  last4: number
 } | null | any,
 account: {
  name: string,
  uuid: string,
  last4: number,
  account_type: {
    display_name: string
  } | null
 }
}


const IndexAccounts: React.FC<componentInterface> = (props) => {
    const [accounts, setAccounts] = useState<componentInterface["accounts"]>(null)
    const [account, setAccount] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [createModalShow, setCreateModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [filterModalShow, setFilterModalShow] = useState(false)
    const [pageSelect, setPageSelected] = useState(1)
    const [page, setPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<any>(50)
    const [accountFilter, setAccountFilter] = useState<any>(
      { 
       account_type: '',
       name: '',
       last4: ''
      }
   )
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user


    const getAccounts = async () => {
      const response = await api.get(user, `account?filters[account.name]=${accountFilter.name}&filters[account_type.name]=${accountFilter.account_type}&filters[last4]=${accountFilter.last4}&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}&with[]=account_type`)
      setAccounts(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page)
     }

     const deleteAccount = async (account:any) => {
      const response = await api.delete(user, `account/${account.uuid}`, account)
      getAccounts()
    }
      

    const closing = () => {
      setEditModalShow(false)
      setFilterModalShow(false)
      setAccount(null)
    }

    const setCreate = () => { 
      setCreateModalShow(true)  
    }

    const setEdit = (acc:any) => { 
      setAccount(acc)
      setEditModalShow(true)
    } 

    const handlePageClick = (event:any, value:number) => {
      setPageSelected(value)
      window.scrollTo(0,0)
    }

    useEffect( () => {
       getAccounts()
    }, [perPage, createModalShow, pageSelect, editModalShow, filterModalShow])



    return (
        <>
        <div className='main'>
        <div className='header'>
          <span className='header-text'>Accounts</span>
          <div className='header-button'><IconButton onClick={() => setFilterModalShow(true)} > 
          <Tooltip title='Filter' TransitionComponent={Zoom} placement="bottom">
            <FilterListIcon sx={{color:'white'}}/> 
          </Tooltip>
            </IconButton> 
            <IconButton onClick={() => setCreate()} > 
            <Tooltip title='Create Account' TransitionComponent={Zoom} placement='bottom' >
              <AddCircleRoundedIcon sx={{color:'white'}}/> 
            </Tooltip>
        </IconButton>
            </div>
      
        </div>

        <div className='table'>
        <Table striped bordered hover >
        <thead>
          <tr>
            <th>Name</th>
            <th>Last4</th>
            <th>Account Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
    {    accounts?.map((account:componentInterface["account"]) => (
                   
                  <tr key={account.uuid}>
                    <td> 
                        {account.name}
                    </td>
                    <td>{account?.last4}</td>
                    <td>{account?.account_type?.display_name}</td>
                    <td>
                        <IconButton onClick={() => setEdit(account)} size="small"><EditIcon/></IconButton>
                        <IconButton onClick = {() => deleteAccount(account)} size="small"><DeleteIcon /></IconButton>
                    </td>
                  </tr> 
                    
                )
            )
         
        
    }
        </tbody>
      </Table>
      </div>


    <div className='pagination'>
        <label htmlFor="perPage"></label>
          <select id="perPageSelect" onChange={e => setPerPage(e.target.value)}> 
            <option value="">PerPage</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="23">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <Pagination 
            count={page} page={currentPage} onChange={handlePageClick} 
            defaultPage={1} showFirstButton showLastButton
            color='primary' size='large' shape="rounded"
          />
      </div>
      </div>

      <FilterAccountModal 
        show={filterModalShow}
        accountFilter={accountFilter}
        setAccountFilter={setAccountFilter}
        closing={closing}
        setAccounts={setAccounts}
        handleClose={() => closing()}
        />

      <CreateAccountModal
                user={user}
                account={account}
                show={createModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setCreateModalShow(false)}
            />

{ account &&
            <EditAccountModal
                user={user}
                account={account}
                show={editModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => closing()}
            />
          }
      </>  
    )
    
}



export default IndexAccounts