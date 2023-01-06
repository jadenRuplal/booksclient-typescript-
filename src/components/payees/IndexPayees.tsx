import { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import {Button, Container, Form, Col, Row} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import ReactPaginate from 'react-paginate'
import './pagination.css'
import EditPayeeModal from './EditPayeeModal'
import CreatePayeeModal from './CreatePayeeModal'
import React from 'react'

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
    const [search, setSearch ] = useState<any>('')
    const [editModalShow, setEditModalShow] = useState(false)
    const [error, setError] = useState(false)
    const [createModalShow, setCreateModalShow] = useState(false)
    const [pageSelect, setPageSelected] = useState(1)
    const [updated, setUpdated] = useState(false)
    const [page, setPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<any>(50)
    const [id, setId] = useState(null)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const getPayees = async () => {
      const response = await api.get(user, `payee?filters[search]=${search}&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}`)
      setPayees(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page)
     }

const setEdit = (pay:any) => { 
  setPayee(pay)
  setEditModalShow(true)
  return ( 
    setPayee(pay),
    setEditModalShow(true)
  )    
}

const closing = () => {
  setEditModalShow(false)
  setPayee(null)
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
    }, [perPage, createModalShow, pageSelect, editModalShow])

    if (error) {
        return <p>Error!</p>
    }

      const handlePageClick = (event:any) => {
        const pageSelected = event.selected + 1
        setPageSelected(pageSelected)
       getPayees()
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
                          value={search.name}
                          onChange={handleChange}
                      />
                      </Col>
                      
                      <Col><Button type="submit" variant='primary'>Submit</Button></Col>
                      <Col><Button onClick={() => setCreateModalShow(true)}
                                    className="m-2"
                                    variant="primary">Create Payee</Button></Col>
                  </Row>
                </Form>
                
        </Container>
          
        </div>
        <Table striped bordered  >
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
    {    payees?.map((payee:any) => (
                   
                   <tr>
                    <td onClick={() => setEdit(payee)}>
                        {payee.name}
                   </td>
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
                show={editModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => closing()}
            />
          }
      </>  
    )
    
}



export default IndexPayees