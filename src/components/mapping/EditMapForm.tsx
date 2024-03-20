import  Select  from 'react-select'
import React, { useEffect, useState } from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import api, { deletePayee } from '../../api/payee'
import { useSelector } from 'react-redux'


interface componentInterface {
    map: {
        payee: any
        description: string | number 
        uuid: string,
        name: string
        category: {
            name: string
        }
    },
    handleChange: any,
    handleSubmit: any,
    handlePayeeSelect: any,
    handleCategorySelect: any,
    heading: string,
    mapUpdate: any,
    handleClose: any
}

const EditMapForm: React.FC<componentInterface> = (props) => {
    const { map, handleChange, handleClose, handleSubmit, heading, handlePayeeSelect, handleCategorySelect, mapUpdate } = props
    const [category, setCategory] = useState<any>(null)
    const [payees, setPayees] = useState<any>(null)
    const [keyDown, setKeyDown] = useState('')
    const [payeeSearch, setPayeeSearch] = useState<any>('')
    const [categorySearch, setCategorySearch] = useState('')
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    
  
    const getCategoryData = async () => {
        const response = await api.get(user, `category?filters[search]=${categorySearch}&&orderby=name&sortby=asc&page=&per_page=&with[]=category_type&with[]=parent_category`)
            setCategory(response.data?.results)
       }

    const getPayeeData = async () => {
        const response = await api.get(user, `payee?filters[search]=${payeeSearch}&orderby=name&sortby=asc`)
      setPayees(response.data?.results)
      console.log('worked')
     }



const payeeKeyDown = (e:any) => {
   return( 
    setPayeeSearch(e.target.value),
    setKeyDown('payee'))
   
}

const categoryKeyDown = (e:any) => {
    setCategorySearch(e.target.value)
    setKeyDown('category') 
}

    const payeeOptionType = () => {
        return( payees?.map((option:any) => (
           {value:`${option.uuid}`, label: `${option.name}`}
        )
    ))
        }
        
    const categoryOptionType = () => {
            return( category?.map((option:any) => (
               {value:`${option.uuid}`, label: `${option.name}`}
            )
        ))
            }

    const deleteTheMap = () => {
            deletePayee(user, `mapping/${map?.uuid}`)
             handleClose()
            }

        useEffect( () => {
           const delayDebounceFn = setTimeout(()=> {
            
            if (keyDown === 'payee') {
            if (payeeSearch !== '') {
            getPayeeData()
            } else if (payeeSearch === '') {
                setPayees(null)
            }
        }

        if(keyDown === 'category') {
            if (categorySearch != '') {
                getCategoryData()
            } else if (categorySearch === '') {
                setCategory(null)
            }
        }

           }, 1500)

           return () => clearTimeout(delayDebounceFn)
         }, [payeeSearch, categorySearch])

     

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    placeholder="Change Description Here"
                    name="description"
                    id="name"
                    defaultValue={map?.description}
                    value={mapUpdate?.name}
                    onChange={handleChange}
                />
                <Form.Label htmlFor="payee">Payee</Form.Label>
                 <Select  options={payeeOptionType()}
                          onChange={handlePayeeSelect}
                          defaultInputValue={map?.payee?.name}
                          value={mapUpdate.payee}
                          name='payee'
                          id='payee'
                          onKeyDown={(e:any) => payeeKeyDown(e)}
                          
                      />
                <Form.Label htmlFor="category">Category</Form.Label>
                <Select  options={categoryOptionType()}
                          onChange={handleCategorySelect}
                          defaultInputValue={map?.category?.name}
                          placeholder='Select Category'
                          onKeyDown={(e:any) => categoryKeyDown(e)}
                          
                      />
                <Button type="submit">Submit</Button>
                <Button onClick={() => deleteTheMap()}
                        className="m-2"
                        variant="warning">Delete Map
                </Button>
            </Form>
        </Container>
    )
}

export default EditMapForm