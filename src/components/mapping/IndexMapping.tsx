import { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import {Button, Container, Form, Col, Row} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import ReactPaginate from 'react-paginate'
import './pagination.css'
import CreateMappingModal from './CreateMappingModal'
import React from 'react'

interface componentInterface {
  mapping: [{
        uuid: string,
        name: string
  }] | any,
  map: {
    name: string,
    uuid: string,
    payee: {
      name: string
    }
  }
}


const IndexMapping: React.FC<componentInterface> = (props) => {
    const [mapping, setMapping] = useState<componentInterface["mapping"]>(null)
    const [map, setMap] = useState(props.map)
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
    const getMapping = async () => {
      const response = await api.get(user, `mapping?with[]=payee&with[]=category&page=${pageSelect}&per_page=${perPage}`)
      setMapping(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page)
      console.log(mapping)
     }

const checkMapPayee = () => {
  if(map.payee.name === null) {
    return <td>No Payee</td>
  } else {
    return <td>{map?.payee.name}</td>
  }
}

      const handleChange = (e:any) => {
        setSearch(e.target.value)
    }
    const handleSubmit = (e: {
     preventDefault: () => any }) => {
        e.preventDefault()
           getMapping()
    }
       
      

    useEffect( () => {
       getMapping()
    }, [perPage, createModalShow, pageSelect])

    if (error) {
        return <p>Error!</p>
    }

      const handlePageClick = (event:any) => {
        const pageSelected = event.selected + 1
        setPageSelected(pageSelected)
       getMapping()
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
                          placeholder="Description"
                          name="name"
                          id="name"
                          value={search.name}
                          onChange={handleChange}
                      />
                      </Col>
                      
                      <Col><Button type="submit" variant='primary'>Submit</Button></Col>
                      <Col><Button onClick={() => setCreateModalShow(true)}
                                    className="m-2"
                                    variant="primary">Create Map</Button></Col>
                  </Row>
                </Form>
                
        </Container>
          
        </div>
        <Table striped bordered  >
        <thead>
          <tr>
            <th>Description</th>
            <th>Payee</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
    {    mapping?.map((map:any) => (
                   
                   <tr>
                    <td>
                   <Link to={`/payees/${map.uuid}`}> 
                        {map.description}
                   </Link>
                   </td>
                   <td>{map?.payee?.name}</td>
                   <td>{
                   map?.category?.name}</td>
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
     
      <CreateMappingModal
                user={user}
                map={map}
                show={createModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setCreateModalShow(false)}
            />
      </>  
    )
    
}



export default IndexMapping