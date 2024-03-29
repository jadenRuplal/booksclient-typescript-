import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux'
import api from '../../api/payee'
import '../css/pagination.css'
import '../css/transaction.css'
import CreateMappingModal from './CreateMappingModal'
import FilterMappingModal from './FilterMappingModal'
import React from 'react'
import EditMapModal from './EditMapModal'
import IconButton from '@mui/material/IconButton'
import { Tooltip, Zoom } from "@mui/material"
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import MapIcon from '@mui/icons-material/Map'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Pagination from '@mui/material/Pagination'

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


const IndexMapping: React.FC<componentInterface> = () => {
    const [mapping, setMapping] = useState<componentInterface["mapping"]>(null)
    const [mapFilter, setMapFilter] = useState<any>({
      description: '',
      payee: '',
      category: ''
    })
    const [map, setMap] = useState(null)
    const [createModalShow, setCreateModalShow] = useState(false)
    const [pageSelect, setPageSelected] = useState(1)
    const [page, setPage] = useState(3)
    const [editModalShow, setEditModalShow] = useState(false)
    const [filterModalShow, setFilterModalShow] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState<any>(50)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user


    const getMapping = async () => {
      const response = await api.get(user, `mapping?filters[description]=${mapFilter.description}&filters[payee.name]=${mapFilter.payee}&filters[category.name]=${mapFilter.category}&with[]=payee&with[]=category&page=${pageSelect}&per_page=${perPage}`)
      setMapping(response.data?.results)
      setPage(response.data.last_page)
      setCurrentPage(response.data.current_page)
     }

     const deleteMap = async (map:any) => {
      const response = await api.delete(user, `mapping/${map.uuid}`, map)
      getMapping()
    }
 

     const setEdit = (map:any) => { 
      setMap(map)
      setEditModalShow(true)   
    }

    const setCreate = () => { 
      setCreateModalShow(true)  
    }

    const closing = () => {
      setEditModalShow(false)
      setMap(null)
    }



    const handlePageClick = (event:any, value:number) => {
      setPageSelected(value)
      window.scrollTo(0,0)
    }

    useEffect( () => {
       getMapping()
    }, [perPage, createModalShow, pageSelect, editModalShow])

   
    return (
        <>
        <div className='main'>
           <div className='header'>
          <span className='header-text'>Mapping</span> 
          <div className='header-button'>
            <IconButton onClick={() => setFilterModalShow(true)} > 
          <Tooltip title='Filter' TransitionComponent={Zoom} placement="bottom">
            <FilterListIcon sx={{color:'white'}}/> 
          </Tooltip>
            </IconButton>
            <Tooltip title='Add Map' TransitionComponent={Zoom} placement="bottom">
        <IconButton onClick={() => setCreate()}><AddIcon sx={{ color: 'white' }}/> <MapIcon sx={{color:'white'}}/> </IconButton> 
        </Tooltip>
       </div>
        </div>

      <div className='table'>
        <Table striped bordered  >
        <thead>
          <tr>
            <th>Description</th>
            <th>Payee</th>
            <th>Category</th>
            <th>Actions</th>
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
                    <td>
                        <IconButton onClick={() => setEdit(map)} size="small"><EditIcon/></IconButton>
                        <IconButton onClick = {() => deleteMap(map)} size="small"><DeleteIcon /></IconButton>
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
     

      <FilterMappingModal
                user={user}
                mapFilter={mapFilter}
                setMapFilter={setMapFilter}
                closing={closing}
                show={filterModalShow}
                handleClose={() => setFilterModalShow(false)}
            />

      <CreateMappingModal
                user={user}
                map={map}
                show={createModalShow}
                handleClose={() => setCreateModalShow(false)}
            />

{ map &&
            <EditMapModal
                user={user}
                map={map}
                closing={closing}
                show={editModalShow}
                handleClose={() => closing()}
            />
          }
      </>  
    )
    
}



export default IndexMapping