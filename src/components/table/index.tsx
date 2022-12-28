import  { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import api from '../../api/payee'
import { usePageTitle } from '../../hooks';
import Table from './Table';

const columns = [
    {
        Header: 'Name',
        accessor: 'name',
        sort: true,
    },
];


const AdvancedTable = () => {
    const [payees, setPayees] = useState<any>(null)
    const result:any = useSelector((state) => state);
      const user = result.user.value[0].user;
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

    useEffect( () => {
       const getPayees = async () => {
        const response = await api.get(user, 'payee?filters[search]=&orderby=name&sortby=asc')
        setPayees(response.data?.results)
       }
       getPayees()
    }, [])

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