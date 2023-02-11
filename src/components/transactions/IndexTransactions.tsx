import { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { Container, Form, Col, Row} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import ReactPaginate from 'react-paginate'
import '../css/pagination.css'
import '../css/transaction.css'
import CreateMappingModal from './CreateMappingModal'
import React from 'react'
import EditMapModal from './EditMapModal'
import Button from '@mui/material-next/Button';
import { lightBlue } from '@mui/material/colors'




interface componentInterface {
  transactions: [{
        uuid: string,
        name: string
  }] | any,
  transaction: {
    name: string,
    uuid: string,
    payee: {
      name: string
    }
  } | null
}


const IndexTransactions: React.FC<componentInterface> = (props) => {
    const [transactions, setTransactions] = useState<componentInterface["transactions"]>(null)
    const [transaction, setTransaction] = useState(null)
    const [search, setSearch ] = useState<any>({
      date: '',
      payee: '',
      account: ''
  
  })
    const [error, setError] = useState(false)
    const [createModalShow, setCreateModalShow] = useState(false)
    const [pageSelect, setPageSelected] = useState(1)
    const [updated, setUpdated] = useState(false)
    const [page, setPage] = useState(3)
    const [editModalShow, setEditModalShow] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<any>(50)
    const [id, setId] = useState(null)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const open = result?.sideBar.open
    const getTransactions = async () => {
      const response = await api.get(user, `transaction?with[]=payee&with[]=account&with[]=transaction_type&with[]=transaction_status&page=${pageSelect}&per_page=${perPage}`)
      setTransactions(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page)
     }
 
     function handlePayeeSearch(e:any) {
      setSearch({...search, payee: e.target.value})
    }
    function handleAccountSearch(data:any) {
      setSearch({...search, account: data.value})
    }

     const setEdit = (transaction:any) => { 
      setTransaction(transaction)
      setEditModalShow(true)
      return ( 
        setTransaction(transaction),
        setEditModalShow(true)
      )    
    }
    const closing = () => {
      setEditModalShow(false)
      setTransaction(null)
    }

      const handleChange = (e:any) => {
        setSearch((prevCar: any) => {
          let updatedValue = e.target.value
          const updatedName = e.target.name

          if (e.target.type === 'number') {
              updatedValue = parseInt(e.target.value)
          }
          const updatedCar = {
              [updatedName]: updatedValue
          }
          console.log(search)
          return {
              ...prevCar,
              ...updatedCar
          }
      })
    }
    const handleSubmit = (e: {
     preventDefault: () => any }) => {
        e.preventDefault()
           getTransactions()
    }
       
    const checkOpen = (name:string) => {
      if (open === true) {
        return name
      } else if (open === false) {
        return(name + '-collapsed')
      }
    }

    useEffect( () => {
       getTransactions()
    }, [perPage, createModalShow, pageSelect, editModalShow])

    if (error) {
        return <p>Error!</p>
    }

      const handlePageClick = (event:any) => {
        const pageSelected = event.selected + 1
        setPageSelected(pageSelected)
      }
    return (
        <>
        <div className='header'>
          <span className='header-text'>Transactions</span> 
        <Button variant='outlined' className='header-button'>Add Transaction</Button> 
        </div>
        <div style={{backgroundColor:'grey', borderRadius:'15px', marginBottom:'10px'}}>
        <Container className="justify-content-center" >
            <h3 style={{textAlign:"center"}}>Filters</h3>
            
                <Form onSubmit={handleSubmit} style={{marginBottom:'5%'}}>
                  <Row>
                    <Col>
                      <Form.Control
                          type='date'
                          placeholder="Date"
                          name="date"
                          id="date"
                          onChange={handleChange}
                      />
                      </Col>
                      <Col>
                      <Form.Control
                          placeholder="Payee"
                          name="payee"
                          id="payee"
                          value={search.payee}
                          onChange={handlePayeeSearch}
                      />
                      </Col>
                      <Col>
                      <Form.Control
                          placeholder="Category"
                          name="category"
                          id="category"
                          value={search.account}
                          onChange={handleAccountSearch}
                      />
                      </Col>
                      
                      <Col><Button type="submit" variant='filled' >Submit</Button></Col>
                      {/* <Col><Button onClick={() => setCreateModalShow(true)}
                                    className="m-2"
                                    variant="primary">Create Map</Button></Col> */}
                  </Row>
                </Form>
                
        </Container>
          
        </div>
        <Table striped bordered hover >
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Payee</th>
            <th>Account</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
    {    transactions?.map((transaction:any) => (
                   
                   <tr key={transaction.uuid}>
                    <td onClick={() => setEdit(transaction)}>
                        {transaction.transaction_date}
                   </td>
                   <td>{transaction?.amount}</td>
                   <td>{
                   transaction?.payee?.name}</td>
                   <td>{transaction?.account?.name}</td>
                   <td>{
                   transaction?.transaction_type?.display_name}</td>
                    </tr> 
                )
            )
    }
        </tbody>
      </Table>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
      }}>


      <ReactPaginate
        activeClassName={'item active '}
        breakClassName={'item break-me '}
        containerClassName={checkOpen('pagination')}
        disabledClassName={'disabled-page'}
        breakLabel="..."
        nextClassName={"item next "}
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={page}
        previousLabel="< previous"
        pageClassName={'item pagination-page '}
        previousClassName={"item previous"}
      />
      </div>
      <label htmlFor="perPageSelect"></label>
      <select id="perPageSelect" onChange={e => setPerPage(e.target.value)}> 
        <option value="">Choose an option</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="23">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
     
      <CreateMappingModal
                user={user}
                transaction={transaction}
                show={createModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setCreateModalShow(false)}
            />

{ transaction &&
            <EditMapModal
                user={user}
                transaction={transaction}
                closing={closing}
                show={editModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => closing()}
            />
          }
      </>  
    )
    
}



export default IndexTransactions