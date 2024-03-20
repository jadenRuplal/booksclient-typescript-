import React, { useState } from 'react'
import {
    Form,
    Button,
    Container
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Select from 'react-select'


interface componentInterface {
    handleSubmit: any,
    heading: string,
    mapFilter: {
        description: string,
        payee: {
            name: string
        },
        category: {
            name: string
        }
    },
    payees: [{
        uuid: string,
        name: string
  }] | null,
    handleMapUpdate: (e:{target:{value:string}}, name:string) => any
    
}


const FilterMappingForm: React.FC<componentInterface> = (props) => {
    const { handleSubmit, heading, mapFilter, handleMapUpdate } = props
    const [payees, setPayees] = useState<componentInterface["payees"]>(null)
    const result:any = useSelector((state) => state)
    const user = result.user.value[0].user
    const [payeeSearch, setPayeeSearch] = useState<string>('')



    const optionReturn = (object:any) => {
        return( object?.map((option:any) => (
           {value:`${option.uuid}`, label: `${option.name}`}
        )
    ))
        }


    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    placeholder="Enter Name"
                    value={mapFilter.description}
                    onChange={(e:{target:{value:any}}) => handleMapUpdate(e.target.value, 'description')}
                />
            <Form.Label>Payee</Form.Label>
                <Select  options={optionReturn(payees)}
                          onChange={(e:any)=> handleMapUpdate(e, 'payee')}
                          placeholder="Select Payee"
                          name='payee'
                          id='payee'
                          onKeyDown={(e:any)=> setPayeeSearch(e.target.value)}
                       
                          
                />
            <Form.Label>Category</Form.Label>
                
                
                <Button type="submit">Submit</Button>
            </Form>
            
        </Container>
    )
}

export default FilterMappingForm