import { useState, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react'
import { Link } from 'react-router-dom'
import { getAllPayees, updatePayee, getPayee } from '../../api/payee'
import messages from '../shared/AutoDismissAlert/messages'
import Table from 'react-bootstrap/Table'
import {Button} from 'react-bootstrap'
import { string } from '../../assets/plugins/clipboard/dist/clipboard'
//card container style
let set = false

interface componentInterface {
  user: any,
  payees: [{
    data: {
      results: [{
        uuid: string,
        name: string,
       }
      ]
    }
  }],
  payee: {
    name: string,
    uuid: string
  }
}


const IndexPayees: React.FC<componentInterface> = (props) => {
    const [payees, setPayees] = useState(null)
    const [error, setError] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [id, setId] = useState(null)

    const { user } = props
    // console.log('this is user index', user)

    //console.log('Props in BidIndex', props)

    useEffect( () => {
       const  data: any = getAllPayees(user)
        setPayees(data)
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
            {/* {console.log('payees', payees)} */}
    {   payees?.data.data.results.map((payee: { uuid: any; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined }, index: any) => (
                   
                   <tr>
                   <Link to={`/payees/${payee.uuid}`}> 
                        <td>{payee.name}</td>
                   </Link>
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