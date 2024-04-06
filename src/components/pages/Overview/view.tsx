import type { UseService } from "./service"
import type {NextPage} from "../../../types/nextjs";

import { useRouter } from "next/router"
import {ChangeEvent, useEffect, useState} from "react";
import styles from '../../../../styles/Home.module.css'
import c from "clsx";
import s from "./style.module.scss";
import logo from "../../../../public/favicon.ico"
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
    const { createOrder, getListOrder } = useService();
    const userStore = useSelector((state: RootState) => state.user)
    useEffect (() => {
      if (userStore.userInfo?.token) {
        // console.log("tokennn dasdas", userStore.userInfo?.token)
        
        getListOrder(userStore.userInfo.token)
      } else {
        router.push({
          pathname: "/home"
        })
      }
        
    }, [])

    useEffect (() => {
      const list: Array<Object> = []
      listOrderStore.map(item => {
        list.push({
          createAt: DateUtils.formatDateString(item.createAt),
          status : item.status,
          wallet: item.wallet,
          amount: item.amount,
          quantity: Number(item.quantity).toFixed(2)
        })
      })
      setListData(list)
      console.log("list",list)
    }, [listOrderStore])

    useEffect (() => {
      let cal = (Number(amount) / price ).toFixed(2)
      return setEstimatedQuantity(cal+ "");
    }, [amount])

    const onChangeAmount = (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement
      setAmount(target.value)
    }

    const onChangeWallet = (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement
      setWallet(target.value)
    }

    const onClickOrder = async () => {
      if (userStore.userInfo?.token) {
        setIsLoading(true)
        const order: RequestOrder = {
          price: price+"",
          wallet: wallet,
          amount: amount,
          quantity: estimatedQuantity
        }
        console.log(order)
        
        await createOrder(order, userStore.userInfo.token)
        setIsLoading(false)
        toast.success('You have been ordered successful.')
        
        await getListOrder(userStore.userInfo.token)
      }
      
    }
   

    return <main className={c(styles.main)}>
      <main
        className={c(styles.main, "bg-backgr2 bg-no-repeat bg-cover bg-center")}
      >
        <div className="responsive">
          <div className="container">
            {/* Overview of Financial Broker: */}
            <div className="mt-1">
              <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                Overview of Financial Broker:
              </span>
              <div className="grid gap-4">
                <div className="col-span-2">
                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        01
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50 leading-[44px]">
                        Name: Financial Broker
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        02
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50 leading-[44px]">
                        Transaction name: FIB
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        03
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50 leading-[44px]">
                        Type: Utility token
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        04
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50 leading-[44px]">
                        Platform: BEP20
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        05
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50 leading-[44px]">
                        Contract: 0xef4D5D93B3A49F7ea0cdE55BF52ae788476Bc0c5
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        06
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50 leading-[44px]">
                        Total supply: 1,100,000,000 FIB
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        07
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50 leading-[44px]">
                        Introductory price: $0.015/FIB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*	FIB Token Allocation: */}
            <div className="mt-20">
              <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                FIB Token Allocation:
              </span>
              <p className="font-normal text-neutral-50 mt-5 text-[26px]">
                The total supply is 1,100,000,000 FIB and is distributed as
                follows:
              </p>
              {/* body */}
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        01
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50">
                        Staking and Mining Rewards: 30%
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        02
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50">Group: 20%</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        03
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50">Fund: 20%</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        04
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50">Ecosystem Funding: 15%</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        05
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50">Private community sale: 15%</p>
                    </div>
                  </div>
                </div>
                <div className="mt-20">
                  <img
                    src="/FIB_token.01.jpg.png"
                    alt="FIB"
                    className="bg-no-repeat bg-cover"
                  />
                </div>
              </div>
            </div>

            {/*		Affiliate marketing rewards: */}
            <div className="mt-20">
              <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                FIB Token Allocation:
              </span>

              {/* body */}
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2">
                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        01
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50">
                        Level 1 affiliate marketing: 8%
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        02
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50">
                        Level 2 affiliate marketing: 2%
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px] flex text-center items-center">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542] mr-[30px]">
                        03
                      </span>
                      <p className="font-normal text-[26px] text-neutral-50">
                        Level 3 affiliate marketing: 2%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
          
    </main>
  }
  return Home
}
