import { useState, useEffect } from 'react'
import {  Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import '../css/pagination.css'
import '../css/table.css'
import CreateCategoryModal from './CreateCategoryModal'
import React from 'react'
import EditCategoryModal from './EditCategoryModal'
import Select from 'react-select'
import {Button} from '@material-ui/core'
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
    const [filterModalShow, setFilterModalShow] = useState(false)
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

    const setCreate = () => { 
      setCreateModalShow(true)  
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

    const handlePageClick = (event:any, value:number) => {
      setPageSelected(value)
    }
      

    useEffect( () => {
       getCategories()
    }, [perPage, createModalShow, pageSelect, editModalShow])

    if (error) {
        return <p>Error!</p>
    }

  
    return (
        <>
        <div className='main'>
       
        <div className='header'>
          <span className='header-text'>Categories</span>
          <div className='header-button'><IconButton onClick={() => setFilterModalShow(true)} > 
          <Tooltip title='Filter' TransitionComponent={Zoom} placement="bottom">
            <FilterListIcon sx={{color:'white'}}/> 
          </Tooltip>
            </IconButton> 
            <IconButton onClick={() => setCreate()} > 
            <Tooltip title='Create Category' TransitionComponent={Zoom} placement='bottom' >
              <AddCircleRoundedIcon sx={{color:'white'}}/> 
            </Tooltip>
        </IconButton>
        </div>
        </div>

        <div className='table'>
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