import { useState, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react'
import {  Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import Table from 'react-bootstrap/Table'
import {Button, Container, Form, Col, Row} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import ReactPaginate from 'react-paginate'
import './pagination.css'
import CreatePayeeModal from './CreatePayeeModal'

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
    const [payee, setPayee] = useState({
      name: '',
      uuid: ''
   })
    const [search, setSearch ] = useState<any>('')
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
      const handleChange = (e: { target: { value: string; name: any; type: string } }) => {
        setSearch((prevPayee: any) => {
            let updatedValue:any = e.target.value
            const updatedName = e.target.name

            // console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            const updatedPayee = {
                [updatedName]: updatedValue
            }
            return {
                ...prevPayee,
                ...updatedPayee
            }
        })
    }
    const handleSubmit = (e: {
     preventDefault: () => any }) => {
        e.preventDefault()
        console.log("this is user in Search", search.name)
        const getPayees = async () => {
            const response = await api.get(user, `payee?filters[search]=${search.name}&orderby=name&sortby=asc`)
            setPayees(response.data?.results)
           }
           getPayees()
           console.log(payees)
    }
       
      

    useEffect( () => {
       const getPayees = async () => {
        const response = await api.get(user, `payee?filters[search]=&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}`)
        setPayees(response.data?.results)
        setPage(response.data.last_page)
        setCurrentPage(response.data.current_page)
       }
       getPayees()
    }, [perPage, createModalShow, pageSelect])

    if (error) {
        return <p>Error!</p>
    }

      const handlePageClick = (event:any) => {
        const pageSelected = event.selected + 1
        setPageSelected(pageSelected)
        console.log(pageSelected)
        const getPayees = async () => {
        const response = await api.get(user, `payee?filters[search]=&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}`)
        setPayees(response.data?.results)
        setPage(response.data.last_page)
        setCurrentPage(response.data.current_page)
       }
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
                          placeholder="Search Names Shere"
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
                    <td>
                   <Link to={`/payees/${payee.uuid}`}> 
                        {payee.name}
                   </Link>
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
      </>  
    )
    
}



export default IndexPayees