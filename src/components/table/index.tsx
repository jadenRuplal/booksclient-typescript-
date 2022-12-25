import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import api from '../../api/payee'

// hooks
import { usePageTitle } from '../../hooks';

// component
import Table from './Table';

// //dummy data
// import { records as data, expandableRecords } from './data';

const columns = [
    {
        Header: 'Name',
        accessor: 'name',
        sort: true,
    },
];


const AdvancedTable = () => {
    const [payees, setPayees] = useState<any>(null)
    const [id, setId] = useState(null)
    const result:any = useSelector((state) => state);
      const user = result.user.value[0].user;
      console.log("user in index payee", user)
      const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
    ]
    // console.log('this is user index', user)

    //console.log('Props in BidIndex', props)

    useEffect( () => {
       const getPayees = async () => {
        const response = await api.get(user, 'payee?filters[search]=&orderby=name&sortby=asc')
        setPayees(response.data?.results)
       }
       getPayees()
    }, [])

    // set pagetitle
    usePageTitle({
        title: 'Advanced Tables',
        breadCrumbItems: [
            {
                path: '/tables/advanced',
                label: 'Tables',
            },
            {
                path: '/tables/advanced',
                label: 'Advanced Tables',
                active: true,
            },
        ],
    });

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Multiple Row Selection</h4>
                            <p className="text-muted font-14 mb-4">This table allowing selection of multiple rows</p>

                            <Table
                                columns={columns}
                                data={payees}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AdvancedTable;
// function useSelector(arg0: (state: any) => any): any {
//     throw new Error('Function not implemented.');
// }

