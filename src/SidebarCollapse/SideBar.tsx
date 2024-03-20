import { useNavigate } from "react-router-dom"
import './SideBar.css'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import Groups2Icon from '@mui/icons-material/Groups2';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CategoryIcon from '@mui/icons-material/Category';
import MapIcon from '@mui/icons-material/Map';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useDispatch, useSelector } from "react-redux"
import { Tooltip, Zoom } from "@mui/material"
import { falseOpen, trueOpen } from "../features/sideBarSlice"


const SideBar = () => {
const navigate = useNavigate()
const result:any = useSelector((state) => state)
const open = result?.sideBar.open
const dispatch = useDispatch()


const classSplicer = (name:string) => {
    if (open === true) {
        return name
    } else if (open === false) {
        return( name + '-collapsed')
    }
}

const iconArrow = (name: string) => {
    if (open === true) {
        return(name + '-collapsed')
    } else if (open === false ) {
        return name
    }
}

const setOpenFalse = () => {
    dispatch(falseOpen())
    console.log(result)
  }
  const setOpenTrue = () => {
    dispatch(trueOpen())
    console.log(result)
  }
    
    return(
        <div className={classSplicer('sidebar')}>
            <div className={classSplicer('collapse-icon')} > myBooks <KeyboardDoubleArrowLeftIcon sx={{color:'white'}} style={{float:'right'}} onClick={() => setOpenFalse()}/> </div>
            <div className={iconArrow('openicon')}> MB <KeyboardDoubleArrowRightIcon sx={{color:'white'}} onClick={() => setOpenTrue()}/> </div>
            <div className="sidebar-header">
            <Tooltip title='Dashboard' TransitionComponent={Zoom} placement="right">
                <div onClick={() => navigate('/')} className='nav'>
                    <DashboardIcon sx={{color:'white'}} className={classSplicer('sidebar-icon')}/>
                    <span className={classSplicer('sidebar-text')}>Dashboard</span>
                </div>
            </Tooltip>
            </div>
        
            <div className="sidebar-items">
                <Tooltip title='Payees' TransitionComponent={Zoom} placement="right">
                <div onClick={() => navigate('/payees')} className='nav'>
                    <Groups2Icon className={classSplicer('sidebar-icon')}/>
                    <span className={classSplicer('sidebar-text')}>Payees</span>
                </div>
                </Tooltip>
                <Tooltip title='Accounts' TransitionComponent={Zoom} placement="right">
                <div onClick={() => navigate('/accounts')} className='nav'>
                    <AccountBalanceIcon className={classSplicer('sidebar-icon')} />
                    <span className={classSplicer('sidebar-text')}>Accounts</span>
                </div>
                </Tooltip>
                <Tooltip title='Categories' TransitionComponent={Zoom} placement="right">
                <div onClick={() => navigate('/categories')} className='nav'>
                    <CategoryIcon className={classSplicer('sidebar-icon')} />
                    <span className={classSplicer('sidebar-text')}>Categories</span>
                </div>
                </Tooltip>
                <Tooltip title='Mapping' TransitionComponent={Zoom} placement="right">
                <div onClick={() => navigate('/mapping')} className='nav'>
                    <MapIcon className={classSplicer('sidebar-icon')}/>
                    <span className={classSplicer('sidebar-text')}>Mapping</span>
                </div>
                </Tooltip>
                <Tooltip title='Transactions' TransitionComponent={Zoom} placement="right">
                <div onClick={() => navigate('/transactions')} className='nav'>
                    <ReceiptLongIcon className={classSplicer('sidebar-icon')} />
                    <span className={classSplicer('sidebar-text')}>Transactions</span>
                </div>
                </Tooltip>
            </div>
        </div>
    )
}


export default SideBar

