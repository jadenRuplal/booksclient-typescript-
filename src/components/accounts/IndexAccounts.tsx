import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import {Button, Col, Container, Row, Form} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import React from 'react'
import ReactPaginate from 'react-paginate'
import CreateAccountModal from './CreateAccountModal'
import EditAccountModal from './EditAccountModal'
import Select from 'react-select'

interface componentInterface {
 accounts: {
  name: string,
  uuid: string,
  last4: number
 } | null | any,
 account: {
  name: string,
  uuid: string,
  last4: number
 }
}


const IndexAccounts: React.FC<componentInterface> = (props) => {
    const [accounts, setAccounts] = useState<componentInterface["accounts"]>(null)
    const [error, setError] = useState(false)
    const [account, setAccount] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [id, setId] = useState(null)
    const [typeSelected, setTypeSelected] = useState('')
    const [createModalShow, setCreateModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [pageSelect, setPageSelected] = useState(1)
    const [page, setPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<any>(50)
    const [search, setSearch ] = useState<any>('')
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const accountOptions = result.option.value[0].options.data.account_type
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
      
      function handleSelect(data:any) {
        setTypeSelected(data.value)
      }

      const handleChange = (e:any) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e: {
     preventDefault: () => any }) => {
        e.preventDefault()
           getAccounts()
    }
    const closing = () => {
      setEditModalShow(false)
      setAccount(null)
    }

    const setEdit = (acc:any) => { 
      setAccount(acc)
      setEditModalShow(true)
    } 

    useEffect( () => {
       getAccounts()
    }, [perPage, createModalShow, pageSelect])

    if (error) {
        return <p>Error!</p>
    }

      const handlePageClick = (event:any) => {
        const pageSelected = event.selected + 1
        setPageSelected(pageSelected)
      }

    return (
        <>

<div style={{backgroundColor:'grey', borderRadius:'15px', marginBottom:'10px'}}>
        <Container className="justify-content-center" >
            <h3 style={{textAlign:"center"}}>Filters</h3>
            
                <Form onSubmit={handleSubmit} style={{marginBottom:'5%'}}>
                  <Row>
                    <Col>
                      <Form.Control
                          placeholder="Search Names"
                          name="name"
                          id="name"
                          value={search}
                          onChange={handleChange}
                      />
                      </Col>
                      <Col>
                      <Select  options={optionType()}
                          onChange={handleSelect}
                          placeholder='Select Type'
                          
                      />
                      </Col>
                      <Col><Button type="submit" variant='primary'>Submit</Button></Col>
                      <Col><Button onClick={() => setCreateModalShow(true)}
                                    className="m-2"
                                    variant="primary">Create Account</Button></Col>
                  </Row>
                </Form>
                
        </Container>
        </div>
        <Table striped bordered hover >
        <thead>
          <tr>
            <th>Name</th>
            <th>Last4</th>
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
    {    accounts?.map((account:any) => (
                   
                   <tr>
                    <td onClick={() => setEdit(account)}> 
                        {account.name}
                   </td>
                   <td>{account.last4}</td>
                   <td>{account.account_type.display_name}</td>
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
        containerClassName={'pagination'}
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