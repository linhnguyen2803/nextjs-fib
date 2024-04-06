/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import AWS from 'aws-sdk/global'
import c from "clsx";
import s from "./style.module.scss";
import {
  Bars3Icon,
  ChartBarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from '../../atom/Image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import Label from '../../atom/Label';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js"
import {awsConfiguration} from '../../../../awsConfigution'
import Button from '../../atom/Button';
import { useDispatch } from "react-redux";
import { fetchRemoveUser } from '../../../stores/user/effects';
import { AnyAction } from 'redux';


const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId+"",
  ClientId: awsConfiguration.ClientId+"",

})

const solutions: any[] = [
  {
    name: 'AboutUs',
    description: 'Get a better understanding of where your traffic is coming from.',
    hrefHd: '/',
    icon: ChartBarIcon,
  }
]
export type HeaderInfo = {
  name: String,
    description: String,
    hrefHd: string,
    icon: any,
}


type Props = {
  className?: string,
  // dispatch?: (arg0: AnyAction) => void
};

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [listHeader, setListHeader] = useState<Array<HeaderInfo>>([]);
  const router = useRouter()
  const userStore = useSelector((state: RootState) => state.user)
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();
  
  useEffect (() => {
    console.log("user info", userStore)
    if(!userStore.userInfo) {
      setListHeader(solutions)
    } else if (userStore.userInfo.isAdmin === "0") {
      setListHeader([
        {
          name: 'AboutUs',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/',
          icon: ChartBarIcon,
        },{
          name: 'Overview',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/overview',
          icon: ChartBarIcon,
        },{
          name: 'Vision',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/vision',
          icon: ChartBarIcon,
        },{
          name: 'Product',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/order',
          icon: ChartBarIcon,
        },{
          name: 'Ecosystem',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/ecosystem',
          icon: ChartBarIcon,
        },{
          name: 'Whitebook',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/whitebook',
          icon: ChartBarIcon,
        }
      ])

    } else {

      setListHeader([
        {
          name: 'AboutUs',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/',
          icon: ChartBarIcon,
        },{
          name: 'AboutUs',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/',
          icon: ChartBarIcon,
        },{
          name: 'Overview',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/overview',
          icon: ChartBarIcon,
        },{
          name: 'Vision',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/vision',
          icon: ChartBarIcon,
        },{
          name: 'Product',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/order',
          icon: ChartBarIcon,
        },{
          name: 'Ecosystem',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/ecosystem',
          icon: ChartBarIcon,
        },{
          name: 'Whitebook',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/whitebook',
          icon: ChartBarIcon,
        },{
          name: 'Admin',
          description: 'Get a better understanding of where your traffic is coming from.',
          hrefHd: '/admin',
          icon: ChartBarIcon,
        }
      ])
    }
  }, [userStore])

  const onClickLogout = async () => {
    
    signOut()
  }

  const signOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    // console.log("Lougout ", cognitoUser)
    if (cognitoUser != null) {
      console.log("Lougout ", cognitoUser)
      cognitoUser.signOut();
      dispatch(fetchRemoveUser() as unknown as AnyAction)
      router.push({
        pathname: "/login"
      })
    }

  };
  
  
  return (
    <header className={c("header overflow-hidden")} id="header">
      <Popover className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="#" key="home">
                <span className="sr-only">Your Company</span>
                {/* <img
                  className="h-8 w-auto sm:h-10"
                  src="/logo.png"
                  alt="" */}
                {/* /> */}
                <Image path="/logo.png" width={80} height={80}/>
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              {
                navbar ? <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 
                text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 
                focus:ring-inset focus:ring-indigo-500"
                onClick={() => setNavbar(!navbar)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button> : <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 
                text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setNavbar(!navbar)}>
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>

              }
              
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            {listHeader.map((item) => (
              <Link href={item.hrefHd} 
                key={item.hrefHd}
                // onClick= {() => setNavbar(false)}
                className={c("text-base font-medium text-gray-500 hover:text-gray-900",
                  router.asPath === item.hrefHd ? "text-blue-500 hover:text-blue-900" : "text-gray-500 hover:text-gray-900"
                )}>
                  {item.name}
              </Link>
            ))
            }
            </Popover.Group>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">

            {(() => {
              if (userStore.userInfo) {
                return (
                  <div>
                    <Label text={userStore.userInfo.email}  ></Label>
                    {/* <Link
                      href="/logout"
                      key={"logout"}
                      className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Logout
                    </Link> */}

                    <Button className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700' 
                     name={'Logout'} onClick={() =>onClickLogout()} type={'primary'}/>
                  </div>
                )
              } else {
                return (
                  <div>
                    <Link
                      href="/register"
                      key={"signup"}
                      className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Register
                    </Link> 
                  <Link
                    href="/login"
                    key={"login"}
                    className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Login
                  </Link>
                </div>
                )
              }
            })()}
            
              {/* <MetaMaskButton theme={"light"} color="white"></MetaMaskButton> */}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className={`relative inset-x-0 top-0 origin-top-right transform p-2 transition ${
                navbar ? 'block' : 'hidden' }`}>
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="mt-2">
                  <nav className="grid gap-y-8">
                    {listHeader.map((item) => (
                      <a
                        href={item.hrefHd}
                        key={item.hrefHd}
                        onClick= {() => console.log("click")}
                        className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                      >
                        <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                        <span
                          
                          className={c("ml-3 text-base font-medium ", 
                          router.asPath === item.hrefHd ? "text-blue-900" : "text-gray-900") }
                          >{item.name}</span>
          
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5">
                
                <div>
                  {(() => {
                    if (userStore.userInfo) {
                      return (
                        <div>

                          <Label text={userStore.userInfo.email}  ></Label>
                          <p className="mt-6 text-center text-base font-medium text-gray-500">
                            
                            {/* <Link href="/logout" key={"signOutMobile"} className="text-indigo-600 hover:text-indigo-500" >
                              Logout
                            </Link> */}
                            <Button key={"signOutMobile"} className='text-indigo-600 hover:text-indigo-500' 
                              name={'Logout'} onClick={() =>onClickLogout()} type={'primary'}/>
                            
                          </p>
                        </div>
                      )
                    } else {
                      return (
                        <div>
                          <Link
                            href="/register"
                            key={"abc"}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Register
                          </Link>
                          <p className="mt-6 text-center text-base font-medium text-gray-500">
                            Existing customer?{' '}
                            <Link href="/login" key={"signInMobile"} className="text-indigo-600 hover:text-indigo-500">
                              Login
                            </Link>
                          </p>
                      </div>
                      )
                    }
                  })()}
                  

                  
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  )
}

export default Header;