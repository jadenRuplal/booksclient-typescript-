import React, { useEffect, useState } from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import api from '../../api/payee'


interface componentInterface {
    handleChange: any,
    handleSubmit: any,
    handleCategorySelect: any,
    handlePayeeSelect: any,
    heading: string,
    mapCreate: string
    
}



const CreateMapForm: React.FC<componentInterface> = (props) => {
    const { handleChange, handleSubmit, heading, handleCategorySelect, handlePayeeSelect } = props
    const [categorySearch, setCategorySearch] = useState('')
    const [category, setCategory] = useState<any>(null)
    const [payees, setPayees] = useState<any>(null)
    const [keyDown, setKeyDown] = useState('')
    const [payeeSearch, setPayeeSearch] = useState<any>('')
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user

    const getCategoryData = async () => {
        const response = await api.get(user, `category?filters[search]=${categorySearch}&&orderby=name&sortby=asc&page=&per_page=&with[]=category_type&with[]=parent_category`)
            setCategory(response.data?.results)
       }

    const getPayeeData = async () => {
        const response = await api.get(user, `payee?filters[search]=${payeeSearch}&orderby=name&sortby=asc`)
      setPayees(response.data?.results)
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
                    placeholder="Description"
                    name="description"
                    id="description"
                    onChange={handleChange}
                />
                <Form.Label htmlFor="payee">Payee</Form.Label>
                 <Select  options={payeeOptionType()}
                          onChange={handlePayeeSelect}
                          name='payee'
                          id='payee'
                          onKeyDown={(e:any) => payeeKeyDown(e)}
                          
                      />
                <Form.Label htmlFor="category">Category</Form.Label>
                <Select  options={categoryOptionType()}
                          onChange={handleCategorySelect}
                          placeholder='Select Category'
                          onKeyDown={(e:any) => categoryKeyDown(e)}
                          
                      />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CreateMapForm