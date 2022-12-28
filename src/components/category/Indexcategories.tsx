import { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import {Button, Container, Form, Col, Row} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import ReactPaginate from 'react-paginate'
import './pagination.css'
import CreateCategoryModal from './CreateCategoryModal'
import React from 'react'

interface componentInterface {
  categories: [{
        uuid: string,
        name: string
  }] | any,
  category: {
    name: string,
    uuid: string
  }
}


const IndexCategories: React.FC<componentInterface> = (props) => {
    const [categories, setCategories] = useState<componentInterface["categories"]>(null)
    const [category, setCategory] = useState({
      name: '',
      uuid: ''
   })
    const [search, setSearch ] = useState<any>("")
    const [type, setType] = useState('')
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
    const handleChange = (e:any) => {
      setSearch(e.target.value)
    }
    const handleSubmit = (e: {
     preventDefault: () => any }) => {
        e.preventDefault()
        const getCategories = async () => {
            const response = await api.get(user, `category?filters[search]=${search}&filters[category_type.name]=${type}&orderby=name&sortby=asc&with[]=category_type&with[]=parent_category`)
            setCategories(response.data?.results)
           }
           getCategories()
    }
       
      

    useEffect( () => {
       const getCategories = async () => {
        const response = await api.get(user, `category?filters[search]=&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}&with[]=category_type&with[]=parent_category`)
        setCategories(response.data?.results)
        setPage(response.data.last_page)
        setCurrentPage(response.data.current_page)
       }
       getCategories()
    }, [perPage, createModalShow, pageSelect])

    if (error) {
        return <p>Error!</p>
    }

      const handlePageClick = (event:any) => {
        const pageSelected = event.selected + 1
        setPageSelected(pageSelected)
        const getCategories = async () => {
        const response = await api.get(user, `category?filters[search]=&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}&with[]=category_type&with[]=parent_category`)
        setCategories(response.data?.results)
        setPage(response.data.last_page)
        setCurrentPage(response.data.current_page)
       }
       getCategories()
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
                          id="name"
                          value={search}
                          onChange={handleChange}
                      />
                      </Col>
                      <Col>
                      <select className="form-control" id="exampleFormControlSelect1" onChange={e => setType(e.target.value)}>
                        <option value="">Select a Type</option>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
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
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
    {    categories?.map((category:any) => (
                   
                   <tr>
                    <td>
                   <Link to={`/categories/${category.uuid}`}> 
                        {category.name}
                   </Link>
                   </td>
                   <td>
                    {category.category_type.display_name}
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
     
      <CreateCategoryModal
                user={user}
                category={category}
                show={createModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setCreateModalShow(false)}
            />
      </>  
    )
    
}



export default IndexCategories