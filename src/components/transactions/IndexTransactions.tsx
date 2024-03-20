import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import '../css/pagination.css'
import '../css/transaction.css'
import CreateTransactionModal from './CreateTransactionModal'
import FilterTransactionModal from './FilterTransactionModal'
import React from 'react'
import EditTransactionModal from './EditTransactionModal'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import IconButton from '@mui/material/IconButton'
import { Tooltip, Zoom } from "@mui/material"
import { setSnackbar } from '../../features/snackSlice'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Pagination from '@mui/material/Pagination'



interface componentInterface {
  transactions: [{
        uuid: string,
        name: string
  }] | null,
  transaction: {
    name: string,
    uuid: string,
    payee: {
      name: string
    }
  } | null
}


const IndexTransactions: React.FC<componentInterface> = () => {
    const [render, setRender] = useState<number>(0)
    const [transactions, setTransactions] = useState<componentInterface["transactions"]>(null)
    const [transaction, setTransaction] = useState(null)
    const [deleteAll, setDeleteAll] = useState<any>([])
    const [createModalShow, setCreateModalShow] = useState(false)
    const [filterModalShow, setFilterModalShow] = useState(false)
    const [pageSelect, setPageSelected] = useState(1)
    const [page, setPage] = useState<number>(3)
    const [editModalShow, setEditModalShow] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<any>(50)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const dispatch = useDispatch()


    const getTransactions = async () => {
      const response = await api.get(user, `transaction?with[]=payee&with[]=account&with[]=transaction_type&with[]=transaction_status&page=${pageSelect}&per_page=${perPage}`)
      setTransactions(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page)
     }

     const setEdit = (transaction:any) => { 
      setTransaction(transaction)
      setEditModalShow(true)
      return ( 
        setTransaction(transaction),
        setEditModalShow(true)
      )    
    }

    const setCreate = () => { 
      setCreateModalShow(true)  
    }

    const closing = () => {
      setEditModalShow(false)
      setFilterModalShow(false)
      setTransaction(null)
    }

    const handleCheckChange = (e:any, transaction:any) => {
      if (e.target.checked === true) {
       deleteAll.push(transaction.uuid)
       setRender(render + 1)
       console.log(deleteAll.length)
      } else if (e.target.checked === false) {
        deleteAll.splice(deleteAll.indexOf(transaction.uuid), 1)
        setRender(render + 1)
        console.log(deleteAll.length)
      }
    }


    const deleteChecked = async () => {
      try {const response = await api.deleteAll(user, 'transaction', deleteAll)
      getTransactions()
      setDeleteAll([])
      dispatch(
        setSnackbar(
          true,
          "success",
          response.message.messages[0]
        )
      )  
    } catch (error:any) {
      dispatch(
        setSnackbar(
          true,
          "error",
          error.response.data.message.messages
        )
      )
      }
    }

  const deleteTransaction = async (transaction:any) => {
    const response = await api.delete(user, `transaction/${transaction.uuid}`, transaction)
    getTransactions()
  }

    useEffect( () => {
       getTransactions()
    }, [perPage, createModalShow, pageSelect, editModalShow, deleteAll])


      const handlePageClick = (event:any, value:number) => {
        setPageSelected(value)
        window.scrollTo(0,0)
      }
    return (
        <>
        <div className='main'>
        <div className='header'>
          <span className='header-text'>Transactions</span>
           { (deleteAll.length > 0) ? (<IconButton  onClick={() => deleteChecked()}><DeleteIcon color='secondary'/></IconButton>) : <></>} 
          <div className='header-button'>
            <IconButton onClick={() => setFilterModalShow(true)} > 
          <Tooltip title='Filter' TransitionComponent={Zoom} placement="bottom">
            <FilterListIcon sx={{color:'white'}}/> 
          </Tooltip>
            </IconButton> 
            <IconButton onClick={() => setCreate()} > 
            <Tooltip title='Create Transaction' TransitionComponent={Zoom} placement='bottom' >
              <AddCircleRoundedIcon sx={{color:'white'}}/> 
            </Tooltip>
        </IconButton>
            </div>
        </div>

        <div className='table'>
        <Table striped bordered hover >
        <thead >
          <tr>
            <th>
              {/* <Button onClick={() => deleteChecked()} disabled={boxesChecked()}>Delete Selected</Button> */}
            </th>
            <th>Date</th>
            <th>Amount</th>
            <th>Payee</th>
            <th>Account</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
    {    transactions?.map((transaction:any) => (
                   <>
                  <tr key={transaction.uuid}>
                    <td>
                          <input type='checkbox' onClick={(e) => handleCheckChange(e, transaction)}></input>
                    </td>
                    <td>
                          {transaction.transaction_date}
                    </td>
                    <td>{transaction?.amount}</td>
                    <td>{
                    transaction?.payee?.name}</td>
                    <td>{transaction?.account?.name}</td>
                    <td>{
                    transaction?.transaction_type?.display_name}</td>
                    <td>{transaction?.transaction_status?.display_name}</td>
                    <td>
                        <IconButton onClick={() => setEdit(transaction)} size="small"><EditIcon/></IconButton>
                        <IconButton onClick = {() => deleteTransaction(transaction)} size="small"><DeleteIcon /></IconButton>
                    </td>
                  </tr> 
                    </>
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

      
     
      <CreateTransactionModal
                user={user}
                transaction={transaction}
                show={createModalShow}
                handleClose={() => setCreateModalShow(false)}
            />

{ transaction &&
            <EditTransactionModal
                user={user}
                transaction={transaction}
                closing={closing}
                show={editModalShow}
                handleClose={() => closing()}
            />
          }
          <FilterTransactionModal 
          user={user}
          show={filterModalShow}
          closing={closing}
          setTransactions={setTransactions}
          handleClose={() => closing()}
          />
      </>  
    )
    
}



export default IndexTransactions