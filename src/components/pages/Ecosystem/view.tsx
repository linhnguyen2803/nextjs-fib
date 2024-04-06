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
        className={c(styles.main, "bg-backgr2 bg-no-repeat bg-cover bg-center")}
       >
        <div className="responsive">
          <div className="container">
            {/* Title Overview of FIB ecosystem */}
            <div className="mt-1">
              <span className="text-[50px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                Overview of FIB ecosystem
              </span>
              <p className="font-normal text-[25px] text-neutral-50 mt-5">
                The FIB token ecosystem revolves around main groups including
                users, organizations, investors and decentralized exchanges (DEX
                exchange). Below is a description of each group's role and
                interactions in this ecosystem:
              </p>
              {/* Roadmap */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <div className="mt-5">
                    <div className="ml-[30px]">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                        Q1
                      </span>
                      <p className="font-normal text-[25px] text-neutral-50">
                        Users: Users are individuals or organizations that use
                        FIB tokens in applications and services. They can use
                        FIB tokens to exchange between accounts, make
                        transactions, or participate in other activities within
                        the FIB token network. Users have ownership and control
                        of their FIB tokens, and use them to take advantage of
                        the ecosystem's features and benefits.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px]">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                        Q2
                      </span>
                      <p className="font-normal text-[25px] text-neutral-50">
                        Organization: Organizations can be businesses, projects,
                        non-profit organizations or any other entity in the FIB
                        token ecosystem. They can use FIB tokens to create and
                        manage services, applications or platforms. FIB tokens
                        can be used to facilitate exchanges between members of
                        an organization or to provide incentives for users to
                        participate in organizational activities.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px]">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                        Q3
                      </span>
                      <p className="font-normal text-[25px] text-neutral-50">
                        Investors: Investors play an important role in
                        supporting and developing the FIB token ecosystem. They
                        can purchase FIB tokens during public or initial coin
                        offering (ICO) phases to invest in projects related to
                        FIB tokens. Investors can expect profits from holding
                        FIB tokens or from participating in business and
                        development activities in the FIB token ecosystem.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="ml-[30px]">
                      <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                        Q4
                      </span>
                      <p className="font-normal text-[25px] text-neutral-50">
                        Decentralized exchange (DEX exchange): Decentralized
                        exchange is where users can exchange FIB tokens with
                        each other. This is where liquidity is provided and the
                        ability to exchange FIB tokens between users. On the
                        exchange, users can buy, sell or trade FIB tokens with
                        other partners. Decentralized exchanges play an
                        important role in facilitating trading activities and
                        providing flexibility to users in managing and using FIB
                        tokens.
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 ml-[30px]">
                    <p className="font-normal text-[25px] text-[#FBD786]">
                      FIB token ecosystem includes users, organizations,
                      investors and decentralized exchanges. Each group plays an
                      important role and interacts with each other to build and
                      develop the FIB token ecosystem.
                    </p>
                  </div>
                </div>
                <div className="h-72px w-96px mt-5">
                  <img src="/Anhsodo01.png" alt="" />
                </div>
                
              </div>
            </div>

            {/* Role and operational */}
            <div className="mt-20">
              <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                Role and operational objectives of FIB
              </span>
              <p className="font-normal text-[25px] text-neutral-50 mt-5">
                FIB tokens in blockchain-based financial brokerage can be
                designed to play a role in creating and managing financial
                transactions and services between parties in a blockchain
                ecosystem. Here is an overview of how the FIB token works:
              </p>

              {/* FIB */}
              <div className="grid gap-10 grid-cols-2 mt-10">
                <div className="row-start-2 row-span-2">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    01
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Payment features: FIB token can be used as a means of
                    payment in financial transactions on the blockchain
                    platform. Users can use FIB to exchange, transfer money or
                    pay for services and products in a financial environment.
                  </p>
                </div>

                <div className="row-end-5 row-span-2 ">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    02
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Smart contracts: FIB tokens can be integrated with smart
                    contracts on the blockchain. This allows automatic financing
                    terms and conditions to be set without the need for
                    third-party intervention. For example, FIB can be used to
                    execute credit terms transactions, asset swaps or implement
                    other financial regulations.
                  </p>
                </div>

                <div className="row-start-4 row-span-2 ">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    03
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Ownership and voting rights: FIB tokens can bring ownership
                    and voting rights to users. This can allow investors or
                    users to participate in decisions about changes, upgrades
                    and developments in financial brokerage on the blockchain.
                  </p>
                </div>

                <div className="row-end-7 row-span-2 ">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    04
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Support trading and liquidity: FIB token can be used to
                    support trading and liquidity in financial brokerage. This
                    can include providing liquidity to trading pairs, supporting
                    the buying and selling of financial assets, and creating an
                    efficient and transparent trading environment on the
                    blockchain platform.
                  </p>
                </div>

                <div className="row-end-8 row-span-2">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    05
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Links and integrations: FIB tokens can create opportunities
                    for links and integrations with other financial services and
                    platforms. This could open up opportunities for
                    collaboration and increase the usability and availability of
                    the FIB token in the financial environment.
                  </p>
                </div>

                <div className="row-start-7 row-span-2 ">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    06
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Security: With the support of blockchain technology, FIB
                    tokens can provide a safe and secure environment for
                    financial transactions. Transactions are encrypted and
                    recorded on the blockchain, ensuring data integrity and
                    avoiding problems with fraud and information fraud.
                  </p>
                </div>

                <div className="row-end-10 row-span-2 ">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    07
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Transparency: Blockchain provides a transparent environment
                    in which transactions and activities related to FIB tokens
                    can be publicly tracked and audited. This helps increase
                    trust and transparency in the financial brokerage
                    environment, helping users and investors to check and verify
                    financial activity.
                  </p>
                </div>

                <div className="row-start-9 row-span-2 ">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    08
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Save time and costs: Using FIB tokens in financial brokerage
                    on the blockchain can minimize dependence on intermediaries
                    and reduce complicated paperwork. This can help save time
                    and costs on financial transactions and processes.
                  </p>
                </div>

                <div className="row-end-12 row-span-2 ">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    09
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Growth potential: A financial brokerage platform on
                    blockchain using FIB tokens can bring growth and development
                    potential in the financial sector. The use of blockchain
                    technology and smart features of the FIB token can attract
                    the interest of investors, users and partners in the
                    financial industry.
                  </p>
                </div>

                <div className="row-start-11 row-span-2 ">
                  <span className="text-[36px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    10
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50">
                    Easy integration: FIB token can be easily integrated with
                    other financial services and applications on the blockchain.
                    This opens up opportunities for building complex financial
                    systems and collaborating with other partners in the
                    blockchain environment.
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
