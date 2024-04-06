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
        <div className="mt-5">
              {/* Product */}
              <div className="mt-1">
                <span className="text-[50px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                Product
                </span>

                {/* I. */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    I. Build and combine media platforms, financial information pages and advertising.
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50 mt-5">
                     FIB tokens can be integrated into media products and financial information pages as follows:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <p className="font-normal text-[25px] text-neutral-50">
                          1. High-quality content and access: FIB tokens can be used to provide access to high-quality
                          content on financial information sites. Users can use tokens to purchase service packages, 
                          sign up for memberships or access exclusive content, research reports or financial advice.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <p className="font-normal text-[25px] text-neutral-50">
                          2. Content evaluation and review: FIB tokens can be used to participate in the evaluation and
                          review of content on financial information pages. Users can use the token to vote, rate or 
                          post comments on articles, reports or financial news. This can create a trusted community 
                          and increase transparency in content reviews.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">
                          <p className="font-normal text-[25px] text-neutral-50">
                          3. Advertising and marketing: FIB tokens can be used to pay for advertising and marketing on 
                          financial information sites. Advertisers can purchase ads using FIB tokens, creating a 
                          direct payment mechanism between advertisers and content providers. This can help increase 
                          efficiency and transparency in online advertising.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                          
                          <p className="font-normal text-[25px] text-neutral-50">
                          4. Rewards and promotions: FIB tokens can be used to reward and promote users on financial 
                          information sites. Users can earn tokens through sharing content, participating in community
                          activities or completing tasks. This can motivate users to engage and interact with financial 
                          information site content.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                         
                          <p className="font-normal text-[25px] text-neutral-50">
                          5. Financial and transactional support: FIB tokens can be integrated into media products and 
                          financial information pages to provide financial support and transactional facilities. For 
                          example, users can use tokens to access financial analysis tools, market information, price 
                          charts, and other financial trading services.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* II. */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    II. FIB Wallet (Transaction Wallet)
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50 mt-5">
                  FIB e-wallet is a mobile application, computer software that allows users to manage and use FIB 
                  tokens and other digital assets.
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <div className="mt-5">
                        <div className="ml-[30px]">                          
                          <p className="font-normal text-[25px] text-neutral-50">
                          1. Asset management: FIB e-wallet allows users to manage their balance and assets. 
                          Users can check the balance of FIB tokens and other digital assets they own from 
                          a single place. This helps them track and control their assets conveniently.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                          
                          <p className="font-normal text-[25px] text-neutral-50">
                          2. Send and receive FIB tokens: FIB e-wallet allows users to send and receive 
                          FIB tokens easily. Users can enter the recipient's wallet address and the 
                          amount of FIB tokens to transfer and confirm the transaction in just a few 
                          simple steps. This facilitates the transfer of funds and carrying out 
                          transactions with FIB tokens.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                         
                          <p className="font-normal text-[25px] text-neutral-50">
                          3. Storing and trading other digital assets: In addition to managing FIB 
                          tokens, FIB e-wallet can also support storing and trading other digital 
                          assets such as Bitcoin, Ethereum and other currencies other electronics. 
                          This allows users to manage and conduct transactions with multiple digital 
                          assets from the same wallet.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                          
                          <p className="font-normal text-[25px] text-neutral-50">
                          4. Security and privacy: FIB e-wallet provides security and privacy measures 
                          to protect user accounts. This may include data encryption, two-factor 
                          authentication (2FA), fingerprint/face recognition integration, or secure 
                          private locking mechanisms. Ensuring security and privacy is an important 
                          factor for users to feel secure when using FIB e-wallet.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                         
                          <p className="font-normal text-[25px] text-neutral-50">
                          5. Integration with other financial services: FIB e-wallet can integrate 
                          with other financial services to provide expanded features. For example, 
                          it is possible to integrate wallets with exchanges to make transactions 
                          directly from the wallet, integrate wallets with other cryptocurrency wallets 
                          to convert assets, or integrate wallets with payment services to make transactions. 
                          Now pay online. This brings convenience and flexibility to users when using FIB e-wallet.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* .III. */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                    III. Decentralized Exchange (decentralized exchange)
                  </span>
                  <p className="font-normal text-[25px] text-neutral-50 mt-5">
                    FIB is a blockchain and cryptocurrency ecosystem, and we build a decentralized exchange 
                    (DEX) in our ecosystem, which can operate in the same way as decentralized exchanges other.
                  </p>
                  <p className="font-normal text-[25px] text-neutral-50 mt-5">
                  Here is an overview:
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <div className="mt-5">
                        <div className="ml-[30px]">                          
                          <p className="font-normal text-[25px] text-neutral-50">
                          1. Liquidity: FIB's decentralized exchange will provide a platform for users 
                          to exchange digital assets within the FIB ecosystem. To ensure liquidity, 
                          users need to provide their assets to the exchange's trading profile or through 
                          connecting their personal wallets.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                         
                          <p className="font-normal text-[25px] text-neutral-50">
                          2. Peer-to-peer trading: FIB's decentralized exchange can allow users to 
                          exchange directly with each other through smart contracts. This means 
                          users can make transactions without going through an intermediary.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                   
                          <p className="font-normal text-[25px] text-neutral-50">
                          3. Trading Protocol: FIB's decentralized exchange uses a protocol 
                          to determine value and regulate the trading process. A popular 
                          protocol used in decentralized exchanges is Automated Market Maker 
                          (AMM), which allows users to exchange assets through predefined trading pairs.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                         
                          <p className="font-normal text-[25px] text-neutral-50">
                          4. Privacy and security: FIB's decentralized exchange will ensure the confidentiality 
                          and security of user data and assets. This can include using protective measures 
                          such as two-factor authentication, data encryption, and security checks through 
                          audits and source code inspections.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="ml-[30px]">                         
                          <p className="font-normal text-[25px] text-neutral-50">
                          5. System management: FIB's decentralized exchange will have system management 
                          functions such as managing asset lists, determining transaction fees, monitoring 
                          trading activities, and providing interfaces. User friendly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* .IV. */}
                <div className="mt-1 ml-[30px]">
                  <span className="text-[40px] leading-[44px] font-normal bg-gradient-to-r text-transparent bg-clip-text from-[#8D42E7] via-[#E7429B] to-[#E7A542]">
                  IV. Build Web3 infrastructure
                  </span>
                    <p className="font-normal text-[25px] text-neutral-50 mt-5">
                    Update......
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
