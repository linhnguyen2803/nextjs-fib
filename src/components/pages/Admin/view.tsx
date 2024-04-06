import type { UseService } from "./service"
import type {NextPage} from "../../../types/nextjs";

import { useRouter } from "next/router"
import {ChangeEvent, useEffect, useState} from "react";
import styles from '../../../../styles/Home.module.css'
import c from "clsx";
import s from "./style.module.scss";
import FormBlock from "../../molecules/FormBlock";
import Button from "../../atom/Button";
import ButtonOutline from "../../atom/ButtonOutline";
import Label from "../../atom/Label";
import Table from "../../molecules/Table";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores";
import { RequestOrder } from "../../../stores/order/model";
import { toast } from "react-toastify";
import DateUtils from "../../../utils/date";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js"

import {awsConfiguration} from '../../../../awsConfigution'
import UpdateStatusModal from "../../organisms/UpdateOrderModal";

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId+"",
  ClientId: awsConfiguration.ClientId+"",

})
type Props = {
  className?: string
}
export const view = (useService: UseService) => {
  const Home: NextPage = () => {
    const [gender, setGender] = useState(0)
    const [amount, setAmount] = useState("0")
    const [wallet, setWallet] = useState("")
    const [price, setPrice] = useState(0.015)
    const [estimatedQuantity, setEstimatedQuantity] = useState("0")
    const router = useRouter()
    const [listData, setListData] = useState<Array<Object>>([])
    const [isLoading, setIsLoading] = useState(false)
    const listColunm = ["Date", "Status", "Wallet", "Amount", "FIB" ]
    const listOrderStore = useSelector((state: RootState) => state.order.listOrder)
    const userStore = useSelector((state: RootState) => state.user)
    const { editOrder, getListOrder } = useService();
    const [idxEdit, setIdxEdit] = useState(-1)
    const [idxDelete, setIdxDelete] = useState(-1)
    const [token, setToken] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [showModal, setShowModal] = useState(false); 
    useEffect (() => {
      
      if (userStore.userInfo?.isAdmin === "1") {
        // const cognitoUser = userPool.getCurrentUser()
        console.log("user", userStore.userInfo?.token)
        // if (cognitoUser.getSignInUserSession()?.getAccessToken().getJwtToken() != undefined) {
        //   setToken(cognitoUser.getSignInUserSession()?.getAccessToken().getJwtToken()+ "")
        // }
        getListOrder(userStore.userInfo.token)
      } else {
        router.push({
          pathname: "/"
        })
      }
      
    }, [userStore])

    useEffect (() => {
      const list: Array<Object> = []
      listOrderStore.map(item => {
        list.push({
          createAt: DateUtils.formatDateString(item.createAt),
          status : item.status,
          wallet: item.wallet,
          amount: item.amount,
          quantity: item.quantity,
          actions: "function"
        })
      })
      setListData(list)
      console.log("list",list)
    }, [listOrderStore])

    useEffect (() => {
      let cal = Number(amount) / price
      return setEstimatedQuantity(cal+ "");
    }, [amount])

    const onClickEditOrder = (idx: number) => {
      setIdxEdit(idx)
      setIsOpen(true)
    }

    const onClickDeleteOrder = (idx: number) => {
      // setShowModal(true)
      setIdxEdit(idx)
    }

    const onEditSumit = async (status: string) => {
      console.log(status)
      setIsOpen(false)
      let order =  {
        id : listOrderStore[idxEdit].id,
        status : status
      } 
      console.log(order)
      if (userStore.userInfo?.token) {
        await editOrder(order, userStore.userInfo.token)
        toast.success('You have been changed status succesfully.')
        await getListOrder(userStore.userInfo?.token)
      }
        
    }
   

    return <main className={c(styles.main)}>
      <div className="responsive">
        <div className="container">
          
          <div className="mb-3 mt-8 flex text-2xl">
            <div className="row inline flex">
              {/* <Image className="mb-3 flex-1 ms-24" path="../../../../public/favicon.ico" height={40} width={40}/> */}
              <Image
                src="/logo.png"
                alt="Vercel Logo"
                className={c(styles.vercelLogo,"mb-3 flex-1 ms-24")}
                width={48}
                height={24}
                priority
              />
              <h3 className="d-flex flex-row sm:flex-col left ml-2"><i className="bi bi-filetype-csv me-1"></i>
                ~ 0.015$</h3>
            </div>
          </div>


          <div className="flex flex-col mb-3 sm:ml-24 mt-10 ">

          <Label className="ml-2 mt-2" text={"Latest Transactions"}/>
          <Table 
            className="mt-10 overflow-x-auto sm:-mx-6 lg:-mx-8" 
            listColunm={listColunm} 
            listData= {listData}
            isDetailButton = {false}
            onClickEdit = {onClickEditOrder}
            isDeleteButton={true}
            onClickDelete ={onClickDeleteOrder}
            ></Table>

          </div>

          <UpdateStatusModal 
            title={"Update order"} 
            lblClose={""} 
            lblConfirm={""} 
            onClose={() => setIsOpen(false)} 
            onSave={onEditSumit} 
            isLoading={isLoading}
            type={"primary"} 
            isOpen={isOpen}/>
        </div>
      </div>
    </main>
  }
  return Home
}
