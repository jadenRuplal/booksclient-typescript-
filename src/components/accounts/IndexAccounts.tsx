import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import React from 'react'
import CreateAccountModal from './CreateAccountModal'
import EditAccountModal from './EditAccountModal'
import Select from 'react-select'
import '../css/pagination.css'
import '../css/transaction.css'
import {Button} from '@material-ui/core'
import FilterListIcon from '@mui/icons-material/FilterList'
import IconButton from '@mui/material/IconButton'
import { Tooltip, Zoom } from "@mui/material"
import { setSnackbar } from '../../features/snackSlice'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
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
    const [error, setError] = useState(false)
    const [account, setAccount] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [typeSelected, setTypeSelected] = useState('')
    const [createModalShow, setCreateModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [filterModalShow, setFilterModalShow] = useState(false)
    const [pageSelect, setPageSelected] = useState(1)
    const [page, setPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<any>(50)
    const [search, setSearch ] = useState<any>('')
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const accountOptions = result.option.value[0].options.data.account_type
    const open = result?.sideBar.open
    const getAccounts = async () => {
      const response = await api.get(user, `account?filters[search]=${search}&filters[account_type.name]=${typeSelected}&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}&with[]=account_type`)
      setAccounts(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page)
     }

      const allTypes = {value: '', label: 'All'}
      
      const optionType = () => {
        return(
          accountOptions?.map((option:any) => (
           {value:`${option.name}`, label: `${option.display_name}`}
            )
          )
          )
    }

    const checkOpen = (name:string) => {
      if (open === true) {
        return name
      } else if (open === false) {
        return(name + '-collapsed')
      }
    }
      
      function handleSelect(data:any) {
        setTypeSelected(data.value)
      }

      const handleChange = (e: any) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e: { preventDefault: () => any }) => {
        e.preventDefault()
        getAccounts()
    }
    const closing = () => {
      setEditModalShow(false)
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
    }

    useEffect( () => {
       getAccounts()
    }, [perPage, createModalShow, pageSelect, editModalShow])

    if (error) {
        return <p>Error!</p>
    }



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
          </tr>
        </thead>
        <tbody>
    {    accounts?.map((account:componentInterface["account"]) => (
                   
                  <tr key={account.uuid}>
                    <td onClick={() => setEdit(account)}> 
                        {account.name}
                    </td>
                    <td>{account?.last4}</td>
                    <td>{account?.account_type?.display_name}</td>
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