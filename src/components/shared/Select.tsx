import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import api from '../../api/payee'

interface componentInterface {

  }

const SharedSelect: React.FC<componentInterface> = (props:any) => {
    const {
        handleSelect
    } = props


    useEffect( () => {
        const delayDebounceFn = setTimeout(()=> {
         
       

        }, 1500)

        return () => clearTimeout(delayDebounceFn)
      }, [])


    return(
        <>
        <Form.Label htmlFor="status">Status</Form.Label>
                <Select  
                          onChange={handleSelect}
                          name='transaction_status'
                          placeholder='Select Status'
                         
                          
                      />
         </>
    )
}


export default SharedSelect




