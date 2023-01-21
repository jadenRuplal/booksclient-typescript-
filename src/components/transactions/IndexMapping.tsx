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
import EditMapModal from './EditMapModal'

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
  } | null
}


const IndexMapping: React.FC<componentInterface> = (props) => {
    const [mapping, setMapping] = useState<componentInterface["mapping"]>(null)
    const [map, setMap] = useState(null)
    const [search, setSearch ] = useState<any>({
      description: '',
      payee: '',
      category: ''
  
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
    const getMapping = async () => {
      const response = await api.get(user, `mapping?filters[description]=${search.description}&filters[payee.name]=${search.payee}&filters[category.name]=${search.category}&with[]=payee&with[]=category&page=${pageSelect}&per_page=${perPage}`)
      setMapping(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page)
     }
 
     function handlePayeeSearch(e:any) {
      setSearch({...search, payee: e.target.value})
    }
    function handleCategorySearch(e:any) {
      setSearch({...search, category: e.target.value})
    }

     const setEdit = (map:any) => { 
      setMap(map)
      setEditModalShow(true)
      return ( 
        setMap(map),
        setEditModalShow(true)
      )    
    }
    const closing = () => {
      setEditModalShow(false)
      setMap(null)
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
          return {
              ...prevCar,
              ...updatedCar
          }
      })
    }
    const handleSubmit = (e: {
     preventDefault: () => any }) => {
        e.preventDefault()
           getMapping()
    }
       
      

    useEffect( () => {
       getMapping()
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
        <div style={{backgroundColor:'grey', borderRadius:'15px', marginBottom:'10px'}}>
        <Container className="justify-content-center" >
            <h3 style={{textAlign:"center"}}>Filters</h3>
            
                <Form onSubmit={handleSubmit} style={{marginBottom:'5%'}}>
                  <Row>
                    <Col>
                      <Form.Control
                          placeholder="Description"
                          name="description"
                          id="description"
                          value={search.description}
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
                          onChange={handleCategorySearch}
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
                   
                   <tr key={map.uuid}>
                    <td onClick={() => setEdit(map)}>
                        {map.description}
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

{ map &&
            <EditMapModal
                user={user}
                map={map}
                closing={closing}
                show={editModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => closing()}
            />
          }
      </>  
    )
    
}



export default IndexMapping