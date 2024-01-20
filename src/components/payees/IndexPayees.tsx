import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import '../css/pagination.css'
import '../css/transaction.css'
import EditPayeeModal from './EditPayeeModal'
import CreatePayeeModal from './CreatePayeeModal'
import { useDispatch } from "react-redux"
import { setSnackbar } from "../../features/snackSlice"
import FilterListIcon from '@mui/icons-material/FilterList'
import IconButton from '@mui/material/IconButton'
import { Tooltip, Zoom } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Pagination from '@mui/material/Pagination'
import FilterPayeeModal from './FilterPayeeModal'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {Button} from '@material-ui/core'


interface componentInterface {
  payees: [{
        uuid: string,
        name: string
  }] | any,
  payee: {
    name: string,
    uuid: string
  }
}


const IndexPayees: React.FC<componentInterface> = (props) => {
    const [payees, setPayees] = useState<componentInterface["payees"]>(null)
    const [payee, setPayee] = useState<any>(null)
    const [render, setRender] = useState<number>(0)
    const [message, setMessage] = useState<any>(null)
    const [search, setSearch ] = useState<any>('')
    const [editModalShow, setEditModalShow] = useState(false)
    const [filterModalShow, setFilterModalShow] = useState(false)
    const [error, setError] = useState(false)
    const [createModalShow, setCreateModalShow] = useState(false)
    const [pageSelect, setPageSelected] = useState(1)
    const [updated, setUpdated] = useState(false)
    const [page, setPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<any>(50)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const open = result?.sideBar.open
    const dispatch = useDispatch()

    const getPayees = async () => {
      const response = await api.get(user, `payee?filters[search]=${search}&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}`)
      setPayees(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page) 
      setMessage(response.message)  
     }

     const deletePayee = async (payee:any) => {
      const response = await api.delete(user, `payee/${payee.uuid}`, payee)
      getPayees()
    }

const setEdit = (pay:any) => { 
  setPayee(pay)
  setEditModalShow(true)
  return ( 
    setPayee(pay),
    setEditModalShow(true)
  )    
}

const setCreate = () => { 
  setCreateModalShow(true)  
}

const checkOpen = (name:string) => {
  if (open === true) {
    return name
  } else if (open === false) {
    return(name + '-collapsed')
  }
}


const closing = () => {
  setEditModalShow(false)
  setFilterModalShow(false)
  setPayee('')
}

      const handleChange = (e:any) => {
        setSearch(e.target.value)
    }


    const handleSubmit = (e: {
     preventDefault: () => any }) => {
        e.preventDefault()
           getPayees()
    }

    


    useEffect( () => {
       getPayees()
    }, [perPage, createModalShow, pageSelect, pageSelect, editModalShow])

    if (error) {
        return <p>Error!</p>
    }

    const handlePageClick = (event:any, value:number) => {
      setPageSelected(value)
    }
    
    return (
      <>
      <div className='main'>
      <div className='header'>
        <span className='header-text'>Payees</span>
        <div className='header-button'>
        <IconButton color='inherit' onClick={() => setFilterModalShow(true)} > 
          <Tooltip title='Filter' TransitionComponent={Zoom} placement="bottom">
            <FilterListIcon/> 
          </Tooltip>
        </IconButton> 

      <IconButton  onClick={() => setCreate()}> 
       <Tooltip title='Add Payee' TransitionComponent={Zoom} placement='bottom'> 
       <PersonAddIcon sx={{color:'white'}} />
        </Tooltip>
      </IconButton>
    
    </div>
      </div>

      <div className='table'>
      <Table striped bordered hover >
      <thead >
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  {    payees?.map((payee:any) => (
                 
                 <tr key={payee.uuid}>
                  <td>{payee.name}</td>
                 <td>
                    <IconButton onClick={() => setEdit(payee)}><EditIcon/></IconButton>
                    <IconButton onClick = {() => deletePayee(payee)}><DeleteIcon/></IconButton>
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
   
    <CreatePayeeModal
              user={user}
              payee={payee}
              show={createModalShow}
              triggerRefresh={() => setUpdated(prev => !prev)}
              handleClose={() => setCreateModalShow(false)}
          />

{ payee &&
          <EditPayeeModal
              user={user}
              payee={payee}
              closing={closing}
              show={editModalShow}
              triggerRefresh={() => setUpdated(prev => !prev)}
              handleClose={() => closing()}
          />
        }
        <FilterPayeeModal 
        user={user}
        show={filterModalShow}
        handleSubmit={handleSubmit}
        closing={closing}
        setPayees={setPayees}
        handleClose={() => closing()}
        />
    </>  
    )
    
}



export default IndexPayees