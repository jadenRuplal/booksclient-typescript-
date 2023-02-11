import { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import {Button, Container, Form, Col, Row} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import ReactPaginate from 'react-paginate'
import '../css/pagination.css'
import '../css/table.css'
import CreateCategoryModal from './CreateCategoryModal'
import React from 'react'
import EditCategoryModal from './EditCategoryModal'
import Select from 'react-select'

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
    const [category, setCategory] = useState(null)
    const [createCategory, setCreateCategory] = useState({
      name: '',
      type: ''
    })
    const [search, setSearch ] = useState<any>("")
    const [type, setType] = useState('')
    const [error, setError] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [createModalShow, setCreateModalShow] = useState(false)
    const [pageSelect, setPageSelected] = useState(1)
    const [updated, setUpdated] = useState(false)
    const [page, setPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<any>(50)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const categoryOptions = result.option.value[0].options.data.category_type
    const open = result?.sideBar.open
    const getCategories = async () => {
      const response = await api.get(user, `category?filters[search]=${search}&filters[category_type.name]=${type}&orderby=name&sortby=asc&page=${pageSelect}&per_page=${perPage}&with[]=category_type&with[]=parent_category`)
      setCategories(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page)
     }

     const optionType = () => {
      return(
        categoryOptions?.map((option:any) => (
         {value:`${option.name}`, label: `${option.display_name}`}
          )
        )
        )
  }

     const closing = () => {
      setEditModalShow(false)
      setCategory(null)
    }

    const setEdit = (cat:any) => { 
      setCategory(cat)
      setEditModalShow(true)
      return   ( 
        setCategory(cat),
        setEditModalShow(true)) 
    } 

    const handleChange = (e:any) => {
      setSearch(e.target.value)
    }
    const handleSubmit = (e: {
     preventDefault: () => any }) => {
        e.preventDefault()
           getCategories()
    }
    
    function handleSelect(data:any) {
      setType(data.value)
    }

    const checkOpen = (name:string) => {
      if (open === true) {
        return name
      } else if (open === false) {
        return(name + '-collapsed')
      }
    }
      

    useEffect( () => {
       getCategories()
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
                          placeholder="Search Names"
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
                                    variant="primary">Create Category</Button></Col>
                  </Row>
                </Form>
                
        </Container>
          
        </div>
        <Table hover bordered  >
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody >
    {    categories?.map((category:any) => (
                   
                   <tr key={category.uuid}>
                    <td onClick={() => setEdit(category)}>
                        {category.name}
                   </td>
                   <td style={{color:typeColor(category)}}>
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
     
      <CreateCategoryModal
                user={user}
                createCategory={createCategory}
                show={createModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setCreateModalShow(false)}
            />

      { category &&
            <EditCategoryModal
                user={user}
                category={category}
                show={editModalShow}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => closing()}
            />
          }
      </>  
    )
    
}

const typeColor = (category:any) => {
  if (category.category_type.name === 'expense') {
    return "red"
  } else if (category.category_type.name === 'income') {
    return "green"
  }

}


export default IndexCategories