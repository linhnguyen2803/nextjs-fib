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
          pathname: "/"
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
        className={c(styles.main, "bg-backgr5 bg-no-repeat bg-cover bg-center")}
        >
        <div className="responsive">
          <div className="container">
            <div className="mt-5">
              {/* white book */}
              <div className="mt-1">
                <span className="text-[50px] leading-[44px] font-Arial bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                  White book
                </span>

                {/* I. Introduction */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    I. Introduction
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50 mt-5">
                    This WhiteBook describes in detail the FIB Token on the
                    Binance Smart Chain (BSC) platform. FIB token is a type of
                    cryptocurrency token created on BSC, with the goal of acting
                    as an intermediary between customers and professional
                    financial institutions globally. This WhiteBook provides
                    information about the goals, structure, features,
                    development potential and applications of FIB Token on the
                    BSC platform.
                  </p>
                </div>

                {/* II. Target */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    II. Target
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50 mt-5">
                    FIB token on BSC is designed with the following main goals:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            01
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Becoming a global financial intermediary: Token FIB
                            aims to build a decentralized financial platform on
                            BSC, providing diverse and convenient financial
                            services to customers globally. FIB token will
                            create a bridge between customers and professional
                            financial institutions, facilitating transactions,
                            investments and access to global financial products.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            02
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Increased flexibility and utility: FIB tokens on BSC
                            will provide flexibility and utility for users in
                            trading, borrowing, investing and managing assets.
                            Users can use FIB Token to access financial products
                            and services from professional institutions globally
                            easily and securely.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            03
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Enhance security and reliability: FIB token on BSC
                            will apply advanced security measures and BSC's
                            blockchain technology to ensure the security and
                            reliability of transactions and financial data.
                            main. FIB token will create a safe and trustworthy
                            environment for users to transact and manage their
                            assets.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            04
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Building a decentralized financial ecosystem: FIB
                            Token aims to develop a decentralized financial
                            ecosystem, allowing users to access financial
                            services conveniently and safely.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            05
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Provides flexibility and utility: FIB Token allows
                            users to conduct financial transactions, access
                            financial services and use other features on the FIB
                            platform with flexibility and convenience profit.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            06
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Enhanced security: FIB token uses blockchain
                            technology and smart contract protocols to ensure
                            the security and safety of transactions and
                            financial data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* III. Structure */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    III. Structure
                  </span>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            01
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Binance Smart Chain: FIB token is built on the
                            Binance Smart Chain platform, a public and
                            decentralized blockchain. BSC offers fast
                            transaction speeds and low transaction fees,
                            facilitating the use of FIB Tokens on the BSC
                            network.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            02
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Open standards: FIB tokens comply with open
                            standards such as the ERC-20 standard on BSC, which
                            increases compatibility and usability in various
                            examples and applications on BSC.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            03
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Smart contract protocol: FIB token on BSC uses BSC's
                            smart contract protocol to manage transactions and
                            interactions on the platform. This protocol provides
                            automation and ensures that transactions are
                            performed securely and reliably.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* IV. Feature */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    IV. Feature
                  </span>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            01
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Transactions: FIB token allows users to perform
                            financial transactions such as money transfers,
                            payments and exchanges with fast speed and low
                            transaction fees on the BSC platform.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            02
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Borrowing: FIB Token users can take advantage of the
                            borrowing feature to create liquidity and enhance
                            their investment capabilities. Professional
                            financial institutions can provide borrowing
                            services based on FIB Tokens to meet users' capital
                            needs.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            03
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Asset Management: FIB Token provides tools and
                            interfaces for users to conveniently manage their
                            assets. Users can track, evaluate and manage their
                            digital assets on the BSC platform.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            04
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Multi-supply trading: FIB token will facilitate
                            users to conduct multi-supply trading, allowing them
                            to access different financial markets and exchanges
                            globally.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            05
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Financial services: FIB token allows access and use
                            of financial services on the FIB platform, including
                            e-wallets, loans, savings, insurance and other
                            services. Users can use FIB Token to access and use
                            these services conveniently and securely.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            06
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Application development platform: FIB Token provides
                            a platform for developers to build and deploy
                            financial applications on the FIB platform.
                            Developers can leverage the features and technology
                            of FIB Token to build diverse financial
                            applications, from simple payment applications to
                            complex smart contracts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* V. Development potential */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    V. Development potential
                  </span>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            01
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Development team: A talented and experienced
                            development team will ensure the continuous
                            development and improvement of FIB Token and its
                            surrounding ecosystem.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            02
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Strategic partners: Strategic partners in the fields
                            of finance and technology will create opportunities
                            for cooperation, expanding the scale and scope of
                            FIB Token.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            03
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            User adoption: Wide acceptance and use of FIB Token
                            by users will contribute significantly to the
                            development and increase in value of the token.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            04
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Ecosystem expansion: FIB Token will continuously
                            expand its ecosystem by collaborating with other
                            professional financial institutions, exchanges and
                            blockchain projects globally. This will create more
                            opportunities and development potential for FIB
                            Token on the BSC platform.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            05
                          </span>
                          <p className="font-normal text-[25px] text-neutral-50">
                            Enhance security: Token FIB will continue to
                            research and deploy advanced security technologies
                            to ensure the security and reliability of the
                            system. This will help users feel secure when using
                            FIB Token on the BSC platform.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                            06
                          </span>
                          <p className="font-normal text-[25px]  text-neutral-50">
                            Application expansion: FIB token will facilitate the
                            development of new applications and services on the
                            BSC platform, to meet the diverse financial needs of
                            users globally.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BECAUSE. Conclude */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    BECAUSE. Conclude
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50 mt-5">
                    The FIB token on the Binance Smart Chain platform is a
                    global financial intermediary, providing flexibility,
                    utility and security to users. With the goal of serving as a
                    bridge between customers and professional financial
                    institutions, Token FIB wishes to create a safe, reliable
                    and convenient financial environment on the BSC platform.
                  </p>
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
