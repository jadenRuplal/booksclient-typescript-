import { useState, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import Table from 'react-bootstrap/Table'
import {Button} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import api from '../../api/payee'


interface componentInterface {
  user: any,
  payees: [{
        uuid: string,
        name: string
  }] | null,
  payee: {
    name: string,
    uuid: string
  }
}


const IndexPayees: React.FC<componentInterface> = (props) => {
    const [payees, setPayees] = useState<componentInterface["payees"]>(null)
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [id, setId] = useState(null)
    const result:any = useSelector((state) => state);
      const user = result.user.value[0].user;
      console.log("user in index payee", user)

    // console.log('this is user index', user)

    //console.log('Props in BidIndex', props)

    useEffect( () => {
       const getPayees = async () => {
        const response = await api.get(user, 'payee?filters[search]=&orderby=name&sortby=asc')
        setPayees(response.data?.results)
       }
       getPayees()
    }, [])

    if (error) {
        return <p>Error!</p>
    }


    // const columns = [{  
    //     Header: 'Name',  
    //     accessor: 'name'  
    //    }]


// async function testing() {
//     if(set = true) {
//     return people
//     }
// }
// const people =  payees.data.data.results.map((payee, index) => (
   
//    <tr>
//         <td>#</td>
//         <td>{payee.name}</td>
//     </tr>

// )) 

    return (
        <>
        <Table striped bordered hover >
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
    {    payees?.map((payee) => (
                   
                   <tr>
                    <td>
                   <Link to={`/payees/${payee.uuid}`}> 
                        {payee.name}
                   </Link>
                   </td>
                    </tr> 
                    
                )
            )
         
        
    }
        </tbody>
      </Table>
      </>  
    )
    
}



export default IndexPayees