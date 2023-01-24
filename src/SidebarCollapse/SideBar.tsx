import React, {useState} from "react"
import { Nav } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import './SideBar.css'
import { Navigate } from "react-router-dom"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'


const SideBar = () => {
const [isOpen, setIsOpen] = useState<boolean>(false)
const navigate = useNavigate()
    
    return(
        <div className="sidebar">
            <div className="sidebar-header">
                <div onClick={() => navigate('/')}>
                    <KeyboardDoubleArrowRightIcon className="sidebar-icon"/>
                    <span className="sidebar-text">Dashboard</span>
                </div>
            </div>

            <div className="sidebar-items">
                <div onClick={() => navigate('/payees')} className='item'>
                    <KeyboardDoubleArrowRightIcon />
                    <span className="sidebar-text">Payees</span>
                </div>
                <div onClick={() => navigate('/accounts')} className='item'>
                    <KeyboardDoubleArrowRightIcon />
                    <span className="sidebar-text">Accounts</span>
                </div>
                <div onClick={() => navigate('/categories')} className='item'>
                    <KeyboardDoubleArrowRightIcon />
                    <span className="sidebar-text">Categories</span>
                </div>
                <div onClick={() => navigate('/mapping')} className='item'>
                    <KeyboardDoubleArrowRightIcon className="sidebar-icon"/>
                    <span className="sidebar-text">Mapping</span>
                </div>
                <div onClick={() => navigate('/transactions')} className='item'>
                    <KeyboardDoubleArrowRightIcon />
                    <span className="sidebar-text">Transactions</span>
                </div>
            </div>
        </div>
    )
}


export default SideBar